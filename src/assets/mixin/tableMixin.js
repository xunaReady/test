// table常用选中
export default {
  data () {
    return {
      checkRows: [],
      checkIds: []
    }
  },
  methods: {
    handleSelectionChange (rows) {
      this.checkRows = rows
      this.checkIds = rows.map(val => val.id)
      console.log(this.checkRows, this.checkIds)
    }
  }
}

/* 具体页面引进方法
import tableMixin from '@/assets/mixin/tableMixin'
export default {
    mixins: [tableMixin],
}
*/
