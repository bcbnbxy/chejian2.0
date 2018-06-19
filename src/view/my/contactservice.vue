<template>
<div class="contactservice-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>意见反馈</span>
		<span></span>
	</header>
	<div class="contactservice-wrap-title">
		您有什么问题可以随时联系我们:
	</div>
	<ul class="contactservice-wrap-tel">
		<li>客服热线:<a>2522-525526563</a></li>
		<li>客服热线:<a>2522-525526563</a></li>
		<li>客服热线:<a>2522-525526563</a></li>
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.contactservice-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.icon-fanhui{
	font-size:0.44rem;
}
.contactservice-wrap>header{
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
.contactservice-wrap-title{
	height:1.6rem;
	line-height: 1.6rem;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
	padding:0 0.5rem;
}
.contactservice-wrap-tel{
	background: #fff;
}
.contactservice-wrap-tel li{
	padding:0 0.5rem;
	border-bottom:1px solid #dcdcdc;
	height:1.6rem;
	line-height:1.6rem;
	font-size:0.44rem;
	color:#222;
}
.contactservice-wrap-tel li a{
	color:#1989f5;
}
.contactservice-wrap-tel li:last-child{
	border-bottom:none;
}
</style>