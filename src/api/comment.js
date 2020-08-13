import request from '@/utils/request'
const group_name = '/comment'

export default {

  // 分页查询所有评论
  getListPage(data){
    return request({
      url: `${group_name}/getListPage`,
      method: 'post',
      data
    })
  },

  deleteById(commentId){
    return request({
      url: `${group_name}/delete/${commentId}`,
      method: 'delete',
    })
  },

  // 获取我的评论
  getMyComment(data){
    return request({
      url: `${group_name}/getMyComment`,
      method: 'post',
      data
    })
  },

  // 添加评论
  publish(data){
    return request({
      url: `${group_name}/publish`,
      method: 'post',
      data
    })
  },

   // 添加评论
   good(commentId){
    return request({
      url: `${group_name}/good/${commentId}`,
      method: 'get'
    })
  }
}

