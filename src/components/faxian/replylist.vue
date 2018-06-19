<template>
	<div class="replaylist-wrap">
		<div class="reply-list">
			<div class="reply-avatar clear">
				<div class="reply-avatar-left"><img src="../../assets/img/faxianimg/avatar.png"/><p><b>婉婉婉</b><span>25分钟前</span></p></div>
				<div class="reply-avatar-right"><i class="iconfont icon-xin"></i><span>120</span></div>
			</div>
			<div class="reply-list-container">
				回复：<span>@王语嫣</span> 最新评论按照时间顺序最新写的最新被回复的显示在上面。
			</div>
		</div>
	</div>
</template>

<script>
export default{}
</script>

<style>
.reply-list{
	width:100%;
	padding:0 0.48rem;
	border-bottom:1px solid #dcdcdc;
	padding-top:0.3rem;
}
.reply-avatar{
	height:1rem;
	overflow: hidden;
}
.reply-avatar-left{
	float:left;
	display: flex;
	display: -webkit-flex;
}
.reply-avatar-left img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	display: block;
	margin-right:0.5rem;
}
.reply-avatar-left p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	font-size:0.4rem;
	color:#222;
	font-weight: 500;
	justify-content: space-around;
}
.reply-avatar-left p span{
	font-size:0.3rem;
	color:#666;
}
.reply-avatar-right{
	float:right;
	height:1rem;
	line-height:0.6rem;
}
.reply-avatar-right i{
	font-size:0.5rem;
	color:#999;
	margin-right:0.3rem;
}
.reply-avatar-right span{
	font-size:0.3rem;
	color:#666;
}
.reply-list-container{
	padding:0.36rem 0;
	line-height:0.6rem;
	font-size:0.38rem;
	color:#666;
}
.reply-list-container span{
	color:#0061ff;
}
</style>