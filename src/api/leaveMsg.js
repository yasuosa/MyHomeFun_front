import request from '@/utils/request'
const group_name = '/leaveMessage'

// 分页查询
export default {
  getListPage(data){
    return request({
      url: `${group_name}/getListPage`,
      method: 'post',
      data
    })
  },

   save(data){
    return request({
      url: `${group_name}/save`,
      method: 'post',
      data
    })
  }
}

