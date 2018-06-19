<template>
	<div class="reglogin-head">
		<div><span @click="goback" style="display: flex;display: -webkit-flex;align-items: center;" v-show="$route.path!=='/'"><i class="iconfont icon-fanhui" style="font-size:24px;margin-right:4px;vertical-align: middle;"></i>返回</span></div>
		<div><span v-show="$route.path==='/'">车间</span></div>
		<div>
			<router-link tag="span" to="/login" class="register" v-if="$route.path.split('/').length===2&&$route.path.indexOf('register')!==-1">登录</router-link>
			<router-link tag="span" to="/register" class="register" v-if="$route.path.split('/').length===2&&$route.path.indexOf('login')!==-1">注册</router-link>
		</div>
	</div>
</template>

<script>
	export default{	
		methods:{
			goback:function(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style>
.reglogin-head{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	height:44px;
	padding:0 12px;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	color:#263a55;
	align-items: center;
}
.reglogin-head span{
	font-size:16px;
	font-weight: bold;
}
.register{
	color:#263a55;
	font-size:16px;
}
</style>