<template>
  <div >
  <div class="container">
    <el-form ref="post"  :hide-required-asterisk='true' :model="post" :rules="rules"  class="demo-post">

      <!-- 封面 -->
      <el-form-item prop="postCover">
        <el-tooltip class="item" effect="dark" content="封面" placement="left">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
          name="mf"
        >
        <div style="width:100%">
          <img v-if="post.postCover" :src="post.postCover" class="avatar">
          <div v-else  class="avatar-uploader-icon">
             <i  class="iconfont icon-tianjiatupian" style="font-size:50px" />
          </div>
        </div>
        </el-upload>
        </el-tooltip>
      </el-form-item>

      <!-- 文章专栏分类 -->
       <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="专栏" prop="postCategoryId">
            <el-select v-model="post.postCategoryId" placeholder="请选择专栏" clearable>
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类" prop="postTypeId">
            <el-select v-model="post.postTypeId" placeholder="请选择分类" clearable>
               <el-option
                v-for="item in typeList"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item  prop="postTitle">
        <el-input v-model="post.postTitle" placeholder="标题"  clearable/>
      </el-form-item>
    

      <el-form-item  required prop="postContent">
          <mavon-editor placeholder="全屏编辑,更加清爽" :scrollStyle="true" ref="md" v-model="post.postContent"  @imgAdd="$imgAdd" />
      </el-form-item>

       <el-form-item  label="隐藏资源" prop="isHasHideContent">
        <el-switch
        ref="hideOn" 
          v-model="post.isHasHideContent"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>

          <transition name="el-fade-in">
      <el-form-item  v-if="post.isHasHideContent ===1" label="隐藏内容" prop="hideContent">
        <mavon-editor  placeholder="全屏编辑,更加清爽"   ref="mdHide" v-model="post.hideContent"  @imgAdd="$imgAdd2" />
      </el-form-item>
      </transition>

      <el-form-item >
        <el-collapse>
          <el-collapse-item v-if="post.isHasHideContent ===1" title="权限">
            <div class="other-style">
              <p>如果您在文章中设置了隐藏内容，需要在此处设置查看权限，方可正常隐藏。</p>
              <el-select v-model="post.postHideContentPermission" size="mini" placeholder="请选择" clearable>
                <el-option label="登录可见" value="hide_content:login"/>
                <el-option label="评论可见" value="hide_content:comment"/>
                <el-option label="购买可见" value="hide_content:buy"/>
              </el-select>
              <el-collapse-transition>
              <div v-if="post.postHideContentPermission === 'hide_content:buy'" class="hide-content-price">
                  积分：
                   <el-input-number size="mini" v-model="post.price" :precision="2" :step="1" :min="0" :max="50"></el-input-number>
              </div>      
              </el-collapse-transition> 
            </div>
            
          </el-collapse-item>
          <el-collapse-item title="标签">
            <div class="other-style">
              <p>请输入标签,最多填4个</p>
            
              <div class="tag-container">
                <i class="el-icon-collection-tag" />
                <a v-for="item in post.tagNames" :key="item" class="item-tag" @click="removeTag(item)">{{ item }}</a>
                <el-input v-if="isShowAddTag" v-model="tagName" width="100%" size="mini" placeholder="请输入标签" @change="addTag" />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="摘要">
            <div class="other-style">
              <p>请输入描述内容</p>

              <el-input v-model="post.postRemark" type="textarea" width="100%" size="mini" placeholder="请输入文章简要" />

            </div>
          </el-collapse-item>
          </el-collapse>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否公开" prop="isPublic">
            <el-switch
              v-model="post.isPublic"
              active-text="公开"
              inactive-text="私密"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论" prop="allowComment">
            <el-switch
              v-model="post.allowComment"
              active-text="允许"
              inactive-text="禁止"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="文章来源" prop="postFromSource">
        <el-input v-model="post.postFromSource" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('post')">{{ isUpdate? "修改":"发布" }}</el-button>
        <el-button @click="resetForm('post')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
