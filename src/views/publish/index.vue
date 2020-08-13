<template>
    <div class="publish-container">
        <div class="left-container">
            <post-publish/>
        </div>
        <div class="right-container">
            <div class="left-info-container" >
                <h4 style="font-size:14px;margin-top:10px">尊重原创</h4>
                <p style="font-size:12px;margin-top:10px;padding-right:5px">请不要发布任何盗版下载链接，包括软件、音乐、电影等等。我们尊重原创。</p>
            </div>
             <el-divider></el-divider>
             <div class="left-info-container" >
                <h4 style="font-size:14px">严禁 黄！赌！毒</h4>
                <p style="font-size:12px;margin-top:10px;padding-right:5px">即使你是木叶村三忍也不行！</p>
            </div>
             <el-divider></el-divider>
             <div class="left-info-container" >
                <h4 style="font-size:14px">多多益善</h4>
                <p style="font-size:12px;margin-top:10px;padding-right:5px">
                    如果你的帖子得到大多数人的点赞，将有特殊奖励！
                </p>
            </div>
            <el-divider></el-divider>
             <div class="left-info-container" >
                <h4 style="font-size:14px">再现帅比</h4>
                <p style="font-size:12px;margin-top:10px;">
                    有问题加wx哦！有照片超帅的!
                </p>
                <p style="font-size:12px" >QQ:601529188</p>
                <p style="font-size:12px" >email:601529188@qq.com</p>
                <div style="padding:5px">
                    <img width="100%;" src="../../assets/my.gif" />
                </div>
            </div> 
             <el-divider></el-divider>
        </div>
    </div>
</template>
<script>
import postPublish from './post-publish'
export default {
    components:{
        postPublish
    }
}
</script>
<style scoped>
/deep/ .el-divider--horizontal{
    margin: 10px 0px;
}
.publish-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: red; */
}
.left-container{
    width: 70%;
    height: 100%;
    /* background-color: yellow; */
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.right-container{
    width: 28%;
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.left-info-container{
    width: 100%;
    /* background: white; */
    text-align: left;
}
.left-info-container h4{
    text-indent: 0.5em;
}
.left-info-container p{
    margin-left: 8px;
}
</style>