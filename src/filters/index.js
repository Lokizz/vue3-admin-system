// * 用于定义全局属性
import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
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
