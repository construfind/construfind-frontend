module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["react", "import", "react-hooks"],
  ignorePatterns: ["node_modules/"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    linebreakStyle: ["warn", "windows"]
  },
  settings: {
    react: {
      version: "latest", // "detect" automatically picks the version you have installed.
    },
  },
  
};
