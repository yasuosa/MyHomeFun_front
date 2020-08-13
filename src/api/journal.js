import request from '@/utils/request'
const group_name = '/journal'

export default {

  // 分页查询所有评论
  getMyJournalList(data){
    return request({
      url: `${group_name}/getMyJournalList`,
      method: 'post',
      data
    })
  }
}

