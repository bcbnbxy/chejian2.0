<template>
	<div class="bootpage-wrap">
		<div class="bootpage-wrap-head"><span>车间</span></div>
		<div class="bootpage-wrap-container">
			<p>HI,欢迎使用车间</p>
			<div class="bootpage-wrap-btngroup">
				<router-link tag="button" to="/register">注册</router-link>
				<router-link tag="button"  to="/login">登录</router-link>
			</div>	
		</div>
	</div>
</template>
<script>
</script>
<style scoped>
.bootpage-wrap{
	width:100%;
	height:100%;
	background: #fff;
}
.bootpage-wrap-head{
	width:100%;
	height:1.92rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#000;
	font-weight:600;	
}
.bootpage-wrap-container{
	width:100%;
	padding-top:4.1rem;
}
.bootpage-wrap-container>p{
	line-height:1;
	font-size:0.56rem;
	color:#222;
	width:100%;
	text-align: center;
}
.bootpage-wrap-btngroup{
	margin-top:4.25rem;
	padding:0 0.6rem;
}
.bootpage-wrap-btngroup button{
	width:100%;
	height:1.6rem;
	text-align: center;
	line-height:1.6rem;
	color:#fff;
	font-size:0.56rem;
	border-radius: 5px;
	background: #1989f5;
	margin-bottom:0.8rem;
}
</style>