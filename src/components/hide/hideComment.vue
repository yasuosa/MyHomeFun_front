<template>
    <div class="hide-login-container">
        <i style="font-size: 100px;" class="iconfont icon-meiyoupinglun"></i>
        <span>【评论可见】</span>
        <el-button type="text" @click="commit">立即评论</el-button>

    </div>
</template>
<script>
export default {
    methods:{
        commit(){
            const name = this.$store.getters.getName
            if(name === ""){
                this.$notify({
                    title: '提示',
                    message: '请先登录哦！！',
                    offset: 100
                });
                 this.$emit("login")
            }
            this.$emit("comment")
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