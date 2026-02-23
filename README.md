# Research projects carried out by AI tools

Each directory in this repo is a separate research project carried out by an LLM tool - usually [Claude Code](https://www.claude.com/product/claude-code). Every single line of text and code was written by an LLM.

See [Code research projects with async coding agents like Claude Code and Codex](https://simonwillison.net/2025/Nov/6/async-code-research/) for more details on how this works.

I try to include prompts and links to transcripts in [the PRs](https://github.com/simonw/research/pulls?q=is%3Apr+is%3Aclosed) that added each report, or in [the commits](https://github.com/simonw/research/commits/main/).

<!--[[[cog
import os
import re
import subprocess
import pathlib
from datetime import datetime, timezone

# Model to use for generating summaries
MODEL = "github/gpt-4.1"

# Get all subdirectories with their first commit dates
research_dir = pathlib.Path.cwd()
subdirs_with_dates = []

for d in research_dir.iterdir():
    if d.is_dir() and not d.name.startswith('.'):
        # Get the date of the first commit that touched this directory
        try:
            result = subprocess.run(
                ['git', 'log', '--diff-filter=A', '--follow', '--format=%aI', '--reverse', '--', d.name],
                capture_output=True,
                text=True,
                timeout=5
            )
            if result.returncode == 0 and result.stdout.strip():
                # Parse first line (oldest commit)
                date_str = result.stdout.strip().split('\n')[0]
                commit_date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                subdirs_with_dates.append((d.name, commit_date))
            else:
                # No git history, use directory modification time
                subdirs_with_dates.append((d.name, datetime.fromtimestamp(d.stat().st_mtime, tz=timezone.utc)))
        except Exception:
            # Fallback to directory modification time
            subdirs_with_dates.append((d.name, datetime.fromtimestamp(d.stat().st_mtime, tz=timezone.utc)))

# Print the heading with count
print(f"## {len(subdirs_with_dates)} research projects\n")

# Sort by date, most recent first
subdirs_with_dates.sort(key=lambda x: x[1], reverse=True)

for dirname, commit_date in subdirs_with_dates:
    folder_path = research_dir / dirname
    readme_path = folder_path / "README.md"
    summary_path = folder_path / "_summary.md"

    date_formatted = commit_date.strftime('%Y-%m-%d')

    # Get GitHub repo URL
    github_url = None
    try:
        result = subprocess.run(
            ['git', 'remote', 'get-url', 'origin'],
            capture_output=True,
            text=True,
            timeout=2
        )
        if result.returncode == 0 and result.stdout.strip():
            origin = result.stdout.strip()
            # Convert SSH URL to HTTPS URL for GitHub
            if origin.startswith('git@github.com:'):
                origin = origin.replace('git@github.com:', 'https://github.com/')
            if origin.endswith('.git'):
                origin = origin[:-4]
            github_url = f"{origin}/tree/main/{dirname}"
    except Exception:
        pass

    if github_url:
        print(f"### [{dirname}]({github_url}) ({date_formatted})\n")
    else:
        print(f"### {dirname} ({date_formatted})\n")

    # Check if summary already exists
    if summary_path.exists():
        # Use cached summary
        with open(summary_path, 'r') as f:
            description = f.read().strip()
            if description:
                print(description)
            else:
                print("*No description available.*")
    elif readme_path.exists():
        # Generate new summary using llm command
        prompt = """Summarize this research project concisely. Write just 1 paragraph (3-5 sentences) followed by an optional short bullet list if there are key findings. Vary your opening - don't start with "This report" or "This research". Include 1-2 links to key tools/projects. Be specific but brief. No emoji."""
        result = subprocess.run(
            ['llm', '-m', MODEL, '-s', prompt],
            stdin=open(readme_path),
            capture_output=True,
            text=True,
            timeout=60
        )
        if result.returncode != 0:
            error_msg = f"LLM command failed for {dirname} with return code {result.returncode}"
            if result.stderr:
                error_msg += f"\nStderr: {result.stderr}"
            raise RuntimeError(error_msg)
        if result.stdout.strip():
            description = result.stdout.strip()
            print(description)
            # Save to cache file
            with open(summary_path, 'w') as f:
                f.write(description + '\n')
        else:
            raise RuntimeError(f"LLM command returned no output for {dirname}")
    else:
        print("*No description available.*")

    print()  # Add blank line between entries

# Add AI-generated note to all project README.md files
# Note: we construct these marker strings via concatenation to avoid the HTML comment close sequence
AI_NOTE_START = "<!-- AI-GENERATED-NOTE --" + ">"
AI_NOTE_END = "<!-- /AI-GENERATED-NOTE --" + ">"
AI_NOTE_CONTENT = """> [!NOTE]
> This is an AI-generated research report. All text and code in this report was created by an LLM (Large Language Model). For more information on how these reports are created, see the [main research repository](https://github.com/simonw/research)."""

for dirname, _ in subdirs_with_dates:
    folder_path = research_dir / dirname
    readme_path = folder_path / "README.md"

    if not readme_path.exists():
        continue

    content = readme_path.read_text()

    # Check if note already exists
    if AI_NOTE_START in content:
        # Replace existing note
        pattern = re.escape(AI_NOTE_START) + r'.*?' + re.escape(AI_NOTE_END)
        new_note = f"{AI_NOTE_START}\n{AI_NOTE_CONTENT}\n{AI_NOTE_END}"
        new_content = re.sub(pattern, new_note, content, flags=re.DOTALL)
        if new_content != content:
            readme_path.write_text(new_content)
    else:
        # Add note after first heading (# ...)
        lines = content.split('\n')
        new_lines = []
        note_added = False
        for i, line in enumerate(lines):
            new_lines.append(line)
            if not note_added and line.startswith('# '):
                # Add blank line, then note, then blank line
                new_lines.append('')
                new_lines.append(AI_NOTE_START)
                new_lines.append(AI_NOTE_CONTENT)
                new_lines.append(AI_NOTE_END)
                note_added = True

        if note_added:
            readme_path.write_text('\n'.join(new_lines))

]]]-->
## 7 research projects

### [research-plannotator](https://github.com/meixg/researches/tree/main/research-plannotator) (2026-02-23)

Plannotator serves as a visual plan and code review layer for AI coding agents, enabling users to annotate, approve, or request changes to generated plans through an interactive single-page application. Its CLI is built on [Bun](https://bun.sh/), which intercepts agent output and serves a React-based UI that anchors feedback to precise markdown blocks. The tool integrates seamlessly with coding agents like Claude Code using configurable hooks and structured JSON/Markdown feedback, facilitating iterative review cycles and clear communication between user and agent. Plannotator’s block-based parser and plan diff engine empower users with granular control and transparency during agent-driven code planning.  
For more details, see [React](https://reactjs.org/), Bun, and Vite tooling.

**Key findings:**
- Browser-based UI lowers friction and increases review bandwidth.
- Agent-agnostic feedback loop adapts to various coding agents.
- Plan Diff feature enhances reliability and confidence in iterative coding.

### [distill_investigation](https://github.com/meixg/researches/tree/main/distill_investigation) (2026-02-11)

Distill is an open-source reliability layer designed to optimize LLM context handling by systematically removing semantic redundancies and promoting diversity in input data. Using deterministic clustering, selection, and MMR re-ranking, Distill efficiently deduplicates retrieved context chunks before they reach the language model, eliminating the need for slow or costly LLM-based preprocessing. Its emphasis on performance—manual vector math optimizations and fast computations (~12ms latency)—enables seamless integration with vector databases or AI assistants. The tool addresses the prevalent "Garbage In, Garbage Out" issue in RAG pipelines, ensuring more reliable, cost-efficient, and accurate outputs from LLMs.

- Removes up to 30-40% redundant context, improving token efficiency
- Delivers deterministically processed context for consistent LLM behavior
- Supports API, service, and AI assistant integration modes  
- Project link: [Distill GitHub](https://github.com/context-lab/distill)
- Technical demo: [ContextLab](https://www.contextlab.xyz/)

### [nanolang_investigation](https://github.com/meixg/researches/tree/main/nanolang_investigation) (2026-01-22)

Nanolang is a minimalistic, statically-typed programming language engineered specifically to facilitate code generation and self-verification by Large Language Models (LLMs). Distinguishing features include mandatory inline testing via `shadow` blocks, prefix notation to eliminate operator precedence ambiguities, and a pared-down syntax that streamlines both language learning and generation. The repository further supports LLM adoption by providing explicit training materials, such as `MEMORY.md` and a formal `spec.json`, enabling direct model fine-tuning and reference. Comparative LLM experiments show nanolang’s approach fosters correct, structured, and testable code, making it especially suited for reliable machine-generated solutions even if more verbose than Python.

Key findings:
- Mandatory testing and unambiguous syntax ease LLM reasoning and verification.
- Explicit, machine-readable training resources (see nanolang repo: https://github.com/nanolang/nanolang).
- In benchmarks, nanolang enables easier LLM correctness than Rust or C, though Python remains more concise.
- Nanolang is a proof-of-concept for "LLM-targeted" language design, prioritizing verifiability and clarity over expressiveness.

Related project: nanolang documentation/specification at https://github.com/nanolang/nanolang.

### [echarts-yAxis-compression](https://github.com/meixg/researches/tree/main/echarts-yAxis-compression) (2026-01-16)

ECharts Y-Axis Compression Demo explores multiple strategies to improve readability of bar charts with wide-ranging or outlier data by compressing or breaking the Y-axis. With ECharts 6.0+, the project highlights the new, native `axis.breaks` feature, allowing true axis gaps with customizable styles such as zigzag edges—see [broken-axis-demo.html](broken-axis-demo.html) for practical examples. For older ECharts versions, it details methods like custom label formatting, interval adjustments, and dual axes, which help declutter charts but do not produce visual breaks. Hands-on [demo files](index.html) illustrate both modern and legacy techniques, with a strong recommendation to leverage ECharts 6.0+ for best results.

**Key findings:**
- Native `axis.breaks` (ECharts 6+) enables actual axis gaps, supporting multiple breaks and custom visual effects.
- Formatter functions and interval controls offer flexible, simple label reduction for prior ECharts versions.
- Dual axes simulate breaks for separated ranges, but do not create true visual gaps.
- Best practices include maintaining context, using tooltips, and always displaying min/max values.  
- Upgrading to ECharts 6+ is highly recommended for interactive and visually distinct compression.  

Learn more:
- [ECharts Broken Axis Feature Overview](https://echarts.apache.org/handbook/en/basics/release-note/v6-feature/)
- [ECharts Documentation](https://echarts.apache.org/en/option.html)

### [monorepo-comparison](https://github.com/meixg/researches/tree/main/monorepo-comparison) (2026-01-11)

Comparing [pnpm](https://pnpm.io/) and [Rush.js](https://rushjs.io/) for monorepo management reveals notable differences in configuration, workflow, and suitability for various project sizes. pnpm workspaces provide streamlined setup with minimal configuration and familiar npm-like commands, making them efficient for small to medium-sized monorepos. In contrast, Rush.js introduces centralized governance and custom commands, facilitating stricter control and best serving large, enterprise-scale projects with many contributors. Both tools leverage workspace linking for dependencies, but Rush.js adds layers of structure to versioning and publishing not present in pnpm.

**Key Findings:**
- pnpm is optimal for simplicity, speed, and quick onboarding in smaller projects.
- Rush.js offers robust management features and scaling capabilities tailored for large, multi-team monorepos.
- Both tools use the efficient workspace linking protocol, but differ in configuration complexity and command structure.

### [pyscenedetect_demo](https://github.com/meixg/researches/tree/main/pyscenedetect_demo) (2026-01-05)

Leveraging the [PySceneDetect](https://github.com/Breakthrough/PySceneDetect) library, this project provides practical scripts and a demo for automated scene detection, video splitting, and report generation using both Python and command-line interfaces. Users can select from three main algorithms—ContentDetector for hard cuts, ThresholdDetector for fades, and AdaptiveDetector for variable lighting—depending on their video’s characteristics. The toolkit achieves high processing speeds (over 2000 FPS for detection) and outputs results in flexible formats, including CSV, images, HTML, and video clips, catering to different post-processing workflows. Detailed comparison scripts and usage recommendations help users identify the best detection strategy for their content, with streamlined installation and sample code for quick deployment.

Key features and findings:
- Multiple fast, configurable detectors for different transition types
- Extensive output options for editing and review (CSV, HTML, EDL, OTIO, clips)
- [Command-line interface](https://scenedetect.com/) and Python API supported
- ContentDetector generally offers the best balance for typical videos; ThresholdDetector excels for fades
- VideoManager is being deprecated; adapt future scripts to new APIs

### [javascript_runtimes](https://github.com/meixg/researches/tree/main/javascript_runtimes) (2025-12-28)

A head-to-head comparison of JavaScript runtimes—[Node.js](https://nodejs.org/), [mquickjs](https://github.com/ftlabs/mquickjs), and [QuickJS](https://bellard.org/quickjs/)—reveals sharp differences in startup speed, execution performance, JIT support, and memory usage. Lightweight engines like mquickjs and QuickJS start significantly faster and consume far less memory than Node.js, making them ideal for embedded or serverless scenarios. Node.js, powered by the V8 engine and featuring JIT compilation, drastically improves performance on repeated code execution, while both QuickJS and mquickjs provide consistent (though usually slower) results due to the absence of JIT. Each runtime presents clear trade-offs, making them viable for different deployment targets and application requirements.

**Key findings:**
- mquickjs and QuickJS start in 2-3ms and use <3MB RAM, versus Node.js’s 158ms startup and ~46MB RAM usage.
- Node.js’s JIT compiler yields faster execution after initial runs; QuickJS and mquickjs do not optimize repeated executions.
- Node.js excels for complex, long-running apps; mquickjs/QuickJS suit constrained, short-lived, or embedded uses.

<!--[[[end]]]-->

---

## Updating this README

This README uses [cogapp](https://nedbatchelder.com/code/cog/) to automatically generate project descriptions.

### Automatic updates

A GitHub Action automatically runs `cog -r -P README.md` on every push to main and commits any changes to the README or new `_summary.md` files.

### Manual updates

To update locally:

```bash
# Run cogapp to regenerate the project list
cog -r -P README.md
```

The script automatically:
- Discovers all subdirectories in this folder
- Gets the first commit date for each folder and sorts by most recent first
- For each folder, checks if a `_summary.md` file exists
- If the summary exists, it uses the cached version
- If not, it generates a new summary using `llm -m <!--[[[cog
print(MODEL, end='')
]]]-->
github/gpt-4.1
<!--[[[end]]]-->` with a prompt that creates engaging descriptions with bullets and links
- Creates markdown links to each project folder on GitHub
- New summaries are saved to `_summary.md` to avoid regenerating them on every run

To regenerate a specific project's description, delete its `_summary.md` file and run `cog -r -P README.md` again.
