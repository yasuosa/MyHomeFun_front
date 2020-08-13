<template>
    <basic-container>
        <div class="msg">
            <el-divider>
                <p >赞助VIP</p>
            </el-divider>
        </div>
        <avue-data-pay :option="option"></avue-data-pay>
    </basic-container>
</template>
<script>
export default {
  data(){
    return {
      option: {
        span: 8,
        data: [
          {
            title: '爱心赞助',
            src: 'assets/logo-1.png',
            money: '299',
            dismoney: '1',
            tip: '/永久',
            color: '#808695',
            subtext: '购买',
            click: function () {
              alert('弹窗');
            },
            list: [
              {
                title: '听说长得帅的都赞助了!',
                check: true,
              },
              {
                title: '好像上个月有个人赞助了,他就脱单了!',
                check: true,
              },
              {
                title: '真的好神奇哦!',
                check: true,
              },
              {
                title: '你还不赶紧试试吗',
                check: true,
              },
              {
                title: '心动不如行动!宝贝',
                check: true,
              },
              {
                title: 'Let do it!',
                check: true,
              }
            ]
          }, {
            title: '定制会员',
            src: 'images/vip2.png',
            color: '#ffa820',
            money: '999',
            dismoney: '10',
            tip: '/月',
            subtext: '购买',
            list: [
              {
                title: '懒得写了!',
                check: true,
              },
              {
                title: '就这样吧!',
                check: true,
              },
              {
                title: '- -',
                check: true,
              }
            ]
          }, {
            title: '人上人',
            src: 'images/vip3.png',
            color: '#ef4868',
            money: '9999999999999999',
            dismoney: '1',
            tip: '/永久',
            subtext: '购买',
            list: [
              {
                title: '大家都是人上人',
                check: true,
              }
            ]
          }
        ]
      },
    }
  }
}
</script>
<style scoped>
.msg{
    margin: 25px 0 25px 0;
}
.msg p{
    font-size: 24px;
}
.el-divider__text{
    background-color: #f5f7fa
}
</style>