
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
