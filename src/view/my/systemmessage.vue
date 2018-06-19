<template>
<div class="systemmessage-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>系统活动消息</span>
		<span></span>
	</header>
	<div class="scan-bind">
		<p><span>系统通知</span><span>包含资金变动、消费通知和系统服务</span></p>
		<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
	</div>
	<ul class="intercalate-list">
		<li><span>车辆故障通知</span><mt-switch></mt-switch></li>
		<li><span>车辆保养通知</span><mt-switch></mt-switch></li>		
		<li><span>热门活动通知</span><mt-switch></mt-switch></li>
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.systemmessage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.mint-header{
	line-height: normal;
}
.icon-fanhui{
	font-size:0.44rem;
}
.systemmessage-wrap>header{
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
.scan-bind p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
}
.scan-bind p span:nth-child(2){
	color:#999;
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