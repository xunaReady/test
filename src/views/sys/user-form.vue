<template>
  <div id="user-form">
    <el-dialog :visible.sync="dialogVisible" center :title="dialogTitle">
      <el-form :model="userForm">
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model.trim="userForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="userForm.sex">
            <el-radio :label="1">
              男
            </el-radio>
            <el-radio :label="2">
              女
            </el-radio>
          </el-radio-group>
          <el-radio />
        </el-form-item>
        <el-form-item prop="email" label="邮件">
          <el-input v-model.trim="userForm.email" placeholder="请输入邮 件" clearable />
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model.trim="userForm.mobile" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model.trim="userForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserForm',
  data() {
    return {
      userForm: {
        username: '',
        sex: 1,
        email: '',
        mobile: '',
        remark: ''
      },
      dialogVisible: false,
      dialogTitle: ''
    }
  },
  methods: {

  }

}
</script>
<style lang="scss" scoped>
#user-form{

}
</style>
