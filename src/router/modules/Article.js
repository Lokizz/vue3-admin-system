import layout from '@/layout'

export default {
  path: '/article',
  name: 'articleRanking',
  component: layout,
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      name: 'articleRanking',
      component: () => import('@/views/article-ranking'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: () => import('@/views/article-detail'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
