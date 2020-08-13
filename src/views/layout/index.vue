<template>
    <div class="all-container">
          <el-collapse-transition>
            <!-- 头部开始 -->
            <div class="header-container"  v-show="show" >
                <!-- 头部最上层开始 -->
        
                <div class="header-top-container">
                    <div class="top-text-container">
                        <span>隐私条款</span>
                        <span>网站地图</span>
                        <span>关于我的</span>
                    </div>
                </div>
                <!-- 头部最上层结束 -->
                <div class="header-main-container">
                    <div class="header-music">
                        <aplayer :lrcType="1"  :autoplay="true" :audio="audio"  fixed   />
                    </div>
                    
                    <div class="main-manager">
                        <img src="../../assets/logo-1.png">
                        <div class="header-main-menu">
                            <el-menu :default-active="activeIndex" :router="true"  class="el-menu-demo" mode="horizontal">
                                <el-menu-item  index="/home">首页</el-menu-item>
                                <el-menu-item @click="clickMenu(item.id,item.path)" v-for="item in categoryList" :key="item.id" :index="item.path"  :route="{path:item.path ,name:item.name, params:{'categoryId':item.id}} " >
                                <!-- <el-menu-item v-for="item  in categoryList" :key="item.id" :index="item.path" > -->
                                    {{item.name}}
                                </el-menu-item>
                                <el-menu-item index="/resource">全站资源</el-menu-item>
                                <el-menu-item index="/xy">闲言碎语</el-menu-item>
                                <el-menu-item index="/vip">赞助VIP</el-menu-item>

                            </el-menu>
                        </div>
                        <transition name="el-fade-in">
                            <div v-if="!name"  class="login-user-info">
                                <el-button type="primary"  @click="dialogVisible=true"  size="mini" >登录</el-button>
                                <el-button type="danger" @click="registerDialog=true" style="margin-right:15px" size="mini">快速注册</el-button>
                            </div>
                            <div v-else class="login-user-info">
                                <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <el-avatar shape="square" :size="40" :src="header === '' ? squareUrl : header"></el-avatar>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <div class="menu-info-contanier"  @click="goUserhome">
                                            <el-avatar shape="square" :size="40" :src="header === '' ? squareUrl : header"></el-avatar>
                                            <div class="menu-info-msg">
                                                <span style="font-size:23px;color:#000;    font-weight:500;">{{name}}</span>
                                                <span style="font-size:12px;color:#999">个人中心</span>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <div style="height:1px;width:100%;background-color:rgba(192, 196, 204, 0.45);"></div>
                                    <el-dropdown-item >
                                        <div class="menu-item">
                                            <div class="menu-item-post">
                                                <i style="font-size:24px;color:#409EFF" class="iconfont icon-fabu"></i>
                                                <router-link to="/publish" class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">发布帖子</span>
                                                    <span style="font-size:12px;color:#999">快来发布帖子吧！</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item >
                                         <div class="menu-item">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:#409EFF" class="iconfont icon-linedesign-02"></i>
                                                <router-link :to="'/user/setting/postManager'" class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">我的帖子</span>
                                                    <span style="font-size:12px;color:#999">瞅瞅！</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item  disabled>
                                         <div class="menu-item">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:#409EFF" class="iconfont icon-wukong"></i>
                                                <div class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">消息中心</span>
                                                    <span style="font-size:12px;color:#999">谁会找我呢(后续开发)?</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item >
                                         <div class="menu-item">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:#ff6700" class="iconfont icon-zhifu"></i>
                                                <router-link to="/userInfo" class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">财富管理</span>
                                                    <span style="font-size:12px;color:#999">不会吧不会吧！没钱了？</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item >
                                         <div class="menu-item">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:#ff6700" class="iconfont icon-huiyuan"></i>
                                                <router-link to="/vip" class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">成为会员</span>
                                                    <span style="font-size:12px;color:#999">我是要成为会员的男人！</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                     <el-dropdown-item >
                                         <div class="menu-item" @click="goUserSetting">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:#ff6700" class="iconfont icon-xitongguanli"></i>
                                                <div class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">我的设置</span>
                                                    <span style="font-size:12px;color:#999">帅帅！</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item  > 
                                         <div class="menu-item" @click="logout">
                                             <div class="menu-item-post">
                                                <i style="font-size:24px;color:red" class="iconfont icon-tuichu"></i>
                                                <div class="menu-info-msg1">
                                                    <span style="font-size:16px;color:#000;    font-weight:400;">退出</span>
                                                    <span style="font-size:12px;color:#999">这就要走了吗？可恶的大骗子</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                         </transition>
                    </div>
                </div>
            </div>
         </el-collapse-transition>
        <!-- 头部结束 -->

        <!-- 中部开始 -->
        <div class="main-container">
            <div class="main-content-container">
                <router-view/>
            </div>
        </div>
        <!-- 中部结束 -->

        <div class="footer-container">
            <div class="footer-author">
                <div>Copyright <a href="http://www.cuz.edu.cn/" target="_target">©浙江传媒学院(2020-2022)</a> 20界软工(专升本)大数据--任鹏宇 维护制作 </div> 
                <div>服务部署:<a href="https://www.aliyun.com/?utm_content=se_1000301881">阿里云</a> · <a href="http://www.beian.miit.gov.cn/">皖ICP备 · 20014487号-1</a>
                </div>
            </div>
        </div>

        <!-- 登录框 -->
        <div>
            <el-dialog
            top="15vh"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="23%">
            <userLogin @openRegister="openRegister" @refreshPage="refreshPage"/>
            </el-dialog>
        </div>

        <!-- 注册框 -->
         <div>
            <el-dialog
            top="10vh"
            :close-on-click-modal="false"
            :visible.sync="registerDialog"
            width="23%">
            <register @openLogin="openLogin"/>
            </el-dialog>
        </div>

        <div class="toolbar-container">
            <toolbar />
        </div>
    </div>
