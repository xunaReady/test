<template>
    <div class="login-wrapper">
        <div class="login-content">
            <p class="login-title">登 录 管 理 系 统</p>
            <div class="login-form">
                <el-form :model="form" :rules="rules" ref="login">
                    <el-form-item prop="name">
                        <el-input v-model.trim="form.name">
                            <template slot="prepend"
                                class="prefix">用户名
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="textWidth">
                        <el-input v-model.trim="form.password"
                            :type="passwordStatus">
                            <template slot="prepend"
                                class="prefix">密码
                            </template>
                            <i class="el-icon-view el-input__icon" slot="suffix"
                                style="line-height:44px;"
                                v-if="form.password"
                                @click="passwordStatus = 'text'"
                                @mouseleave="passwordStatus = 'password'"></i>
                        </el-input>
                    </el-form-item>
                    <div class="tc">
                        <el-button @click="login">登 录</el-button>
                    </div>
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
      passwordStatus: 'password',
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.$router.push('/home')
        }
      })
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
        width: 30%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .login-title {
            text-align: center;
            color: #ffffff;
            font-size: 32px;
        }
        .login-form {
           padding:70px 40px 20px;
           background-color: #ffffff;
           .textWidth {
                /deep/.el-input-group__prepend {
                    padding: 0 27px;
                }
            }
            /deep/.el-button{
               background-color: #324157;
               color: #ffffff;
            }
        }
    }
}
</style>