import categoryApi from '@/api/category'
import typeApi from '@/api/type'
import postApi from '@/api/post'
import fileApi from '@/api/file'
export default {
  data() {
    return {
      isHasHideContent:false,
      post: {
        postTitle: '',
        postCategoryId: '',  // 专栏id
        postTypeId:'', // 分类id
        postCover: '', // 封面
        postContent:'' , // 内容
        postRemark:'' ,// 简要
        postFromSource:'' , //来源
        postHideContentPermission:'' ,// 隐藏权限
        hideContent:'',//隐藏资源
        isHasHideContent:0, // 是否有隐藏
        price:'', // 价格
        tagNames: [], // 标签ids
        allowComment:0, // 是否可以评论
        isPublic:0   // 是否公开
      },
      isUpdate: false,
      uploadImgUrl: process.env.VUE_APP_BASE_UPLOAD_IMG, // 上传图片路径
      headers: { // 请求头
        token: this.$store.getters.getToken
      },
      isShowAddTag: true, // 控制添加标签
      categoryList: [], // 查询权限列表
      typeList: [], //  查询分类列表
      tagName:'', // 添加的标签名
      rules: {
        postTitle: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' }
        ],
        postTypeId: [
          { required: true, message: '请选择帖子分类', trigger: 'change' }
        ],
        postCategoryId: [
          { required: true, message: '请选择帖子专栏', trigger: 'change' }
        ],
        postContent:[
          { required: true, message: '请填写内容', trigger: 'change' }
        ],
        isPublic: [
          { required: true, message: '请选择帖子是否公开', trigger: 'change' }
        ],
        allowComment: [
          { required: true, message: '请选择是否开发评论', trigger: 'change' }
        ]

      }
    }
  },
  mounted() {
    console.log(this.$route.query.post.postId)
    if (this.$route.query.post.postId) {
      this.post = this.$route.query.post
      this.isUpdate = true
    } else {
      this.isUpdate = false
    }
  },
  created() {
    this.getTypeList()
    console.log(this.$store.getters.getCategoryList)
    if(this.$store.getters.getCategoryList.length === 0) {
      this.getCateGoryList();
    }else {
      this.categoryList=this.$store.getters.getCategoryList
    }

  },
  methods: {
    //得到可用专栏
    getCateGoryList(){
        categoryApi.getList().then(res =>[
            this.categoryList=res.data
        ])
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log($file)
      var formdata = new FormData()
      formdata.append('mf', $file)
      fileApi.uploadImg(formdata).then(res => {
        this.$message.success(res.msg)
        this.$refs.md.$img2Url(pos, res.data.path)
      })
    },
    $imgAdd2(pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log($file)
      var formdata = new FormData()
      formdata.append('mf', $file)
      fileApi.uploadImg(formdata).then(res => {
        this.$message.success(res.msg)
        this.$refs.mdHide.$img2Url(pos, res.data.path)
      })
    },
    // 得到可用分类
    getTypeList() {
      typeApi.getList().then(res => {
        this.typeList = res.data
      })
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid,obj) => {
        if (valid) {
          console.log(this.post)
          if (this.isUpdate) {
            // 更新
            if(this.post.isHasHideContent ===1 && this.post.postHideContentPermission.length ===0){
               this.$message.error("请选择隐藏内容权限")
            }
            else {
              postApi.update(this.post).then(res => {
                this.$message.success(res.msg)
                this.$router.push('/user/setting/postManager')
              })
            }
          } else {
            // 发布
            if(this.post.isHasHideContent ===1 && this.post.postHideContentPermission.length ===0){
               this.$message.error("请选择隐藏内容权限")
            }else{
              postApi.publish(this.post).then(res => {
                this.$message.success(res.msg)
                this.$router.push('/user/setting/postManager')
              })
            }
          }
        } else {
          this.$notify.error({
            title: '提示',
            message: '请填写必填项',
            offset:500
          });
          return false
        }
      })
    },
    addTag(value) {
      const index = this.post.tagNames.findIndex(item => item === value)
      const length = this.post.tagNames.length
      if (index !== -1) {
        this.$message.error('你已经填写此标签,请勿重复填写')
      } else if (length > 3) {
        this.$message.error('文章最多可贴四个标签')
        this.isShowAddTag = false
        this.tagName = null
      } else {
        // console.log(value)
        if(value!=='' || value !==null){
          this.post.tagNames.push(this.tagName)
        }
        this.tagName = null
      }
    },
    removeTag(tag) {
      this.isShowAddTag = true
      const index = this.post.tagNames.findIndex(item => item === tag.name)
      this.post.tagNames.splice(index, 1)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.post.postCover = res.data.path
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5

      // if (!isJPG  ) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M
    }
  }
}
</script>
<style scoped >
/deep/ .el-form-item__label{
  color: #000;
  font-weight:600;
}
/deep/ .el-form-item__content{
  text-align: left;
}
 /deep/ .el-upload {
  width: 100%;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
     border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 100%;

    display: block;
  }
  /deep/ .el-collapse-item__header {
      background-color: #fafafa !important;
      border:1px dashed #ebebeb !important;

      padding-left: 10px !important;
  }
  .other-style{
      background-color: #fff !important;
      border:1px dashed #ebebeb !important;
         border-bottom: hidden !important;
      padding-left: 10px !important;
      padding-bottom: 10px !important;
  }
  /deep/ .el-collapse-item__content{
      padding-bottom: 0px !important;
  }
  .tag-container{
     display: flex;
     flex-direction: row;
     align-items: center;
    align-content: space-between;
  }
  .item-tag{
    cursor: pointer;
      width: 100%;
      line-height: 20px;
      text-align: center;
      margin: 5px;
      height: 25px;
      box-shadow: inset 0 0 9px rgba(204,204,204,.39);
      font-size: 10px;
      padding: 5px;
  }
  .item-tag:hover{
      background-color: #409EFf;
      color: white;
  }
  .container{
    margin: 15px;
  }
  .hide-content-price{
    margin-top: 10px;
  }
  
</style>
