// * 自定义请求的通用设置，以及拦截器
import axios from 'axios'
import {
  ElMessage
} from 'element-plus/es'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// ? 使用拦截器配置 token 和 imooc 等请求时常用的参数s
service.interceptors.request.use(
  config => {
    // ? 统一注入 token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // ? 添加 icode (有效期为30天)
    config.headers.icode = '5300E26A2ACF2904'
    // ! 必须返回 config
    return config
  },
  // ? 请求失败
  err => {
    return Promise.reject(err)
  }
)

// ? 响应拦截器
service.interceptors.response.use(
  // * 请求成功的处理
  response => {
    const {
      success,
      message,
      data
    } = response.data
    // ? 判断当前请求是否成功
    if (success) {
      // ? 成功返回解析后的数据
      return data
    } else {
      // ? 失败（请求成功，业务失败）
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // * 请求失败的处理
  err => {
    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)

export default service
