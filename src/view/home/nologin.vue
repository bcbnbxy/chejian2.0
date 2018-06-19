<template>
	<div class="nologin-wrap">
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
</style>