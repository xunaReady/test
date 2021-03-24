import request from '@/axios/axios.js'

export function loginApi(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function queryUserApi(data) {
  return request({
    url: '/api/user/getUser',
    method: 'get',
    params: data
  })
}

export function addUserApi(data) {
  return request({
    url: 'post',
    method: '/api/user/addUser',
    data
  })
}
