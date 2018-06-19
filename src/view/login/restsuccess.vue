<template>
	<div class="restsuccess">
		<div class="restsuccess-icon">
			<i class="iconfont icon-queren"></i>
			<span>{{$route.params.msg}}</span>
		</div>
		<router-link tag="mt-button" type="default" to="/login">去登录</router-link>
	</div>
</template>
<script>
</script>

<style>
.restsuccess{
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding:0 1rem;
	padding-top:4.55rem;
}
.restsuccess-icon{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	padding-bottom:1.5rem;
}
.restsuccess-icon i{
	font-size:94px;	
	color:#369cf9;
}
.restsuccess-icon span{
	font-size:12px;
	color:#222;
	margin-top:1rem;
}
</style>