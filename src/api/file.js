import request from '@/utils/request'
const group_name = '/upload'

// 分页查询
export default {
  uploadImg(data) {
    return request({
      url: `${group_name}/uploadImg`,
      method: 'post',
      data: data
    })
  }

}

