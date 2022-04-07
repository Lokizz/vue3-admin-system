import router from '@/router'
import store from '@/store'

// ? 未登陆用户允许进入的白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 是否要去
 */
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // ? 1. 用户已登陆，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // ? 2. 用户未登陆，只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 如果非白名单的路由，则一律跳转到 login 路由
      next('/login')
    }
  }
})
