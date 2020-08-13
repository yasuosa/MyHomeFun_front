<template>
    <div>
    <el-table
      :data="commentList"
      height="540"
      style="width: 100%;">
      <el-table-column
        prop="createdTime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="postTitle"
        label="文章名"
        width="180">
        <template slot-scope="scope">
            <router-link style="color:#000" :to="'/post/'+scope.row.postId">{{scope.row.postTitle}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="body"
        label="评论内容">
        <template slot-scope="scope">
            <div v-html="scope.row.body"></div>
        </template>
      </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="deleteComment(scope.row.id)" circle></el-button>
            </template>
    </el-table-column>
    </el-table>

    <el-pagination
    style="margin-top:10px"
        background
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :total="page.total">
    </el-pagination>
    </div>
</template>

<script>
import commentApi from '@/api/comment'
export default {
    data() {
    return {
        commentList:[],
        page:{
            currentPage:1,
            pageSize:10,
            total:100
        }
    }
    },
    created(){
        this.getMyCommentData()
    },
    methods:{
        handleCurrentChange(val) {
            this.page.currentPage=val
            this.getMyCommentData()
        },
        getMyCommentData(){
            commentApi.getMyComment(this.page).then(res =>{
                this.page=res.data
                this.commentList=this.page.data
                this.page.data=null
            })
        },
        deleteComment(commentId){
             this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            commentApi.deleteById(commentId).then(res =>{
                this.$message.success(res.msg)
                this.getMyCommentData()
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