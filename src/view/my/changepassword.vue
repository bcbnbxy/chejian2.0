<template>
<div class="changepassword-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>修改密码</span>
		<span></span>
	</header>
	<ul class="changepassword-list">
		<li>
			<label>原密码</label>
			<input type="password" placeholder="请输入原6-18位密码" @keyup="Oldpassword" v-model="oldpassword"/>
		</li>
		<li>
			<label>新密码</label>
			<input type="password" placeholder="请输入新6-18位密码" @keyup="Newpassword" v-model="newpassword"/>
		</li>
		<li>
			<label>确认密码</label>
			<input type="password" placeholder="请确认6-18位密码" @keyup="Suerpassword" v-model="suerpassword"/>
		</li>
	</ul>
	<div class="submit">
		<mt-button type="default" :disabled="isdisabled" @click="submit">确定</mt-button>
	</div>
</div>
</template>

<script>
import {regExs} from '../../assets/script/until.js'
let lodash = require('lodash')
export default {
	data(){
		return {
			oldpassword:'',
			oldpasswordflag:false,
			newpassword:'',
			newpasswordflag:false,
			suerpassword:'',
			suerpasswordflag:false,
		}
	},
	computed:{
		isdisabled:function(){
			if(this.oldpasswordflag&&this.newpasswordflag&&this.suerpasswordflag){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		Oldpassword:lodash.debounce(function(){
			if(this.oldpassword.trim().length<1){
					this.$toast({
			          message: '原密码不能为空',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.oldpasswordflag=false;
				}else if(!regExs.password.test(this.oldpassword)){
					this.$toast({
			          message: '原密码格式不正确!',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.oldpasswordflag=false;
				}else if(regExs.password.test(this.oldpassword)){
			       this.oldpasswordflag=true;
				}
		},1500),
		Newpassword:lodash.debounce(function(){
			if(this.newpassword.trim().length<1){
					this.$toast({
			          message: '新密码不能为空',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.newpasswordflag=false;
				}else if(!regExs.password.test(this.newpassword)){
					this.$toast({
			          message: '新密码格式不正确!',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.newpasswordflag=false;
				}else if(regExs.password.test(this.newpassword)){
			       this.newpasswordflag=true;
				}
		},1500),
		Suerpassword:lodash.debounce(function(){
			if(this.suerpassword.trim().length<1){
					this.$toast({
			          message: '新密码不能为空',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.suerpasswordflag=false;
				}else if(!regExs.password.test(this.suerpassword)){
					this.$toast({
			          message: '新密码格式不正确!',
			          position: 'bottom',
  					  duration: 1500
			       });
			       this.suerpasswordflag=false;
				}else if(regExs.password.test(this.suerpassword)){
			       this.suerpasswordflag=true;
				}
		},1500),
		submit:function(){
			if(this.newpassword!=this.suerpassword){
				this.$toast({
			          message: '请确保新密码和确认密码输入一致',
			          position: 'bottom',
  					  duration: 1500
			       });
			}else if(this.newpassword==this.oldpassword||this.suerpassword==this.oldpassword){
				this.$toast({
			          message: '原密码和新密码不能相同',
			          position: 'bottom',
  					  duration: 1500
			       });
			}else{
				var that=this;
				this.$api('/Execute.do',{action:'changePassword',userseq:JSON.parse(localStorage.getItem('loginInfo')).userseq,oldpwd:this.oldpassword,password:this.newpassword,confirmpwd:this.suerpassword}).then(function(r){
					console.log(JSON.stringify(r));
					if(r.errorCode=='0'){
						that.$toast({
				          message: '密码修改成功',
				          position: 'bottom',
	  					  duration: 1500
				       });
					}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
	  					  duration: 1500
				       });
					}
				})
			}
		}
	}
}
</script>

<style scoped>
.changepassword-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.changepassword-wrap>header{
	height:1.32rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.changepassword-list{
	background: #fff;
}
.changepassword-list li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	background: #fff;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
}
.changepassword-list li:last-child{
	border-bottom:none;
}
.changepassword-list li input{
	flex: 1;
	height:100%;
	padding-left:0.5rem;
	border:none;
}
.changepassword-list li input::-webkit-input-placeholder{
	color:#999;
}
.submit{
	padding:0 0.6rem;
	padding-top:0.5rem;
}
.icon-fanhui{
	font-size:0.44rem;
}
</style>