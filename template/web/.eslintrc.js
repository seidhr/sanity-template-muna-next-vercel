module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'prettier/react', 'prettier/@typescript-eslint', 'prettier/babel'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    curly: ['error', 'all'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
