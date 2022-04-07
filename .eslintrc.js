module.exports = {
  // ? 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  // ? 表示启用 ESLint 检测的环境
  env: {
    // 在 node 环境下启动 ESLint 检测
    node: true
  },
  // ? ESLint 中基础配置需要继承的配置
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    // ? 应用 unplugin-vue-auto-import 的设置
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // ? 需要启用的规则，及其各自的错误级别
  // 'off' | 0 - 关闭规则
  // 'warn' | 1 - 警告级别（不会导致程序退出）
  // 'error' | 2 - 错误级别（会导致程序退出）
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // ! 取消与 prettier 的配置冲突，定义函数时，函数名后不用带空格
    'space-before-function-paren': 'off',
    // ? 取消 vue 组件名称不能为单个单词的限制
    'vue/multi-word-component-names': 'off',
    indent: 'off'
  }
}
