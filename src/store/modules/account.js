import util from '@/libs/util.js'

export default {
  namespaced: true,
  actions: {
    fedLogOut({ commit, dispatch }) {
      debugger
      return new Promise(resolve => {
        util.cookies.remove('token')
        resolve()
      })
    }
  }
}
