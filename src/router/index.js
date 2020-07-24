import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('@/views/page/Home.vue')
const About = () => import('@/views/page/About.vue')
const Video = () => import('@/views/page/videoPlayer.vue')
const Doc = () => import('@/views/page/viewDoc.vue')
const Picture = () => import('@/views/page/viewPicture.vue')
const Login = () => import('@/views/login/login.vue')
const Index = () => import('@/views/index/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  }
]

const router = new VueRouter({
  routes
})

export default router
