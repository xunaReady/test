import Vue from 'vue'
const SvgIcon = () => import('./SvgIcon')
const awesomeIcon = () => import('./awesome-icon')

Vue.component('svg-icon', SvgIcon)
Vue.component('awesome-icon', awesomeIcon)