</template>


<script>
import musicApi from '@/api/music'
import userApi from '@/api/user'
import categoryApi from '@/api/category'
import userLogin from '@/components/user/login.vue'
import toolbar from './toolbar'
import register from '@/components/user/register.vue'
export default {
    components:{
        userLogin,toolbar,
        register
    },
    data(){
        return {
            audio: [
        
            ],
            registerDialog:false,
            user:this.$store.getters.getUser,
            name:this.$store.getters.getName,
            header:this.$store.getters.getAvatar,
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            dialogVisible: false,
            show:true,
            activeIndex: this.$route.path,
            categoryList:this.$store.getters.getCategoryList ,// 可用专栏
        }
    },
    created() {
    // console.log("进入",this.$store.state.name)
    // console.log("进入",this.$route.path)
    // console.log("进入",this.$route)
    // console.log(this.$store.getters.getCategoryList.length)
    if(this.$store.getters.getCategoryList.length ===0) {
         this.getCategoryList()
    }
    this.mouseScroll()
    this.getMusicList()
   },
   inject: ['reload'],
    methods:{
        getMusicList(){
            musicApi.getList().then(res =>{
                this.audio=res.data
            })
        },
        openLogin(){
            this.dialogVisible=true
            this.registerDialog=false
        },
        openRegister(){
            this.dialogVisible=false
            this.registerDialog=true
        },
        logout(){
            this.$store.dispatch("logout")
            setTimeout(() => {
                 this.reload()
            }, 1000);
            //   this.reload()
        },
        getCategoryList(){
            categoryApi.getList().then(res =>{
                this.categoryList=res.data
                this.$store.commit('SET_CATEGORYLIST', res.data)
            })
        },
        // 登录成功刷新页面
        refreshPage(){
            // this.dialogVisible=false
            this.reload()
            // const { fullPath } = this.$route
            // this.$router.replace({
            // path: '/redirect' + fullPath
        },
        clickMenu(categoryId,path){
            localStorage.setItem(path,categoryId)
        },
        mouseScroll() {
        // 给页面绑定滑轮滚动事件
        if (document.addEventListener) { // firefox
            document.addEventListener('DOMMouseScroll', this.watchScroll, false)
        }
        // 滚动滑轮触发scrollFunc方法 //ie 谷歌
        window.onmousewheel = document.onmousewheel = this.watchScroll
        },
        watchScroll(e) {
        e = e || window.event
        if (e.wheelDelta) {
            if (e.wheelDelta > 0 && this.show === false) {
            // 当滑轮向上滚动
            this.show = true
            }
            if (e.wheelDelta < 0 && this.show === true) {
            // 当滑轮向下滚动
            this.show = false
            }
        } else if (e.detail) {
            if (e.detail < 0 && this.show === false) {
            // 当滑轮向上滚动
            this.show = true
            }
            if (e.detail > 0 && this.show === true) {
            // 当滑轮向下滚动
            this.show = false
            }
        }
        },
        goUserhome(){
            this.$router.push("/user/home/"+this.user.userId)
        },
        goUserSetting(){
            this.$router.push("/user/setting")
        }
    }
}
</script>

