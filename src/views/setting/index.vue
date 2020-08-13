<template>
    <div class="user-setting-container">
        <div class="user-setting-left">
            <el-menu
            default-active="postManager"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            @select="selectMenu"
            active-text-color="#ffd04b">
             <el-menu-item index="myHome">
                <i class="el-icon-s-custom"></i>
                <span slot="title">我的主页</span>
            </el-menu-item>
            <el-menu-item index="postManager">
                <i class="el-icon-menu"></i>
                <span slot="title">贴子管理</span>
            </el-menu-item>
            <el-menu-item index="baseManager" >
                <i class="el-icon-document"></i>
                <span slot="title">基本设置</span>
            </el-menu-item>
            <el-menu-item index="comment"  >
                <i class="el-icon-chat-line-round"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
             <el-menu-item index="message" disabled >
                <i class="el-icon-headset"></i>
                <span slot="title">我的消息</span>
            </el-menu-item>
            <el-menu-item index="waste">
                <i class="el-icon-receiving"></i>
                <span slot="title">回收站</span>
            </el-menu-item>
            </el-menu>
        </div>
        <div class="user-setting-right">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        selectMenu(key,path){
            if(key === 'myHome'){
                this.$router.push("/user/home/"+this.$store.getters.getUser.userId)
            }
            // 帖子管理
            else if(key === 'postManager'){
                this.$router.push("/user/setting/postManager") 
            }
            // 基础管理
            else if(key === 'baseManager'){
                this.$router.push("/user/setting/baseManager") 
            }
            // 消息
            else if(key === 'message'){
                
            }
            // 评论管理
            else if(key === 'comment'){
                this.$router.push("/user/setting/commentManager")
            }
            // 回收站
            else{
                this.$router.push("/user/setting/recycle") 
            }
        }
    }
}
</script>
<style scoped>
.user-setting-right{
    width: 81%;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    
}
.user-setting-left{
    width: 18%;
    background-color: #545c64;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 600px;
    text-align: left;
}
.user-setting-container{
    width: 100%;
    min-height: 600px;
    /* background: red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>