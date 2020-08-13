<template>
    <div v-loading="loading">
     <div class="sign-msg-list">
      <div class="sign-msg-container" v-for="(item,index) in signTodayDataList" :key="index">
          <div class="sign-user-header">
            <el-avatar v-if="item.header" :src="item.header"></el-avatar>
            <el-avatar v-else >{{item.nickname}}</el-avatar>
          </div>
          <div class="sign-detail-container">
            <div class="sign-detail-left">
                <span>{{item.nickname}}</span>
                <span>{{item.createdTime | createdTimeFormat}}</span>
            </div>
            <div class="sign-detail-right">
                <el-tag type="danger"  ><i class="iconfont icon-SQLserver"></i>{{item.points}}</el-tag>
            </div>
          </div>
      </div>

      <div style="margin-top:10px;text-align:center">
        <el-pagination
          small
          layout="prev, pager, next"
           @current-change="handleCurrentChange"
            :page-size="page.pageSize"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    </div>
</template>
<script>
import {parseTime,formatTime} from "@/utils/index"
import signApi from '@/api/sign'
export default {
    data(){
        return {
            signTodayDataList:[],
            page:{
            currentPage:1,
            pageSize:6,
            total:100,
            params:{

            }
            },
            loading:true
        }
    },
    created(){
        this.getSignTodayList()
    },
    methods:{
        getSignTodayList(){
            this.loading=true
            signApi.getTodayAllSign(this.page).then(res =>{
                this.page=res.data
                this.signTodayDataList=this.page.data
                this.page.data=null
                this.loading=false
            })
       },
      handleCurrentChange(val) {
        this.page.currentPage=val
        this.getSignTodayList()
      }
    },
    filters:{
        createdTimeFormat:function(value){
          console.log(value)
            return formatTime(new Date(parseTime(value)))
        }
    }
}
</script>

<style scoped>
.sign-detail-right{
  line-height: 40px;
  height: 40px;
}
.sign-detail-left{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  height: 35px;
}
.sign-detail-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  font-size: 13px;
  align-items:flex-end;
}
.sign-user-header{
  width: 40px;
  height: 40px;
  margin-right: 5px;
  line-height: 40px;
}
.sign-msg-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #cccccc61;
  height: 50px;
  align-items: center;

}
.sign-msg-list{
  border-top: 1px solid  #cccccc61;
  max-height: 400px;
  width: 100%;
  margin-top: 40px;
  /* background-color: red; */
}
</style>