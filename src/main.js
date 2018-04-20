import Vue from 'vue'
import app from './App.vue'
import { Header,Button,Swipe,SwipeItem } from 'mint-ui';
import './lib/mui/css/mui.min.css'
import './css/icons-extra.css'
import Router from 'vue-router'
Vue.use(Router);
import VueResource from 'vue-resource'
// 设置请求api服务器的根路径
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);

// 暂时还没写 先引入之后的路由模块
import router from './router.js'


var vm = new Vue({
  el: '#app',
  render:c=>c(app),
  router
})
