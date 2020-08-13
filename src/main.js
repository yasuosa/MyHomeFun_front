import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import '@/assets/icon-aliyun/iconfont.css'
import '@/permission.js'
import Router from 'vue-router'

import Highlight from '@/utils/highlight/highlight'


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer);
// use

Vue.use(Avue);
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(Highlight)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// });


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
