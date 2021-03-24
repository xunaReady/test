import axios from 'axios'
import util from '@/libs/util.js'
import { MessageBox } from 'element-ui'
import router from '../router'
import store from '@/store/index'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 30000
})
// 请求拦截器
service.interceptors.request.use(
  response => {
    const token = util.cookies.get('token')
    if (token) {
      response.headers.Authorization = 'Bearer ' + token
    }
    response.headers['Content-Type'] = 'application/json'
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    return dataAxios
  },
  error => {
    console.log(error, error.response)
    if (error && error.response && error.response.status === 401) {
      MessageBox(`${error.response.data.msg}，请重新登录账号`, '提示', {
        comfirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        // 清除token
        store.dispatch('dataAdmin/account/fedLogOut').then(() => {
          router.push({
            path: '/login'
          })
        })
      })
    }
    return Promise.reject(error)
  }
)
export default service
