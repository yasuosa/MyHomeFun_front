<template>
    <div class="info-container">
        <div class="left-container">
            <div class="left-header-container">
                <i style="font-size:12px;color:#ff6700;margin-right:5px;margin-left:10px" class="iconfont icon-qian"></i>
                <p>我的财富</p>
            </div>
             <div style="background-color:rgba(44, 62, 80, 0.13);height:1px;width:100%;margin-top:9px;margin-bottom:10px"></div>
            <div class="left-money-container">
                <div style="display: flex;flex-direction: row;align-items:center;">
                    <p>余额:</p>
                    <el-tag type="danger" style="margin-left:5px" >￥{{userInfo.money}}</el-tag>
                </div>
                <el-button type="danger" size="mini"  >充值</el-button>
            </div>
            <el-divider></el-divider>
            <div class="left-money-container">
                <div style="display: flex;flex-direction: row;align-items:center;">
                    <p>积分:</p>
                    <el-tag style="margin-left:5px" ><i class="iconfont icon-SQLserver"></i>{{userInfo.accumulatePoints}}</el-tag>
                </div>
                <el-button type="danger" size="mini">积分充值</el-button>
            </div>
            <div style="background-color:rgba(44, 62, 80, 0.13);height:1px;width:100%;margin-top:10px"></div>
            <!-- <el-divider></el-divider> -->

            <!-- 查询 -->
            <el-menu default-active="1"  @select="selectPayMoneyHandler" class="el-menu-demo" mode="horizontal" >
                <el-menu-item index="1">积分记录</el-menu-item>
                <el-menu-item index="2">余额记录</el-menu-item>
            </el-menu>

            <!-- 表格 -->
            <div>
                 <el-table  v-loading="loading" :data="journalListData" border style="width: 100%;font-size:12px;height:300px">
                    <el-table-column :formatter="formatterTime" prop="createdTime" label="时间" >
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型"  > </el-table-column>
                    <el-table-column prop="payMoney" label="数额"></el-table-column>
                    <el-table-column prop="accountMoney" label="总金额">
                        <template  slot-scope="scope">
                            <span style="color:red"> ￥{{scope.row.accountMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="accountPoints" label="总积分">
                        <template  slot-scope="scope">
                            <span style="color: #409EFF">{{scope.row.accountPoints}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="描述"></el-table-column>
                </el-table>

                <div style="padding:15px">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="page.total">
                    </el-pagination>    
                </div>
        
            </div>


        </div>
        <div class="right-container">
            <div class="left-info-container" >
                <h4 style="font-size:14px;margin-top:10px">获取积分</h4>
                <p style="font-size:12px;margin-top:10px;padding-right:5px">
                    你可以通过投稿,评论,发帖,签到来获得积分,也可以通过购买等方式
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
import userInfoApi from '@/api/userInfo'
import journalApi from '@/api/journal'
import {parseTime,formatTime} from "@/utils/index"
export default {
    data(){
        return {
            loading:true,
            userInfo:{
                money:"",
                accumulatePoints:""
            },
            page:{
                currentPage:1,
                pageSize:10,
                total:10,
                params:{
                    paymentMoneyType:0   // 0积分 1金钱
                }
            },
            journalListData:[]
        }
    },
    created(){
        this.getUserInfo()
        this.getJournalListData()
    },
    methods:{
        getUserInfo(){
            userInfoApi.getMyUserInfo().then(res =>{
                this.userInfo=res.data
            })
        },
        getJournalListData(){
            this.loading=true
            journalApi.getMyJournalList(this.page).then(res =>{
                this.page=res.data
                this.journalListData=this.page.data
                this.page.data=null
                this.loading=false
            })
        },
        handleCurrentChange(val) {
           this.page.currentPage=val
           this.getJournalListData()
        },
        selectPayMoneyHandler(index,path){
            this.page.currentPage=1
            // 积分
            if(index === '1'){
                this.page.params.paymentMoneyType=0
            }else {
                this.page.params.paymentMoneyType=1
            }
            this.getJournalListData()
        },
        formatterTime(row, column, cellValue, index){
            return formatTime(new Date(parseTime(cellValue)))
        }
    }
}
</script>
<style scoped>
.left-money-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
}
.left-header-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 10px;
    padding-left: 5px;
    height: 30px;
    font-size: 13px;
    align-items: center;
}
/deep/ .el-table .cell{
    color: #000;
}
/deep/ .el-divider--horizontal{
    margin: 10px 0px;
}
.info-container{
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