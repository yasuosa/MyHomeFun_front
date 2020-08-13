<template>
    <div>
        <div class="recycle-header-container">
            <i class="el-icon-delete">回收站</i>
        </div>
        <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>

        <div>
            <div>
                <div style="height:490px">
                    <div v-if="postDataList.length !==0">
                        <div v-for="(item,index) in postDataList" :key="index">
                            <div class="postManager-post-item-container">
                                <div class="post-item-header-container">
                                    <span class="post-title">{{item.postTitle}}</span>
                                </div>
                                <!-- <span style="color:#999;font-size:12px">{{item.createdTime}}</span> -->
                                <div class="reback-deleted-container">
                                    <el-button size="mini"  type="primary" @click="goReply(item)">还原</el-button>
                                    <el-button size="mini"  type="warning" @click="goTrueDelete(item)">彻底删除</el-button>
                                </div>
                            </div>
                            <div style="background-color:rgb(204 204 204 / 25%);width:100%;height:1px"></div>
                        </div>
                    </div>
                    <div v-else style="height:100px;line-height:100px" >
                        <span  style="color:#999;text-align:center;font-size:14px;">回收站内暂无帖子！</span>
                    </div>
                <div style="margin-top:20px" >
                    <el-pagination
                        background
                        layout="total,prev, pager, next"
                        @current-change="handleCurrentChange"
                        :total="page.total">
                        </el-pagination>
                </div>
            </div>
            </div>
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
                   
                }
            },
             postDataList:[]

        }
    },
     created(){
        this.getPostDataList()
    },
    methods:{
        handleCurrentChange(val) {
            this.page.currentPage=val
            this.getPostDataList()
        },

        getPostDataList(){
            postApi.getDeletePostPage(this.page).then(res =>{
                this.page=res.data
                this.postDataList=this.page.data
                this.page.data=null
            })
        },
        // 还原
        goReply(post){
            this.$confirm('是否还原【'+post.postTitle+'】?', '提示', {
                confirmButtonText: '还原',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    postApi.recyclePost(post.postId).then(res =>{
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.getPostDataList()
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消还原'
                });          
            });
        },
        // 彻底删除
        goTrueDelete(post){
            this.$confirm('此操作将永久删除该【'+post.postTitle+'】帖子, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    postApi.trueDeletePost(post.postId).then(res =>{
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
        }
    }
}
</script>
<style scoped>
.reback-deleted-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
}
.recycle-header-container{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    /* background: red; */
    padding: 10px 0px;
     /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    font-size: 20px;
}

/deep/ .el-button--warning{
    display: flex;
    width: 60px;
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

</style>