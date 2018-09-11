// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/style/base.css'
import '@/assets/style/font/iconfont.css'
import '@/assets/style/font/iconfont.js'
import api from './api/index.js'
import store from './store/index.js'
import MintUI from 'mint-ui'
import fastclick from 'fastclick'
import 'mint-ui/lib/style.css'
import Es6Promise from 'es6-promise'
import VueLazyload from 'vue-lazyload'
//import Vconsole from 'vconsole'
//let vConsole = new Vconsole()
Es6Promise.polyfill();
Vue.use(VueLazyload, {
preLoad: 1,    //预加载高度的比例
error: require('./assets/img/shouye/imgerror.png'),  //图像的src加载失败
loading: require('./assets/img/shouye/imgerror.png'), //src的图像加载
attempt: 1,  //尝试计数
listenEvents: [ 'scroll'] //你想要监听的事件,我个人喜欢全部监听，方便
});
Vue.use(MintUI);
fastclick.attach(document.body)
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