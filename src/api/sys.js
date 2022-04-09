// * api 请求模块统一封装
// ? 应用自定义的默认请求参数，以及拦截器
import request from '@/utils/request'

/**
 * * 登陆
 * return promise
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
