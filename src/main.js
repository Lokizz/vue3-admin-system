import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ? 初始化样式
import '@/styles/index.scss'
// ? 导入所有 svg 图标
import '@/icons'
import SvgIcon from '@/components/SvgIcon'
// ? 导入 permission，以执行前置路由
import './permission'
// ? 导入国际化组件
import i18n from '@/i18n/index.js'

const app = createApp(App)
// ? 将 SvgIcon 注册为全局组件
app.component('svg-icon', SvgIcon)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
