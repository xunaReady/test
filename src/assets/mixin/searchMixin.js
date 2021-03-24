// 搜索常用方法
export default {
  data () {
    return {
      searchForm: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    listQuery (page) {
      this.searchForm.pageNo = page
      this._listQuery()
    },
    handleSizeChange (size) {
      this.searchForm.pageSize = size
      this.listQuery(1)
    },
    handleCurrentChange (page) {
      this.listQuery(page)
    }
  }
}

/* 具体页面引进用法
import searchMixin from '@/assets/mixin/searchMixin'
export default {
    mixins: [searchMixin],
}
*/
