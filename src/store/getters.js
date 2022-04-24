// * 全局状态的快捷访问

import { generateColors } from '@/utils/theme.js'
import { getItem } from '@/utils/storage.js'
import { MAIN_COLOR } from '@/constants'

// ? getters 相当于 computed
const getters = {
  // 返回 user 模块中的 token 值
  token: (state) => state.user.token,
  /**
   * @returns true 表示用户信息已存在
   */
  hasUserInfo: (state) => {
    // return JSON.stringify(state.user.userInfo) !== '{}'
    return JSON.stringify(state.user.userInfo) !== '{}' && state.user.userInfo
  },
  userInfo: (state) => {
    return state.user.userInfo
  },
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  isSidebarOpened: (state) => state.app.isSidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}
export default getters
