<template>
    <div class="all-container">
        <div class="search-container">
            <div class="search-left">
                <div >
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item >
                            <el-input  placeholder="标题" v-model="page.params.postTitle" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" @click="onSubmit" circle></el-button>
                        </el-form-item>
                    </el-form>
                </div>
    
                <div class="search-left-center">
                    <el-button  @click="toGoAllTags" size="small" plain>全部标签</el-button>
                    <div class="tag-list">
                        <el-tag type="info" style="margin-right:10px">搜索记录</el-tag>
                        <el-tag
                            style="margin-right:10px;cursor: pointer;"
                            v-for="(item,index) in historySearch"
                            :key="index"
                            @click="seachHistory(item)"
                            type="info">
                            {{item}}
                            </el-tag>
                        <el-button @click="clearSearchHistory" size="mini"  v-if="historySearch.length !==0" style="margin-left:10px" icon="el-icon-delete">清空记录</el-button>
                    </div>
                </div>
            </div>
            <div class="tag">
                <el-tag type="warning">{{page.params.postTitle === "" ? "全部结果" : page.params.postTitle }} </el-tag>
            </div>
        </div>
        <div>
            <div class="resource-container">
                <div class="resource-header">
                    <span class="resource-header-title">全站资源</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="resource-header-info">老八蜜汁小汉堡</span>
                </div>
                <el-divider class="resource-line"></el-divider>
                <div  v-loading="loading" class="resource-content">
                    <avue-empty image="http://47.101.138.164/group1/M00/00/01/rBEgSV8YBwWARq_EAAAic7spiIQ007.png" style="margin-bottom:20px;margin-top:20px" v-if="postList.length ===0"></avue-empty>
                    <el-row :gutter="15" v-else>
                        <el-col  v-for="(item,index) in postList" :key="index" :span="6"> 
                            <post-item   :post="item" />
                        </el-col>
                    </el-row>
                </div>
                <el-divider class="resource-line"></el-divider>
                <div class="resource-bottom-more">
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
</template>
<script>
import postItem from '@/components/post/post-item3'
import postApi from '@/api/post'
export default {
    components:{
        postItem
    },
    data() {
      return {
          historySearch:[], // 搜索记录
          loading:false,
          postList:[],
          page:{
                currentPage:1,
                pageSize:10,
                params:{
                    typeId:2,  // 资源
                    postTitle:''
                },
                total:100,
                sortColumn:'',
                sortMethod:''
            }
      }
    },
    created(){
        this.getPostData();
        if(localStorage.getItem('historySearch') !==null){
            this.historySearch=JSON.parse(localStorage.getItem('historySearch'))
        }
    },
    methods: {
       getPostData(){
        this.loading=true
        postApi.getListPage(this.page).then(res =>{
            this.page=res.data
            this.postList=this.page.data
            this.page.data=null
            this.loading=false
        })
       },
      onSubmit() {
        this.page.params.postTitle=this.page.params.postTitle.trim()
        console.log(this.page.params.postTitle)
        if(this.page.params.postTitle.length !==0 && (this.historySearch.indexOf(this.page.params.postTitle)===-1)){
            if(this.historySearch.length === 4){
                this.historySearch.splice(0, 1);
            }
            this.historySearch.push(this.page.params.postTitle)
        }
        this.getPostData()
      },
      clearSearchHistory(){
          this.historySearch=[]
          localStorage.removeItem("historySearch")
      },
      toGoAllTags(){
          this.$router.push("tags")
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        this.getPostData()
      },
      seachHistory(item){
          this.page.params.postTitle=item
          this.onSubmit()
      }
    },
    destroyed(){
        localStorage.setItem("historySearch",JSON.stringify(this.historySearch))
    }
}
</script>
<style scoped>
.all-container{
    display: flex;
    flex-direction: column;
}
.search-container{
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.search-left{
    display: flex;
    align-items: center;
    
}
.demo-form-inline{
    height: 41px;
}
.tag-list{
    margin-left: 20px;
}
.search-left-center{
    display: flex;
    align-items: center;
}

/* 专升本开始 */
.resource-container{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    background: #fff;
    margin-top: 10px;
    width: 1200px;
    display: flex;
    flex-direction: column;
}
.resource-header{
    height:46px ;
    display: flex;
    align-items: center;
}
.resource-header-title{
    font-size: 18px;
    margin-left: 15px;
    line-height: 18px;
    color: black;
}
.resource-header-info{
    font-size: 13px;
}
.resource-line{
    margin: 0px;
    padding: 0px;
}
.resource-content{
    height: 100%;
    margin: 15px 15px 0 15px;
}
.resource-bottom-more{
    margin: 15px;
}
/* 专升本结束 */
</style>