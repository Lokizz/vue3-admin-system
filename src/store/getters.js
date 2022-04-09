// * 快捷访问 - 优化返回响应的可读性
// ? getters 相当于 computed
const getters = {
  // 返回 user 模块中的 token 值
  token: state => state.user.token,
  /**
   * @returns true 表示用户信息已存在
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
