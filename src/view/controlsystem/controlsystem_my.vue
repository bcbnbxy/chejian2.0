<template>
<div class="controlsystem_my-wrap">
	<div class="mycontrolsystem-wrap-top">
		<div class="mycontrolsystem-wrap-header">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>我的</span>
		</div>
		<div class="mycontrolsystem-wrap--top-contaire">
			<img src="../../assets/img/faxianimg/avatar.png"/>
			<h3>婉婉01</h3>
			<p><span>设备 0</span><span>客户 0</span></p>
		</div>
	</div>
	<div class="controlsystem_my-wrap-bottom">
		<ul>
			<router-link tag="li" to="/consumer"><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户01</span></p><p><img src="../../assets/img/my/tishi.png"/></p></router-link>
			<li><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户02</span></p><p><img src="../../assets/img/my/tishi.png"/></p></li>
			<li><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户03</span></p><p><img src="../../assets/img/my/tishi1.png"/></p></li>
			<li><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户04</span></p><p><img src="../../assets/img/my/tishi1.png"/></p></li>
			<li><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户05</span></p><p><img src="../../assets/img/my/tishi1.png"/></p></li>
			<li><p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户06</span></p><p><img src="../../assets/img/my/tishi1.png"/></p></li>
		</ul>
	</div>
</div>
</template>

<script>
</script>
<style scoped>
.controlsystem_my-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.mycontrolsystem-wrap-top{
	width:100%;
	height:6.4rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
}
.mycontrolsystem-wrap-header{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.56rem;
}
.mycontrolsystem-wrap-header .icon-fanhui{
	font-size:0.6rem;
	float: left;
}
.mycontrolsystem-wrap--top-contaire{
	padding-top:0.62rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
}
.mycontrolsystem-wrap--top-contaire img{
	width:1.8rem;
	border-radius: 50%;
	display: block;
}
.mycontrolsystem-wrap--top-contaire h3{
	font-weight: 400;
	color:#fff;
	font-size:0.44rem;
	line-height: 1;
	margin-top:0.54rem;
}
.mycontrolsystem-wrap--top-contaire p{
	font-size:0.38rem;
	color:#fff;
	line-height: 1;
	margin-top:0.5rem;
}
.mycontrolsystem-wrap--top-contaire p span:nth-child(1){
	margin-right:1rem;
}
.controlsystem_my-wrap-bottom{
	flex:1;
	overflow: auto;
	background: #f7f7f7;
}
.controlsystem_my-wrap-bottom ul{
	background: #fff;
}
.controlsystem_my-wrap-bottom ul li{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(1) img{
	width:1rem;
	border-radius: 50%;
	vertical-align: middle;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(1) span{
	font-size:0.38rem;
	color:#222;
	margin-left:0.5rem;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(2) img{
	width:0.62rem;
	border-radius: 50%;
	vertical-align: middle;
}
</style>