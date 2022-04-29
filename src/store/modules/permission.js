// * 专门处理权限路由的模块
import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // ? 路由表：初始时所拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    // ? 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...state.routes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * @param {*} context 当前 store 实例
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      // 筛选后需要添加的路由
      const routes = []
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // ? 其余所有不存在匹配的路由，全部进入 404 的路由
      // ! 注意：该配置必须要在所有路由指定之后
      routes.push({
        // 使用正则匹配任意路径
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)
      return routes
    }
  }
}
