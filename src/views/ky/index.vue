<template>
    <div class="bc-page-container">
        <div class="bc-search-container">
             <el-divider style="font-size:24px">考研部落</el-divider>
             <div class="publish_container">
                 <search style="margin-left:5px"/>
                 <div class="publish-btn">
                    <el-button @click='$router.push("/publish")' type="primary"  size="mini" >发布新帖</el-button>
                 </div>
             </div>
        </div>
        <div class="bc-main-container">
            <div class="main-left">
                <div class="left-top">
                    <div class="left-top-left">
                        <span  @click="sortData(6)" >综合</span>
                        <el-divider direction="vertical"></el-divider>
                        <span  @click="sortData(5)">资源</span>
                        <el-divider direction="vertical"></el-divider>
                        <span  @click="sortData(4)">提问</span>
                        <el-divider direction="vertical"></el-divider>
                        <span @click="sortData(3)" >精华</span>
                    </div>
                    <div class="left-top-right">
                        <span @click="sortData(1)">按最新</span>
                        <el-divider direction="vertical"></el-divider>
                        <span @click="sortData(2)">按热议</span>
                    </div>
                </div>
                <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-top:10px;margin-bottom:10px">

                </div>
                <div v-loading="loading"
                    element-loading-background="rgba(255,255,255)"  class="left-main-contianer">
                    <div  v-if="postList.length!==0" >
                        <div  v-for="(item,index) in postList" :key="index" >
                            <router-link  :to='"/post/"+item.postId'><post-item :post="item" /></router-link>
                            <el-divider class="line" ></el-divider>
                        </div>
                    </div>
                    <avue-empty  style="margin-top:20px"  v-else image="http://47.101.138.164:4388/group1/M00/00/01/rBEgSV8YBwWARq_EAAAic7spiIQ007.png" ></avue-empty>
                </div>

                <div class="left-bottom-page">
                    <el-pagination
                        background
                         layout="total, prev, pager, next"
                        :total="page.total">
                    </el-pagination>
                </div>
                
            </div>
            <div class="main-right">
                <div class="right-bottom-tag">
                    <div class="chart-title">
                         <span>标签云</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;"></div>
                    <div class="hot-tag">
                          <el-button class="tag-style" @click="selectPostByTag(item)" v-for="item in tagList" :key="item.id"  round plain type="primary" size="mini">{{item.name}}({{item.count}})</el-button>
                    </div>
                </div>
                <div class="right-hot-post">
                    <div class="chart-title">
                         <span>热门帖子</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-bottom:10px"></div>
                    <router-link :to='"/post/"+item.postId' v-for="(item,index) in hostPostList" :key="index" class="hot-post-list">
                        <span style="text-align:left;font-size:14px">{{item.postTitle}}</span>
                        <div ><i class="el-icon-view"></i> {{item.postRead}}</div>
                    </router-link>
                </div>

                 <div class="right-popular-chart">
                    <div class="chart-title">
                         <span>广告出租</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-bottom:10px"></div>
                    <el-button style="margin:5px;height:50px"  type="primary"  @click="goMeQQ">接毕业设计</el-button>  
                </div>
                 <div class="right-popular-chart">
                     <div class="chart-title">
                         <span>联系我</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-bottom:10px"></div>
                    <img src="../../assets/my.gif" />
                 </div>

            </div>
        </div>
    </div>
