<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view  v-if="isRouterAlive" />
    <!-- </keep-alive> -->
  </div>
</template>
<script>
export default {
    name: 'app',
    provide(){
        return{
           reload:this.reload
        }
    },
    data(){
        return{
           isRouterAlive:true
        }
    },
    methods:{
        reload(){
           this.isRouterAlive =false;
           this.$nextTick(function(){
                this.isRouterAlive=true
           })
        }
    }
}
</script>
<style lang="stylus">
* {
  margin 0
  padding 0
}
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background-image url('assets/site-bg.png')
  background-color #f6f7f8;

.avue-comment__main{
    margin: 0 10px;
}
.avue-comment__body{
    min-height: 100px !important;
    text-align: left;
}
.avue-comment__header{
    height: 30px;
}
.avue-comment{
    margin-bottom: 10px;
}
</style>
