Nanolang is a minimalistic, statically-typed programming language engineered specifically to facilitate code generation and self-verification by Large Language Models (LLMs). Distinguishing features include mandatory inline testing via `shadow` blocks, prefix notation to eliminate operator precedence ambiguities, and a pared-down syntax that streamlines both language learning and generation. The repository further supports LLM adoption by providing explicit training materials, such as `MEMORY.md` and a formal `spec.json`, enabling direct model fine-tuning and reference. Comparative LLM experiments show nanolang’s approach fosters correct, structured, and testable code, making it especially suited for reliable machine-generated solutions even if more verbose than Python.

Key findings:
- Mandatory testing and unambiguous syntax ease LLM reasoning and verification.
- Explicit, machine-readable training resources (see nanolang repo: https://github.com/nanolang/nanolang).
- In benchmarks, nanolang enables easier LLM correctness than Rust or C, though Python remains more concise.
- Nanolang is a proof-of-concept for "LLM-targeted" language design, prioritizing verifiability and clarity over expressiveness.

Related project: nanolang documentation/specification at https://github.com/nanolang/nanolang.
