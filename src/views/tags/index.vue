<template>
    <div class="tag-contanier">
        <div class="msg">
            <el-divider>
                <p >热门标签</p>
            </el-divider>
        </div>
        <div class="tags-list">
            <div @click="selectByTag(item)" class="box" v-for="(item,index) in tagsList" :key="item.id" :style="rgbArray[index].style">
                <p class="tags-info1">{{item.name}}</p>
                <p class="tags-info2">当前共有{{item.count}}篇文章</p>
            </div>
        </div>
    </div>
</template>
<script>
import tagApi from '@/api/tag'
export default {
    data(){
        return {
            hslArray: [],
            tagsList:[]
        }
    },
    created: function () {
        this.getAllTags()
    },
    methods: {
     selectByTag(item){
         const params={
                tagId:item.id
         }
         this.$router.push({ path:"/search", name:"PostTag",params:{params:JSON.stringify(params),name:item.name} })
     },
     getAllTags(){
         tagApi.getList().then(res =>{
             this.tagsList=res.data
             this.hslArray = this.getHslArray();
         })
     },
    /**
     * HSL颜色值转换为RGB
     * H，S，L 设定在 [0, 1] 之间
     * R，G，B 返回在 [0, 255] 之间
     *
     * @param H 色相
     * @param S 饱和度
     * @param L 亮度
     * @returns Array RGB色值
     */
    hslToRgb: function (H, S, L) {
      var R, G, B;
      if (+S === 0) {
        R = G = B = L; // 饱和度为0 为灰色
      } else {
        var hue2Rgb = function (p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        var Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        var P = 2 * L - Q;
        R = hue2Rgb(P, Q, H + 1/3);
        G = hue2Rgb(P, Q, H);
        B = hue2Rgb(P, Q, H - 1/3);
      }
      return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
    },

    // 获取随机HSL
    randomHsl: function () {
      var H = Math.random();
      var S = Math.random();
      var L = Math.random();
      return [H, S, L];
    },

    // 获取HSL数组
    getHslArray: function () {
      var HSL = [];
      var hslLength = 30; // 获取数量  this.tagList.length
      for (var i = 0; i < hslLength; i++) {
        var ret = this.randomHsl();

        // 颜色相邻颜色差异须大于 0.25
        if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
          i--;
          continue; // 重新获取随机色
        }
        ret[1] = 0.7 + (ret[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
        ret[2] = 0.4 + (ret[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色

        // 数据转化到小数点后两位
        ret = ret.map(function (item) {
          return parseFloat(item.toFixed(2));
        });

        HSL.push(ret);
      }
      return HSL;
    }
  },
    computed: {
            rgbArray: function () {
            var self = this;
            if (!self.hslArray.length) return [];

            var rgbArray = self.hslArray.map(function (item) {
                return self.hslToRgb.apply(this, item);
            });

            return rgbArray.map(function (item,index) {
                return {
                id:index,
                // 这边加tag tag:this.tagLits[index]
                value: item,
                style: { background: 'rgb(' + item.toString() + ')' }
                }
            });
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
.tag-contanier{
    display: flex;
    flex-direction: column;
    height:100%;
    width: 100%;
}
.tags-list{
    /* background-color: violet; */
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
}
.box{
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    margin: 15px;
    width: 180px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 5px solid transparent;
}
.box:hover{
    border-radius: 5px;
    border: 5px solid white;
}
.tags-info1{
    font-size: 24px;
    font-weight: bold;
    color: white;
}
.tags-info2{
    font-size: 15px;
    color: rgba(255, 255, 255, 0.63)
}
</style>