// KVue.js
class KVue {
  // 构造器接收options选项参数
  constructor (option) {
    // 将选项参数赋值给当前对象的选项属性
    this.$options = option
    // 将选项里面的data赋值给当前对象的data
    this.$data = option.data
    // 监听data变化
    this.observe(this.$data)
    new Compile(option.el, this)
    if (option.created) {
      option.created.call(this)
    }
  }

  observe (value) {
    // 判断传进来的参数是不是对象，如果不是就直接返回
    if (!value || typeof value !== 'object') {
      return
    }
    // 参数是对象，则对对象的每一个属性进行遍历
    Object.keys(value).forEach(key => {
      // 响应式传参，传入当前对象，对象属性，属性值
      this.defineReactive(value, key, value[key])
      // 设置代理
      this.proxyData(key)
    })
  }

  proxyData (key) {
    // 对当前的对象进行响应式数据绑定，为每一个key设置代理
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
    // 对传入的属性值进行深层次的遍历，判断是否是对象，如果是则再一次进行监听
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
          dep.notify()
        }
      }
    })
  }
}

// Dep管理若干Watcher,它和key存在一对一的关系
class Dep {
  constructor () {
    // 建立deps依赖的空数组集
    this.deps = []
  }

  addDep (watcher) {
    // 每监听到一个依赖，就将依赖注入deps
    this.deps.push(watcher)
  }

  // 通知更新
  notify () {
    // 提示更新的方法，如果有变化发生，就将deps依赖数组进行遍历更新
    this.deps.forEach(watcher => watcher.updata())
  }
}

// 保存ui中依赖，实现update函数可以更新
class Watcher {
  // 构造函数中传入三个参数：实例，属性名，回调函数
  construct (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    // 将当前实例指向Dep.target
    Dep.target = this
    this.vm[this.key] // 读一次key，触发getter
    Dep.target = null
  }

  update () {
    this.cb.call(this.vm, this.vm[this.key])
  }
}
