module.exports = [
  {
    ignores: [
      "node_modules/**",
      "allure-*/**",
      "cypress/reports/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "log/**",
      "logs/**",
      "results/**",
      "tmpBstackPackages/**",
    ],
  },
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        afterEach: "readonly",
        beforeEach: "readonly",
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["*.config.js", "scripts/**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        console: "readonly",
        fetch: "readonly",
        AbortSignal: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