</template>
<script>
import postItem from '@/components/post/post-item2'
import postApi from '@/api/post'
import tagApi from '@/api/tag'
import search from  '@/components/search/index'
export default {
    components:{
        postItem,
        search
    },
    data(){
        return {
            loading:true,
            page:{
                currentPage:1,
                pageSize:10,
                params:{
                    categoryId:1
                },
                total:100,
                sortColumn:'',
                sortMethod:''
            },
            postList:[], //数据源
            hostPostList:[],// 热门
            categoryId:localStorage.getItem(this.$route.path),
            tagList:[]

        }
    },
    created(){
       
        this.page.params.categoryId=localStorage.getItem(this.$route.path)
        this.categoryId=localStorage.getItem(this.$route.path)
        this.getPostHostList()
        this.getPostData()
        this.getTagList();
    },
    methods:{
        goMeQQ(){
            window.open("http://wpa.qq.com/msgrd?v=3&uin=601529188&site=qq&menu=yes")
        },
        getPostData(){
             this.loading=true
            postApi.getListPage(this.page).then(res =>{
                this.page=res.data
                this.postList=this.page.data
                this.page.data=null
                this.loading=false
            })
        },
        getTagList(){
            tagApi.getListByCid(this.categoryId).then(res =>{
                this.tagList=res.data
            })
        },
        // 热门
        getPostHostList(){
            postApi.getHostPost(this.categoryId).then(res =>{
                this.hostPostList=res.data
            })
        },
        sortData(status){
            if(status ===1) {
                // 按最新
                this.page.sortColumn="createdTime"
                this.page.sortMethod="desc"
            }else if(status===2){
                // 按热议
                this.page.sortColumn="postRead"
                this.page.sortMethod="desc"
            }else if(status === 3){
                // 精华
                this.page.sortColumn=""
                this.page.sortMethod=""
                this.page.params.isPerfect=1
                   this.page.params.typeId=null
            }else if(status === 4){
                // 提问
                this.page.sortColumn=""
                this.page.sortMethod=""
                this.page.params.typeId=3
                this.page.params.isPerfect=null
            }else  if(status ===5){
                // 资源
                this.page.sortColumn=""
                this.page.sortMethod=""
                this.page.params.typeId=2
                this.page.params.isPerfect=null
            }else{
                // 重置
                this.page.sortColumn=""
                this.page.sortMethod=""
                 this.page.params.typeId=null
                this.page.params.isPerfect=null
            }
            this.getPostData()
        },
        // 根绝tag查找
        selectPostByTag(item){
            const params={
                tagId:item.id
            }
            this.$router.push({ path:"/search", name:"PostTag",params:{params:JSON.stringify(params),name:item.name} })
        }
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
    color: #2c3e50;
}
.bc-page-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 900px;
    /* background: red; */
    /* height: 1000px; */
}
.bc-search-container{
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.publish_container{
    
    display: flex;
    flex-direction: row;
    align-content: center;
    font-size: 24px;
}
.publish-icon{
    cursor: pointer;
    margin-left: 10px;
    font-size: 24px;
    text-align: center;
    line-height: 60px;

}
.el-divider__text{
    font-size: 20px;
    background-color: #f5f7fa;
}

.publish-btn{

    margin-left: 15px;
   display: flex;
   align-items: center;
}
.bc-main-container{
    margin-top: 5px;
    display:flex ;
    width: 100%;
    /* height: 1000px; */
    flex-direction: row;
    /* background: white; */
    justify-content: space-between;
}
.main-left{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-right: 5px;
    width: 72%;
    display: flex;
    flex-direction: column;
    background: white;
}
.main-right{
    margin-left: 5px;
    /* background: green; */
    width: 28%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}
.left-top{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.left-top span{
    color: #999;
    cursor: pointer;
}
.left-top span:hover{
     color: #409EFF;
}
.left-top-left{
    padding-left: 15px;
}
.left-top span{
    font-size: 15px;
    color: #666;
    padding: 0 6px;
}
.left-main-contianer{
    min-height: 800px;
    /* background: red; */
}
.line{
    margin: 0 !important;
}
.left-bottom-page{
    padding: 10px;
}
.right-popular-chart{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 10px;
    background-color: white;
    display:flex;
    flex-direction: column;
}
.right-hot-post{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 100%;
    background-color: white;
    padding-bottom: 20px;
    margin-bottom: 10px;
    /* height: 31%; */
}
.right-bottom-tag{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 100%;
    background-color:white;
    padding-bottom: 20px;
    margin-bottom: 10px;
}
.chart-title{
    padding-left: 10px;
    display: flex;
    align-items: center;
    height: 47px;
        color: #000;
    font-size: 14px;
}
.hot-post-list{
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    align-items: left;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
}
.hot-post-list span{
    width: 70%;
    height: 30px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.hot-post-list:hover{
    color: #409EFF;
}
.hot-tag{
    justify-content:left;
    /* background-color: red; */
    width: 100%;

    flex-wrap: wrap;
    display: flex;
    flex-direction: row;

}
.tag-style{
    border-radius: 2px;
    font-size: 10px;
    margin-left: 5px;
    margin-top: 10px;
}
</style>