// * 使用 api 返回的数据设置用户相关的全局数据
import {
  login,
  getUserInfo
} from '@/api/sys'
import md5 from 'md5'
import {
  getItem,
  setItem
} from '@/utils/storage'
// ? 导入常量
import {
  TOKEN
} from '@/constants'
import router from '@/router'

export default {
  // 使用 namespaced 属性注册单独的模块
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    // ? 修改 state 的值
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * * 登陆请求动作
     */
    // store 的 login
    login(context, userInfo) {
      const {
        username,
        password
      } = userInfo
      return new Promise((resolve, reject) => {
        // ? 导入的 axios 封装模块
        login({
            username,
            // ? 加密密码
            password: md5(password)
          })
          .then(data => {
            // ? 通过 commit 触发 mutation
            this.commit('user/setToken', data.token)
            // ? 登陆成功后跳转
            router.push('/')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * * 获取用户信息
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    }
  }
}
