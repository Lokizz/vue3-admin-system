// * 用于处理路由记录的功能组件

import path from 'path-browserify'

// ? 获取所有的子集路由
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// ? 处理脱离层级的路由
// 直接显示在最外层的子集路由
export const filterRoutes = (routes) => {
  // 获取所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    // 根据 route 对 childrenRoutes 进行查重，把所有重复的路由表剔除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

// ? menu 菜单路由生成
// 根据 routes 数据，返回符合想要的 menu 菜单数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足条件的数据不应该存在
  routes.forEach((item) => {
    // 不存在 children 以及 不存在 meta 直接返回
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children，不存在 meta，继续迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      // return
    }
    // 不存在 children，存在 meta || 存在 children && 存在 meta
    // 因为最终的 menu 需要跳转，此时需要合并 path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在同名父路由的情况
    let route = result.find(item => item.path === routePath)
    // 当前路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
