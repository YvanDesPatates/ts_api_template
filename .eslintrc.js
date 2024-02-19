module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        semi: 2, // Disallows semicolons at the ends of statements
        camelcase: 1, // Warning for camel case naming convention
        "arrow-body-style": 2, // Enforces consistent style for arrow functions
        "prefer-const": 2, // Recommends use of const over let
        "@typescript-eslint/no-explicit-any": 1 //Only at warning because any is usefull when parsing body, you never know what type you have before checked
    }
}
