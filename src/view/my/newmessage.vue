<template>
<div class="newmessage-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>新消息通知</span>
	</header>
	<router-link tag="div" to="/systemmessage" class="scan-bind">
		<span>系统与活动消息</span>
		<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
	</router-link>
	<ul class="intercalate-list">
		<li><span>声音</span><mt-switch></mt-switch></li>
		<li><span>震动</span><mt-switch></mt-switch></li>		
		<li><span>车友消息</span><mt-switch></mt-switch></li>
		<li><span>消息通知显示内容详情</span><mt-switch></mt-switch></li>		
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.icon-fanhui{
	font-size:0.44rem;
}
.newmessage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.newmessage-wrap>header{
	height:1.92rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	padding-top:0.6rem;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	position:relative;
}
.newmessage-wrap>header span:nth-child(1){
	position: absolute;
	left:0.5rem;
}
.scan-bind{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
	padding:0 0.5rem;
}
.intercalate-list{
	background: #fff;
}
.intercalate-list li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	background: #fff;
	padding:0 0.5rem;
	border-bottom:1px solid #dcdcdc;
}
.intercalate-list li:last-child{
	border-bottom:none;
}
</style>