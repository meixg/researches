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

/* Landlock syscall wrappers if not provided by libc */
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

#define ACCESS_FILE ( \
	LANDLOCK_ACCESS_FS_READ_FILE | \
	LANDLOCK_ACCESS_FS_READ_DIR)

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <file_to_read>\n", argv[0]);
        return 1;
    }

    const char *path_to_read = argv[1];

    /* 1. Define the ruleset attributes */
    struct landlock_ruleset_attr ruleset_attr = {
        .handled_access_fs = ACCESS_FILE | LANDLOCK_ACCESS_FS_WRITE_FILE,
    };

    /* 2. Create the ruleset */
    int ruleset_fd = landlock_create_ruleset(&ruleset_attr, sizeof(ruleset_attr), 0);
    if (ruleset_fd < 0) {
        perror("Failed to create Landlock ruleset");
        if (errno == ENOSYS) {
            fprintf(stderr, "Hint: Landlock is not supported by your kernel.\n");
        }
        return 1;
    }

    /* 3. Add a rule: allow read access to the specified path */
    int path_fd = open(path_to_read, O_PATH | O_CLOEXEC);
    if (path_fd < 0) {
        perror("Failed to open path for rule");
        close(ruleset_fd);
        return 1;
    }

    struct landlock_path_beneath_attr path_beneath = {
        .allowed_access = ACCESS_FILE,
        .parent_fd = path_fd,
    };

    if (landlock_add_rule(ruleset_fd, LANDLOCK_RULE_PATH_BENEATH, &path_beneath, 0)) {
        perror("Failed to add Landlock rule");
        close(path_fd);
        close(ruleset_fd);
        return 1;
    }
    close(path_fd);

    /* 4. Restrict self */
    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) {
        perror("Failed to set NO_NEW_PRIVS");
        close(ruleset_fd);
        return 1;
    }

    if (landlock_restrict_self(ruleset_fd, 0)) {
        perror("Failed to restrict self");
        close(ruleset_fd);
        return 1;
    }
    close(ruleset_fd);

    printf("Sandbox active. Restricted to reading: %s\n", path_to_read);

    /* 5. Try to read the allowed file */
    FILE *f = fopen(path_to_read, "r");
    if (f) {
        printf("Success: Opened %s for reading.\n", path_to_read);
        fclose(f);
    } else {
        perror("Failure: Could not open allowed path");
    }

    /* 6. Try to write to the allowed file (should be denied) */
    f = fopen(path_to_read, "a");
    if (f) {
        printf("Unexpected Success: Opened %s for writing!\n", path_to_read);
        fclose(f);
    } else {
        printf("Correctly denied: Could not open %s for writing: %s\n", path_to_read, strerror(errno));
    }

    /* 7. Try to read another file (e.g., /etc/passwd) */
    const char *other_file = "/etc/passwd";
    f = fopen(other_file, "r");
    if (f) {
        printf("Unexpected Success: Opened %s for reading!\n", other_file);
        fclose(f);
    } else {
        printf("Correctly denied: Could not open %s: %s\n", other_file, strerror(errno));
    }

    return 0;
}
