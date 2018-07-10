// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-multiple-empty-lines': 0,
    'no-tabs': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
    'indent': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 1,
    // 禁止重复 import
    'no-duplicate-imports': 2,
    "space-before-function-paren": ["off", "always"],
    'no-return-assign': 0,
    'camelcase': 0,
    'no-unneeded-ternary': 0,
    'no-return-await': 1,
    'curly': ["error", "all"]
  }
}
