import request from '@/utils/request'

// ? 用于获取分页数据
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

// ? 获取用户详情
export const userDetail = (id) => {
  return request({
    url: '/user-manage/detail/' + id
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

// ? 删除用户
export const deleteUser = (id) => {
  return request({
    url: '/user-manage/delete/' + id
  })
}

// ? 获取所有用户
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
