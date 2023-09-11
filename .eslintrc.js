module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },

  rules: {
    'no-new': 'off',
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'default-case': 'off',
    'prefer-template': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-globals': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-multiple-empty-lines': [1],
    'quotes': [1, 'single'],
    'no-extra-semi': [1],
    'semi': [1],

    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    // eslint-plugin-vue
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/require-v-for-key': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-components': 'off',
    // typescript-eslint
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
