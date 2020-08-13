<template>
    <div class="banner-info-container"  @click="goRead">    
            <el-image :src="banner.bannerCover">
                <div slot="error" class="image-slot">
                    <img class="banner-cover"  src="../../assets/banner.jpg"/>
                </div>
            </el-image>
            <div class="card-info-container" >
                <div class="info">
                    <div  class="info-type">
                        <div class="info-point"/>
                        <span v-if="banner.bannerType ===0" style="margin-left:5px;">广告</span>
                        <span v-if="banner.bannerType ===1" style="margin-left:5px;">公告</span>
                        <span v-if="banner.bannerType ===2" style="margin-left:5px;">帖子</span>
                    </div>
                    <span class="info-title">{{banner.bannerTitle}}</span>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props:{
        isMin:{
            type:Boolean,
            default:false
        },
        banner:{
            type:Object,
            default:function(){
                return{
                    bannerTitle:"我的趣屋",
                    bannerCover:"",
                    bannerHref:"/",
                    bannerType:0
                }
            }
        }
    },
     data () {
      return {
        
      }
    },
    methods:{
        goRead(){
            // 广告
            if(this.banner.bannerType === 0){
                window.open(this.banner.bannerHref, '_blank');
            }
            // 公告
            else if(this.banner.bannerType === 1){
                 this.$router.push("/notice/"+this.banner.bannerHref)
            }
            else if(this.banner.bannerType === 2){
                this.$router.push("/post/"+this.banner.bannerHref)
            }
        }
    }
}
</script>
<style scoped>
.banner-cover{
    max-width:100%;
	height:auto;
    width:auto;
	max-height:100%;
}
.banner-info-container{
    cursor: pointer;
    height: 300px;
}
.card-info-container{
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 100%;
    /* background: red; */
    padding-left: 10px;
    top: 0;
    left: 0;
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

</style>