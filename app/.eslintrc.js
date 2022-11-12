// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
        semi: false,
        endOfLine: 'auto',
        parser: 'typescript',
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
