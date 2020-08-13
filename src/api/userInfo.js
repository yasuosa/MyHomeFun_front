import request from '@/utils/request'
const group_name = '/userInfo'

// 分页查询
export default {
  getMyUserInfo(categoryId){
    return request({
      url: `${group_name}/getMyUserInfo`,
      method: 'get'
    })
  }
}

