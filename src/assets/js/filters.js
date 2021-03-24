// 通用筛选 单独页面引用后需在filters中注册一下
export function translateFilters (value, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].value === value) {
      return list[i].label
    }
  }
}

// 格式化金额（千分号）
export function moneyFormat (num) {
  if (num) {
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num)) {
      num = '0'
    }
    if (!num) {
      return num
    }
    var sign = (num === (num = Math.abs(num)))
    num = Math.floor(num * 100 + 0.50000000001)
    var cents = num % 100
    num = Math.floor(num / 100).toString()
    if (cents < 10) { cents = '0' + cents }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3))
    }
    return (((sign) ? '' : '-') + num + '.' + cents)
  } else {
    return ''
  }
}

/* 页面引进后用法
import { translateFilters, moneyFormat } from '@/assets/js/filters'
export default {
  filters: {
    translateFilters,
    moneyFormat
  }
}
*/
