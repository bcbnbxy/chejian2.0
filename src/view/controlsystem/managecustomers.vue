<template>
<div class="managecustomers-wrap">
	<div class="managecustomers-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>管理我的客户</span>
		<b>搜索</b>
	</div>
	<div class="managecustomers-wrap-list">
		<ul>
			<router-link tag="li" to="/customerinfo"><img src="../../assets/img/faxianimg/avatar.png"/><span>客户01</span></router-link>
			<router-link tag="li" to="/customerinfo"><img src="../../assets/img/faxianimg/avatar.png"/><span>客户02</span></router-link>
			<router-link tag="li" to="/customerinfo"><img src="../../assets/img/faxianimg/avatar.png"/><span>客户03</span></router-link>
			<router-link tag="li" to="/customerinfo"><img src="../../assets/img/faxianimg/avatar.png"/><span>客户04</span></router-link>
		</ul>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.managecustomers-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: flex;
	flex-direction: column;
}
.managecustomers-wrap-head{
	height:1.32rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
}
.managecustomers-wrap-head i{
	float:left;
}
.managecustomers-wrap-head b{
	float:right;
	font-weight: 400;
	font-size:0.44rem;
}
.managecustomers-wrap-list{
	flex:1;
	overflow: auto;
}
.managecustomers-wrap-list li{
	background: #fff;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.managecustomers-wrap-list li img{
	height:1rem;
	width:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
</style>