# Investigation Notes - Evidence

## 2025-05-23
- Cloned the repository: `https://github.com/evidence-dev/evidence`
- Initial exploration of the monorepo structure:
    - `packages/evidence`: Core CLI and project orchestration.
    - `packages/lib/universal-sql`: Data processing and client-side DuckDB integration.
    - `packages/lib/preprocess`: Markdown/SQL preprocessing logic.
    - `packages/ui/core-components`: Svelte-based UI components (charts, tables).
    - `sites/example-project`: Base for the template project.
- Analyzed `packages/lib/universal-sql/src/build-parquet.js`:
    - Converts data from connectors into Apache Arrow format.
    - Uses `parquet-wasm` to write Parquet files.
    - Uses DuckDB for final assembly and compression.
- Analyzed `packages/lib/universal-sql/src/client-duckdb/browser.js`:
    - Initializes `duckdb-wasm` in the browser.
    - Registers Parquet file URLs as DuckDB views.
    - Executes SQL queries against these views and returns results as JSON.
- Analyzed `packages/ui/core-components`:
    - Uses ECharts for most visualizations.
    - A custom Svelte action `use:echarts` handles the lifecycle of ECharts instances.
- Analyzed `packages/lib/preprocess`:
    - Uses `unified` and `remark-parse` to extract SQL from Markdown.
    - Transforms Markdown into Svelte files with injected query logic.
    - Supports query chaining by replacing `${ref}` with subqueries.
- Analyzed `packages/evidence/cli.js`:
    - Orchestrates the creation of `.evidence/template`.
    - Manages file watching and syncing between the user's project and the template.
    - Triggers Vite dev/build processes.
