class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      // 1、$el中的内容都搬家到一个fragment，提高操作效率
      this.$fragment = this.node2Fragement(this.$el)
      console.log(this.$fragment)
      // 2、编译fragment
      this.compile(this.$fragment)
      // 3、将编译结果追加到宿主中
      this.$el.appendChild(this.$fragment)
    }
  }

  // 遍历el,将里面的内容搬到新创建的fragment
  node2Fragement (el) {
    const fragment = document.createDocumentFragment()
    let child
    // 判断当前文档还有没有元素，有的话会一直执行
    while ((child = el.firstChild)) {
      // appendChild会将子元素移入fragment
      fragment.appendChild(child)
    }
    return fragment
  }

  compile (el) {
    // 遍历el
    const childNodes = el.childNodes
    console.log(childNodes)
    // 对当前实例的每一个子节点进行遍历
    Array.from(childNodes).forEach(node => {
      // 判断当前元素类型
      if (this.isElement(node)) {
        console.log('编译元素' + node)
        // 判断是否是带有指令k-或者@的方法
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        // 判断是否是带有{{}}的元素，是的话进行文本编译
        this.compileText(node)
      }

      // 如果当前元素还有子节点，则对其进行再次编译
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 判断当前元素类型的方法
  isElement (node) {
    return node.nodeType === 1
  }

  // 判断是否是带{{}}的元素的方法
  isInterpolation (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 判断指令的方法并进行对应指令操作
  compileElement (node) {
    // 将当前节点的所有属性存储在nodeAttr上
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 对节点元素属性进行遍历，属性名称为attrName，属性值为exp
      const attrName = attr.name
      const exp = attr.value
      console.log(attrName, exp)
      if (attrName.indexOf('k-') === 0) {
        const dir = attrName.substring(2)
        // 如果节点属性名称是以k-开头，则执行k-后面的指令名称的方法
        this[dir] && this[dir](node, this.$vm, exp)
      } else if (attrName.indexOf('@') === 0) {
        // 如果节点属性名称是以@开头，则执行@后面的指令名称的方法
        const eventName = attrName.substring(1)
        this.eventHandle(node, this.$vm, exp, eventName)
      }
    })
  }

  compileText (node) {
    const exp = RegExp.$1
    // 进行更新，传入当前节点，当前实例对象，双括号中的内容
    this.update(node, this.$vm, exp, 'text')
  }

  // 对方法进行抽离，传入节点、实例、内容以及类型
  update (node, vm, exp, dir) {
    // 根据传入的类型进行组合方法名
    const fn = this[dir + 'Updator']
    // 如果方法存在则执行方法，传入当前节点以及内容
    fn && fn(node, vm[exp])

    // 监听当前实例上这个节点的变化，如果改变了，重新执行更新方法
    new Watcher(vm, exp, function () {
      fn && fn(node, vm[exp])
    })
  }

  // k-text文本更新
  text (node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  // 双向数据绑定
  model (node, vm, exp) {
    this.update(node, vm, exp, 'model')
    node.addEventListener('input', e => {
      vm[exp] = e.target.value
    })
  }

  // k-html
  html (node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }

  // text文本更新方法
  textUpdator (node, value) {
    node.textContent = value
  }

  // html更新方法
  htmlUpdator (node, value) {
    node.innerHTML = value
  }

  // model更新方法
  modelUpdator (node, value) {
    node.value = value
  }

  eventHandle (node, vm, exp, eventName) {
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (eventName && fn) {
      node.addEventListener(eventName, fn.bind(vm))
    }
  }
}
