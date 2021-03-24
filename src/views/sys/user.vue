<template>
  <div id="user">
    <div class="title">
      用户管理
    </div>
    <el-form :model="userSearch" label-width="60px" label-position="left" inline>
      <el-form-item label="用户名">
        <el-input
          v-model="userSearch.username"
          clearable
          style="width: 200px;"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="queryUser">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <div class="tr">
      <el-button type="success" @click="addUser()">
        新增
      </el-button>
    </div>
    <el-table :data="userList" border>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="email" label="邮件" />
      <el-table-column prop="mobile" label="手机" />
      <el-table-column prop="remark" label="备注" />
    </el-table>

    <user-form ref="userForm" />
  </div>
</template>
<script>
import { queryUserApi } from '@/assets/api/user.js'
const userForm = () => import('./user-form')
export default ({
  name: 'User',
  components: {
    userForm
  },
  data() {
    return {
      userSearch: {
        username: ''
      },
      userList: []
    }
  },
  created() {
    this.queryUser()
  },
  methods: {
    queryUser() {
      queryUserApi(this.userSearch).then(res => {
        if (res.code === 1) {
          this.userList = res.result
        } else {
          this.userList = []
        }
      })
    },

    addUser() {
      this.$refs.userForm.dialogVisible = true
      this.$refs.userForm.dialogTitle = '新增用户'
    }
  }
})
</script>
<style lang="scss" scoped>
#user{
}
</style>
