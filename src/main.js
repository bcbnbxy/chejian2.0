// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/style/base.css'
import '@/assets/style/font/iconfont.css'
import '@/assets/style/font/iconfont.js'
import store from './store/index.js'
//import fastclick from 'fastclick'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();
//import Vconsole from 'vconsole'
//let vconsole = new Vconsole()
//fastclick.attach(document.body)
Vue.use(MintUI);
// 引用API文件
import api from './api/index.js'
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