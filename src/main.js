// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/style/base.css'
import '@/assets/style/font/iconfont.css'
import '@/assets/style/font/iconfont.js'
import store from './store/index.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
Vue.use(MintUI);
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.config.productionTip = false
/* eslint-disable no-new */


//const ua = window.navigator.userAgent
document.addEventListener( "plusready",function(){
	/*************判断系统版本******************/
	const ua=window.navigator.userAgent
	if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
  window.sys = 'android';
  window.uuid=plus.device.uuid;
} else if (/\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)) {
  window.sys = 'ios';
  window.uuid=plus.device.uuid;
} else {
  alert("请下载app浏览")
}
alert(window.sys+"             "+window.uuid);
},false)


var $vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
