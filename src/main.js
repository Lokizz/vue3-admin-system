import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ? 初始化样式
import '@/styles/index.scss'
// ? 所有 svg 图标
import '@/icons'
import SvgIcon from '@/components/SvgIcon'
// ? 导入 permission，以执行前置路由
import './permission'
// ? 国际化组件
import i18n from '@/i18n/index.js'
// ? 全局过滤器
import installFilter from '@/filters'
// ? 打印组件
import installDirective from '@/directives'

const app = createApp(App)
// ? 注册全局属性
installFilter(app)
installDirective(app)
// ? 将 SvgIcon 注册为全局组件
app.component('svg-icon', SvgIcon)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
