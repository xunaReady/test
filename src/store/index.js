import Vue from 'vue'
import Vuex from 'vuex'

import dataAdmin from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: { dataAdmin }
})
