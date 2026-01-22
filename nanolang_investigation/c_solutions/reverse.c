#include <stdio.h>
#include <string.h>

void reverse_string(char *s) {
    int len = strlen(s);
    for (int i = 0; i < len / 2; i++) {
        char temp = s[i];
        s[i] = s[len - i - 1];
        s[len - i - 1] = temp;
    }
}

int main() {
    char s[] = "hello";
    reverse_string(s);
    printf("%s\n", s);
    return 0;
}
