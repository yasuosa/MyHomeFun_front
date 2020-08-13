<template>
    <div>
        <div class="postManager-menu-container">
            <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">我发的贴</el-menu-item>
                <el-menu-item index="2">私密帖子</el-menu-item>
                 <el-menu-item index="3">我收藏的帖子</el-menu-item>
                <el-menu-item index="4">我点赞的帖子</el-menu-item>
            </el-menu>
        </div>

        <!-- 右侧 -->
        <div >
            <!-- 公开和私密开始 -->
            <div v-if="!isDeedMsg">
                <div style="height:490px">
                    <div v-if="postDataList.length !==0">
                        <div v-for="(item,index) in postDataList" :key="index">
                            <div class="postManager-post-item-container">
                                <div class="post-item-header-container">
                                    <el-tag  effect="plain">{{item.categoryName}}</el-tag>
                                    <el-tag   effect="plain" type="info" style="margin:0px 10px">{{item.typeName}}</el-tag>
                                    <router-link :to="'/post/'+item.postId" class="post-title">{{item.postTitle}}</router-link>
                                    <el-button size="mini"  type="primary" @click="goUpdatePost(item)">编辑</el-button>
                                    <el-button size="mini"  type="warning" @click="deletedPost(item)">删除</el-button>
                                </div>
                                <!-- <span style="color:#999;font-size:12px">{{item.createdTime}}</span> -->
                                <span style="color:#999;font-size:12px">{{item.postRead}}阅读/{{item.postCommentnum}}回复【{{item.createdTime}}】 </span>
                            </div>
                            <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                        </div>
                    </div>
                    <div v-else style="height:100px;line-height:100px" >
                        <span  style="color:#999;text-align:center;font-size:14px;">你暂未发布任何帖子</span>
                    </div>
                </div>
                <div >
                    <el-pagination
                        background
                        layout="total,prev, pager, next"
                        @current-change="handleCurrentChange"
                        :total="page.total">
                        </el-pagination>
                </div>
            </div>
            <!-- 公开和私密结束 -->


            <!-- 收藏和点赞查看开始 -->
            <div v-else>
                <div style="height:490px">
                    <div v-if="postDeedDataList.length !==0">
                        <div v-for="(item,index) in postDeedDataList" :key="index">
                            <div class="postManager-post-item-container">
                                <div class="post-item-header-container">
                                    <span style="color:#999;font-size:12px">您{{deedText}}了 </span>
                                    <router-link :to="'/post/'+item.postId"  class="post-title">{{item.postTitle}}</router-link>
                                </div>
                                <el-button size="mini"  type="danger" @click="cancelDeed(item.postId)">取消{{deedText}}</el-button>
                                <!-- <span style="color:#999;font-size:12px">{{item.createdTime}}</span> -->
                            </div>
                            <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                        </div>
                    </div>
                    <div v-else style="height:100px;line-height:100px" >
                        <span  style="color:#999;text-align:center;font-size:14px;">你还没{{deedText}}帖子,快去逛逛吧！</span>
                    </div>
                </div>
                <div >
                    <el-pagination
                        background
                        layout="total,prev, pager, next"
                        @current-change="handleCurrentChange2"
                        :total="pageOfDeed.total">
                        </el-pagination>
                </div>
            </div>
            <!-- 收藏和点赞查看结束 -->


        </div>
    </div>
</template>
<script>
import postApi from '@/api/post'
export default {
    data(){
        return {
            page:{  // 用于查看公开或者私密的分页模型
                currentPage:1,
                pageSize:10,
                total:100,
                params:{
                    isPublic:1  //1 公开 0私密
                }
            },
            pageOfDeed:{  // 用于查看公开或者私密的分页模型
                currentPage:1,
                pageSize:10,
                total:100,
                params:{
                    deedType:0 , //1收藏 0点赞
                }
            },
            isDeedMsg:false,  // 控制是私密 还是 行为类型
            postDataList:[],
            postDeedDataList:[] ,
            deedText:"收藏"
        }
    },
    created(){
        this.getPostDataList()
    },
    methods:{
        getPostDataList(){
            postApi.getByPage(this.page).then(res =>{
                this.page=res.data
                this.postDataList=this.page.data
                this.page.data=null
            })
        },
        getPostDeedDataList(){
            postApi.getDeedPostDataByPage(this.pageOfDeed).then(res =>{
                this.pageOfDeed=res.data
                this.postDeedDataList=this.pageOfDeed.data
                this.pageOfDeed.data=null
            })
        },
        // 去修改
        goUpdatePost(post){
            this.$router.push({path: '/publish',query:{post:post }})
        },

        // 公开私密的分页
        handleCurrentChange(val) {
            this.page.currentPage=val
            this.getPostDataList()
        },

        // 点赞收藏的分页
        handleCurrentChange2(val) {
            this.pageOfDeed.currentPage=val
            this.getPostDeedDataList()
        },
        // 菜单点击
        handleSelect(key,index){
            // 公开的
            if(key === "1"){
                this.isDeedMsg=false
                this.page.currentPage=1
                this.page.params.isPublic=1
                this.getPostDataList()
            }
            // 私密的
            else if(key === '2'){
                this.isDeedMsg=false
                this.page.currentPage=1
                this.page.params.isPublic=0
                this.getPostDataList()

            }
            else if(key === '3'){
                this.pageOfDeed.currentPage=1
                this.pageOfDeed.params.deedType=1
                this.isDeedMsg=true
                this.deedText="收藏"
                this.getPostDeedDataList()
            }
            else {
                this.pageOfDeed.currentPage=1
                this.pageOfDeed.params.deedType=0
                this.isDeedMsg=true
                this.deedText="点赞"
                  this.getPostDeedDataList()
            }
        },
        // 删除帖子
        deletedPost(post){
            this.$confirm('您是否要此【'+post.postTitle+'】帖子放入回收站?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    postApi.deleteById(post.postId).then(res=>{
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.getPostDataList()
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 取消操作
        cancelDeed(postId){
            // 取消收藏操作
            if(this.deedText === '收藏'){
                postApi.collection(postId).then(res =>{
                    this.$message.success(res.msg)
                    this.getPostDeedDataList();
                }).catch( err=>{
                    this.getPostDeedDataList();
                })
            }
            // 取消点赞操作
            else if(this.deedText ==='点赞'){
                postApi.good(postId).then(res =>{
                    this.$message.success(res.msg)
                    this.getPostDeedDataList();
                }).catch( err=>{
                    this.getPostDeedDataList();
                })
            }
        }
    }
    
}
</script>
<style scoped>

/deep/ .el-button--warning{
    display: flex;
    width: 30px;
    height: 20px;
    justify-content: center;
    align-items: center;
}
/deep/ .el-button--primary{
    display: flex;
    width: 30px;
    height: 20px;
    justify-content: center;
    align-items: center;
}
.post-title{
    margin-right: 10px;
    max-width: 200px;
    height: 30px;
    text-align: left;
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    /* background: yellow; */
    word-break: break-all;
}
.post-item-header-container{
    width: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    /* background: red; */
}
.post-item-header-container a{
      text-decoration: none;
      color:#000
}
.post-item-header-container a:hover{
    color:#409EFF
}

.postManager-post-item-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    color:#000;
    padding: 8px 15px;
    height: 30px;
    align-items: center;
}
.postManager-menu-container{
    margin-left: 10px;
}

</style>