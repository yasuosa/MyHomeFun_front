<template>
<router-link :to="'post/'+post.postId">
   <div class="post-item3-container"   @mouseover="mouseOver" @mouseleave="mouseLeave" >
    <el-card :body-style="{ padding: '10px' }">
        <div class="post-item3-cover">
             <el-image  :src="post.postCover" fit="cover" style="width: 100%; height: 100%"  >
                <div slot="error" class="image-slot">
                  <img  src="../../assets/none2.gif"  class="image" >
                </div>
              </el-image>
            <div  :class="isShow ? 'post-item3-hover' :'post-item3-hover post-item3-bottom-hover'">
                <div class="post-item3-deed">
                    <div class="post-item3-deed-style"><i class="iconfont icon-dianzan"></i>  {{post.postGoods}}</div>
                    <div class="post-item3-deed-style"><i class="el-icon-view"></i>  {{post.postRead}}</div>
                    <div class="post-item3-deed-style"><i class="el-icon-s-comment"></i> {{post.postCommentnum}}</div>
                    <div class="post-item3-deed-style"><i class="el-icon-collection-tag"></i>{{post.postCollection}}</div>
                </div>
            </div>
        </div>
      <div class="post-msg" >
        <span class="post-item3-title">{{post.postTitle}}</span>
        <span class="post-item3-msg">{{post.postRemark}}</span>
      </div>
      <div class="post-info">
          <div class="post-user-info" @click="goUserHome">
              <el-avatar size="small" v-if="post.userHeader !==null" :src="post.userHeader"></el-avatar>
              <el-avatar size="small" v-else>{{post.nickname}}</el-avatar>
              <span class="info-username">{{post.nickname}}</span>
          </div>
          <div class="post-info-time">
            <el-tag type="warning" size="mini" effect="dark" v-if="post.isTop">置顶</el-tag>
            <el-tag type="danger" style="margin-right:5px;margin-left:5px" size="mini" effect="dark" v-if="post.isPerfect">精品</el-tag>
            <span>{{post.createdTime | time}}</span>
          </div>
      </div>
    </el-card>
</div>
</router-link>
</template>
<script >
import {parseTime,formatTime} from "@/utils/index"
export default {
  props:{
    post:{
      type:Object,
      default:null
    }
  },
   watch:{
    "post":function(newVal,oldVal){
      this.post=newVal
    }
  },
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
       isShow:false , // 控制显示行为
    };
  },
   methods: {
     goUserHome(){
       this.$router.push("/user/home/"+this.post.userId)
     },
    // 移入
    mouseOver() {
        this.isShow=true
      // console.log("鼠标移入")
    },
    // 移出
    mouseLeave() {
        this.isShow=false
      // console.log("鼠标移出")
    }
    
  },
  filters:{
    time:function(value){
      return formatTime(new Date(parseTime(value)))
    }
  }
}
</script>
<style scoped >
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
a{
  text-decoration: none;
  color:#000
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateY(10px);
  opacity: 0;
}
  .post-item3-container{
      width: 280px;
      height: 270px;
      cursor: pointer;
  }
  .image{
      width: 100%;
      height: 180px;
  }
  .post-msg{
      display: flex;
      flex-direction: column;
  }
  .post-item3-title{
      margin-top: 5px;
      font-size: 15px;
      text-align: left;
      color:rgba(0, 0, 0,0.8);
    overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis
  }
  .post-item3-msg{
      margin-top: 5px;
      line-height: 12px;
      text-align: left;
      font-size: 12px;
      color: #bbb;
      height: 12px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis
  }
  .post-item3-cover{
      overflow: hidden;
      position: relative;
      height: 150px;
  }
  .post-item3-hover{
      position: absolute;
      /* bottom: -27px; */
      bottom: 0px;
      width: 100%;
      transition: bottom 0.5s;
  }
  .post-item3-bottom-hover{
       bottom: -26px;
  }
  .post-item3-deed{
      color: #fff;
      display: flex;
      flex-direction: row;
      background: rgba(0, 0, 0,0.4);
    
  }
  .post-item3-deed-style{
      height: 20px;
      font-size: 14px;
      line-height: 21px;
      border-radius: 3px;
      margin:6px 5px 5px 6px;
      padding: 0 5px;
      background-color: rgba(245, 245, 245,0.47);
  }
  .post-info{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 30px;
  }
  .post-user-info{
    display: flex;
    align-items: center;
  }
  .info-username{
    margin-left: 10px;
  }
  .info-username:hover{
    color:#ff6700
  }
</style>
