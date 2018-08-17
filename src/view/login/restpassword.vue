<template>
	<div class="restpassword-wrap">
		<div class="restpassword-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>重置密码</span>
		</div>
		<div class="restpassword-group">
			<div class="login-phonenum">
				  <input placeholder="请输入手机号" type="tel" v-model="loginname" @keydown="LoginName"/>
			</div>
			<div class="restpassword-yzm">
				<input class="loginpassword" type="text" placeholder="请输入验证码"  v-model="yzm" @keydown="checkcode"/>
				<div class="getyzm" @click="sendcode"><span v-show="!$store.state.login.yzmtrue">{{$store.state.login.sendmessage}}</span><span v-show="$store.state.login.yzmtrue">{{$store.state.login.sendcodetime}} s</span></div>
			</div>
			<mt-button type="default" :disabled="isdisabled" @click="gosetpassword">下一步</mt-button>
		</div>		
	</div>
</template>

<script>
import {regExs} from '../../assets/script/until.js'
let lodash = require('lodash')
export default{
	data(){
		return {
			loginname: '',
			loginnametrue:false,
			yzm:'',
			yzmtrue:false,
			select:'1'			
		}
	},
	computed:{
		isdisabled:function(){
			if(this.loginnametrue&&this.yzmtrue){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		sendcode:function(){
			if(this.$store.state.login.sendcodetrue){
				var self=this;
				self.$api('Execute.do',{action:"sendCheckCode4Reset",mobileno:this.loginname,areacode:'86'}).then(function(r){
					if(r.errorCode==0){
						self.$store.commit('sendcodetime');
						self.$store.commit('changeyzmtrue');
						self.$store.state.login.sendcodetimer=setInterval(getTotelNumber,1000)
					}else{
						self.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
					      duration: 1500
				       });
					}
				})				
			}
			function getTotelNumber() {
		       	self.$store.commit('sendcodedjs');
	        }
		},
		checkcode:lodash.debounce(function(){
			console.log(this.yzm);
				if(this.yzm.trim().length<1){
					this.$toast({
			          message: '验证码不能为空',
			          position: 'bottom',
					  duration: 1500
			       });
			       this.yzmtrue=false;
				}else if(!regExs.yzm.test(this.yzm)){
					this.$toast({
			          message: '手机号格式不正确!',
			          position: 'bottom',
					  duration: 1500
			       });
			       this.yzmtrue=false;
				}else if(regExs.yzm.test(this.yzm)){
					this.$toast({
			          message: '验证码格式正确',
			          position: 'bottom',
					  duration: 1500
			       });
					this.yzmtrue=true;
				}
			},1000),
		LoginName:lodash.debounce(function(){
				console.log(111);
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
		gosetpassword:function(){
			this.$store.commit('restpasswordInfo',{checkcode:this.yzm,mobileno:this.loginname});
			this.$router.push('/login/SetPassword_login')
		}
	}
}
</script>

<style>
.restpassword{
	width:100%;
	height:100%;
	background: #fff;
}
.restpassword-wrap-head{
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	border-bottom:1px solid #ddd;
	font-size:0.56rem;
	color:#000;
	text-align: center;
	line-height:1.32rem;
	position: relative;
}
.restpassword-wrap-head .icon-fanhui{
	font-size:0.6rem;
	color:#999;
	position: absolute;
	left:0.5rem;
}
.restpassword-group{
	padding:0 1rem;
	padding-top:4rem;
}
.login-phonenum,.restpassword-yzm{
	border-bottom:1px solid #ddd;
	height:1.8rem;
	font-size:0.44rem;
	color:#222;
	padding-top:0.4rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
::-webkit-input-placeholder{
	color:#999;
}
.login-phonenum input,.restpassword-yzm input {
	height:1.4rem;
	flex:1;
}
.restpassword-yzm{
	margin-bottom:1rem;
}
.getyzm{
	width:3rem;
	height:1rem;
	line-height:1rem;
	text-align: center;
	font-size:0.38rem;
	color:#999;
	border:1px solid #ddd;
	border-radius: 3px;
}
</style>