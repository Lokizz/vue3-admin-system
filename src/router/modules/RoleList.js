import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/roleList',
  // ! name 需要和获取用户信息接口返回的权限数据保持一致
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import('@/views/role-list'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
