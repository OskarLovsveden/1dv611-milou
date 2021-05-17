module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  rules: {
    // we only want single quotes
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 4 spaces to indent our code
    'indent': ['error', 4],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error']
  }
}
