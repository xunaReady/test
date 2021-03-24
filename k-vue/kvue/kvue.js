class KVue {
  constructor (option) {
    this.$options = option
    this.$data = option.data
    this.observe(this.$data)
    new Compile(option.el, this)
    if (option.created) {
      option.created.call(this)
    }
  }

  observe (value) {
    if (!value || typeof value !== 'object') {
      return
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      this.proxyData(key)
    })
  }

  proxyData (key) {
    Object.defineProperty(this, key, {
      get () {
        return this.$data[key]
      },
      set (newVal) {
        this.$data[key] = newVal
      }
    })
  }

  defineReactive (obj, key, val) {
    this.observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get () {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set (newVal) {
        if (val !== newVal) {
          val = newVal
          // console.log(`${key}属性更新了`)
          dep.notify()
        }
      }
    })
  }
}
// Dep管理若干Watcher，它和key存在一对一的关系
class Dep {
  constructor () {
  // 建立deps依赖的空数组集
    this.deps = []
  }

  addDep (watcher) {
  // 每监听到一个依赖，就将依赖传入deps
    this.deps.push(watcher)
  }

  notify () {
  // 提示更新的方法，如果有变化发生，就将deps依赖数组进行遍历更新
    this.deps.forEach(dep => dep.updata())
  }
}
// 保存ui中依赖，实现update函数可以更新
class Watcher {
// 构造函数中传入三个参数：实例，属性名，回调函数
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前实例指向Dep.target
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  updata () {
    console.log(`${this.key}更新了,${this.vm}`)
    // 回调函数的更新
    this.cb.call(this.vm, this.vm[this.key])
  }
}
