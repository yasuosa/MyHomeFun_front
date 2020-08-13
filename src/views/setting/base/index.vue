<template>
  <div class="user-info">
    <el-row :span="24">
      <el-col :span="8"> 
        <div class="baseManager-header-container">
            <div class="user-info__content">
            <img class="user-info__img"
                 :src="user.headerUrl"
                 alt="" />
            <p class="user-info__name">{{user.nickname}}</p>
            <p class="user-info__desc">{{user.realname}}</p>
            <div class="user-info__detail-desc">
              <p><i class="el-icon-message"></i><span>{{user.userEmail}}</span></p>
              <p style="padding:0px 10px"><i class="el-icon-postcard"></i><span>{{user.sign}}</span></p>
              <p><i class="el-icon-location-information"></i><span>{{user.address}}</span></p>
            </div>
          </div>

        </div>
          
      </el-col>
      <el-col :span="0.1"><div style="width:1px;height:600px;background-color:rgb(0 0 0 / 5%)"></div></el-col>
      <el-col :span="15">
          <avue-tabs :option="option"
                     v-model="user"
                     @change="handleChange"
                     @submit="handleSubmit">
           <template slot-scope="scope" slot="headerUrl">
            <div>
              <el-upload
                class="avatar-uploader"
                :action='uploadImgUrl'
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="mf"
                :before-upload="beforeAvatarUpload">
                <img v-if="user.headerUrl" :src="user.headerUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </template>           
          </avue-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data () {
    return {    
      uploadImgUrl: process.env.VUE_APP_BASE_UPLOAD_IMG, // 上传图片路径
      headers: { // 请求头
        token: this.$store.getters.getToken
      }, 
      option: {
        tabs:true,
        emptyBtn:false,
        column: [{
          label: '个人信息',
          option: {
            submitText: '修改',
            size: 'small',
            submitBtn:true,
            labelWidth: 75,
            column: [ 
            {
              label: '登录名',
              span: 12,
              prop: 'username',
              disabled:true
            },
            {
              label: '用户Id',
              span: 12,
              prop: 'userId',
              disabled:true
            },
            {
              label: '姓名',
              span: 12,
              prop: 'realname'
            }, 
            {
              label: '昵称',
              span: 12,
              prop: 'nickname'
            },{
              label: '邮箱',
              row: true,
              span: 12,
              prop: 'userEmail'
            }, 
            {
              label: '电话',
              row: true,
              span: 12,
              prop: 'phone'
            },{
              label: '简介',
              type: 'textarea',
              span: 24,
              prop: 'sign'
            },  {
              label: '地址',
              span: 24,
              prop: 'address'
            },
             {
              labelWidth:75,
              label: '注册时间',
              span: 24,
              prop: 'createdTime',
              disabled:true
            }]
          }
        }, 
        {
          label: '修改头像',
          prop: 'headerUrl',
          option: {
            labelWidth: 70,
            size: 'small',
            submitText: '修改',
            column: [
              {
                label: '头像',
                prop: 'headerUrl',
                // type: 'upload',
                // listType: 'picture-img',
                 formslot:true,

                // propsHttp: {
                //   res: 'data.path'
                // },
                // action: '/upload/uploadImg',
                // tip: '只能上传jpg/png用户头像，且不超过20Mb',
                // span: 16,
                // prop: 'headerUrl',
                // fileName:'mf',
                // headers:{
                //   token:this.$store.getters.getToken
                // }
              }
            
            ]
          }
        },
        {
          label: '修改密码',
          prop: 'password',
          option: {
            labelWidth: 80,
            size: 'small',
            submitText: '修改',
            column: [ {
              label: '新密码',
              span: 16,
              row: true,
              type: 'password',
              prop: 'newpassword'
            }, {
              label: '确认密码',
              span: 16,
              row: true,
              type: 'password',
              prop: 'password'
                  }]
                }
        }
        ]
      },
      // user: {
      //   userId: 1,
      //   username: "rpy",
      //   realname: "任鹏宇",
      //   sex: 1,
      //   headerUrl: "http://47.101.138.164/group1/M00/00/01/rBEgSV7x1tGAQeKAAAAg3IAUeqQ844.jpg",
      //   nickname: "Koi",
      //   userEmail: "601529188@qq.com",
      //   sign: "在校 大三 软工 学生一枚~，希望自己成为一个有钱且有趣的人，实在不行，光有钱也行。",
      //   phone: null,
      //   address: "安徽黄山",
      //   createdTime: "2020-06-20 10:32:06"
      // },
      user:this.$store.getters.getUser,
      type:"info",
      uploadImgSuccess:false,
    };
    },
  created () {

  },
  methods: {
    handleSubmit(from) {
      // 基础修改
      // console.log(from)
      if(this.type === 'info'){
        userApi.updateUser(from).then(res =>{
          this.$message.success(res.msg)
          this.$store.commit('SET_USER', this.user)
        })
      }
      // 修改头像
      else if(this.type === 'headerUrl'){
        from.userId=this.user.userId
        userApi.updateUser(from).then(res =>{
          this.$message.success(res.msg)
          this.$store.commit('SET_USER', this.user)
          this.$store.commit('SET_AVATAR', this.user.headerUrl)
        })
      }
      // 修改密码
      else{
        if(from.newpassword !== from.password){
          this.$message.error("两次密码不一致！")
        }else if(from.newpassword.length ===0 || from.password.length ===0){
          this.$message.error("请填写完整！")
        }else{
          userApi.modifyPassWord(from).then(res =>{
            this.$message.success(res.msg)
          })
        }
      }
    },
    handleChange(item) {
      this.type = item.prop;
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if(res.code === 20000){
        this.uploadImgSuccess =true
        this.user.headerUrl=res.data.path
      }else {
        this.uploadImgSuccess =false
      }
    },
    beforeAvatarUpload(file) {
      const allowType=[
        'image/jpeg',
        'image/png',
        'image/gif'
      ]
      console.log(file.type)
      const isJPG = allowType.indexOf(file.type) !== -1;
      const isLt2M = file.size / 1024 / 1024 <5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.baseManager-header-container{
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-info {
  .avue-tabs {
    padding: 0 10px;
  }
  .el-tabs__content {
    padding: 20px 0;
  }
  &__img {
    display: block;
    margin: 0 auto;
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
  &__name {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0;
    margin-top: 10px;
  }
  &__setting {
    margin-bottom: 12px;
    display: block;
    font-size: 12px;
    color: #409eff;
    text-align: center;
  }
  &__desc {
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }
  &__detail-desc {
    margin-top: 50px;
    font-size: 14px;
    p {
      margin-bottom: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  &__divider {
    border-top: 1px dashed #e8e8e8;
    display: block;
    height: 0;
    width: 100%;
    margin: 24px 0;
    clear: both;
  }
  &__tags {
    .el-tag {
      margin: 0 5px 5px 0;
    }
  }
}
</style>
