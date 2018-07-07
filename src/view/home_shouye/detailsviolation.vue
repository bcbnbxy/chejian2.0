<template>
<div class="detailsviolation-wrap">
	<div class="detailsviolation-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>违章详情</span>
	</div>
	<div class="detailsviolation-wrap-contaire">
		<div class="detailsviolation-wrap-contaire-title">
			<span>粤B·A3752</span>
			<span>违章地点：深圳</span>
		</div>
		<div class="detailsviolation-wrap-contaire-main">
			<div class="detailsviolation-wrap-contaire-main-title">
				<p><span>违章</span><b>2</b></p>
				<p><span>罚款</span><b>500元</b></p>
				<p><span>扣分</span><b>4分</b></p>
			</div>
			<dl>
				<dd>
					<p>违章时间:</p>
					<p><span>2018-06-26</span><span>10:00</span></p>
				</dd>
				<dd>
					<p>地点:</p>
					<p><span>卫东龙商务大厦</span></p>
				</dd>
				<dd>
					<p>行为:</p>
					<p><span>违章停车</span></p>
				</dd>
				<dt>
					<p>罚款金额:</p>
					<p><span>￥300</span><span>扣分:   2</span></p>
				</dt>
			</dl>
			<dl>
				<dd>
					<p>违章时间:</p>
					<p><span>2018-06-26</span><span>10:00</span></p>
				</dd>
				<dd>
					<p>地点:</p>
					<p><span>卫东龙商务大厦</span></p>
				</dd>
				<dd>
					<p>行为:</p>
					<p><span>遮挡车牌</span></p>
				</dd>
				<dt>
					<p>罚款金额:</p>
					<p><span>￥200</span><span>扣分:   2</span></p>
				</dt>
			</dl>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.detailsviolation-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
}
.detailsviolation-wrap-head{
	height:1.32rem;
	line-height:1.32rem;
	text-align: center;
	background-image: url(../../../dist/static/img/headbg.32103ac.png);
	background-size: cover;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
}
.detailsviolation-wrap-head .icon-fanhui{
	font-size:0.6rem;
	float:left;
}
.detailsviolation-wrap-contaire-title{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#222;
	font-weight: 600;
	font-size:0.44rem;
	background:#fff;
}
.detailsviolation-wrap-contaire-main{
	background: #fff;
	margin-top:0.3rem;
}
.detailsviolation-wrap-contaire-main-title{
	width:100%;
	height:3rem;
	padding:1rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.detailsviolation-wrap-contaire-main-title>p{
	height:2.1rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.detailsviolation-wrap-contaire-main-title>p>span{
	width:1.4rem;
	height:1.4rem;
	line-height:1.4rem;
	text-align: center;
	background: #1989f5;
	color:#fff;
	border-radius: 50%;
	font-size:0.38rem;
}
.detailsviolation-wrap-contaire-main-title>p>b{
	color:#222;
	font-weight: 400;
	font-size:0.38rem;
}
.detailsviolation-wrap-contaire-main>dl{
	padding:0.3rem 0;
	border-bottom:1px solid #ddd;
}
.detailsviolation-wrap-contaire-main>dl dd,.detailsviolation-wrap-contaire-main>dl dt{
	height:1.18rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.38rem;
	padding:0 0.5rem;
}
.detailsviolation-wrap-contaire-main>dl dt{
	color:#ff0000;
}
.detailsviolation-wrap-contaire-main>dl dd p,.detailsviolation-wrap-contaire-main>dl dt p{
	line-height:1;
}
.detailsviolation-wrap-contaire-main>dl dd p:nth-child(1),.detailsviolation-wrap-contaire-main>dl dt p:nth-child(1){
	width:2.7rem;
}
.detailsviolation-wrap-contaire-main>dl dd p:nth-child(2) span:nth-child(1){
	margin-right:0.5rem;
}
.detailsviolation-wrap-contaire-main>dl dt p:nth-child(2) span:nth-child(1){
	margin-right:2rem;
}
</style>