const menuConfig = [
  {
    path: '/index',
    name: 'Index',
    meta: {
      title: '首页',
      icon: ''
    }
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '练习demo',
      icon: ''
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: 'home',
          icon: ''
        }
      },
      {
        path: '/about',
        name: 'About',
        meta: {
          title: 'about',
          icon: ''
        }
      },
      {
        path: '/videoPlayer',
        name: 'Video',
        meta: {
          title: 'videoPlayer',
          icon: ''
        }
      },
      {
        path: '/viewDoc',
        name: 'Doc',
        meta: {
          title: 'viewDoc',
          icon: ''
        }
      },
      {
        path: '/viewPicture',
        name: 'Picture',
        meta: {
          title: 'viewPicture',
          icon: ''
        }
      }
    ]
  }
]
export {
  menuConfig
}
