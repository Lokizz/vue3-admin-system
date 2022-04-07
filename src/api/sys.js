import request from '@/utils/request'

/**
 * 登陆
 * return promise
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
