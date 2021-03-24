import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import util from '@/libs/util.js'

// 路由懒加载
const Home = () => import('@/views/page/Home.vue')
const About = () => import('@/views/page/About.vue')
const Video = () => import('@/views/page/videoPlayer.vue')
const Doc = () => import('@/views/page/viewDoc.vue')
const Picture = () => import('@/views/page/viewPicture.vue')
const Login = () => import('@/views/login/login.vue')
const Index = () => import('@/views/index/index.vue')
const User = () => import('@/views/sys/user.vue')
const Role = () => import('@/views/sys/role.vue')
const Resource = () => import('@/views/sys/resource.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/videoPlayer',
        name: 'Video',
        component: Video
      },
      {
        path: '/viewDoc',
        name: 'Doc',
        component: Doc
      },
      {
        path: '/viewPicture',
        name: 'Picture',
        component: Picture
      }
    ]
  },
  {
    path: '/sys',
    name: 'Sys',
    component: Index,
    children: [
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/role',
        name: 'Role',
        component: Role
      },
      {
        path: '/resource',
        name: 'Resource',
        component: Resource
      }
    ]
  }
]

// 免校验token白名单
const whiteList = ['/login']

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.length === 0 || to.matched.some(r => r.meta.requiresAuth)) {
    const token = util.cookies.get('token')
    if (token) {
      if (to.path === '/login') {
        next({ path: '/login' })
      } else {
        next()
        // // 判断store是否存储用户角色信息，如果没有注销重新登录
        // if (Object.keys(store.state).length === 0 || Object.keys(store.state.dataAdmin.user.info).length === 0) {
        //   await store.dispatch('dataAdmin/account/getUserInfo').then(() => {
        //     // 跳转
        //     next({ ...to, replace: true })
        //   }).catch(() => {
        //     store.dispatch('dataAdmin/account/feaLogout').then(() => {
        //       next({
        //         path: '/login'
        //       })
        //     })
        //   })
        // } else {
        //   next()
        // }
      }
    } else {
      if (whiteList.indexOf(to.path) > -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        // 没有登录的时候跳转到登录界面
        next({ name: 'login' })
      }
    }
  } else {
    next()
  }
})

export default router
