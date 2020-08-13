import request from '@/utils/request'
const group_name = '/category'

// 查询所有可用的转乱
export default {
  getList(){
    return request({
      url: `${group_name}/getList`,
      method: 'get',
    })
  },
  getHomePostByCategory(data){
    return request({
      url: `${group_name}/getByPageOfHome`,
      method: 'post',
      data
    })
  }
}

