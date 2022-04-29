import print from 'vue3-print-nb'
import permission from './permission'

export default (app) => {
  // 完成全局注册
  app.use(print)
  // 注册自定义指令
  app.directive('permission', permission)
}
