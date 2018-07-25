const util=require('./md5.js');
const regExs = {
  code: /^[1]\d{10}$/,  // 手机验证码
  /**
   * 手机号码:
   * 13[0-9], 14[5,7], 15[0, 1, 2, 3, 5, 6, 7, 8, 9], 17[0, 1, 6, 7, 8], 18[0-9]
   * 移动号段: 134,135,136,137,138,139,147,150,151,152,157,158,159,170,178,182,183,184,187,188
   * 联通号段: 130,131,132,145,155,156,170,171,175,176,185,186
   * 电信号段: 133,149,153,170,173,177,180,181,189
   */
  mobile: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,  // 手机号
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,  // 邮件
  name: /^[a-zA-Z\u4e00-\u9fa5]{2,16}$/,  // 中文名
  password:/^[\x21-\x7E]{6,20}$/,  // 密码
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,  // 身份证
  nickname: /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\d]+$/, //昵称
  yzm:/^\d{6}$/ //六位数字验证码
}
/**
 * 获取地址栏参数
 * @param key 参数名
 */
function getParam (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  const r = window.location.search.substring(1).match(reg)
  return r ? decodeURI(r[2]) : null
}
/**
 * 接口地址加密
 * params传入的参数对象  key为设备唯一识别号
 */
function buildSign (params, key){
		  var names = [];
		  for (var paramName in params) {
		    names.push(paramName);
		  }
		  names.sort();
		  var str = '';
		  for(var i = 0; i < names.length; i++){
		    var name = names[i];
		    var value = params[name];
		    if(value==undefined){
		    	continue;
		    }
		    if(name=='__sign__'){
		    	continue;
		    }
		    str += name;
		    str += value;
		    str += "&";
		  }	
		  str += util.hexMD5(key);
		  str = util.utf8(str);
		  str = util.hexMD5(str);		 
		  return str;
		}
export {
  getParam,
  regExs,
  buildSign
}