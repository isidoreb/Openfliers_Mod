module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    'sourceType': 'module'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  // required to lint *.vue files
  plugins: ['prettier'],
  rules: {
    semi: [2, 'never'],
    // from https://github.com/nuxt/eslint-config/blob/master/index.js
    'import/no-unresolved': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/no-unused-components': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      { ignores: ['nuxt', 'nuxt-link', 'no-ssr', 'component', 'transition'] }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ],
  }
}
