<template>
<div class="Violationinquiry-wrap">
	<div class="Violationinquiry-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>违章查询</span>
	</div>
	<div class="Violationinquiry-wrap-contaire">
		<div class="Violationinquiry-carinfo">
			<div class="Violationinquiry-carinfo-title">
				<img src="../../assets/img/faxianimg/lanbo.png"/>
				<b>粤B·A3752</b>
			</div>
			<dl>
				<dt>深圳市</dt>
				<router-link tag="dd" to="/detailsviolation"><p><span><b>2</b><i>条</i></span><span>未处理</span></p><p><span><b>500</b><i>元</i></span><span>罚款</span></p><p><span><b>4</b><i>分</i></span><span>扣分</span></p></router-link>
				<router-link tag="dd" to="/detailsviolation"><p><span><b>1</b><i>条</i></span><span>未处理</span></p><p><span><b>100</b><i>元</i></span><span>罚款</span></p><p><span><b>2</b><i>分</i></span><span>扣分</span></p></router-link>
			</dl>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.Violationinquiry-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.Violationinquiry-wrap-head{
	height:1.32rem;
	text-align: center;
	line-height:1.32rem;
	color:#fff;
	padding:0 0.5rem;
	font-size:0.56rem;
	width:100%;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
}
.Violationinquiry-wrap-head .icon-fanhui{
	float:left;
	font-size:0.6rem;
}
.Violationinquiry-wrap-contaire{
	flex:1;
}
.Violationinquiry-carinfo{
	background: #fff;
}
.Violationinquiry-carinfo-title{
	height:2rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.Violationinquiry-carinfo-title img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.Violationinquiry-carinfo-title b{
	font-size:0.5rem;
	color:#222;
	flex:1;
}
.Violationinquiry-carinfo>dl dt{
	width:100%;
	height:1.6rem;
	padding:0 0.5rem;
	font-size:0.38rem;
	line-height:1.6rem;
	border-bottom:1px solid #ddd;
	color:#222;
}
.Violationinquiry-carinfo>dl dd{
	width:100%;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	align-items: center;
}
.Violationinquiry-carinfo>dl dd p{
	height:1rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
}
.Violationinquiry-carinfo>dl dd p span{
	font-size:0.34rem;
	color:#222;
}
.Violationinquiry-carinfo>dl dd p i{
	font-style: normal;
}
.Violationinquiry-carinfo>dl dd p b{
	font-size:0.48rem;
	color:#ff0000;
}
</style>