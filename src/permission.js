import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // get token from cookie
import { Message } from 'element-ui'
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// eslint-disable-next-line no-unused-vars
const blackList = [
  "/publish", // 发布页面
  "/userInfo", //财富页面
  "/user/setting",//设置页面
  "/user/setting/postManager",  // 帖子管理
  "/user/setting/baseManager",  // 基础管理
  "/user/setting/commentManager", // 评论管理
  "/user/setting/recycle"  // 回收站
  ]

const hasToken = getToken()

// router.beforeEach(async(to, from, next) => {
//   NProgress.start()
//   // const username = store.state.user.username
//   // if (username) {
//   //   next()
//   // } else {
//   //   // 判断黑名单
//   //   if (blackList.indexOf(to.path) >= 0) {
//   //     // 是
//   //     next('/login')
//   //   } else {
//   //     next()
//   //   }
//   // }
//   next()

//   // const path = to.path

//   NProgress.done()
// })

router.beforeEach(async(to, from, next) => {

  if (to.meta.isShowTitle) {
    document.title = to.meta.title
  }
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login/logout') {
      // if is logged in, redirect to the home page
      next()
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.getName
      // console.log("名字",hasGetUserInfo)
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
     // 黑名单 

     // token过期了 清除vuex
     if( store.getters.getName){
       console.log("清除vuex")
          store.commit("RESET_STATE")
     }
     console.log("开始",to.path)
    if (blackList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log("被拦了",to.path)
      Message({
        message: "请先登录",
        type: 'error',
        duration: 5 * 1000
      })

      // next(`/login?redirect=${to.path}`)
      next({
        path: '/home'
      })
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
