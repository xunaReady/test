import Cookies from 'js-cookie'

const cookies = {}

// 存储cookie值
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(name, value, currentCookieSetting)
}

// 拿到cookie值
cookies.get = function (name = 'default') {
  return Cookies.get(name)
}

// 拿到cookie全部的值
cookies.getAll = function () {
  return Cookies.get()
}

// 删除cookie
cookies.remove = function (name = 'default') {
  return Cookies.remove(name)
}

export default cookies
