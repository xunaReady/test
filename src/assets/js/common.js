
// 使用fileReader  前端接收需设置{responseType: 'arraybuffer'}
export function downloadFileReader (data, filename) {
  var blob = new Blob([data])
  if (typeof window.chrome !== 'undefined') {
    // Chrome
    var link = document.createElement('a')
    link.download = filename
    link.style.display = 'none'
    link.href = window.URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE
    window.navigator.msSaveBlob(blob, filename)
  } else {
    // Firefox
    var file = new File([data], filename)
    window.open(URL.createObjectURL(file))
  }
}

// 结合mixin文件里的calcTableHeightMixins.js使用,可以根据具体项目具体修改对应值
export function calcMainHeight () {
  return window.innerHeight - 83 - 40
}

// 实现base64解码
export function base64Decode (data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var o1; var o2; var o3; var h1; var h2; var h3; var h4; var bits; var i = 0; var ac = 0; var dec = ''
  var tmpArr = []
  if (!data) { return data }
  data += ''
  do {
    h1 = b64.indexOf(data.charAt(i++))
    h2 = b64.indexOf(data.charAt(i++))
    h3 = b64.indexOf(data.charAt(i++))
    h4 = b64.indexOf(data.charAt(i++))
    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4
    o1 = bits >> 16 & 0xff
    o2 = bits >> 8 & 0xff
    o3 = bits & 0xff
    if (h3 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1)
    } else if (h4 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1, o2)
    } else {
      tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
    }
  } while (i < data.length)
  dec = tmpArr.join('')
  dec = utf8Decode(dec)
  return dec
}

// 实现utf8解码
export function utf8Decode (strData) {
  var tmpArr = []; var i = 0; var ac = 0; var c1 = 0; var c2 = 0; var c3 = 0; strData += ''
  while (i < strData.length) {
    c1 = strData.charCodeAt(i)
    if (c1 < 128) {
      tmpArr[ac++] = String.fromCharCode(c1)
      i++
    } else if (c1 > 191 && c1 < 224) {
      c2 = strData.charCodeAt(i + 1)
      tmpArr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = strData.charCodeAt(i + 1)
      c3 = strData.charCodeAt(i + 2)
      tmpArr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return tmpArr.join('')
}

// 格式化数字、金额

export function numberFormat (number, decimals, decPoint, thousandsSep) {
  /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * decPoint：小数点符号
  * thousandsSep：千分位符号
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''
  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

var num = numberFormat(1234567.089, 2, '.', ',')// 1,234,567.09
console.log('numnumnum', num)

// 方法一： 使用递归的方式实现数组、对象的深拷贝
export function deepClone1 (obj) {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone1(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

// 方法二： 通过json对象实现深拷贝
// 通过js的内置对象JSON来进行数组对象的深拷贝,缺点是：无法实现对对象中方法的深拷贝
export function deepClone2 (obj) {
  const newObj = JSON.stringify(obj)
  const objClone = JSON.parse(newObj)
  return objClone
}

// 方法三：通过jquery的extend方法实现深拷贝
export function deepClone3 (array) {
  // const newArray = $.extend(true, [], array)
  // return newArray
}

// 方法四：Object.assign()拷贝
// 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。

// 方法五：lodash函数库实现深拷贝
// lodash.cloneDeep()

// vue实现防抖，使用场景：频繁触发、输入框搜索
export function debounce (func, wait = 1000) {
  let timeout
  return function (event) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, event)
    }, wait)
  }
}

// vue实现节流，使用场景：频繁触发、onrize，onscroll滚动条
export function fnThrottle (fn, delay, duration) {
  let timer = null
  let previous = new Date()
  return function () {
    const now = new Date()
    clearTimeout(timer)
    if (duration && now - previous > duration) {
      fn()
      previous = now
    } else {
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
}
