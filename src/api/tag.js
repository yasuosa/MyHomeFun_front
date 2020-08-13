import request from '@/utils/request'
const group_name = '/tag'

// 分页查询
export default {
  getListByCid(categoryId){
    return request({
      url: `${group_name}/getList/${categoryId}`,
      method: 'get'
    })
  },

  getList(){
    return request({
      url: `${group_name}/getList`,
      method: 'get'
    })
  }
}

