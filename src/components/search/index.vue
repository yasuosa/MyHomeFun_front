<template>
    <div>
        <el-button @click="openSearchDialog" icon="el-icon-search" circle></el-button>


        <el-dialog
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="70%"
        top="30vh">
        <div class="search-info-container">
            <!-- <el-form ref="search" :hide-required-asterisk='true' :rules="rules" style="margin-top:20px;width:100%" :inline="true" :model="params" class="demo-form-inline"> -->
            <!-- <el-form-item label="帖子标题" prop="postTitle"> -->
                <span class="label" >标题</span>
                <el-input v-model="params.postTitle"  placeholder="请输入标题" clearable></el-input>
            <!-- </el-form-item> -->
            <!-- <el-form-item> -->
                <el-button type="primary" style="margin-right:50px;margin-left:10px" circle  icon="el-icon-search" @click="submitForm"></el-button>
            <!-- </el-form-item> -->
            <!-- </el-form> -->
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
        local:{
            type:Boolean,
            default:false
        },
    },
    data(){
        return{
            dialogVisible: false,
            params:{
                postTitle:""
            },
            rules: {
                postTitle: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        openSearchDialog(){
            this.params.postTitle=""
            this.dialogVisible=true
        },
        
        submitForm(formName) {
            // console.log(JSON.stringify(this.params))
            // 不在当前页
            if(this.params.postTitle.length ===0){
                this.$message.error("请输入搜索的帖子标题")
            }else{
                if(!this.local){
                    this.$router.push({ path:"/search", name:"PostTag",
                        params:{ 
                            params:JSON.stringify(this.params),
                            name:this.params.postTitle
                            }  
                        })
                }else{
                    this.$emit("search",this.params,this.params.postTitle)
                }
                this.dialogVisible=false
            }
      },
    }
}
</script>
<style scoped>
.search-info-container{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
}
.label{
    text-align: right;
    height: 30px;
    line-height: 30px;
    color: black;
    font-size: 24px;
    width: 100px;
    padding-right: 5px;
}

</style>