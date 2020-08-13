<template>
<div>
<div v-if="isFirst" class="deed-container">
      
      <el-checkbox-button  ></el-checkbox-button>
      <el-tooltip class="item" effect="dark" content="点赞" placement="left-start">
          <el-checkbox-button @change="goodPost"  :checked="hasGood"  ><i style="font-size:18px" class="iconfont icon-linedesign-02"></i></el-checkbox-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="收藏" placement="left-start">
          <el-checkbox-button @change="collectPost" :checked="hasCollection" ><i style="font-size:18px"  class="el-icon-star-on"></i></el-checkbox-button>
       </el-tooltip>
      <el-tooltip class="item" effect="dark" content="捐赠(待开发)" placement="left-start">
         <el-checkbox-button disabled  ><i style="font-size:18px"   class="el-icon-document"></i></el-checkbox-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="评论" placement="left-start">
        <el-checkbox-button  @change="commentPost"  ><i style="font-size:18px"  class="el-icon-s-comment"></i></el-checkbox-button>
      </el-tooltip>
</div>
<!-- <div v-else class="deed-container">
      
      <el-checkbox-button  ></el-checkbox-button>
      <el-tooltip class="item" effect="dark" content="点赞" placement="left-start">
          <el-checkbox-button @change="goodPost"  :checked="hasGood"  ><i style="font-size:18px" class="iconfont icon-linedesign-02"></i></el-checkbox-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="收藏" placement="left-start">
          <el-checkbox-button @change="collectPost" :checked="hasCollection" ><i style="font-size:18px"  class="el-icon-star-on"></i></el-checkbox-button>
       </el-tooltip>
      <el-tooltip class="item" effect="dark" content="捐赠(待开发)" placement="left-start">
         <el-checkbox-button disabled  ><i style="font-size:18px"   class="el-icon-document"></i></el-checkbox-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="评论" placement="left-start">
        <el-checkbox-button  @change="commentPost"  ><i style="font-size:18px"  class="el-icon-s-comment"></i></el-checkbox-button>
      </el-tooltip>
</div> -->
</div>
    
</template>
<script>
import postApi from '@/api/post'
  export default {
    props:{
      postId:{
        type:String,
        default:null
      },
      isGood:{
        type:Boolean,
        default:false
      },
      isCollection:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      "isGood":function(newVal,oldVal){
          this.hasGood=newVal
      },
      "isCollection":function(newVal,oldVal){
          this.hasCollection=newVal
      },
      "postId":function(newVal,oldVal){
          this.postId=newVal
          console.log(newVal)
          this.isFirst=true
      }
    },
    data() {
      return {
        isFirst:false,
        isCollapse: true,
        hasGood:this.isGood,
        hasCollection:this.isCollection
      };
    },
    methods: {
      goodPost(){
        postApi.good(this.postId).then(res =>{
          this.$message.success(res.msg)
        })
      },
      collectPost(){
         postApi.collection(this.postId).then(res =>{
          this.$message.success(res.msg)
        })
      },
      commentPost(){
        this.$emit("scrollToComment")
      }
    }
  }
</script>
<style scoped >
/deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: white;
  color:#409EFF;
}
/deep/ .el-checkbox-button:first-child .el-checkbox-button__inner{
  border:0px solid #fff;
  /* box-shadow: 1px 0px 0px 0px #8cc5ff; */
   border-radius: 0px; 
}
/deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner{
   box-shadow: 1px 0px 0px 0px #409EFF;
}
/deep/ .el-checkbox-button__inner {
   border:0px solid #fff;
    border-radius: 0px;
    padding: 20px 25px;
}
/deep/ .el-checkbox-button:last-child .el-checkbox-button__inner{
  border-radius: 0px;
}
.deed-container{
  display: flex;
  flex-direction: column;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>