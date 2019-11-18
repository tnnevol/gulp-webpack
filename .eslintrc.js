module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "standard"
  ],
  plugins: [
    "html"
  ],
  rules: {
    'no-new': 'off',
    // 使用分号
    'semi': ['error', 'always'],
    // 不允许使用==
    'eqeqeq': 2,
  },
  // 检测ES6代码
  parserOptions: {
    parser: 'babel-eslint'
  }
};
