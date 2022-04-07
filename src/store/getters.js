// * 快捷访问

const getters = {
  // ? 相当于 computed
  // 返回 user 模块中的 token 值
  token: state => state.user.token
}

export default getters
