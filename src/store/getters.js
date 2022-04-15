// * 全局状态的快捷访问

import variables from '@/styles/variables.module.scss'

// ? getters 相当于 computed
const getters = {
  // 返回 user 模块中的 token 值
  token: (state) => state.user.token,
  /**
   * @returns true 表示用户信息已存在
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => {
    return state.user.userInfo
  },
  cssVar: (state) => variables,
  isSidebarOpened: (state) => state.app.isSidebarOpened
}
export default getters
