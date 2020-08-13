<template>
<div >
     <!-- 登录用户 操作栏 -->
     <div v-loading="loading" element-loading-background="rgba(255, 255, 255)" class="notice-container">
        <div class="notice-left-container">
            <!-- 帖子内容 -->
            <div   class="notice-content-container">
                <div class="notice-msg-container">
                    <div class="notice-tags-container">
                        <h2 style="font-weight:normal;font-size:24px;text-align:left">{{notice.title}}</h2>
                        <el-tag  type="danger"   class="tags-style" effect="dark">公告</el-tag>
                    </div>
                </div>
                <el-divider  content-position="left"><i style="font-size:18px" class="el-icon-star-on">内容</i></el-divider>
              
                <!-- 文章内容 -->
                <div class="notice-main-text-container">
                    <div  v-highlight style="font-size:16px；color:#000">
                        <mavon-editor
                            style="min-height:0px"
                            :ishljs ="true"
                            :boxShadow="false"
                            :value="notice.mdContent"
                            :subfield='false' 
                            defaultOpen="preview"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                        ></mavon-editor>
                    </div>
            

                    </div>
                    <el-divider  content-position="left"><i style="font-size:18px" class="el-icon-picture">封面</i></el-divider>
                    
                    <el-image 
                        fit='cover'
                        style="width: 100%; max-height: 350px"
                        :src='notice.cover === "" ? "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :notice.cover' 
                        :preview-src-list='[notice.cover === "" ? "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :notice.cover]'>
                    </el-image>
                
                </div>
            </div>
    </div>
</div>

</template>
<script>
import noticeApi from '@/api/notice'
export default {
  data() {
      return {
          noticeId:this.$route.params.noticeId,
          notice:{}
      }
    },
    created(){
        this.loading=false
    },
    watch:{
        "$route.params.noticeId":function(n,o){
            this.noticeId=n
            this.getData()
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            this.loading=true
            noticeApi.read(this.noticeId).then(res =>{
                this.notice=res.data
                this.loading=false
            })
        }
    }
}
</script>
<style  scoped>
/deep/ .el-loading-spinner {
    top:10%;
}

.notice-main-text-container{
    width: 100%;
    margin-top: 20px;
    text-align: left;
}
.notice-type-info-container{
    height: 20px;
    width: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-size: 13px;
    color: #ff6700;
}
.info-author-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #01AAED;
    font-size: 16px;
}
.info-top-container{
    height: 30px;
    width: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-size: 14px;
    padding-top: 3px;
}


.notice-info-container{
    display: flex;
    flex-direction: row;
    font-size: 18px;
}
.notice-tags-container{
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.notice-msg-container{
    width: 100%;
    height: 40px;
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.notice-container{
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    min-height: 600px;
}
.notice-content-container{
    padding: 25px;
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    /* width: 100%; */
    padding-bottom: 30px;
}
.notice-left-container{
    width: 100%;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
      min-height: 600px;
}

</style>