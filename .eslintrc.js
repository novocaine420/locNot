module.exports = {
  env: {
    es2020: true,
    browser: true,
    node: true
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
  ],
  globals: {
    React: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-useless-constructor': ['error'],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-useless-constructor': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['hrefLeft', 'hrefRight'], aspects: ['invalidHref', 'preferButton'] }
    ],
    'lines-between-class-members': 0,
    'no-use-before-define': ['error', { functions: false }],
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['~']
      }
    }
  }
};
