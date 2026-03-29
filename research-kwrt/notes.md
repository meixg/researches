# Investigation Notes - Kwrt Project

## Overview
The `kiddin9/Kwrt` project is an automated build system for OpenWrt firmware, designed to support a wide range of hardware (soft routers, ARM devices, x86_64, etc.). It leverages GitHub Actions to provide a one-click or automated compilation process.

## Key Findings

### 1. Project Structure
- `.github/workflows/`: Contains the CI/CD pipelines.
    - `Openwrt-AutoBuild.yml`: The core build script.
    - `repo-dispatcher.yml`: Handles triggering builds for multiple targets via GitHub API.
- `devices/`: The heart of the hardware adaptation.
    - `common/`: Contains scripts (`diy.sh`), patches, and base configurations shared across all devices.
    - `<device_name>/`: Contains device-specific configurations, patches, and `diy.sh` scripts.

### 2. Adaptation Mechanism: GitHub Runner vs. Adaptation Layer
- **GitHub Runner**: GitHub Actions provides standardized virtual machines (typically Ubuntu) as build runners. These runners are **not** the target hardware; they are just the environment where the compilation (cross-compilation) happens.
- **Adaptation Layer**: The "adaptation" is implemented by the Kwrt project itself through the `devices/` directory.
    - It uses the OpenWrt **buildroot** system, which is designed for cross-compilation.
    - The Kwrt project provides the necessary configuration fragments (`.config`), patches, and scripts (`diy.sh`) to tell the buildroot how to build for a specific target (e.g., which CPU architecture, which drivers, which kernel version).
    - GitHub Actions simply automates the process of invoking this buildroot with the correct "adaptation layer" for each hardware target.

### 3. Build Trigger Mechanism (Web Page to GitHub Action)
- **The Web Page**: The project's README mentions `openwrt.ai`, which is a web-based customization interface.
- **Trigger**: When a user selects their options on the web page and clicks build, the website sends a `POST` request to the GitHub API (Repository Dispatch event).
- **Dispatch**: The `repo-dispatcher.yml` workflow (or a similar mechanism) receives this event. It then uses the GitHub API to trigger multiple instances of the `Openwrt-AutoBuild.yml` workflow, passing the specific `target` hardware as a parameter.
- **Concurrency**: GitHub Actions has limits on concurrent jobs (e.g., 20 or more depending on the account type). By using `repository_dispatch`, the project can queue dozens of builds. GitHub handles the queuing and execution based on its internal capacity and the user's plan.

## Conclusion
Kwrt achieves high compatibility by treating hardware adaptation as a set of "overlays" (configs, patches, and scripts) applied on top of a base OpenWrt source. This modularity allows the maintainer to quickly add or update support for new devices by just adding a new directory in `devices/`.
