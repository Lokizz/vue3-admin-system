import axios from 'axios'
import {
  ElMessage
} from 'element-plus/es'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// ? 使用拦截器配置 imooc 的校验码
service.interceptors.request.use(
  config => {
    // ? 添加 icode (有效期为30天)
    config.headers.icode = '5300E26A2ACF2904'
    // ! 必须返回 config
    return config
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
