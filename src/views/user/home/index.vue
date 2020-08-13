<template>
    <div class="user-home-container">
        <!-- 用户资料 -->
        <div class="user-detail-container">
            <!-- 头像 -->
             <div class="user-detail-header">
                <el-avatar v-if="userHome.headerUrl" :size="120" :src="userHome.headerUrl"></el-avatar>
                <el-avatar v-else :size="120">{{userHome.nickname}}</el-avatar>
            </div>
            <!-- 昵称加性别 -->
            <div class="user-name-sex-container">
                <span style="margin-right:5px">{{userHome.nickname}}</span>
                <i  v-if="userHome.sex=== 1" style="color:#81a5f5;font-size:18px;" class="iconfont icon-icon2" ></i>
                <i  v-else style="color:#81a5f5;font-size:18px;" class="iconfont icon-icon" ></i>
            </div>
            <!-- 积分+ 时间 +地址 -->
            <div class="user-points-time-address-container">
                <div class="user-points-container">
                    <img style="width:20px;height:20px" src="../../../assets/points.png" />
                    <span style="color:#999;margin-left:3px">{{userHome.points}}</span>
                    <span style="color:#FF7200;margin-left:3px">积分</span>
                </div>
                <div class="user-register-time-container">
                    <i style="margin-right:2px" class="el-icon-time" ></i>
                    <span>{{userHome.createdTime}} 加入</span>
                </div>
                <div class="user-address-container">
                    <i class="el-icon-map-location" ></i>
                    <span>来自({{userHome.address}})</span>
                </div>
            </div>
            <!-- 简介 -->
            <span style="margin-top:5px;color:#999;font-size:14px">{{userHome.sign === null ? "这个人很懒啥也没有" :userHome.sign}}</span>

            <div class="user-detail-deep-container">
                  <el-button >关于作者</el-button>
                  <el-button type="danger" disabled>发起会话</el-button>
            </div>
        </div>

        <!-- 他的文章 + 他的回复 -->
        <div class="user-post-comment-container">
            <!-- 他的文章 -->
            <div class="user-post-container">
                <span style="padding:10px 0px 10px 10px">【{{userHome.nickname}}】最近发布的文章</span>
                <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                <div v-if="userHome.postList.length !==0" class="post-list">
                    <div v-for="(item,index) in userHome.postList" :key="index" >
                        <div class="user-post-item-container">
                            <div class="user-post-item-postTitle"><router-link :to="'/post/'+item.postId">{{item.postTitle}}</router-link></div>
                            <span style="color:#999;font-size:12px">{{item.createdTime | createdTimeFormat}}</span>
                            <span style="color:#999;font-size:12px;width:100px;text-align:right">{{item.readNum}}阅读/{{item.commentNum}}回复</span>
                        </div>
                        <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                    </div>
                </div>
                <span v-else style="color:#999;text-align:center;margin-top:50px">最近没有发表任何帖子</span>
            </div>

            <!-- 他的回复 -->
            <div class="user-commengt-container">
                    <span style="padding:10px 0px 10px 10px">【{{userHome.nickname}}】最近的回复</span>
                    <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                    <div v-if="userHome.commentList.length !==0">
                        <div class="comment-item-container" v-for="(item,index) in userHome.commentList" :key="index">
                            <div>
                                <span>{{item.createdTime | createdTimeFormat}}</span>在
                                <router-link :to="'/post/'+item.postId"> {{item.postTitle}}</router-link>中回答:
                            </div>
                            <div class="comment-content-container">
                                <span v-html="item.comment"></span>
                            </div>
                        </div>
                    </div>
                    <span v-else style="color:#999;text-align:center;margin-top:50px">最近没有回复任何帖子</span>
                
            </div>
        </div>
        
    </div>
</template>
<script>
import userApi from '@/api/user'
import {parseTime,formatTime} from "@/utils/index"
export default {
    data(){
        return {
            userHome:{
                postList:[],
                commentList:[]
            },
            userId:this.$route.params.userId
        }
    },
    created(){
        console.log(this.$route)
        this.getUserHomeData()
    },
    methods:{
        getUserHomeData(){
            userApi.getUserHome(this.userId).then(res =>{
                this.userHome=res.data
                window.document.title="个人主页【"+this.userHome.nickname+"】"
            })
        }
    },
    filters:{
        createdTimeFormat:function(value){
            return formatTime(new Date(parseTime(value)))
        }
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
    color:#000
}

.comment-content-container{
    border-radius: 10px;
    margin-top: 5px;
    background-color: #F2F2F5;
    padding: 15px 15px;
}
.comment-item-container{
    display: flex;
    flex-direction: column;
    padding: 15px 15px 0px 15px;
    color:#999
}
.user-commengt-container{
     width: 49%;
    min-height:450px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     text-align: left;
         color: #000;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 14px;
    padding-bottom: 20px;
}
.user-post-item-container{
    padding: 10px;
    width: 100%;
    /* background: red; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.user-post-item-postTitle{

    width: 50%;
    cursor: pointer;
    /* background: yellow; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    text-align: left;
}
.user-post-item-postTitle a:hover{
    color: rgb(64, 158, 255);
}
.post-list{
    display: flex;
    flex-direction: column;
}
.user-post-container{
    width: 49%;
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #000;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 14px;
    min-height: 500px;
}
.user-post-comment-container{
    min-height: 500px;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
}

.user-detail-deep-container{
    margin-top: 10px;
}
.user-address-container{
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
}
.user-register-time-container{
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
}
.user-points-container{
    display: flex;
    flex-direction: row;
    align-items: center;
     height: 30px;
}
.user-points-time-address-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    height: 30px;
        font-size: 14px;
        color:#999;
    /* background-color: green; */
}
.user-name-sex-container{
    margin-top: 10px;
    color:#999;
    font-size: 16px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.user-detail-header{
    width: 120px;
    height: 120px;
}
.user-detail-container{
    background: url("../../../assets/userhome-bg.jpg") no-repeat;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 300px;
    background-color: rgb(18,15, 23);
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.user-home-container{
    width: 100%;
    min-height: 1000px;
    display: flex;
    flex-direction: column;
    /* background: red; */
}

</style>