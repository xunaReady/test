import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    }
  },
  actions: {
    // 设置用户数据
    set({ commit, dispatch }, info) {
      return new Promise(resolve => {
        // store 赋值
        commit('setInfo', info)
        // 持久化
        dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },

    // 从数据库取用户信息
    load(commit, dispatch) {
      return new Promise(resolve => {
        const info = dispatch('db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: setting.user.info,
          user: true
        }, { root: true })
        commit('setInfo', info)
        resolve()
      })
    }
  }
}
