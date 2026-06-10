# Evidence Project Research Report

Evidence is an open-source, code-based Business Intelligence (BI) tool that allows users to build data products using SQL and Markdown. It generates a high-performance static website (powered by SvelteKit) with interactive charts and components.

## Architecture Overview

Evidence follows a modular monorepo architecture. The core philosophy is "BI as Code," where data fetching, transformation, and visualization are all defined in version-controllable text files.

### Key Components

1.  **CLI (`packages/evidence`)**: The entry point for users. It manages project initialization, development servers, and production builds. It uses a "template" strategy where a hidden SvelteKit project is created and updated with the user's content.
2.  **Preprocessing (`packages/lib/preprocess`)**: A critical layer that parses Markdown files, extracts SQL blocks, handles query dependencies (chaining), and transforms them into Svelte components.
3.  **Universal SQL (`packages/lib/universal-sql`)**: Provides a unified interface for querying data across different sources.
    *   **Build-time**: Converts data from various sources (BigQuery, Postgres, CSV, etc.) into compressed **Parquet** files using Apache Arrow and `parquet-wasm`.
    *   **Run-time (Browser)**: Uses **DuckDB-Wasm** to execute SQL queries directly against the Parquet files in the client's browser, enabling fast interactivity without a persistent backend.
4.  **UI Components (`packages/ui/core-components`)**: A library of Svelte components for data visualization (powered by **ECharts**) and UI layout.

## Data Flow

1.  **Extraction**: The `sources` command fetches data from configured data sources.
2.  **Transformation**: Data is converted into Arrow tables and then into Parquet files.
3.  **Loading**: During website build/load, Parquet files are served as static assets.
4.  **Querying**: `duckdb-wasm` in the browser registers these Parquet files as tables/views.
5.  **Visualization**: Svelte components execute SQL against the local DuckDB instance and render the results using ECharts.

## Technical Stack

*   **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/)
*   **Database (In-browser)**: [DuckDB-Wasm](https://duckdb.org/docs/api/wasm/overview)
*   **Data Format**: [Apache Parquet](https://parquet.apache.org/) (via [Apache Arrow](https://arrow.apache.org/))
*   **Visualization**: [Apache ECharts](https://echarts.apache.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## Key Features

*   **SQL in Markdown**: Seamlessly mix data queries with narrative.
*   **Reactive Queries**: Queries can depend on other queries or user inputs.
*   **Component Library**: Pre-built, high-quality charts and data widgets.
*   **Static Site Generation (SSG)**: Fast load times and easy deployment to platforms like Vercel or Netlify.
*   **Extensible Data Sources**: Plugin system for connecting to various databases and APIs.

## Conclusion

Evidence represents a modern shift in BI, moving away from drag-and-drop interfaces toward a developer-friendly, code-first approach. By leveraging technologies like DuckDB-Wasm and Parquet, it delivers a powerful and responsive user experience while maintaining the simplicity of static site deployment.
