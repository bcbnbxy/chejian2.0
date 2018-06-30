
// 引用axios
var axios = require('axios')
import store from '../store'
import qs from 'qs'
import {buildSign} from '../assets/script/until.js'
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