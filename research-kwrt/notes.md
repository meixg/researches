# Investigation Notes - Kwrt Project

## Overview
The `kiddin9/Kwrt` project is an automated build system for OpenWrt firmware, designed to support a wide range of hardware (soft routers, ARM devices, x86_64, etc.). It leverages GitHub Actions to provide a one-click or automated compilation process.

## Key Findings

### 1. Project Structure
- `.github/workflows/`: Contains the CI/CD pipelines. `Openwrt-AutoBuild.yml` is the core build script.
- `devices/`: The heart of the hardware adaptation.
    - `common/`: Contains scripts (`diy.sh`), patches, and base configurations shared across all devices.
    - `<device_name>/`: Contains device-specific configurations, patches, and `diy.sh` scripts.

### 2. Adaptation Mechanism
The adaptation for different hardware is achieved through a multi-layered approach:

- **Modular Configuration**: Each device has its own folder in `devices/`. During the build process, the workflow copies the `common` configuration first, followed by the device-specific configuration, allowing for overrides.
- **`diy.sh` Scripts**:
    - `devices/common/diy.sh`: Handles universal tasks like adding software feeds (e.g., `kiddin9/op-packages`), modifying default IP addresses, and pulling specific packages from other OpenWrt forks (ImmortalWrt, LEDE).
    - `devices/<target>/diy.sh`: Handles device-specific tweaks, such as selecting specific kernel versions, downloading extra drivers (e.g., Realtek r8125/r8126), or pulling target-specific files from other repos.
- **Patching System**:
    - The build system automatically applies patches found in `devices/common/patches` and `devices/<target>/patches`.
    - It supports standard `.patch` files, binary patches (`.bin.patch`), and revert patches (`.revert.patch`).
- **External Feeds**: It integrates various package feeds, notably `kiddin9/op-packages`, which likely contains pre-tuned or additional applications.
- **Dynamic Kernel Selection**: Some `diy.sh` scripts (like `amlogic_meson`) explicitly modify the `KERNEL_PATCHVER` to ensure compatibility with specific hardware.

### 3. Build Process (GitHub Actions)
1. **Trigger**: Manual dispatch or repository dispatch.
2. **Environment Setup**: Clones the base OpenWrt repository (or a specific branch like `openwrt-25.12`).
3. **Configuration Loading**:
    - Copies `devices/common/` to the OpenWrt source.
    - Copies `devices/${{ matrix.target }}/` to the OpenWrt source.
    - Runs `common/diy.sh` and then the target's `diy.sh`.
4. **Patching**: Applies all relevant patches.
5. **Compilation**: Runs `make defconfig` followed by the actual build command.
6. **Artifact Management**: Organizes the resulting firmware and uploads it to GitHub Releases or a custom server (`dl.openwrt.ai`).

## Conclusion
Kwrt achieves high compatibility by treating hardware adaptation as a set of "overlays" (configs, patches, and scripts) applied on top of a base OpenWrt source. This modularity allows the maintainer to quickly add or update support for new devices by just adding a new directory in `devices/`.
