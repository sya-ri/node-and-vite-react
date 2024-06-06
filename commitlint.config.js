module.exports = {
    extends: ["@commitlint/config-conventional"],
    // https://commitlint.js.org/#/reference-rules
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "test",
                "feat",
                "fix",
                "chore",
                "docs",
                "refactor",
                "style",
                "ci",
                "perf",
            ],
        ],
        "scope-enum": [
            2,
            "always",
            ["backend", "frontend", "deploy", "openapi", "ui"],
        ],
        "subject-case": [
            2,
            "always",
            [
                "lower-case", // default
                "upper-case", // UPPERCASE
                "camel-case", // camelCase
                "kebab-case", // kebab-case
                "pascal-case", // PascalCase
                "sentence-case", // Sentence case
                "snake-case", // snake_case
                "start-case", // Start Case
            ],
        ],
    },
};
