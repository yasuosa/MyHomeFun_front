import request from '@/utils/request'
const group_name = '/sign'


export default {
  // 签到
  sign(data) {
    return request({
      url: `${group_name}/signIn`,
      method: 'get'
    })
  },
  getTodayAllSign(data){
    return request({
      url: `${group_name}/getTodayAllSign`,
      method: 'post',
      data
    })
  },

  getContinueSignDay(data){
    return request({
      url: `${group_name}/getContinueSignDay`,
      method: 'post',
      data
    })
  }



}

