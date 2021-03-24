<template>
  <div class="login-wrapper">
    <div class="login-content">
      <p class="login-title">
        登 录 管 理 系 统
      </p>
      <div class="login-form">
        <el-form ref="login" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model.trim="form.username">
              <template
                slot="prepend"
                class="prefix"
              >
                用户名
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="textWidth">
            <el-input
              v-model.trim="form.password"
              :type="passwordStatus"
            >
              <template
                slot="prepend"
                class="prefix"
              >
                密码
              </template>
              <i
                v-if="form.password"
                slot="suffix"
                class="el-icon-view el-input__icon"
                style="line-height:44px;"
                @click="passwordStatus = 'text'"
                @mouseleave="passwordStatus = 'password'"
              />
            </el-input>
          </el-form-item>
          <div class="tc">
            <el-button @click="login">
              登 录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { loginApi } from '@/assets/api/user.js'
import util from '@/libs/util.js'
export default {
  name: 'Login',
  data() {
    return {
      passwordStatus: 'password',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.login.validate(valid => {
        if (valid) {
          loginApi(this.form).then(async res => {
            console.log(res)
            if (res.code === 1) {
              await util.cookies.set('token', res.result.token)
              this.$router.push({ path: '/index' })
            }
          })
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
