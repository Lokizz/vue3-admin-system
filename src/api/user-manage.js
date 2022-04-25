import request from '@/utils/request'

// ? 用于获取分页数据
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    data
  })
}
