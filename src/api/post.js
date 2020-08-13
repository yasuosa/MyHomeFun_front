import request from '@/utils/request'
const group_name = '/post'

export default {
  // 首页各专栏帖子的分页查询呢
  getHomePostByCategory(data){
    return request({
      url: `${group_name}/getByPageOfHome`,
      method: 'post',
      data
    })
  },

  // 根据userid 获取 帖子 8条
  getUserPost(userId){
    return request({
      url: `${group_name}/getUserPost/${userId}`,
      method: 'get'
    })
  },

  // 根据用户对帖子的操作分页查询帖子
  getDeedPostDataByPage(data){
    return request({
      url: `${group_name}/getDeedPostDataByPage`,
      method: 'post',
      data
    })
  },

  // 分页查询
  getByPage(data){
    return request({
      url: `${group_name}/getMyAllPost`,
      method: 'post',
      data
    })
  },

  // 专栏页面的分页查询
  getListPage(data){
    return request({
      url: `${group_name}/getListPage`,
      method: 'post',
      data
    })
  },

  // 查询热门
  getHostPost(categoryId){
    return request({
      url: `${group_name}/getHostPostList/${categoryId}`,
      method: 'get'
    })
  },
  
  // 查看帖子
  read(postId){
    return request({
      url: `${group_name}/read/${postId}`,
      method: 'get'
    })
  },

  // 点赞帖子
  good(postId){
    return request({
      url: `${group_name}/good/${postId}`,
      method: 'get'
    })
  },
  // 收藏帖子
  collection(postId){
    return request({
      url: `${group_name}/collect/${postId}`,
      method: 'get'
    })
  },

  // 获取帖子隐藏内容的商品类型
  getHideGoods(postId){
    return request({
      url: `${group_name}/getHideGoods/${postId}`,
      method: 'get'
    })
  },


   // 添加帖子
   publish(data) {
    return request({
      url: `${group_name}/publish`,
      method: 'post',
      data
    })
  },
  // 删除帖子
  deleteById(id) {
    return request({
      url: `${group_name}/delete/${id}`,
      method: 'delete'
    })
  },

  // 设置置顶
  setTopById(id) {
    return request({
      url: `${group_name}/setTop/${id}`,
      method: 'get'
    })
  },

  // 取消置顶
  cancelTopById(id) {
    return request({
      url: `${group_name}/cancelTop/${id}`,
      method: 'get'
    })
  },

  // 设置精华
  setPerfectById(id) {
    return request({
      url: `${group_name}/setPerfect/${id}`,
      method: 'get'
    })
  },

   // 设置精华
  cancelPerfectById(id) {
    return request({
      url: `${group_name}/cancelPerfect/${id}`,
      method: 'get'
    })
  },

  // 根据id查询帖子
  getById(id) {
    return request({
      url: `${group_name}/getById/${id}`,
      method: 'get'
    })
  },
  // 修改帖子
  update(data) {
    return request({
      url: `${group_name}/update`,
      method: 'put',
      data
    })
  },

  
  // 查询回收站的
  getDeletePostPage(data){
    return request({
      url: `${group_name}/getDeletePost`,
      method: 'post',
      data
    })
  },

  // 彻底删除
  trueDeletePost(postId) {
    return request({
      url: `${group_name}/trueDeletePost/${postId}`,
      method: 'delete'
    })
  },

  // 还原
  recyclePost(postId){
    return request({
      url: `${group_name}/recyclePost/${postId}`,
      method: 'get'
    })
  }
}

