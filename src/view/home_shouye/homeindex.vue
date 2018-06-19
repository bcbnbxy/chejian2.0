<template>
	<div class="homeindex-wrap">
		<div class="homeindex-head">
			<div class="homeindex-head-left"><img src="../../assets/img/faxianimg/avatar.png"/><span>婉婉</span></div>
			<div class="homeindex-head-right"><i class="iconfont icon-scan"></i></div>
		</div>
		<div class="homeindex-container">
			<div class="homeindex-fault">
				<div class="homeindex-fault-title">
					<div class="homeindex-fault-title-left"><i class="iconfont icon-chart"></i><span>当前排名：15325名</span></div>
					<div class="homeindex-fault-title-right"><i class="iconfont icon-anquan"></i><span>车辆安全系数:16652</span></div>
				</div>
				<div class="fault-container">
					<div class="fault-container-left"><h3>当前故障</h3><p><span>2</span>/处</p></div>
					<div class="fault-container-right"><h3>当前警告</h3><p><span>10</span>/处</p></div>
				</div>
				<ul class="fault-list">
					<li>
						<img src="../../assets/img/faxianimg/lanbo.png"/>
						<span>兰博基尼</span>
					</li>
					<li>
						<img src="../../assets/img/faxianimg/masha.png"/>
						<span>玛莎拉蒂</span>
					</li>
					<li>
						<p>+</p>
						<span>暂无车辆</span>
					</li>
					<li>
						<p>+</p>
						<span>暂无车辆</span>
					</li>
				</ul>
			</div>
			<div class="vehicle-services">
				<div class="vehicle-services-title">
					<b></b><span>车辆服务</span>
				</div>
				<ul>
					<li><img src="../../assets/img/faxianimg/shangcheng.png"><span>配件商城</span></li>
					<li><img src="../../assets/img/faxianimg/jiuyuan.png"><span>车辆救援</span></li>
					<li><img src="../../assets/img/faxianimg/cheyou.png"><span>附近车友</span></li>
					<li><img src="../../assets/img/faxianimg/dongtai.png"><span>车友动态</span></li>
				</ul>
			</div>
			<div class="homeindex-carfriends">
				<div class="homeindex-carfriends-title">
					<p><i></i><b>我的车友</b></p>
					<p><span>车辆评分</span></p>
				</div>
				<ul class="homeindex-carfriends-list">
					<li>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>婉婉婉</span>
						<p>123456</p>
					</li>
					<li>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>婉婉婉</span>
						<p>123456</p>
					</li><li>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>婉婉婉</span>
						<p>123456</p>
					</li><li>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>婉婉婉</span>
						<p>123456</p>
					</li>
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
.homeindex-head{
	width:100%;
	height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	padding:0.1rem 0.4rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.homeindex-head-left img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
	vertical-align: middle;
}
.homeindex-head-left span{
	color:#fff;
	font-size:0.56rem;
}
.homeindex-head-right i{
	font-size:0.56rem;
	color:#fff;
}
.homeindex-container{
	flex:1;
	background: #fff;
	overflow: auto;
}
.homeindex-fault{
	width:100%;
	height:8.8rem;
	background:#0682ef;	
	padding:0 0.4rem;
}
.homeindex-fault-title{
	height:0.96rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.34rem;
	color:#fff;
}
.homeindex-fault-title i{
	margin-right:0.44rem;
}
.homeindex-fault-title img{
	margin-right:0.44rem;
}
.fault-container{
	background:#fff;
	width:100%;
	height:4.38rem;
	border-radius: 5px;
	padding:1.1rem 0 1rem 0;
	display:flex;
	display: -webkit-flex;
}
.fault-container-left,.fault-container-right{
	width:50%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.fault-container h3{
	font-size:0.38rem;
	color:#434343;
	font-weight: normal;
}
.fault-container p{
	font-size:0.34rem;
}
.fault-container p span{
	font-size:1.36rem;
}
.fault-container-left{
	border-right:2px solid #1989f5;
}
.fault-container-left p{
	color:#1989f5;
}
.fault-container-right p{
	color:#fb6942;
}
.fault-list{
	width:100%;
	height:2.74rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	margin-top:0.24rem;
}
.fault-list li{
	width:2.52rem;
	height:2.74rem;
	background: rgba(255,255,255,.3);
	border-radius: 5px;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
.fault-list li img{
	width:1.21rem;
	height:1.21rem;
	border-radius:50%;
}
.fault-list li span{
	font-size:0.32rem;
	color:#fff;
}
.fault-list li p{
	width:1.21rem;
	height:1.21rem;
	border-radius:50%;
	background: rgba(255,255,255,.5);
	font-size:1rem;
	color:#fff;
	text-align: center;
	line-height:1.21rem;
}
.vehicle-services{
	margin-top:0.96rem;
	padding:0 0.5rem;
}
.vehicle-services-title{
	height:0.5rem;
	width:100%;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.5rem;
	color:#343434;
}
.vehicle-services-title b{
	width:0.12rem;
	height:0.5rem;
	background:#1989f5;
	margin-right:0.42rem;
}
.vehicle-services ul{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding-top:0.6rem;
}
.vehicle-services ul li{
	display: flex;
	height: 1.76rem;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size:0.36rem;
	color:#2d3461;
}
.vehicle-services ul li img {
	height:0.96rem;
}
.homeindex-carfriends{
	margin-top:1.38rem;
	padding:0 0.5rem;
}
.homeindex-carfriends-title{
	height:0.5rem;
}
.homeindex-carfriends-title p:nth-child(1){
	float:left;
}
.homeindex-carfriends-title p:nth-child(2){
	float:right;
}
.homeindex-carfriends-title i{
	width:0.12rem;
	height:0.5rem;
	background:#1989f5 ;
	float:left;
	margin-right:0.42rem;
	line-height: 0.5rem;	
}
.homeindex-carfriends-title b{
	font-size:0.44rem;
	color:#000;
	float:left;
	line-height: 0.5rem;
}
.homeindex-carfriends-title span{
	color:#2d3461;
	font-size:0.44rem;
	line-height: 0.5rem;
	display: block;
}
.homeindex-carfriends-list li{
	height:1.64rem;
	padding-top:0.64rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.4rem;
	color:#2d3461;
}
.homeindex-carfriends-list li img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-carfriends-list li p{
	flex:1;
	text-align: right;
}
.icon-anquan,.icon-chart{
	font-size:0.44rem;
}
</style>