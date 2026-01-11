# pnpm vs. Rush.js: A Monorepo Management Comparison

This project provides a hands-on comparison of [pnpm](https://pnpm.io/) and [Rush.js](https://rushjs.io/) for managing monorepos. Two separate monorepos are set up to demonstrate the key features and workflows of each tool.

## pnpm Workspace

The `pnpm-workspace` directory contains a monorepo set up using pnpm workspaces.

### Key Features:
- **Lightweight Configuration:** pnpm workspaces are configured with a single `pnpm-workspace.yaml` file at the root.
- **Standard `package.json`:** Each package uses a standard `package.json` file, and workspace dependencies are linked using the `workspace:*` protocol.
- **Familiar Commands:** The setup uses standard pnpm commands like `pnpm install` and `pnpm test -r`, which are intuitive for those familiar with npm or yarn.
- **Fast Installation:** pnpm's content-addressable store and symlinking of dependencies make for fast and efficient installations.

### Setup:
1. **Initialize:** A `pnpm-workspace.yaml` file is created at the root to define the workspace.
2. **Create Packages:** Packages `pkg-a` and `pkg-b` are created in the `packages` directory.
3. **Link Packages:** `pkg-a` is configured to depend on `pkg-b` using `"pkg-b": "workspace:*"`.
4. **Install:** `pnpm install` is run from the root to install dependencies and link the packages.
5. **Run Scripts:** `pnpm test -r` runs the `test` script in all packages.

## Rush.js Monorepo

The `rush-monorepo` directory contains a monorepo set up using Rush.js.

### Key Features:
- **Centralized Configuration:** Rush.js uses a `rush.json` file to manage all projects and their settings.
- **Strict Governance:** Rush enforces stricter governance over the monorepo, with features like centralized versioning and publishing workflows.
- **Custom Commands:** Rush provides a set of custom commands like `rush update` and `rush build` to manage the monorepo.
- **Enterprise-Focused:** Rush is designed for large, enterprise-level monorepos with many projects and contributors.

### Setup:
1. **Initialize:** `rush init` is run to scaffold a new Rush monorepo.
2. **Create Packages:** Packages `pkg-c` and `pkg-d` are created in the `packages` directory.
3. **Configure `rush.json`:** The new packages are manually added to the `projects` array in `rush.json`.
4. **Link Packages:** `pkg-c` is configured to depend on `pkg-d` using `"pkg-d": "workspace:*"`.
5. **Install:** `rush update` is run to install dependencies and link the packages.
6. **Run Scripts:** `rush build` runs the `build` script in all packages.

## Comparison

| Feature | pnpm Workspace | Rush.js |
|---|---|---|
| **Configuration** | `pnpm-workspace.yaml` | `rush.json` |
| **Dependency Linking** | `workspace:*` protocol | `workspace:*` protocol (uses pnpm) |
| **Installation** | `pnpm install` | `rush update` |
| **Task Execution** | `pnpm <script> -r` | `rush <command>` |
| **Learning Curve** | Low, similar to npm/yarn | Higher, due to custom commands and configuration |
| **Best For** | Small to medium-sized monorepos, projects that value simplicity and speed | Large, enterprise-level monorepos that require strict governance and centralized control |

## Conclusion

Both pnpm and Rush.js are powerful tools for managing monorepos, but they cater to different needs. pnpm workspaces offer a lightweight and intuitive solution that is great for developers who want to get up and running quickly. Rush.js, on the other hand, provides a more structured and governed approach that is ideal for large teams and complex projects.
