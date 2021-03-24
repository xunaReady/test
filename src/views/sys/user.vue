<template>
    <div>
        <div>用户管理</div>
        <el-button @click="queryUser">查询</el-button>
        <el-table :data="userList">
            <el-table-column prop="username" label="用户名"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import $http from '@/axios/axios.js'
export default ({
  name: 'user',
  data () {
    return {
      userList: []
    }
  },
  methods: {
    queryUser () {
      $http.get('/api/user/getUser').then(res => {
        console.log(res)
        if (res.code === 1) {
          this.userList = res.result
        }
      })
    }

  },
  created () {

  }
})
</script>
