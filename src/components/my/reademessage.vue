<template>
<div class="reademessage-wrap">
	<ul>
		<li>
			<p><img src="../../assets/img/my/tuisong.png"/>推送消息</p>
			<p><span>3</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</li>
		<li>
			<p><img src="../../assets/img/my/xitong.png"/>系统消息</p>
			<p><span>3</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</li>
		<li>
			<p><img src="../../assets/img/my/haoyou.png"/>好友消息</p>
			<p><span>3</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</li>
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.reademessage-wrap{
	width:100%;
	background: #fff;
}
.reademessage-wrap li{
	height:1.6rem;
	width:100%;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	align-items: center;
}
.reademessage-wrap li p:nth-child(1) img{
	width:0.62rem;
	height:0.5rem;
	margin-right:0.5rem;
	vertical-align: middle
}
.reademessage-wrap li p:nth-child(1){
	font-size:0.38rem;
	color:#222;	
	vertical-align: top;
}
.reademessage-wrap li p:nth-child(2) span{
	width:0.52rem;
	height:0.52rem;
	border-radius: 50%;
	background: #ff0000;
	text-align: center;
	line-height:0.58rem;
	font-size:0.38rem;
	color:#fff;
	display: inline-block;
}
.reademessage-wrap .icon-arrow-right-copy-copy-copy{
	font-size:0.56rem;
	color:#a0a0a0;
}
</style>