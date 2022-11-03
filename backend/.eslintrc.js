module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin','prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['error', 'never'],
    'max-len': [
      'error',
      {
        'code': 80,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreStrings': true,
        'ignoreUrls': true,
        'ignoreTrailingComments': true
      }
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'keyword-spacing': [
      'error',
      {
        'before': true
      }
    ],
    'camelcase': 'warn',
    'no-console': 'warn',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'printWidth': 80,
        'semi': false,
        'endOfLine': 'auto',
        'parser': 'typescript'
      }
    ]
  }
};
