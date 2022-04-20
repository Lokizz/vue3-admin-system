// * 专门处理 element-plus 主题色变更的工具函数
import formula from '@/constants/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

// ? 把生成的样式表写入到 style 中
export const writeNewStyle = (newStyle) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

// ? 根据主题色生成最新的样式表
export const generateNewStyle = async (primaryColor) => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2. 获取当前 element-plus 的默认样式表，并把需要替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3. 遍历生成的色值表，在默认样式表进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

// ? 生成色值表
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach((key) => {
    // 将 primary 占位符替换为指定的主色
    // 如：color(#409eff tint(90%))
    const value = formula[key].replace(/primary/g, primary)
    // 利用 color.convert() 将颜色为 RGB 值后，再转换为十六进制
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

// ? 获取 element-plus 的默认样式表
export const getOriginalStyle = async () => {
  // 获取 element-plus 的当前版本
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

// ? 将需要替换的色值打上标记
const getStyleTemplate = (data) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#337ecc': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  // ? 把 element-plus 的默认数据替换成对应的关键字
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
