<template>
	<div class="bootpage-wrap">
		<div class="bootpage-wrap-head"><span>车尖</span></div>
		<div class="bootpage-wrap-container">
			<img src="../../assets/img/shouye/111.png" style="width:2.4rem;height:2.4rem;display: block;margin:0 auto;"/>
			<p>HI,欢迎使用车尖</p>
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
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.bootpage-wrap-head{
		width:100%;
		height:2.64rem;
		padding-top:1.32rem;
		line-height:1.32rem;
		text-align: center;
		font-size:0.56rem;
		color:#000;
		font-weight:600;	
	}
}
.bootpage-wrap-container{
	width:100%;
	padding-top:2.1rem;
}
.bootpage-wrap-container>p{
	line-height:1;
	font-size:0.56rem;
	color:#222;
	width:100%;
	text-align: center;
	margin-top:0.8rem;
}
.bootpage-wrap-btngroup{
	margin-top:2.25rem;
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