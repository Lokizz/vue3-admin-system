// * 1. 导入所有 svg 图标

// ? 利用 webpack 的 require.context 方法注册所有 svg
// webpack 会在构建中解析代码中的 require.context()
// 三个参数：要搜索的目录，是否搜索子目录，匹配文件的正则
// 返回一个 require 函数
const svgRequire = require.context('./svg', false, /\.svg$/)

// ? require 函数接收一个参数：request，用于 require 的导入
// require 函数可以通过 .keys() 获取所有的图标
// 遍历图标，把图标作为 request 参数调用 svgRequire 导入函数，完成本地图标的注册
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))
