#define _GNU_SOURCE
#include <errno.h>
#include <fcntl.h>
#include <linux/landlock.h>
#include <linux/prctl.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/prctl.h>
#include <sys/stat.h>
#include <sys/syscall.h>
#include <unistd.h>

#ifndef landlock_create_ruleset
static inline int landlock_create_ruleset(const struct landlock_ruleset_attr *const attr,
		const size_t size, const __u32 flags)
{
	return syscall(__NR_landlock_create_ruleset, attr, size, flags);
}
#endif

#ifndef landlock_add_rule
static inline int landlock_add_rule(const int ruleset_fd,
		const enum landlock_rule_type rule_type,
		const void *const rule_attr, const __u32 flags)
{
	return syscall(__NR_landlock_add_rule, ruleset_fd, rule_type, rule_attr, flags);
}
#endif

#ifndef landlock_restrict_self
static inline int landlock_restrict_self(const int ruleset_fd, const __u32 flags)
{
	return syscall(__NR_landlock_restrict_self, ruleset_fd, flags);
}
#endif

#ifndef LANDLOCK_ACCESS_FS_MAKE_SYM
#define LANDLOCK_ACCESS_FS_MAKE_SYM (1ULL << 12)
#endif

#define ACCESS_FS_RO ( \
	LANDLOCK_ACCESS_FS_READ_FILE | \
	LANDLOCK_ACCESS_FS_READ_DIR | \
	LANDLOCK_ACCESS_FS_EXECUTE)

#define ACCESS_FS_RW ( \
	ACCESS_FS_RO | \
	LANDLOCK_ACCESS_FS_WRITE_FILE | \
	LANDLOCK_ACCESS_FS_REMOVE_DIR | \
	LANDLOCK_ACCESS_FS_REMOVE_FILE | \
	LANDLOCK_ACCESS_FS_MAKE_CHAR | \
	LANDLOCK_ACCESS_FS_MAKE_DIR | \
	LANDLOCK_ACCESS_FS_MAKE_REG | \
	LANDLOCK_ACCESS_FS_MAKE_SOCK | \
	LANDLOCK_ACCESS_FS_MAKE_FIFO | \
	LANDLOCK_ACCESS_FS_MAKE_BLOCK | \
	LANDLOCK_ACCESS_FS_MAKE_SYM)

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <allowed_path> <cmd> [args...]\n", argv[0]);
        return 1;
    }

    const char *allowed_path = argv[1];
    char **cmd_argv = &argv[2];

    struct landlock_ruleset_attr ruleset_attr = {
        .handled_access_fs = ACCESS_FS_RW,
    };

    int ruleset_fd = landlock_create_ruleset(&ruleset_attr, sizeof(ruleset_attr), 0);
    if (ruleset_fd < 0) {
        perror("landlock_create_ruleset");
        if (errno == ENOSYS) {
             fprintf(stderr, "Hint: Landlock is not supported by your kernel.\n");
        }
        return 1;
    }

    // Allow RW access to the specified path
    int path_fd = open(allowed_path, O_PATH | O_CLOEXEC);
    if (path_fd < 0) {
        perror("open(allowed_path)");
        return 1;
    }
    struct landlock_path_beneath_attr path_beneath = {
        .allowed_access = ACCESS_FS_RW,
        .parent_fd = path_fd,
    };
    if (landlock_add_rule(ruleset_fd, LANDLOCK_RULE_PATH_BENEATH, &path_beneath, 0)) {
        perror("landlock_add_rule(allowed_path)");
        return 1;
    }
    close(path_fd);

    // Also need to allow access to libraries, node binary etc. for this demo to work.
    const char *essential_paths[] = {"/usr", "/lib", "/lib64", "/etc"};
    for (int i = 0; i < 4; i++) {
        int fd = open(essential_paths[i], O_PATH | O_CLOEXEC);
        if (fd >= 0) {
            struct landlock_path_beneath_attr attr = {
                .allowed_access = ACCESS_FS_RO,
                .parent_fd = fd,
            };
            landlock_add_rule(ruleset_fd, LANDLOCK_RULE_PATH_BENEATH, &attr, 0);
            close(fd);
        }
    }

    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) {
        perror("prctl(NO_NEW_PRIVS)");
        return 1;
    }

    if (landlock_restrict_self(ruleset_fd, 0)) {
        perror("landlock_restrict_self");
        return 1;
    }
    close(ruleset_fd);

    execvp(cmd_argv[0], cmd_argv);
    perror("execvp");
    return 1;
}
