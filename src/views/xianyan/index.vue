<template>
    <div class="xy-contanier">
        <div class="msg">
            <el-divider>
                <p >闲言碎语</p>
            </el-divider>
        </div>
        <div class="xy-content-container"> 
             <div class="lx-item-container" v-for="(item,index) in leaveMsgDataList" :key="index"  >
            <avue-comment  :data="item" v-if="(index%2) ===0">
                <span style="font-size:12px">{{item.createdTime | timeF}}</span>
            </avue-comment>
             <avue-comment  :data="item" v-else reverse>
                <span style="font-size:12px">{{item.createdTime  | timeF}}</span>
            </avue-comment>
            </div>
        <el-pagination
        small
          @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="page.total">
        </el-pagination>
        </div>

   <el-divider><i class="el-icon-message-solid"></i></el-divider>
        <div>
            <comment ref="leave"  v-model="content"/>
              <el-button   style="width:100%;margin-top:5px" @click="submitLeaveMsg">留言</el-button>
        </div>

         
    </div>
</template>
<script>
import comment from '@/components/Tinymce/comment.vue'
import leaveApi from '@/api/leaveMsg'
import {parseTime,formatTime} from "@/utils/index"
export default {
    components:{
        comment
    },
     data() {
      return {
        page:{
            currentPage:1,
            pageSize:10,
            total:100
        },
        content:"",
        username:this.$store.getters.getName,
        leaveMsgDataList:[],
        // option: {
        //   props: {
        //     avatar: 'avatar',
        //     author: 'author',
        //     body: 'body'
        //   }
        // }
      }
    },
    filters:{
        timeF:function(value){
           return formatTime(new Date(parseTime(value)))
        }
    },
    created(){
        this.getLeaveMsgData()
    },
    methods:{
        getLeaveMsgData(){
            leaveApi.getListPage(this.page).then(res =>{
                this.page=res.data
                this.leaveMsgDataList=this.page.data
                this.page.data=null
            })
        },
         handleCurrentChange(val) {
            this.page.currentPage=val
            this.getLeaveMsgData()
        },
        submitLeaveMsg(){
            if(this.username !== null){
                if(this.content.trim().length ===0){
                    this.$message.error("请不要填空哦！")
                }else {
                    leaveApi.save({content:this.content}).then(res =>{
                         this.$refs["leave"].setContent("");
                        this.$message.success(res.msg)
                        this.getLeaveMsgData()
                    })
                }
            }else {
                this.$message.error("请先登录")
            }
        }
    }
}
</script>
<style scoped>
/deep/ .avue-comment__author{
    color: #000;
}
/deep/ .avue-comment__header{
    background:#f3f7ff;
}
/deep/ .el-pagination button:disabled{
    background: none;
}
/deep/.el-pager li.active {
   background: none ;
}
/deep/.el-pager li{
    background: none ;
}
/deep/ .el-pagination .btn-next, .el-pagination .btn-prev{
    background: none;
}
/deep/ .avue-comment__body{
    min-height:0px !important;
    padding: 30px;
}
.msg{
    margin: 25px 0 25px 0;
}
.msg p{
    font-size: 24px;
}
.el-divider__text{
    background-color: #f5f7fa
}
.xy-contanier{
    display: flex;
    flex-direction: column;
    min-height:800px;
    width: 100%;
}


</style>