// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/style/base.css'
import '@/assets/style/font/iconfont.css'
import '@/assets/style/font/iconfont.js'
import api from './api/index.js'
import store from './store/index.js'
Es6Promise.polyfill();
fastclick.attach(document.body);
Vue.use(VueLazyload, {
error: require('./assets/img/shouye/imgerror.png'),  //图像的src加载失败
loading: require('./assets/img/shouye/imgerror1.png'), //src的图像加载
});
Vue.use(MintUI);
// 引用API文件
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.config.productionTip = false
/* eslint-disable no-new */
var $vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>' 
})