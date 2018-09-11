<template>
	<div class="nologin-wrap">
		<div class="nologin-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		</div>
		<div class="nologin">
			<p>登陆后发现你感兴趣的动态奥</p>
			<router-link tag="button" to="/login">去登陆</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style>
.nologin-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
  	align-items: center;
}
.nologin button{
	width:8rem;
	height:1.6rem;
	line-height:1.6rem;
	text-align: center;
	font-size:0.42rem;
	color:#666;
	background:#e5e5e5;
	border-radius: 3px;
	margin:0 auto;
}
.nologin p{
	font-size:0.36rem;
	color:#999;
	text-align: center;
	margin-bottom:1.42rem;
}
.nologin-head{
	height:1.92rem;
	font-size:0.6rem;
	color:#fff;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	position: absolute;
	top:0;
	left:0;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.nologin-head{
		height:2.64rem;
		font-size:0.6rem;
		color:#fff;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		position: absolute;
		top:0;
		left:0;
	}
}
.nologin-head .icon-fanhui{
	float:left;
}
</style>