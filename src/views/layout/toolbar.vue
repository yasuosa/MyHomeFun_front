<template>
<div>
        
  <el-menu  
      class="el-menu-vertical-demo" :collapse="true">
    <el-menu-item index="1"  :disabled="!isLogin">
      <router-link :to="'/user/home/'+userId">
        <i style="color:#ff6700;font-size:24px" class="iconfont icon-huiyuan"></i>
        <span slot="title">个人中心</span>
      </router-link>
    </el-menu-item>

    <el-menu-item index="2">
      <div @click="openSignDialog">
          <i style="font-size:24px;color:#409EFF" class="iconfont icon-qiandao"></i>
          <span slot="title">今日签到</span>
      </div>
    </el-menu-item>


    <el-menu-item index="3" disabled>
      <i  style="font-size:24px;color:green" class="iconfont icon-youqu"></i>
      <span slot="title">消息中心</span>
    </el-menu-item>
    <el-menu-item index="4">
      <div style="margin-left:-12px">
        <search />
      </div>
    </el-menu-item>    
    <el-backtop  :right="20"></el-backtop>
</el-menu>



  <!-- 签到对话框 -->
  <el-dialog
  :visible.sync="signDialog"
  width="22%"
  top="20vh"
  :append-to-body="true">
  <el-button v-loading="loading" :disabled="!isLogin" style="width:100%;color:#eb0c0c" icon="iconfont icon-jingpin-" @click="sign">{{signText}}</el-button>
  <!-- <div style="background-color:#ccc;width:100%;height:1px;margin:10px 0"></div> -->


  <el-menu style="margin-top:10px;" @select="handleSelectSign" :default-active="'1'" class="el-menu-demo" mode="horizontal" >
    <el-menu-item index="1">今日签到</el-menu-item>
    <el-menu-item index="2" >连续签到</el-menu-item>
        <today-sign ref="todaySign" v-if="isShowSignType" />
        <continue-sign  v-else />
  </el-menu>
  
</el-dialog>
</div>
  
</template>

<style scoped>
/deep/ .el-dialog__body{
  padding: 30px 20px 10px  20px;
}
/deep/ .el-button{
  border-radius: 20px;
}
/deep/ .el-dialog__headerbtn{
  top: 10px;
  right: 10px;
}
/deep/ .el-menu--horizontal>.el-menu-item{
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  width: 50%;
  text-align: center;
}
/deep/ .el-menu--horizontal>.el-menu-item.is-active{
  border-bottom: 5px dashed #eb0c0c;
}
/deep/ .el-dialog__header{
  padding: 0;
}
/deep/ .el-menu--vertical{
    top: 100 !important;
}
/deep/ .el-dialog{
  border-radius: 20px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
import signApi from '@/api/sign'
import search from '@/components/search'
import todaySign from "./sign/todaySign"
import continueSign from "./sign/continueSign"
  export default {
    components:{
      search,
      todaySign,
      continueSign
    },
    data() {
      return {
        isLogin:true,
        signText:"签到",
        loading:false,
        signDialog:false,
        isShowSignType:true,
        userId:this.$store.getters.getUser.userId
      };
    },
    created(){
      this.isLogin= (this.userId !== undefined)
      if(this.isLogin){
        this.signText="签到"
      }else{
        this.signText="请先登录"
      }
    },
    methods: {
      sign(){
        this.loading=true
        signApi.sign().then(res =>{
          
          this.$message.success(res.msg)
          this.loading=false
          this.$refs.todaySign.getSignTodayList()
        }).catch(error =>{
          console.log(error)
          this.loading=false
          this.signText=error.message
        })
      },
      openSignDialog(){
        this.signDialog=true
      },

      handleSelectSign(key, keyPath){
        this.isShowSignType= (key ==='1')
      }
       
    }
    
  }
</script>