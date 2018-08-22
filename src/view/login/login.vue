<template>
	<div class="login-wrap">
		<div class="login-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>手机号登陆</span>
			<router-link tag="span" to="/register">注册</router-link>
		</div>
		<div class="login-wrap-contaire">
			<div class="login-phonenum">
				  <input placeholder="请输入手机号" type="tel" v-model="loginname" ref="newUsername" @keyup="LoginName"/>	
			</div>
			<div class="login-password">
				<div class="login-password-group">
					<input class="loginpassword" type="password" placeholder="请输入密码"  v-model="password" ref="loginpassword" @keyup="PassWord"/><i class="iconfont" :class="ismingwen?'icon-chakanyanjingshishifenxi':'icon-biyanjing'" @click="togglemingwen"></i>
				</div>
			</div>
			<p><router-link tag="span" to="/login/restpassword">忘记密码?</router-link></p>
			<mt-button type="default" :disabled="isdisabled" @click="login">登录</mt-button>
		</div>
	</div>
</template>
<script>
import {regExs} from '../../assets/script/until.js'
let lodash = require('lodash')
export default{
	data(){
		return{
			ismingwen:false,
			loginname:'',
			loginnametrue:false,
	        password:'',
	        passwordtrue:false
		}
	},
	methods:{
		togglemingwen(){
			this.ismingwen=!this.ismingwen;
			if(this.ismingwen){
				this.$refs.loginpassword.type="text"
			}else{
				this.$refs.loginpassword.type="password"
			}
		},
		LoginName:lodash.debounce(function(){
			if(this.loginname.trim().length<1){
				this.$toast({
		          message: '手机号不能为空',
		          position: 'bottom',
				  duration: 1500
		       });
		       this.loginnametrue=false;
			}else if(!regExs.mobile.test(this.loginname)){
				this.$toast({
		          message: '手机号格式不正确!',
		          position: 'bottom',
				  duration: 1500
		       });
		       this.loginnametrue=false;
			}else if(regExs.mobile.test(this.loginname)){
				this.$toast({
		          message: '手机号输入正确!',
		          position: 'bottom',
				  duration: 1500
		       });
				this.loginnametrue=true;
			}
		},1000),
		PassWord:lodash.debounce(function(){
			if(this.password.trim().length<1){
				this.$toast({
		          message: '密码不能为空',
		          position: 'bottom',
				  duration: 1500
		       });
		       this.passwordtrue=false;
			}else if(!regExs.password.test(this.password)){
				this.$toast({
		          message: '密码格式不正确!',
		          position: 'bottom',
				  duration: 1500
		       });
		       this.passwordtrue=false;
			}else if(regExs.password.test(this.password)){
		       this.passwordtrue=true;
			}
		},1000),
		login:function(){
			var that=this;
			this.$api('/Execute.do',{loginname:this.loginname,password:this.password,action:'login'}).then(function(r){
				if(r.errorCode==0){
					that.$toast({
			          message: '登录成功',
			          position: 'bottom',
  					  duration: 1500
			       });
//			       window.action.registerPush(r.data.login.mobileno);
			       that.$store.commit('getloginInfo',r.data.login);
			       that.$router.push('/home');
			       localStorage.setItem("loginInfo",JSON.stringify(r.data.login));
			       that.$store.commit('setblog_userseq');
			       that.$store.commit('setblog_touserseq',null);
			       that.$store.commit('setblog_friend',null);
			       that.$store.commit('setblog_remark',null);			       
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		}
	},
	computed:{
		isdisabled:function(){
			if(this.loginnametrue&&this.passwordtrue){
				return false;
			}else{
				return true;
			}
		}
	}
}
</script>

<style scoped>
.login-wrap{
	width:100%;
	height:100%;
	background: #fff;
}
.login-wrap-head{
	height:1.92rem;
	line-height:1.32rem;
	text-align: center;	
	border-bottom:1px solid #ddd;
	font-size:0.56rem;
	color:#000;
	padding:0 0.5rem;
	padding-top:0.6rem;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.login-wrap-head{
		height:2.64rem;
		line-height:1.32rem;
		text-align: center;	
		border-bottom:1px solid #ddd;
		font-size:0.56rem;
		color:#000;
		padding:0 0.5rem;
		padding-top:1.32rem;
		position: relative;
	}
}
.login-wrap-head .icon-fanhui{
	font-size:0.6rem;
	color:#a0a0a0;
	position: absolute;
	left:0.5rem;
}
.login-wrap-head span:last-child{
	font-size:0.44rem;
	position: absolute;
	right:0.5rem;
}
.login-wrap-contaire{
	padding:0 1rem;
	padding-top:4rem;
	width:100%;
}
.login-phonenum,.login-password{
	height:1.8rem;
	font-size:0.44rem;
	color:#222;
	padding-top:0.4rem;
	border-bottom:1px solid #ddd;	
}
.login-phonenum input{
	width:100%;
	height:100%;
	height:1.4rem;
}
::-webkit-input-placeholder{
	color:#999;
}
.login-password-group{
	height:1.4rem;
	width:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.login-password-group input{
	flex: 1;
	height:1.4rem;
	padding-right:0.3rem;
}
.login-password-group i{
	font-size:0.6rem;
	color:#999;
}
.login-wrap-contaire>p{
	height:1.35rem;
	line-height:1.35rem;
	text-align: right;
	color:#222;
	font-size:0.38rem;
	margin-bottom:0.5rem;
}
</style>