import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constants/index.js'

export default {
  // ? 注册为独立的模块
  namespaced: true,
  state: () => ({
    isSidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    toggleSidebarOpened(state) {
      state.isSidebarOpened = !state.isSidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  },
  actions: {}
}
