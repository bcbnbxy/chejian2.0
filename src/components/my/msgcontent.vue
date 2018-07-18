<template>
<div class="msgcontent-wrap">
	<div class="msgcontent-wrap-head">
		<i class="iconfont icon-fanhui" @click="$emit('listenmsgcontent')"></i>
		<span>系统消息</span>
	</div>
	<div class="msgcontent-wrap-contaire">
		<h3>标题</h3>
		<div class="msgcontent-wrap-contaire-content">
			<p>系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系</p>
			<p>系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系</p>
			<p>系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系统内容系</p>
		</div>
		<div class="msgcontent-wrap-contaire-time">2018-07-17 16:38:26</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.msgcontent-wrap{
	width:100%;
	height:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.msgcontent-wrap-head{
	width:100%;
	height:1.32rem;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
	position: relative;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;	
}
.msgcontent-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
}
.msgcontent-wrap-contaire{
	flex:1;
	padding:0 1rem;
	padding-top:1rem;
}
.msgcontent-wrap-contaire h3{
	font-size:0.56rem;
	color:#222;
	font-weight: 400;
	margin-bottom:0.3rem;
}
.msgcontent-wrap-contaire-content{
	font-size:0.48rem;
	color:#666;
}
.msgcontent-wrap-contaire-content p{
	text-indent: 2em;
	line-height:0.7rem;
}
.msgcontent-wrap-contaire-time{
	margin-top:0.3rem;
	font-size:0.38rem;
	color:#999;
}
</style>