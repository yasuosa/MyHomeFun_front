import request from '@/utils/request'
const group_name = '/notice'

// 分页查询
export default {
  getHomeNotice() {
    return request({
      url: `${group_name}/getHomeNotice`,
      method: 'get'
    })
  },

  // 阅读
  read(noticeId) {
    return request({
      url: `${group_name}/read/${noticeId}`,
      method: 'get'
    })
  }

}

