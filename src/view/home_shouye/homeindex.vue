<template>
<div class="homeindex-wrap">
	<div class="homeindex-wrap-head">
		<div class="homeindex-wrap-head-top">
			<div class="homeindex-wrap-head-top-left">
				<img src="../../assets/img/faxianimg/lanbo.png"/>
				<span>兰博基尼</span>
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
			<i class="iconfont icon-scan"></i>
		</div>
		<div class="homeindex-wrap-head-bottom">
			<div class="homeindex-wrap-head-bottom-contaire">
				<router-link tag="p" to="/friendslist"><b>1356</b><span>/名</span></router-link>
				<p>当前排名</p>
				<router-link tag="p" to="/carlovescore">车辆安全系数 ： 12365</router-link>
			</div>
			<div class="homeindex-wrap-head-bottom-guzhang">
				<div class="homeindex-wrap-head-bottom-guzhang-contaire">
					<router-link tag="div" :to="{name:'breakdown',params:{index:2}}" class="homeindex-wrap-head-bottom-guzhang-contaire-left">
						<p>当前警告</p>
						<p><b>10</b><span>/处</span></p>
					</router-link>
					<div class="homeindex-wrap-head-bottom-guzhang-contaire-center"></div>
					<router-link tag="div" :to="{name:'breakdown',params:{index:1}}" class="homeindex-wrap-head-bottom-guzhang-contaire-right">
						<p>当前故障</p>
						<p><b>5</b><span>/处</span></p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
	<div class="homeindex--wrap-bottom">
		<div class="homeindex-car-service">
			<div class="homeindex-car-service-title">
				<b></b>
				<span>车辆服务</span>
			</div>
			<ul>
				<router-link tag="li" to="/chosecar"><img src="../../assets/img/shouye/wzcx.png"><span>违章查询</span></router-link>
				<li><img src="../../assets/img/shouye/sbgm.png"><span>设备购买</span></li>
				<li><img src="../../assets/img/faxianimg/cheyou.png"><span>附近车友</span></li>
				<li><img src="../../assets/img/shouye/jqqd.png"><span>敬请期待</span></li>
			</ul>
		</div>
		<div class="homeindex-car-friends">
			<div class="homeindex-car-service-title">
				<b></b>
				<span>我的车友</span>
				<i>车辆评分</i>
			</div>
			<ul>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
				<li><img src="../../../dist/static/img/avatar.c823af3.png"><span>懒先生</span><i>12345</i></li>
			</ul>
		</div>
	</div>
</div>
</template>
<script>
</script>
<style>
.homeindex-wrap{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homeindex-wrap-head{
	width:100%;
	height:6.63rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
}
.homeindex-wrap-head>.icon-scan{
	font-size:0.6rem;
}
.homeindex-wrap-head-top{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
}
.homeindex-wrap-head-top-left{
	display: flex;
	display: -webkit-flex;
	height:100%;
	align-items: center;
	font-size:0.5rem;
}
.homeindex-wrap-head-top-left>i{
	font-size:0.5rem;
	vertical-align: middle;
	position:relative;
	top:1px;
}
.homeindex-wrap-head-top-left img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-wrap-head-bottom{
	height:5.3rem;
	width:100%;
	position:relative;
}
.homeindex-wrap-head-bottom-contaire{
	height:3.66rem;
	width:100%;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(1){
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: flex-end;
	color:#fff;
	font-size:0.38rem;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(1) b{
	font-size:1.25rem;
	line-height: 0.8;
	font-weight: 400;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(2){
	font-size:0.44rem;
	color:#fff;
	text-align: center;
	line-height:0.98rem;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(3){
	font-size:0.44rem;
	color:#fff;
	text-align: center;
	line-height:0.75rem;
}
.homeindex-wrap-head-bottom-guzhang{
	width:100%;
	height:3rem;
	position: absolute;
	left:0;
	top:3.66rem;
	padding:0 0.5rem;
}
.homeindex-wrap-head-bottom-guzhang-contaire{
	width:100%;
	height:100%;
	border-radius: 5px;
	background: #fff;
	box-shadow: 2px 2px 15px rgba(25,137,245,.1);
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: space-around;
}
.homeindex-wrap-head-bottom-guzhang-contaire-center{
	width:1px;
	height:0.8rem;
	background: #ddd;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left,.homeindex-wrap-head-bottom-guzhang-contaire-right{
	flex:1;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(1){
	font-size:0.44rem;
	color:#222;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(2) b{
	font-size:0.7rem;
	font-weight: 400;
	color:#ff9c00;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(2) span{
	font-size:0.38rem;
	color:#ff9c00;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(1){
	font-size:0.44rem;
	color:#222;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(2) b{
	font-size:0.7rem;
	font-weight: 400;
	color:#fb6942;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(2) span{
	font-size:0.38rem;
	color:#fb6942;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p,.homeindex-wrap-head-bottom-guzhang-contaire-right p{
	text-align: center;
}
.homeindex--wrap-bottom{
	flex:1;
	background: #fff;
	padding-top:2.2rem;
	overflow: auto;
}
.homeindex-car-service-title{
	height:1.17rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.homeindex-car-service-title b{
	width:0.12rem;
	height:0.5rem;
	background: #1989f5;
}
.homeindex-car-service-title span{
	font-size:0.5rem;
	color:#000;
	margin-left:0.4rem;
}
.homeindex-car-service-title i{
	flex:1;
	text-align: right;
	font-style: normal;
	font-size:0.5rem;
	color:#2d3461;
}
.homeindex-car-service>ul{
	padding:0.3rem 0.5rem 0.85rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.homeindex-car-service>ul li{
	height:1.74rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.homeindex-car-service>ul li img{
	width:0.78rem;
	display: block;
}
.homeindex-car-service>ul li span{
	font-size:0.4rem;
	color:#2d3461;
}
.homeindex-car-friends>ul>li{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.homeindex-car-friends>ul>li img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-car-friends>ul>li span{
	font-size:0.44rem;
	color:#2d3461;
}
.homeindex-car-friends>ul>li i{
	flex:1;
	font-size:0.44rem;
	color:#2d3461;
	font-style: normal;
	text-align: right;
}
</style>