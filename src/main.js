import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/commonCss.css'

// 阿里巴巴矢量图标库
import '@/assets/icons'
// 全局组件
import '@/components'

// 预览图片组件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    inline: true, // 启用 inline 模式 默认false
    button: true, // 显示右上角关闭按钮 默认true
    navbar: true, // 显示缩略图导航 默认true
    title: true, // 显示当前图片的标题 默认true
    toolbar: true, // 显示工具栏 默认true
    tooltip: true, // 显示缩放百分比 默认true
    movable: true, // 图片是否可移动 默认true
    zoomable: true, // 图片是否可缩放 默认true
    rotatable: true, // 图片是否可旋转 默认true
    scalable: true, // 图片是否可翻转 默认true
    transition: true, // 使用css3过度 默认true
    fullscreen: true, // 是否全屏 默认true
    keyboard: true, // 是否支持键盘 默认true
    url: 'data-source' // 设置大图片的URL
  }
})

Vue.use(ElementUI)

Vue.prototype.$_ = lodash
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  components: {
    App
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
