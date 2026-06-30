# Landlock File Isolation Demo

This project demonstrates how to use the Linux Landlock LSM (Linux Security Module) to perform file isolation for both C applications and Node.js applications.

## Prerequisites

- Linux kernel 5.13+ (Landlock support)
- GCC
- Node.js (for the Node.js demo)

## Project Structure

- `landlock_demo.c`: A standalone C program that restricts itself to read-only access for a specific file and denies access to everything else.
- `landlock_launcher.c`: A utility that creates a Landlock sandbox and then executes another program (like Node.js) inside it.
- `app.js`: A Node.js application used to verify the sandbox restrictions.

## How to Run

### 1. Standalone C Demo

Compile:
```bash
gcc landlock_demo.c -o landlock_demo
```

Run:
```bash
./landlock_demo <file_to_read>
```
The program will attempt to read the file (success), write to it (denied), and read `/etc/passwd` (denied).

### 2. Node.js Integration Demo

Landlock is a process-level restriction. Since Node.js does not have built-in Landlock bindings, the most robust way to use it is via a launcher/wrapper.

Compile the launcher:
```bash
gcc landlock_launcher.c -o landlock_launcher
```

Run Node.js inside the sandbox:
```bash
./landlock_launcher . node app.js .
```
- First `.` is the path allowed for RW access by the launcher.
- `node app.js .` is the command to execute.

## Key Landlock Concepts

1.  **Ruleset**: A collection of rules and the types of access they handle.
2.  **Access Rights**: Bitmask of allowed actions (e.g., `LANDLOCK_ACCESS_FS_READ_FILE`).
3.  **Restriction**: Once `landlock_restrict_self` is called, the process (and all its future children) are restricted by the ruleset.
4.  **No New Privs**: Landlock requires the `PR_SET_NO_NEW_PRIVS` flag to be set before restriction.

## Note on Environment

If you see `Function not implemented` (ENOSYS), it means your kernel does not support Landlock or it is not enabled in the boot parameters (`lsm=landlock,capability,yama,apparmor`).
