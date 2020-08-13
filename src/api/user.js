import request from '@/utils/request'
const group_name = '/user'

export default {
  // 登录
  login(data){
    return request({
      url: `login/loginByUserName`,
      method: 'post',
      data
    })
  },

  // 发送验证码邮件
  sendEmailCode(userEmail){
    return request({
      url: `${group_name}/getCode/${userEmail}`,
      method: 'get'
    })
  },

  // 注册
  registerUser(data){
    return request({
      url: `${group_name}/register`,
      method: 'post',
      data
    })
  },

  // 修改密码
  modifyPassWord(data){
    return request({
      url: `${group_name}/modifyPassWord`,
      method: 'put',
      data
    })
  },
  // 更新用户
  updateUser(data){
    return request({
      url: `${group_name}/modifyMyData`,
      method: 'put',
      data
    })
  },

  // 得到用户信息
  getUserInfo(){
    return request({
      url: `login/info`,
      method: 'GET',
    })
  },
  // 退出
  logout(){
    return request({
      url: `login/logout`,
      method: 'GET',
    })
  },
  // 得到用户主页信息
  getUserHome(userId){
    return request({
      url: `${group_name}/getUserHome/${userId}`,
      method: 'get'
    })
  }
}