<style  scoped>
.toolbar-container{
    position:fixed;
    top: 35%;
    right: 0;
}
/deep/ .el-dialog__header{
  padding: 0px ; 
}
.menu-item-post{
    display: flex;
    flex-direction: row;
    align-items: center;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

.login-user-info{
    width: 150px;
     display: flex;
    flex-direction: row-reverse;
}
.all-container{
    display: flex;
    width: 100%;
    flex-direction: column;
}
.menu-info-contanier{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    height: 60px;
    width: 200px;
    padding:10px 0px;
    /* background-color: red; */
}
.menu-info-msg{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    height: 50px;
}
.menu-info-msg1{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    justify-content: center;
    height: 60px;
}
.menu-item{
    height: 60px;
}
/deep/ .el-dropdown-menu__item{
    line-height: normal;
}
.el-dropdown-menu{
    padding-top: 0px;
}
/* 头部开始 */
.header-container{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
      position: sticky;
    top: 0;
    z-index: 2000;
}
a{
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
}
.header-top-container{
    width: 100%;
    height: 40px;
    background: #2c2c2c;
    background-image: url('../../assets/bg-top.png');
    display: flex;
    justify-content: center;
}
.top-text-container{
    height: 40px;
    width: 1200px;
    display: flex;
    align-items: center;
}
.top-text-container span{
    font-size: 12px;
    color: #fff;
    margin-left: 10px;
}
.header-music{
    width: 500px;
    position: absolute;
    /* background: coral; */
    height: 60px;
    left: 0;
    top: 0;
}
/deep/ .aplayer.aplayer-narrow .aplayer-pic{
height: 60px !important;
}
/deep/ .aplayer.aplayer-narrow .aplayer-body {
    height: 60px !important;
}
/deep/ .aplayer.aplayer-fixed{
    position: relative;
}
/deep/ .aplayer.aplayer-fixed .aplayer-body{
    position: relative;
}

.header-main-container{
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    justify-content: center;
}
.main-manager{
    width: 1200px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}


.header-main-container img{
    height: 58px;
}

/deep/  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #409EFF;
    color: #409EFF !important;
 
}
/deep/.el-menu--horizontal>.el-menu-item{
    color: #303133;
    height: 58px !important;
}
/* 头部结束 */

/* 中部开始 */
.main-container{
    margin-top: 15px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content:center;
}
.main-content-container{
    width: 1200px;
    min-height: 800px;
}

/* 中部结束 */


/* 底部开始 */
.footer-container{
    margin-top: 15px;
    height: 100px;
    background-color: black;
    display: flex;
    justify-content: center;
}
.footer-author{
    width: 1200px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color:white;
}
.footer-author a {
    display: inline;
    color: white;
}
.footer-author a:hover{
    color: #ffffff7a;
}
.el-dialog__header{
    padding: 0px !important;
}

</style>