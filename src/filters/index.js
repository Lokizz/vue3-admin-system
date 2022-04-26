// * 用于定义全局过滤器
import dayjs from 'dayjs'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// ? 注册全局属性
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
