// * 用于定义全局过滤器
import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'

// ? 转换时间戳为指定格式
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// ? 转换为相对时间
dayjs.extend(rt)
function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

// ? 注册全局属性
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
