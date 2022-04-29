import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  // ! name 需要和获取用户信息接口返回的权限数据保持一致
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      component: () => import('@/views/user-info'),
      name: 'userInfo',
      // ! 用以接收组件的 props 作为 route.params
      props: true,
      // 不会展示在 menu 菜单中
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
