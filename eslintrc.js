module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        "plugin:vue/vue3-essential",
        "prettier",
        "@vue/typescript/recommended",
        "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": "off",
        "no-debugger": "off",
        "linebreak-style": [0, "error", "windows"],
        "import/no-extraneous-dependencies": [0],
        "no-undef": "warn",
        "max-len": ["error", { code: 500 }],
        "vue/no-mutating-props": ["off"],
        "no-shadow-restricted-names": "off",
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/ban-ts-comment": ["off"],
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-var-requires": 0,
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        'vue/html-closing-bracket-newline': 'off',
        // vue 中 script 的缩进
        "vue/script-indent": [
            "error",
            2,
            {
                baseIndent: 0,
                switchCase: 0,
                ignores: [],
            },
        ],
        // vue 中 template 的空格
        "vue/html-indent": [
            "error",
            2,
            {
                attribute: 2,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 10,
                "allowFirstLine": true
            },
            "multiline": {
                "max": 10,
                "allowFirstLine": true
            }
        }],
        "vue/no-v-html": ["off"],
        "vue/require-default-prop": ["off"],

    },
    globals: {
        $i18n: true,
    },
};
