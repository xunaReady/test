export default {
  mounted () {
    this.initCalcHeight()
  },
  watch: {
    windowInner () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.timer = false
        this.tableHeight = this.calcTableHeight()
      }, 200)
    }
  },
  data () {
    return {
      timer: false,
      windowInner: '',
      tableHeight: 0
    }
  },
  methods: {
    initCalcHeight () {
      const that = this
      setTimeout(() => {
        window.onresize = function () {
          that.windowInner = window.innerHeight + '-' + window.innerWidth
        }
        this.tableHeight = this.calcTableHeight()
      }, 100)
    }
  }
}

/* 以下为引用界面具体用法
import { calcMainHeight } from '@/assets/js/common'
import calcTableHeightMixins from '@/assets/mixin/calcTableHeightMixins'
export default {
  mixins: [calcTableHeightMixins],
  methods: {
    // 计算列表高度
    calcTableHeight () {
      const paginationWrapperHeight = 35
      const functWrapper = 50
      return calcMainHeight() - paginationWrapperHeight - functWrapper
    }
  }
}
*/
