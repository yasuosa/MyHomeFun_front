<template>
    <div>
        <!-- 轮播图部分 -->
        <div class="banner-container">
            <div class="banner-left">
                 <el-carousel>
                    <el-carousel-item class="banner-content"  v-for="(item,index) in bannerData" :key="index">
                        <banner-info :banner="item" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="banner-right">
                <div v-for="(item,index) in noticeData" :key="index" class="banner-right-item" @click="toReadNotice(item.id)" >
                    <el-image
                        style="width: 100%;height:145px"
                        :src="item.cover"
                        fit="cover">
                         <div slot="error" class="image-slot">
                            <img class="banner-cover"  src="../../assets/no-cover.jpg"/>
                        </div>
                    </el-image>
                    <div class="info-contanier">
                        <div class="info">
                            <div  class="info-type">
                                <div class="info-point"/>
                                <span style="margin-left:5px;">公告</span>
                            </div>
                            <span class="info-title">{{item.title}}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 轮播图部分结束 -->

        <!-- 地下三部分部分 -->
        <div class="bc-container">
           <category-item :category="item" v-for="item in categoryList" :key="item.id"/>
        </div>
    </div>
</template>
<script>
import bannerInfo from '@/components/banner'
import bannerApi from '@/api/banner'
import categoryItem from '@/components/home/categoryItem'
import noticeApi from '@/api/notice'
export default {
     components:{
        bannerInfo,
        categoryItem
    },
    data(){
        return{
            bannerData:[],
            noticeData:[],
            categoryList:this.$store.getters.getCategoryList, //可用专栏
        }
    },
    created(){
        console.log(this.$store.getters.getCategoryList.length===0)
        if(this.$store.getters.getCategoryList.length===0){
            var cateI=setInterval(() =>{
                if(this.categoryList.length !== 0 ){
                    console.log("疯狂的找")
                    clearInterval(cateI)
                }
                this.categoryList=this.$store.getters.getCategoryList
            },100);
        }
        this.getBannerData()
        this.getNoticeData()
        // console.log(this.categoryList)
    },
    methods:{
        getBannerData(){
            bannerApi.getList().then(res =>{
                this.bannerData=res.data
            })
        },
        getNoticeData(){
            noticeApi.getHomeNotice().then(res =>{
                this.noticeData=res.data
            })
        },
        toReadNotice(noticeId){
            this.$router.push("/notice/"+noticeId);
        }
    }
}
</script>
<style scoped>
.banner-container{
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.banner-left{
    width: 65%;
    height: 300px;
}
.banner-content{
    height: 300px;
}
.banner-right{
    width: 34%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.banner-right-item{
    position: relative;
    cursor: pointer;

    width: 100%;
    /* background-color: red; */
    /* overflow: hidden; */
}
.banner-cover{
    max-width:100%;
	height:auto;
    width:auto;
	max-height:100%;
}
.info-contanier{
    padding-left: 5px;
    top: 0;
    bottom: 0;
    position: absolute;
    /* background-color: red; */
}
.info{
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    height: 100%;
    color: #fff;
    font-size: 14px;
}
.info-point{
    height: 20px;
    border-left: solid 3px #ffffff;
}
.info-type{
    text-align: start;
    font-size:20px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
.info-title{
    /* background: red; */
    font-size: 14px;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}

/deep/ .el-carousel__item--card{
    width: 100%;
}

</style>
