# Landlock Investigation Notes

## Environment Check
- GCC version: 13.3.0
- Node.js version: v22.22.1
- Kernel: 6.8.0 (on devbox)
- Landlock support: `landlock_create_ruleset` returned "Function not implemented" (ENOSYS) in the initial check.

## Investigation Steps
1. Initial environment check: Failed to detect Landlock support in the current kernel environment.
2. Planned standalone C demo to illustrate the API.
3. Planned Node.js integration via a C launcher.
4. Implemented `landlock_demo.c` and `landlock_launcher.c`.
5. Attempted to run demos: Both failed with `Function not implemented` (ENOSYS).

## Final Observations
- The current environment (devbox) does not have Landlock support enabled in the kernel, or the syscall numbers are not correctly mapping in this specific container/sandbox environment.
- However, the code provided follows the official Landlock API and should work on any modern Linux system (Kernel 5.13+) with Landlock enabled.
- For Node.js integration, the "Launcher" pattern is recommended because it avoids the need for complex FFI bindings and allows sandboxing the entire Node.js runtime (including its native modules and child processes).

## Code Verification
- `landlock_demo.c`: Implements basic ruleset creation, rule addition (path beneath), and self-restriction.
- `landlock_launcher.c`: Implements a generic wrapper that grants RW access to one directory and RO access to system directories (/usr, /lib, /etc) before executing a command.
- `app.js`: Verifies file access restrictions from within Node.js.
