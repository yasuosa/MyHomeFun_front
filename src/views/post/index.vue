<template>
<div class="post-data-container" >
     <!-- 登录用户 操作栏 -->
    <post-deed class="post-deed-toolbar" @scrollToComment="scrollToComment" :isGood="post.hasGood"  :isCollection="post.hasCollection"  :postId="post.postId"/>
     <div v-loading="loading" element-loading-background="rgba(255, 255, 255)" class="post-container">
        <div class="post-left-container">
            <!-- 帖子内容 -->
            <div   class="post-content-container">
                <h2 style="font-weight:normal;font-size:24px;text-align:left">{{post.postTitle}}</h2>
                <div class="post-msg-container">
                    <div class="post-tags-container">
                        <el-tag  type="danger" v-if="post.isTop ===1"  class="tags-style" effect="dark">置顶</el-tag>
                        <el-tag type="warning" v-if="post.isPerfect ===1 " class="tags-style" effect="dark">精贴</el-tag>
                        <el-tag type='success'  class="tags-style" effect="dark">{{post.categoryName}}</el-tag>
                        <span style="font-size:12px;margin-left:30px;margin-right:5px;color:#999">|</span>
                        <span style="font-size:12px;color:#999;margin-top:1.5px;margin-right:5px">标签:</span>
                        <el-button @click="selectPostByTag(item)" v-for="(item,index) in post.tags"  :key="index"  type='info'  class="tags-style" effect="dark">{{item.name}}</el-button>
                        <!-- 操作栏 -->
                        <!-- <div   style="margin-left:20px">
                            <el-tag type='success'  style="margin-left:20px" class="tags-style" effect="dark">置顶</el-tag>
                            <el-tag type='success'  class="tags-style" effect="dark">加精</el-tag>
                        </div> -->
                    </div>
                    <div class="post-info-container">
                        <div style="margin-right:10px" ><i class="el-icon-view"></i> {{post.postRead}}</div>
                        <div><i class="el-icon-s-comment"></i> {{post.postCommentnum}}</div>
                    </div>
                </div>
                <!-- 作者栏 -->
                <div class="post-author-container">
                    <div class="author-header" @click="goUserHome">
                        <el-avatar  v-if="post.userHeader !==null " shape="square" style="cursor: pointer;" :size="50" :src='post.userHeader'></el-avatar>
                        <el-avatar  v-else shape="square" style="cursor: pointer;" :size="50">{{post.nickname}}</el-avatar>
                    </div>
                    <div class="author-info-container">
                        <div class="info-top-container">
                            <div  class="info-author-container">
                                <p  @click="goUserHome" style="margin-right:5px;cursor: pointer;">{{post.nickname}}</p>
                                <el-tag type="danger" style="margin-right:20px;height:20px;line-height:19px;font-size:11px;" class="tags-style" effect="dark">先行者</el-tag>
                            </div>
                            <p>{{post.createdTime}}</p>
                        </div>
                        <div class="post-type-info-container">
                            <p>分类:{{post.typeName}}</p>
                            <!-- <el-tag   style="margin-left:20px;height:20px;line-height:18px;width:60px" class="tags-style" effect="dark">编辑此贴</el-tag> -->
                        </div>
                    </div>
                </div>
                <!-- 文章内容 -->
                <div class="post-main-text-container">
                    <div  v-highlight style="font-size:16px；color:#000">
                        <mavon-editor
                            style="min-height:0px"
                            :ishljs ="true"
                            :boxShadow="false"
                            :value="post.postContent"
                            :subfield='false' 
                            defaultOpen="preview"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                        ></mavon-editor>
                    </div>
                    <!-- 隐藏资源 -->
                    <div ref="hide" style="margin-top:50px" v-if="post.isHasHideContent === 1">
                        <el-divider><p style="font-size:18px;font-weight:800;margin-top">隐藏内容</p></el-divider>
                        <div v-if="post.hideData === null">
                            <!-- 登录可见 -->
                            <hide-login  @login="dialogVisible=true" v-if="post.postHideContentPermission === 'hide_content:login'"/>

                            <!-- 评论可见 -->
                            <hideComment @login="dialogVisible=true" @comment="scrollToComment" v-else-if="post.postHideContentPermission === 'hide_content:comment'"/>

                            <!-- 购买可见 -->
                            <hide-buy @login="dialogVisible=true" @refreshPage="refreshPage" :postId="post.postId"  v-else-if="post.postHideContentPermission === 'hide_content:buy'"/>
                        </div>
                        <mavon-editor
                            v-else
                            style="min-height:0px"
                            :ishljs ="true"
                            :boxShadow="false"
                            :value="post.hideData.resource"
                            :subfield='false' 
                            defaultOpen="preview"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                        ></mavon-editor>
                        
                        <!-- <div v-html="post.hideContent"> -->
                            <!-- <p><a href="https://github.com/yasuosa" target="_blank" rel="noopener">亚索的秘密工坊</a></p> -->
                        <!-- </div> -->
                    </div>
                    <el-divider  content-position="left"><i style="font-size:18px" class="el-icon-picture">封面</i></el-divider>
                    
                    <el-image 
                        fit='cover'
                        style="width: 100%; max-height: 350px"
                        :src='post.postCover === "" ? "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :post.postCover' 
                        :preview-src-list='[post.postCover === "" ? "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :post.postCover]'>
                    </el-image>
                
                </div>
            </div>
            <!-- 回帖 -->
            <div class="comment-container" >
                <div ref="commentList"  class="comment-item-style" >
                    <el-divider ><i style="font-size:20px;color:#000;font-weight:100" class="el-icon-goblet-square-full">回帖</i></el-divider>

                    <!-- 评论列表 -->
                    <div    v-for="(item,index) in commentList" :key="index" style="margin-top:20px;padding-bottom:10px;border-bottom:1px dotted #ccc">
                        <avue-comment :option="option" :data="item">
                            <div style="    cursor: pointer;">
                                <!-- <i class="iconfont icon-linedesign-02" style="font-size:14px" @click="$message('自定义菜单')">点赞({{item.goods}})</i> -->
                                <el-button type="text"  @click="commentGood(item)" :style='item.good ? "font-size:14px;color:red" :"font-size:14px;color:#000"' ><i class="iconfont icon-dianzan1"></i>点赞({{item.goods}})</el-button>
                                <!-- <i class="el-icon-chat-line-round" style="font-size:14px;margin-left:10px" @click="repalyComment(item)">回复</i> -->
                                <el-button type="text" @click="repalyComment(item)"  style="font-size:14px;margin-left:10px;color:#000" ><i class="el-icon-chat-line-round"></i>回复</el-button>
                            </div>
                        </avue-comment>
                        <div class="comment-time-container">
                            <p style="font-size:13px;color:#999">{{(index+1) + ((commentPage.currentPage-1)*(commentPage.pageSize)) }}楼</p>
                            <p style="font-size:13px;color:#999">{{item.createdTime}}</p>
                        </div>
                    </div>
                    <transition name="el-fade-in">
                        <div v-if="commentList.length ===0" class="comment-data-none">
                            消灭零评论
                        </div>
                        <el-pagination
                        ref="commentBottom" 
                        v-else
                        style="margin-top:15px"
                            background
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="commentPage.total">
                        </el-pagination>
                    </transition>
                </div>
      
                <!-- 评论 -->
                <div v-if="post.allowComment === 0">
                    <div ref="result" style=""  class="comment-bottom-no-login">
                            当前帖子禁止评论
                    </div>
                </div>
                <div v-else>
                    <div v-if="name" ref="result" style="padding:25px;margin-top:20px" class="comment-bottom">
                      <transition name="el-fade-in">
                    <div  v-if="commentToUser" class="comment-user-comment">
                        <span style="color:#409EFF;">回复:@{{commentToUserData.name}}</span>
                        <el-button type="text" @click="commentToUser=false">X</el-button>
                    </div>
                    </transition>
                    <comment ref="comment" v-model="comment.comment"/>
                    <div style="width:100px;margin-top:20px">
                         <el-button @click="commentPublish"  type="primary">提交回复</el-button>
                    </div>
                
                    </div>
                    <div  v-else ref="result"  class="comment-bottom-no-login">
                        <el-button type="text" @click="dialogVisible=true">登录即可评论</el-button>
                    </div>
                </div>
                
            </div>
            
        </div>




        <div class="post-right-container">
             <div class="right-hot-post" style="padding-bottom:20px">
                    <div class="chart-title">
                         <span>热门帖子</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-bottom:10px"></div>
                    <router-link  :to='"/post/"+item.postId' v-for="(item,index) in hostPostList" :key="index" class="hot-post-list">
                        <span style="text-align:left">{{item.postTitle}}</span>
                        <div style="font-size:12px" class="post-item-deed-style"><i  class="el-icon-view"></i>{{item.postRead}}</div>
                    </router-link>
            </div>
             <div style="margin-top:20px;padding-bottom:20px" class="right-hot-post">
                    <div class="chart-title">
                        <router-link class="user-post-other-nickname" :to="'/user/home/'+post.userId" >【{{post.nickname}}】</router-link>
                         <span>的帖子</span>
                    </div>
                    <div style="height:0.5px;background-color:#DCDFE6;with:100%;margin-bottom:10px"></div>
                    <router-link  :to='"/post/"+item.postId' v-for="(item,index) in userPostList" :key="index" class="hot-post-list">
                        <span style="text-align:left">{{item.postTitle}}</span>
                        <div  class="post-item-deed-style"><i class="el-icon-view"></i> {{item.postRead}}</div>
                    </router-link>
            </div>
        </div>

    <!-- 登录框 -->
        <div>
            <el-dialog
            top="15vh"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="23%">
            <userLogin @refreshPage="refreshPage"/>
            </el-dialog>
        </div>

    </div>
