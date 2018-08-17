<template>
	<div class="SetPassword-wrap">
		<div class="restpassword-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>重置密码</span>
		</div>
		<div class="SetPassword-wrap-contaire">
			<div class="SetPassword-set">
				<input  type="password" placeholder="请输入新密码"  clearable v-model="SetPassword">
			</div>
			<div class="SetPassword-set" style="margin-bottom:1rem;">
				<input  type="password" placeholder="请再次输入新密码"  clearable v-model="SurePassword">
			</div>
			<mt-button type="default" :disabled="isdisabled" @click="resetPassword">确认</mt-button>
		</div>
	</div>
</template>

<script>
import {regExs} from '../../assets/script/until.js'
let lodash = require('lodash')
export default{
	data () {
		return {
			setpaswordtrue:false,
			setpasword:'',
			confirmpaswordtrue:false,
			confirmpasword:''
		}
	},
	computed:{
		SetPassword:{
			set:lodash.debounce(function(value){
				if(value.trim().length<1){
					this.$toast({
			          message: '密码不能为空',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.setpaswordtrue=false;
				}else if(!regExs.password.test(value)){
					this.$toast({
			          message: '密码格式不正确!',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.setpaswordtrue=false;
				}else if(regExs.password.test(value)){
					this.$toast({
			          message: '密码正确!',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.setpaswordtrue=true;
			      this.setpasword=value;
				}
			},1000),
			get:function(){
				return this.setpasword;
			}
		},
		SurePassword:{
			set:lodash.debounce(function(value){
				if(value.trim().length<1){
					this.$toast({
			          message: '密码不能为空',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.confirmpaswordtrue=false;
				}else if(!regExs.password.test(value)){
					this.$toast({
			          message: '密码格式不正确!',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.confirmpaswordtrue=false;
				}else if(regExs.password.test(value)){
					this.$toast({
			          message: '密码正确!',
			          position: 'bottom',
					  duration: 1500
			      });
			      this.confirmpaswordtrue=true;
			      this.confirmpasword=value;
				}
			},1000),
			get:function(){
				return this.confirmpasword;
			}
		},
		isdisabled:function(){
			if(this.confirmpaswordtrue&&this.setpaswordtrue){
				if(this.confirmpasword==this.setpasword){
					return false;
				}else{
					this.$toast({
				          message: '两次密码输入不一致',
				          position: 'bottom',
					      duration: 1500
				      });
					return true;
				}
			}else{
				return true;
			}
		}
	},
	methods:{
		resetPassword:function(){
			let parm=this.$store.state.login.restpassword;
			parm.password=this.confirmpasword;
			parm.action='resetPassword';
			var that=this;
			this.$api("Execute.do",parm).then(function(r){
				if(r.errorCode==0){
					that.$toast({
						message:'密码重置成功',
						position: 'bottom',
					    duration: 1500
					});
					that.$router.push({name:'restsuccess',params:{msg:'密码重置成功'}});
				}else{
					that.$toast({
						message:r.errorMessage,
						position: 'bottom',
					    duration: 1500
					});
				}
			})
		}
	}
}
</script>

<style scoped>
.SetPassword-wrap{
	height:100%;		
	width:100%;
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
.SetPassword-wrap-contaire{
	padding:0 1rem;
	padding-top:4rem;
}
.SetPassword-set{
	border-bottom:1px solid #ddd;
	height:1.8rem;
	font-size:0.44rem;
	color:#222;
	padding-top:0.4rem;
}
.SetPassword-set input{
	height:1.4rem;
	width:100%;
}
::-webkit-input-placeholder{
	color:#999;
}
</style>