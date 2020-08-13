import request from '@/utils/request'
const group_name = '/goods'


export default {
  // 积分支付
  payByPoints(goodsId) {
    return request({
      url: `${group_name}/payPoints/${goodsId}`,
      method: 'get'
    })
  }

}

