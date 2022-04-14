import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import layout from '@/layout'

// ? 私有路由表（权限路由）
const privateRoutes = [{
    path: '/user',
    name: 'user',
    redirect: '/user/manage',
    component: layout,
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [{
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/user-manage'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        name: 'userRole',
        component: () => import('@/views/role-list'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        component: () => import('@/views/permission-list'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info'),
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
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [{
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
      },
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
]

// ? 公开路由表
const publicRoutes = [{
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [{
        // 个人中心
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile'),
        // ! 用以判断是否显示在 menu 菜单中
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        // 404
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        // 401
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // ? 合并公有路由表和私有路由表
  routes: [...privateRoutes, ...publicRoutes]
})

export default router
