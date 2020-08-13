<template>
<router-link :to='"/post/"+post.postId'>
   <div class="post-item-container"   @mouseover="mouseOver" @mouseleave="mouseLeave" >
      <el-card :body-style="{ padding: '10px' }">
          <div class="post-item-cover">
              <el-image  :src="post.postCover" fit="cover" style="width: 100%; height: 100%"  >
                <div slot="error" class="image-slot">
                  <img  src="../../assets/none2.gif"  class="image" >
                </div>
              </el-image>
            
              <div  :class="isShow ? 'post-item-hover' :'post-item-hover post-item-bottom-hover'">
                  <div class="post-item-deed">
                      <div class="post-item-deed-style"><i class="iconfont icon-dianzan"></i> {{post.postGoods}}</div>
                      <div class="post-item-deed-style"><i class="el-icon-view"></i> {{post.postRead}}</div>
                      <div class="post-item-deed-style"><i class="el-icon-s-comment"></i> {{post.postCommentnum}}</div>
                      <div class="post-item-deed-style"><i class="el-icon-collection-tag"></i> {{post.postCollection}}</div>
                  </div>
              </div>
          </div>
        <div class="post-msg" >
          <span class="post-item-title">{{post.postTitle}}</span>
          <span class="post-item-msg">{{post.postRemark === '' ? post.postTitle : post.postRemark }} </span>
        </div>
      </el-card>
  </div>
</router-link>
</template>
<script >
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
       isShow:false , // 控制显示行为
    };
  },
   methods: {
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
    
  }
}
</script>
<style >
a{
  text-decoration: none;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
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
  .post-item-container{
      width: 280px;
      height: 255px;
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
  .post-item-title{
      margin-top: 5px;
      font-size: 15px;
      text-align: left;
      color:rgba(0, 0, 0,0.8);
    overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis
  }
  .post-item-msg{
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
  .post-item-cover{
      overflow: hidden;
      position: relative;
      height: 180px;
  }
  .post-item-hover{
      position: absolute;
      /* bottom: -27px; */
      bottom: 0px;
      width: 100%;
      transition: bottom 0.5s;
  }
  .post-item-bottom-hover{
       bottom: -26px;
  }
  .post-item-deed{
      color: #fff;
      display: flex;
      flex-direction: row;
      background: rgba(0, 0, 0,0.4);
    
  }
  .post-item-deed-style{
      height: 20px;
      font-size: 14px;
      line-height: 21px;
      border-radius: 3px;
      margin:6px 5px 5px 6px;
      padding: 0 5px;
      background-color: rgba(245, 245, 245,0.47);
  }
</style>
