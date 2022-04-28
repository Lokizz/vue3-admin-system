// * 角色相关接口
import request from '@/utils/request'

// ? 获取所有角色
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}
