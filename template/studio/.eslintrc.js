const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'standard-react',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'prettier/babel',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    'object-curly-spacing': ['error', 'never'],
    curly: ['error', 'all'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.6',
    },
  },
}
