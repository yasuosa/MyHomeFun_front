<template>
    <div class="hide-login-container">
        <i style="font-size:80px;" class="iconfont icon-Opencloseguanmen"></i>
        <span>(登录可见)</span>
        <el-button type="text"  @click="login" >立即登录</el-button>

    </div>
</template>
<script>
export default {
    methods:{
        login(){
            this.$emit("login")
        }
    }
}
</script>
<style scoped>
.hide-login-container{
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
}
</style>