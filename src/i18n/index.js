// * 创建所有语言环境的数据源
import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
// ? 导入语言包
import zhLocale from './lang/zh.js'
import enLocale from './lang/en.js'
import store from '@/store'

// ? 创建数据源
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getLanguage () {
  return store && store.getters && store.getters.language
}

// ? 初始化 i18n 实例
const i18n = createI18n({
  // ! 指定使用 Composition API
  legacy: false,
  // 全局使用 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
