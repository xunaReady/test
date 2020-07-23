<template>
    <div class="login-wrapper">
        <div class="login-content">
            <p class="login-title">登录管理系统</p>
            <div class="login-form">
                <el-form :model="form" :rules="rules" ref="form" label-width="85px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model.trim="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0">
                        <el-button>登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
    height: 100%;
    width: 100%;
    background-color: #324157;
    position: relative;
    .login-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .login-title {
            text-align: center;
            color: #ffffff;
        }
        .login-form {
           padding: 40px;
           background-color: #ffffff;
        }
    }
}
</style>
