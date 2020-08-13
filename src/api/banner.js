import request from '@/utils/request'
const group_name = '/banner'

// 分页查询
export default {
  getList() {
    return request({
      url: `${group_name}/getList`,
      method: 'get'
    })
  }

}

