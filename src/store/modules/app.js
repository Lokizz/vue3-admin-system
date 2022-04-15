export default {
  // ? 注册为独立的模块
  namespaced: true,
  state: () => ({
    isSidebarOpened: true
  }),
  mutations: {
    toggleSidebarOpened(state) {
      state.isSidebarOpened = !state.isSidebarOpened
    }
  },
  actions: {}
}
