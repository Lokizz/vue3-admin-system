import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/permissionList',
  // ! name 需要和获取用户信息接口返回的权限数据保持一致
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      component: () => import('@/views/permission-list'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
