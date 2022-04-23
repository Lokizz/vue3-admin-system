import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constants/index.js'

export default {
  // ? 注册为独立的模块
  namespaced: true,
  state: () => ({
    isSidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    toggleSidebarOpened(state) {
      state.isSidebarOpened = !state.isSidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加 tags
    addTagsViewList(state, tag) {
      // 不能添加重复的 tag
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * @params {*} {type: 'other' || 'right' || 'index'} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        // 删除当前指定项
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList = [state.tagsViewList[payload.index]]
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
      }
      // 操作完成以后重新保存数据
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
