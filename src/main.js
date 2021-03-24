import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/commonCss.scss'

// 阿里巴巴矢量图标库
import '@/assets/icons'
// 全局组件
import '@/components'

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
