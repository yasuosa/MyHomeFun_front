<template>
  <div class="login-contanier">
      <img class="login-logo" src="../../assets/logo-2.jpg">
      <span style="font-size:12px;color:#999">注册</span>
      <div class="login-from">
        <el-form :hide-required-asterisk="true"   :status-icon="true"   :model="user"  :rules="rules" ref="user"  >
          <el-form-item label="你的昵称"  prop="nickname">
            <el-input  v-model="user.nickname"  placeholder="你的昵称"  clearable  ></el-input>
          </el-form-item>
            <el-divider content-position="right"><p style="font-size:12px" >请给自己取个帅气的名字  先! > < </p></el-divider>
          <el-form-item label="邮箱"  prop="userEmail">
              <el-input placeholder="请输入邮箱" v-model="user.userEmail">
                <template slot="append">
                    <el-button @click="getEmail"  :disabled="registerLoading" > {{registerLoading ? "重新获取("+totalTime+")" :"获取验证码"}}</el-button>
                </template>
              </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" >
            <el-input placeholder="请输入验证码" v-model="user.code" clearable ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input type="password" placeholder="请输入密码" v-model="user.password" show-password clearable ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-bottom-container">
        <div>
            <span>已有账户?</span>
            <el-button type="text" @click="toLogin">登录</el-button>
        </div>
      </div>
      <div class="login-login">
        <el-button type="primary" @click="regitser"><span>快速注册</span></el-button>
      </div>
  </div>
</template>
<script>
import userApi from '@/api/user'
export default {
   data() {
     var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)) {
          callback(new Error('邮箱格式不正确'));
        }else{
          callback()
        }
      };
      return {
        registerLoading:false,
        totalTime:60,
        user:{
          nickname:"",
          code:"",
          userEmail:'',
          password:""
        },
        rules: {
          userEmail: [
            {  validator: validateEmail,trigger: 'blur' }
          ],
          nickname: [
            { required: true,  message: '请输入用户昵称',trigger: 'blur' }
          ],
          code: [
            { required: true,  message: '请输入验证码',trigger: 'blur' },
          ],
          password: [
            { required: true,  message: '请输入用户密码',trigger: 'blur' },
            { min: 6, message: '密码长度最少6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getEmail(){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(this.user.userEmail.trim().length === 0){
          this.$message.error("请填写邮箱")
        }else if(!reg.test(this.user.userEmail)){
          this.$message.error("请填写正确的邮箱格式")
        }else {
          this.registerLoading=true
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
              window.clearInterval(clock)
              this.content = '重新发送验证码'
              this.totalTime = 60
              this.registerLoading=false
              }
          },1000)
          userApi.sendEmailCode(this.user.userEmail).then(res=>{
           console.log(res.msg)
          })
        }
      },
      toLogin(){
        this.$emit("openLogin")
      },
      regitser(){
        this.$refs['user'].validate((valid,object) => {
          if (valid) {
            userApi.registerUser(this.user).then(res =>{
              this.$message.success(res.msg)
              this.$emit("openLogin",this.user)
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
  justify-content: center;
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
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;  
  /* height: 80px; */
}
</style>