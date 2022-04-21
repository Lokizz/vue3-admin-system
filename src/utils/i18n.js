// * 转换 title 为 i18n 对应的数据源映射
import i18n from '@/i18n'
import store from '@/store'

export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

// ? 监听语言变化，同时执行指定的回调函数
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
