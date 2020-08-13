<template>
  <div class="login-contanier">
      <img class="login-logo" src="../../assets/logo-2.jpg">
      <span style="font-size:12px;color:#999">登录</span>
      <div class="login-from">
        <el-form :hide-required-asterisk="true"   :status-icon="true"   :model="user"  :rules="rules" ref="user"  >
          <el-form-item label="邮箱"  prop="username">
            <el-input  v-model="user.username"  placeholder="请输入邮箱"  clearable  ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" placeholder="请选择密码" v-model="user.password" show-password clearable ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-bottom-container">
        <el-button type="text">忘记密码?</el-button>
        <div>
            <span>新用户?</span>
            <el-button type="text" @click="toRegister">注册</el-button>
        </div>
      </div>
      <div class="login-login">
        <el-button type="primary" @click="login"><span>快速登录</span></el-button>
      </div>
      <div class="login-footer">
          <el-divider><span style="color:#999;font-size:12px">社交登录</span></el-divider>
          <div class="login-other">
              <img class="login-other-icon" src="../../assets/icons/qq.png">
              <img class="login-other-icon" src="../../assets/icons/github.png">
              <img class="login-other-icon" src="../../assets/icons/gitee.png">
              <img class="login-other-icon" src="../../assets/icons/csdn.png">
          </div>
      </div>
  </div>
</template>
<script>
import userApi from '@/api/user'
export default {
   data() {
      return {
        user:{
          username:"",
          password:""
        },
        rules: {
          username: [
            { required: true,  message: '请输入用户邮箱',trigger: 'blur' }
          ],
          password: [
            { required: true,  message: '请输入用户密码',trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      toRegister(){
        this.$emit("openRegister")
      },
      login(){
        this.$refs['user'].validate((valid,object) => {
          if (valid) {
            userApi.login(this.user).then(async res =>{
              this.$message.success(res.msg)
              this.$store.commit('SET_TOKEN', res.data.token)
              await this.$store.dispatch('getInfo')
              this.$emit('refreshPage')
            })
          } else {
            return false;
          }
        });
      }
    }
}
</script>
<style scoped>
/deep/ .el-form-item__error{
  right: 0;
  left: none;
}
/deep/ .el-form-item__label{
  font-size: 12px !important;
  line-height: normal;
}

.login-other-icon{
  width: 30px;
  height: 30px;
}
.login-other{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  cursor: pointer;
}

.login-footer{
    width: 100%;
  color: #999;
  font-size: 10px;
}
.el-button--primary{
  width: 100% !important;
}
.login-login{
  width: 100%;
}
.el-form-item{
  margin: 0px 0px 5px 0px  !important;
}
.login-bottom-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.login-from{
  width: 100%;
  margin-top: 5px;
}
.login-contanier{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background: red; */
  justify-content: center;
  align-items: center;
}
.login-logo{
  width: 100% !important;
  /* height: 80px; */
}
</style>