// * 处理获取到的路由数据源，生成最终 fuse 需要的数据格式

import path from 'path-browserify'
import i18n from '@/i18n'

/**
 * 筛选出可供搜索的路由对象
 * @param {*} routes 路由表
 * @param {*} basePath 基础路径，默认为 /
 * @param {*} prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let result = []

  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 meta 时，使用 i18n 进行国际化解析，组合成新的 title
    // 动态路由不允许被检索
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }

    // 存在 children 时，迭代进行处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        result = [...result, ...tempRoutes]
      }
    }
  }

  return result
}
