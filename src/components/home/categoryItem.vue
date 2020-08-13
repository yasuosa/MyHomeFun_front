<template>
    <div    v-loading="divloading"
    element-loading-background="rgba(255,255,255)"  class="item-container">
            <div class="item-header">
                <span class="item-header-title">{{category.name}}</span>
                <el-divider direction="vertical"></el-divider>
                <span class="item-header-info">{{category.remark}}</span>
            </div>
            <el-divider class="item-line"></el-divider>
            <div class="item-content">
                <avue-empty image="http://47.101.138.164:4388/group1/M00/00/01/rBEgSV8YBwWARq_EAAAic7spiIQ007.png" style="margin-bottom:20px;margin-top:20px" v-if="data.length ===0"></avue-empty>
                <el-row v-else :gutter="15">
                    <el-col  v-for="(item,index) in data" :key="index" :span="6">
                         <post-item :post="item"/>
                    </el-col>
                </el-row>
            </div>
            <el-divider class="item-line"></el-divider>
            <div class="item-bottom-more"     v-loading="loading"
                element-loading-spinner="el-icon-loading" @click="loadMore">
                <span>{{loadMoreText}}</span>
            </div>
        </div>
</template>
<script>
import postItem from '@/components/post/post-item'
import postApi from '@/api/post'
export default {
    props:{
        category:{
            type:Object,
            default:null
        }
    },
    components:{
        postItem
    },
    created(){
        this.getPostOfCategoryData()
    },
    watch:{
        "category":function(newVal,oldVal){
            this.category=newVal
            this.page.params.categoryId=newVal.id
        }
    },
    methods:{
        getPostOfCategoryData(){
            postApi.getHomePostByCategory(this.page).then(res =>{
                this.page=res.data
                if(res.data.data.length ===0){
                    this.loadMoreText="真的一滴都不剩了！"
                }else {
                    this.data=this.data.concat(this.page.data)
                }
                this.page.data=null
                this.loading=false
          
                this.divloading=false
              
            })
        },
        loadMore(){
            this.loading=true
            this.page.currentPage +=1
            this.getPostOfCategoryData()
        }
    },
    data(){
        return{
            divloading:true,
             loading: false,
            tzList:4,// 帖子总数
            loadMoreText:'加载更多', // 文本
            page:{
                currentPage:1,
                pageSize:4,
                params:{
                    categoryId:this.category.id
                }
            },
            data:[],
        }
    }
}
</script>
<style scoped>

/* 专升本开始 */
.item-container{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    background: #fff;
    margin-top: 10px;
    width: 1200px;
    display: flex;
    flex-direction: column;
}
.item-header{
    height:46px ;
    display: flex;
    align-items: center;
}
.item-header-title{
    font-size: 18px;
    margin-left: 15px;
    line-height: 18px;
    color: black;
}
.item-header-info{
    font-size: 13px;
}
.item-line{
    margin: 0px;
    padding: 0px;
}
.item-content{
    margin: 15px 15px 0 15px;
}
.item-bottom-more{
    width: 100%;
    background-color: #fff;
    cursor: pointer;
    color:  #409EFF;
    font-size: 12px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
.item-bottom-more span{
        text-align: center;
}
/* 专升本结束 */
</style>