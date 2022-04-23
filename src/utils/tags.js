// * 希望被保存的路由筛选

const whiteList = ['/login', '/404', '/401']

export function isTags(path) {
  return !whiteList.includes(path)
}
