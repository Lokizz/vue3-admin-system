import request from '@/utils/request'

// ? 用于获取分页数据
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

// ? 批量导入用户
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
