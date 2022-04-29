import layout from '@/layout'

export default {
  path: '/article',
  name: 'articleCreate',
  component: layout,
  redirect: '/article/create',
  meta: {
    title: 'articleCreate',
    icon: 'article-create'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      component: () => import('@/views/article-create'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      component: () => import('@/views/article-create'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
