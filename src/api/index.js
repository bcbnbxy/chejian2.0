
// 引用axios
var axios = require('axios')
import router from '../router'
import store from '../store'
import qs from 'qs'
import {buildSign} from '../assets/script/until.js'
import { Toast,MessageBox } from 'mint-ui';
var root='/customer'
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
axios.defaults.timeout = 5000;
axios.defaults.baseURL =root;
axios.interceptors.request.use(config => {
			if(config.url.indexOf('Execute.do') != -1){
				let publicOPtion=store.state.common.publicOption
				publicOPtion.__timestamp__=new Date().getTime()
				if(localStorage.getItem("loginInfo")){				
						publicOPtion.__mobileno__=JSON.parse(localStorage.getItem("loginInfo")).mobileno;
				}else{
					delete(publicOPtion.__mobileno__);
				}
		    config.data =Object.assign(config.data,publicOPtion)
				config.data.__sign__=buildSign(config.data,config.data.__uuid__)
				config.data=qs.stringify(config.data)
				config.headers = {
						'Content-Type':'application/x-www-form-urlencoded'
				}	
			}	
      return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
	if(response.status===200&&response.data.errorCode=="you.must.relogin"){
			MessageBox.confirm('', {
		        message: '请重新登陆',
		        showConfirmButton:true,
		        showCancelButton:true,
		        confirmButtonText:'确定',
		        cancelButtonText:'取消'
	        }).then(action => {
	          if (action == 'confirm') {	
			        localStorage.removeItem('loginInfo');
			        store.commit('setblog_userseq');
			        router.push('/bootPage')
	          }
	        }).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });	
	}
	return response;
}, (error) => {
	if(!error.response){
		Toast({
		  message: '网络开小差了⊙﹏⊙!',
		  position: 'bottom',
		  duration: 1500
		});
		router.replace('/nonetwork')
	}else{
		if (error.response.status == 504||err.response.status == 404) {
		    Toast({
				  message: '服务器被吃了⊙﹏⊙∥',
				  position: 'bottom',
				  duration: 1500
				});
		} else if (error.response.status == 403) {
		    Toast({
				  message: '权限不足,请联系管理员!',
				  position: 'bottom',
				  duration: 1500
				});
		}else {
		   Toast({
				  message: '未知错误',
				  position: 'bottom',
				  duration: 1500
				});
		}
	}	
return Promise.resolve(error);
})

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
   export default function post(url,data){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
   })
}