import request from '@/utils/request'
const group_name = '/type'

// 分页查询
export default {
    // 得到所有可用的分类
    getList() {
      return request({
        url:  `${group_name}/getList`,
        method: 'get'
      })
    }
}

