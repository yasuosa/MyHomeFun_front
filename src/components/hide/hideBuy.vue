<template>
    <div>
        <div class="hide-login-container">
            <i style="font-size: 100px;" class="iconfont icon-MBEfenggechangyongtubiao-gouwu"></i>
            <span>【购买可见】</span>
            <el-button type="text" @click="goBuy">立即购买</el-button>
        </div>


        <el-dialog
        :title="goods.name"
        :visible.sync="centerDialogVisible"
        width="22%"
        top="30vh"
        :close-on-click-modal="false"
        center>
        <div class="goods-container">
            <span style="color:#999;font-size:16px">{{goods.type===0 ?"积分支付":"金钱支付"}}</span>
            <i style="font-size:14px;margin-top:20px" class="el-icon-present"><span style="font-size:30px;color:#000;margin-left:5px">{{goods.price}}</span></i>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button  v-loading="loading" 
             element-loading-background="rgba(255, 255, 255, 0.5)"
            type="primary" style="width:100%" @click="toPay">支付</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import postApi from "@/api/post"
import goodsApi from '@/api/goods'
export default {
    props:{
        postId:{
            type:String,
            default:null
        }
    },
    data(){
        return{
            loading:false,
            centerDialogVisible:false,
            goods:{}
        }
    },
    methods:{
        goBuy(){
            if(this.$store.getters.getName === ''){
                this.$emit("login")
            }else {
                this.centerDialogVisible=true
                this.getGoodsData()
            }
        },
        getGoodsData(){
            postApi.getHideGoods(this.postId).then(res =>{
                this.goods=res.data
                console.log(this.goods)
            })
        },
        toPay(){
            this.loading=true
            goodsApi.payByPoints(this.goods.id).then(res =>{
                this.$message.success(res.msg)
                this.loading=false
                this.$emit("refreshPage")
            }).catch((err) => {
                this.loading=false
            })
        }
    }
}
</script>
<style scoped>
.goods-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}
/deep/ .el-dialog__header{
  padding: 20px 20px 10px ; 
}
.hide-login-container{
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
}
</style>