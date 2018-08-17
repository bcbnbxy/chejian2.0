<template>
	<div class="register-wrap">
		<div class="register-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>新用户注册</span>
			<router-link tag="span" to="/login">登录</router-link>
		</div>
		<div class="register-wrap--contaire">
			<div class="register-wrap--contaire-item">
				<label>+86</label>
				<input type="text" placeholder="请输入您的手机号码" v-model="mobileno" @keyup="Phonenum"/>
			</div>
			<div class="register-wrap--contaire-item">
				<input type="text" placeholder="请输入短信验证码" v-model="code" @keyup="Code"/>
				<p @click="mobilenoflag&&getcode()"><span v-show="!$store.state.register.yzmtrue" :style="mobilenoflag?'color:#222;':'color:#ddd'">{{$store.state.register.sendmessage}}</span><span v-show="$store.state.register.yzmtrue">{{$store.state.register.sendcodetime}} s</span></p>
			</div>
			<div class="register-wrap--contaire-item">
				<input type="password" placeholder="请设置密码" v-model="password" @keyup="Password"/>
			</div>
			<div class="register-wrap--contaire-item">
				<input type="text" placeholder="请输入昵称" v-model="nickname" @keyup="Nickname"/>
			</div>
		</div>
		<div class="register-wrap-footer">
			<mt-button type="default" :disabled='isdisabled' @click="register">注册</mt-button>
			<p @click="registerprotocol">用户注册代表同意《免责声明》和《车尖隐私政策》</p>
		</div>
		<div :class="registerprotocolshow?'protocolshow':'protocolhidden'">
			<Registerprotocol v-on:listenprotocol="registerprotocol"></Registerprotocol>
		</div>
	</div>	
</template>
<script>
import {regExs} from '../../assets/script/until.js'
import Registerprotocol from '@/components/regsiter_login/registerprotocol'
let lodash = require('lodash')
export default{
	data(){
		return {
			mobileno:'',
			mobilenoflag:false,
			password:'',
			passwordflag:false,
			nickname:'',
			nicknameflag:false,
			code:'',
			codeflag:false,
			getcheckcode:false,
			registerprotocolshow:false
		}
	},
	components:{Registerprotocol},
	computed:{
		isdisabled:function(){
			if(this.mobilenoflag&&this.passwordflag&&this.nicknameflag&&this.codeflag){
				return false;
			}else{
				return true;
			}
		},
	},
	methods:{
		Phonenum:lodash.debounce(function(){
			if(this.mobileno.trim()<1){
				this.$toast({
		          message: '账号不能为空!',
		          position: 'top',
  			      duration: 1500
		      });
				this.mobilenoflag=false;
			}else if(!regExs.mobile.test(this.mobileno)){
				this.$toast({
		          message: 'top',
		          position: 'bottom',
  			      duration: 1500
		       });
		       this.mobilenoflag=false;
			}else{	
				let parm={action:'checkRegister',areacode:'86',mobileno:this.mobileno};
				var that=this;
				this.$api('/Execute.do',parm).then(function(r){
					if(r.errorCode=='0'){
				     	if(r.data.checkRegister){
				     		that.mobilenoflag=true;
				     	}else{
				     		that.$toast({
					          message: '您的手机号已经被注册，请更换手机号!',
					          position: 'top',
  			                  duration: 1500
					        });
					       that.mobilenoflag=false;
				     	}
				     }else{
				     	that.$toast({
				          message: r.errorMessage,
				          position: 'top',
  			              duration: 1500
				        });
				        that.mobilenoflag=false;
				     }
				})
			}
		},1000),
		Password:lodash.debounce(function(){
			if(this.password.trim()<1){
				this.$toast({
		          message: '密码不能为空',
		          position: 'top',
				  duration: 1500
				});
				this.passwordflag=false;
			}else if(!regExs.password.test(this.$data.password)){
				this.$toast({
		          message: '密码格式不正确',
		          position: 'top',
				  duration: 1500
				});
				this.passwordflag=false;
			}else if(regExs.password.test(this.$data.password)){
				this.passwordflag=true;
			}
		},1000),
		Nickname:lodash.debounce(function(){
			if(this.nickname.trim().length<1){
	    		this.$toast({
		          message: '昵称不能为空！',
		          position: 'top',
	  			  duration: 1500
		        });
		       this.nicknameflag=false;
	    	}else if(!regExs.nickname.test(this.nickname)){
	    		this.$toast({
		          message: '输入的昵称格式不正确,请重新输入',
		          position: 'top',
	  			  duration: 1500
		       });
		       this.nicknameflag=false;
	    	}else if(regExs.nickname.test(this.nickname)){
	    		var that=this;
	    		this.$api('/Execute.do',{action:'checkNickname',nickname:this.nickname}).then(function(r){
	    			if(r.errorCode==='0'){
	    				if(r.data.checkNickname){
	    					that.nicknameflag=true;
	    				}else{
	    					that.$toast({
					          message: '该昵称已经被注册,请重新输入',
					          position: 'top',
	  			              duration: 1500
					       });
					        that.nicknameflag=false;
	    				}
	    			}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'top',
	  			          duration: 1500
				       });
				       that.nicknameflag=false;
	    			}
	    		})
	    	}
		},1000),
		Code:lodash.debounce(function(){
			if(this.code.trim()<1){
				this.$toast({
		          message: '验证码不能为空',
		          position: 'top',
	  			  duration: 1500
		        });
		       this.codeflag=false;
			}else if(regExs.yzm.test(this.code)){
				this.codeflag=true;
			}
		},1000),
		getcode(){
			if(this.$store.state.register.sendcodetrue){
				var self=this;
				self.$api('/Execute.do',{action:"sendCheckCode4Reset",mobileno:this.mobileno,areacode:'86'}).then(function(r){
					if(r.errorCode==0){
						self.$store.commit('regsendcodetime');
						self.$store.commit('regchangeyzmtrue');
						self.$store.state.register.sendcodetimer=setInterval(getTotelNumber,1000)
					}else{
						self.$toast({
				          message: r.errorMessage,
				          position: 'top',
					      duration: 1500
				       });
					}
				})				
			}
			function getTotelNumber() {
		       	self.$store.commit('regsendcodedjs');
	        }
		},
		register(){
			let parm={action:"register",register:'86',mobileno:this.mobileno,password:this.password,checkcode:this.code,nickname:this.nickname,confirmpwd:this.password};
			var that=this;
			this.$api('Execute.do',parm).then(function(r){
				if(r.errorCode=='0'){
					that.$toast({
			          message: '注册成功',
			          position: 'top',
		  			  duration: 1500
			        });
			        that.$router.push({name:'restsuccess',params:{msg:'注册成功'}})
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'top',
		  			  duration: 1500
			        });
				}
			})
		},
		registerprotocol(){
			this.registerprotocolshow=!this.registerprotocolshow;
		}
	}
}
</script>