</div>

</template>
<script>
import postApi from '@/api/post'
import comment from '@/components/Tinymce/comment.vue'
import hideLogin from '@/components/hide/hideLogin.vue'
import hideComment from '@/components/hide/hideComment.vue'
import hideBuy from '@/components/hide/hideBuy.vue'
import postDeed from '@/components/post/deed/index.vue'
import userLogin from '@/components/user/login.vue'
import commentApi from  '@/api/comment'

import '../../../node_modules/highlight.js/styles/googlecode.css'
export default {
    components:{
        comment ,
        hideLogin,
        hideComment,
        hideBuy,
        postDeed,
        userLogin
    },
  data() {
      return {
          userPostList:[],
          name:this.$store.getters.getName,
          loading:true,
          postId:this.$route.params.postId,
          dialogVisible: false,
          commentPage:{
              currentPage:1,
              pageSize:10,
              params:{
                  postId:this.$route.params.postId,
              }
          },
          commentToUser:false, // 控制对评论进行评论
          commentToUserData:{
              name:"",
              content:""
          },
          post:{
            postId: "",
            userId: null,
            username: "",
            postTitle: "",
            postCategoryId: null,
            postTypeId: null,
            postCover: "",
            postContent: "",
            postGoods: 0,
            postRead: 0,
            postCollection: 0,
            postRemark: "",
            postCommentnum: 0,
            postFromSource: "",
            ordernum: 0,
            allow: 1,
            postHideContentPermission: "",
            isHasHideContent: 0,
            isPerfect: 0,
            isTop: 0,
            version: 0,
            deleted: 0,
            createdTime: "",
            updatedTime: "",
            categoryName: "",
            typeName: "",
            tags: [
                
            ],
            allowComment:0, // 是否可以评论
            hideData:{}, // 隐藏内容
            nickname: "",
            userHeader: "",
            hasCollection:false,
            hasGood:false
          },
          comment:{
            postId:this.$route.params.postId,
            comment:"",
            pid:0
          },
        commentList:[
            
        ],
        option: {
          props: {
            avatar: 'avatar',
            author: 'author',
            body: 'body'
          }
        },
        hostPostList:[] // 热门帖子
      }
    },
    created(){
        // console.log(this.$route)
        this.loading=true
        this.getPost()
        this.getComment()
    },
    watch:{
        "$route.params.postId":function(newVal,oldVal){
            this.reload()
        },
        "post.postCategoryId":function(n,o){
            this.getPostHostList()
        },
        "post.userId":function(n,o){
            if( n !== null){
                this.getUserDataPost(n)
            }
        }
    },
    inject: ['reload'],
    methods:{
        refreshPage(){
            this.reload()
            
        },
        goUserHome(){
            this.$router.push("/user/home/"+this.post.userId)
        },
           // 他的文章
        getUserDataPost(userId){
            postApi.getUserPost(userId).then(res =>{
                this.userPostList=res.data
            })
        },
           // 热门
        getPostHostList(){
            postApi.getHostPost(this.post.postCategoryId).then(res =>{
                this.hostPostList=res.data
            })
        },

        // 获取当前评论
        getComment(){
            commentApi.getListPage(this.commentPage).then(res =>{
                this.commentPage=res.data
                this.commentList=this.commentPage.data
                this.commentPage.data=null
            })
        },
        // 发布当前评论
        commentPublish(){
             
            const length=this.comment.comment.replace(/&nbsp;/ig, "").replace(/\s+/g,"").length
            // 只剩 <p></p>
            if(length === 7) {
                this.$message.error("请填写评论");
            }else {
                if(this.commentToUser) {
                    this.comment.comment= this.commentToUserData.content +this.comment.comment
                }
                commentApi.publish(this.comment).then(res =>{
                    this.$message.success(res.msg)
                    this.$refs["comment"].setContent("");
                    
                    this.getComment()
                    this.post.postCommentnum +=1
                    

                    // 如果是隐藏内容评论的刷新
                    if(this.post.isHasHideContent ===1 && this.post.hideData ===null) {
                        this.getPost()
                        this.$refs["hide"].scrollIntoView({ behavior: "smooth" });
                    }else {
                        this.$refs["commentList"].scrollIntoView({block: "start"});
                    }
                })
            }
        },
        // 获取当前帖子
        getPost(){
            this.loading=true
            postApi.read(this.postId).then(res =>{
                this.post=res.data
                this.loading=false
                window.document.title=this.post.postTitle
               console.log(window.document.title)
            }).catch(err =>{
                this.$router.go(-1)
            })
        },
        // 对评论进行评论
        repalyComment(item){
            this.scrollToComment()
            this.commentToUser=true
            this.comment.pid=item.id
            this.commentToUserData.name=item.author
            this.commentToUserData.content='<a href="/user/home/'+item.userId +'"  target="_blank" style="text-decoration: none; color:#409EFF;">@'+item.author+'</a>'
        },
        // 滑动去评论
        scrollToComment(){
            this.$refs.result.scrollIntoView({ behavior: "smooth" });
        },
        handleCurrentChange(val) {
          this.commentPage.currentPage=val
          this.getComment()
          this.$refs["commentList"].scrollIntoView({ behavior: "smooth" });
        },
        commentGood(item){
            commentApi.good(item.id).then(res =>{
                this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: 'success',
                      offset: 300,
                    position: 'bottom-right'
                });
                item.good=!item.good
                if(item.good){
                    item.goods+=1
                }else {
                    item.goods-=1
                }
            })
        },
        // 标签
        selectPostByTag(item){
            const params={
                tagId:item.id
            }
             this.$router.push({ path:"/search", name:"PostTag",
                params:{ 
                    params:JSON.stringify(params),
                    name:item.name
                    }  
                })
        }
        
    }
}
</script>
<style  scoped>
.post-data-container{
    position: relative;
}
.post-deed-toolbar{
    position: absolute;
    left: -75px;
}
/deep/ .el-loading-spinner {
    top:10%;
}
.comment-data-none{
    width: 100%;
    height: 100px;
    text-align: center;
    color:#999;
    line-height: 100px;
    font-size: 14px;
}
/deep/ .avue-comment__author {
    color: #000;
}
.comment-user-comment{
    width: calc(100% - 18px);
    height: 30px;
    background-color: #33333317;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 13px;
    padding: 0px 10px;
}
.post-item-deed-style{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
}
.chart-title{
    padding-left: 10px;
    display: flex;
    align-items: center;
    height: 47px;
    color: #000;
    font-size: 18px;
}
.hot-post-list{
    color: #000;
    text-decoration: none;
    margin-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
    height: 20px;
    align-items: center;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
}
.hot-post-list span{
    width: 70%;
    height: 15px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.hot-post-list:hover{
    color: #409EFF;
}
.user-post-other-nickname{
    color:#000;
    text-decoration: none;
}
.user-post-other-nickname:hover{
    color: #409EFF;
}
.right-hot-post{
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 100%;
    background-color: white;
}
.comment-bottom-no-login{
    width: calc(100% - 5px);
    background-color: white;
    height: 100px;
    display: flex;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    border-left: 5px solid #00c4ff;
    justify-content: center;
}
.comment-bottom{
    display: flex;
    flex-direction: column;
        background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
.comment-time-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.comment-item-style{
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.comment-container{
    margin-top: 15px;
    /* background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.post-main-text-container{
    width: 100%;
    margin-top: 20px;
    text-align: left;
}
.post-type-info-container{
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
.author-info-container{
    height: 50px;
    margin-left: 10px;
    /* background-color: green; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}
.author-header{
    height: 60px;
    display: flex;
    align-items: center;
    /* background-color: red; */
    margin-left: 10px;
    padding: 0;
}
.post-author-container{
    height: 70px;
    /* background-color: #f8f8f8; */
    background-color: #e4e7ed;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #999;
}
.tags-style{
    margin-right: 5px;
    padding:0px 5px 5px 5px !important;
    height: 22px;
    font-size: 12px;
    text-align: center;
    padding: 0px;
    line-height: 20px;
    border-radius: 3px;
}
.post-info-container{
    display: flex;
    flex-direction: row;
    font-size: 18px;
}
.post-tags-container{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.post-msg-container{
    width: 100%;
    height: 40px;
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.post-container{
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    min-height: 1100px;
}
.post-content-container{
    padding: 25px;
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    /* width: 100%; */
    padding-bottom: 30px;
}
.post-left-container{
    width: 75%;
    min-height: 1100px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
}
.post-right-container{
    width: 25%;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    /* background-color: white; */
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}

</style>