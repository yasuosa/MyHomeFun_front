import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/layout/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Index',
    component: Index,
    children:[
      {
        path: '/404',
        name: '404',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/error/index-404.vue'),
        meta:{
          title:"404",
          isShowTitle:true
        }
      },
      {
        path: '/home',
        name: '首页',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
        meta:{
          title: '我的趣屋',
          isShowTitle:true
        }
      },
      {
        path: '/code',
        name: '编程之家',
        component: () => import(/* webpackChunkName: "about" */ '../views/code/index.vue'),
        meta:{
          title: '编程之家',
          isShowTitle:true
        }
      },
      {
        path: '/ky',
        name: '考研部落',
        component: () => import(/* webpackChunkName: "about" */ '../views/ky/index.vue'),
        meta:{
          title: '考研部落',
          isShowTitle:true
        }
      },
      {
        path: '/zsb',
        name: '专升本部落',
        component: () => import(/* webpackChunkName: "about" */ '../views/zsb/index.vue'),
        meta:{
          title: '专升本部落',
          isShowTitle:true
        }
      },
      {
        path: '/resource',
        name: 'Resource',
        component: () => import(/* webpackChunkName: "about" */ '../views/resource/index.vue'),
        meta:{
          title: '全站资源',
          isShowTitle:true
        }
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import(/* webpackChunkName: "about" */ '../views/tags/index.vue'),
        meta:{
          title: '全部标签',
          isShowTitle:true
        }
      },
      {
        path: '/xy',
        name: 'Xy',
        component: () => import(/* webpackChunkName: "about" */ '../views/xianyan/index.vue'),
        meta:{
          title: '闲言碎语',
          isShowTitle:true
        }
      },
      {
        path: '/vip',
        name: 'Vip',
        component: () => import(/* webpackChunkName: "about" */ '../views/goods/index.vue'),
        meta:{
          title: '我是要成为Vip的男人',
          isShowTitle:true
        }
      },
      {
        path: '/post/:postId',
        name: 'Post',
        component: () => import(/* webpackChunkName: "about" */ '../views/post/index.vue'),
        meta:{
          isShowTitle:false
        }
      },
      {
        path: '/notice/:noticeId',
        name: 'Notice',
        component: () => import(/* webpackChunkName: "about" */ '../views/notice/index.vue'),
        meta:{
          isShowTitle:false
        }
      },
      {
        path: '/search',
        name: 'PostTag',
        component: () => import(/* webpackChunkName: "about" */ '../views/search/index.vue'),
        meta:{
          isShowTitle:false
        }
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import(/* webpackChunkName: "about" */ '../views/publish/index.vue'),
        meta:{
          title:"发布帖子",
          isShowTitle:true
        }
      },
      {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import(/* webpackChunkName: "about" */ '../views/userInfo/index.vue'),
        meta:{
          title:"我的财富",
          isShowTitle:true
        }
      },
      {
        path: '/user/home/:userId',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/home/index.vue'),
        meta:{
          title:"个人主页",
          isShowTitle:false
        }
      },
      {
        path: '/user/setting',
        name: 'UserSetting',
        redirect: '/user/setting/postManager',
        component: () => import(/* webpackChunkName: "about" */ '../views/setting/index.vue'),
        children:[
          {
            path: 'postManager',
            name: 'PostManager',
            component: () => import(/* webpackChunkName: "about" */ '../views/setting/post/index.vue'),
            meta:{
              title:"帖子管理",
              isShowTitle:true
            }
          },
          {
            path: 'baseManager',
            name: 'BaseManager',
            component: () => import(/* webpackChunkName: "about" */ '../views/setting/base/index.vue'),
            meta:{
              title:"基础设置",
              isShowTitle:true
            }
          },
          {
            path: 'recycle',
            name: 'Recycle',
            component: () => import(/* webpackChunkName: "about" */ '../views/setting/recycle/index.vue'),
            meta:{
              title:"回收站",
              isShowTitle:true
            }
          },
          {
            path: 'commentManager',
            name: 'CommentManager',
            component: () => import(/* webpackChunkName: "about" */ '../views/setting/comment/index.vue'),
            meta:{
              title:"评论管理",
              isShowTitle:true
            }
          }
          
        ]
      }
      
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
