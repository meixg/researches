#include <linux/landlock.h>
#include <sys/syscall.h>
#include <unistd.h>
#include <stdio.h>
#include <errno.h>

#ifndef landlock_create_ruleset
static inline int landlock_create_ruleset(const struct landlock_ruleset_attr *const attr,
		const size_t size, const __u32 flags)
{
	return syscall(__NR_landlock_create_ruleset, attr, size, flags);
}
#endif

int main() {
    int abi = landlock_create_ruleset(NULL, 0, LANDLOCK_CREATE_RULESET_VERSION);
    if (abi < 0) {
        perror("landlock_create_ruleset");
        if (errno == ENOSYS) {
            printf("Landlock is not supported by the kernel.\n");
        } else if (errno == EOPNOTSUPP) {
            printf("Landlock is not enabled.\n");
        }
        return 1;
    }
    printf("Landlock ABI version: %d\n", abi);
    return 0;
}
