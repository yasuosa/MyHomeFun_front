<template>
   <div >
      <div class="post-item2-container">
          <div class="post-item2-left">
              <el-avatar :size="60"  shape="square" :src="post.userHeader !== ''? post.userHeader: squareUrl"></el-avatar>
          </div>
          <div class="post-item2-right">
              <div class="post-item2-right-contanier">
                  <div class="post-item2-right-top">
                    <div class="post-item2-left-type">
                      <el-tag v-if="post.typeName === '公告'" effect="plain" size="mini" type="info">{{post.typeName}}</el-tag>
                      <el-tag v-else-if="post.typeName === '资源'" effect="plain" size="mini" type="success">{{post.typeName}}</el-tag>
                      <el-tag v-else-if="post.typeName === '提问'" effect="plain" size="mini" >{{post.typeName}}</el-tag>
                      <el-tag v-else-if="post.typeName === '建议'" effect="plain" size="mini" type="warning">{{post.typeName}}</el-tag>
                      <el-tag v-else effect="plain" size="mini" type="info">{{post.typeName}}</el-tag>
                      <span  class="post-item2-title">{{post.postTitle}}</span>
                    </div>
                    <div>
                      <el-tag  v-if="post.isTop === 1" effect="dark"  size="mini" type="danger">置顶</el-tag>
                      <el-tag  v-if="post.isPerfect === 1" effect="dark" style="margin-left:10px" size="mini" type="warning">精贴</el-tag>
                    </div>
                  </div>
                  <div class="post-item2-right-bottom">
                      <div class="post-item2-right-left">
                        <div class="post-item2-userInfo">
                            <span >{{post.nickname}}</span>
                        </div>
                        <span>{{post.createdTime}}</span>
                      </div>
                      <div class="post-item2-right-right">
                          <div class="post-item-deed-style1" ><i style="font-size:15px" class="iconfont icon-linedesign-02"></i> {{post.postGoods}}</div>
                          <div class="post-item-deed-style1"><i class="el-icon-view"></i> {{post.postRead}}</div>
                          <div class="post-item-deed-style1"><i class="el-icon-chat-line-round"></i> {{post.postCommentnum}}</div>
                          <div class="post-item-deed-style1"><i class="el-icon-collection-tag"></i> {{post.postCollection}}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
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
      this.post.createdTime=formatTime(new Date(parseTime(this.post.createdTime)))
    }
  },
  mounted(){
    // parseTime()
      // console.log(formatTime(new Date(parseTime(this.post.createdTime))))
      this.post.createdTime=formatTime(new Date(parseTime(this.post.createdTime)))
  },
  data() {
    return {
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      items: [
          { type: '' },
          { type: 'success'},
          { type: 'info'},
          { type: 'danger' },
          { type: 'warning' }
        ]
    };
  },
   methods: {

  }
}
</script>
<style  scoped>
.post-item2-container{
  height: 75px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
}
.post-item2-left{
  margin-left: 10px;
  width: 100px;
  /* background: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.post-item2-right{
  width: 100%;
  margin-right: 10px;
  /* background: yellow; */
  display: flex;
  flex-direction: row;
  align-items: center;
}
.post-item2-right-contanier{
  height: 60px;
  width: 100%;
  /* background: pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.post-item2-left-type{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.post-item2-right-top{
  width: 100%;
  /* background: purple; */
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
}
.post-item2-title{
  margin-left: 5px;
  font-size: 16px;
  cursor: pointer;
}
.post-item2-title:hover{
  color: #409EFF;
}
.post-item2-right-bottom{
  /* background: saddlebrown; */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}
.post-item2-right-left{
  display: flex;
  font-size: 14px;
  color: #999;
  align-items: center;

}
.post-item2-userInfo{
 cursor: pointer;
 margin-right: 10px;
}
.post-item2-right-right{
  display: flex;
  width: 300px;
  /* background-color: red; */
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;

}
.post-item-deed-style1{
    font-size: 14px;
    line-height: 20px;
    padding: 0 5px;
    /* background: #fff; */
  }
</style>
