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
    path: '/sys',
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: ''
    },
    children: [
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '用户管理',
          icon: ''
        }
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: ''
        }
      },
      {
        path: '/resource',
        name: 'Resource',
        meta: {
          title: '资源管理',
          icon: ''
        }
      }
    ]
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
      },
      {
        path: '/imtest',
        name: 'imtest',
        meta: {
          title: 'imtest',
          icon: ''
        }
      }
    ]
  }
]
export {
  menuConfig
}