<style scoped>
.register-wrap{
	width:100%;
	height:100%;
	background:#fff;
	overflow: hidden;
	position: relative;
}
.register-wrap-head{
	width:100%;
	height:1.92rem;	
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#000;
	border-bottom:1px solid #ddd;
	font-weight: 600;
	text-align: center;
	position: relative;
}
.register-wrap-head .icon-fanhui{
	font-size:0.6rem;
	color:#a0a0a0;
	position: absolute;
	left:0.5rem;
}
.register-wrap-head span:last-child{
	font-size:0.44rem;
	position: absolute;
	right:0.5rem;
}
.register-wrap--contaire{	
	padding:0 1rem;
	padding-top:2.4rem;
}
.register-wrap--contaire-item{
	height:1.8rem;
	padding-top:0.4rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: space-between;
	border-bottom:1px solid #ddd;
	font-size:0.44rem;
	color:#222;
}
.register-wrap--contaire-item input{
	height:1.4rem;
	flex:1;
}
.register-wrap--contaire-item label{
	width:1.3rem;
}
.register-wrap--contaire-item p{
	width:2.4rem;
	height:0.82rem;
	line-height: 0.82rem;
	border-radius: 15px;
	font-size:0.34rem;
	border:1px solid #ddd;
	color:#999;
	text-align: center;
}
::-webkit-input-placeholder{
	color:#999;
}
.register-wrap-footer{
	padding:0 0.6rem;
	padding-top:1rem;
}
.register-wrap-footer>p{
	font-size:0.34rem;
	color:#1989f5;
	line-height:0.94rem;
	text-align: center;
}
.protocolshow{
	position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    z-index: 100;
    transition: all 0.3s;
    background: #fff;
    overflow: hidden;
}
.protocolhidden{
	position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:100%;
    z-index: 100;
    transition: all 0.3s;
    overflow: hidden;
    background: #fff;
}
</style>