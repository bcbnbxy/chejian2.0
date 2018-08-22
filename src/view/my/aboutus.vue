<template>
<div class="aboutus-wrap">
	<div class="aboutus-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>关于我们</span>
	</div>
	<div class="aboutus-wrap-contaire">
		<p>下载车尖app,让你以最简单的方式了解汽车安全知识.
                        认识更多车友,如果您是做汽车行业的,更能实时管理
                        您公司的客户和员工。</p>
        <h3>特色服务</h3>
		<p>车尖搭配车尖帽,用户可以简单清晰的了解自己爱车的
		实时动态,包括内容(车子的油耗,公里数,存在的故障
		隐患等车辆信息)
		更有违章查询,接车服务,汽车零配件查询等配套汽车生活服务</p>		
		<h3>产品介绍</h3>
		<p>车尖,车尖帽,商家管理系统,商家评分系统。旨在为车主提供最安全的信息和最效率的服务。</p>		
		<h3>关于车尖</h3>
		<p>车尖app(pp(chehaode.com)成立于)成立于2018年5月11日,汇集汽车
		安全评分,用户动态分享,交友,汽车商家管理系统,汽车
		生活周边服务于一体的综合服务平台,在业内率先推出
		"商家管理系统实时观测用户车辆安全系统"为保障车尖
		用户的车辆行驶安全提供服务.</p>
		<h3>用户帮助</h3>		
		<p>感谢您使用车尖手机用户端,使用中有任何问题可通过以下方式		
		官方网站:网站:www.chehaode.com</p>
	</div>
</div>
</template>

<script>
</script>

<style>
.aboutus-wrap{
	width:100%;
	height:100%;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.aboutus-wrap-head{
	height:1.92rem;
	width:100%;
	text-align: center;
	line-height:1.32rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
	position: relative;
	font-size:0.56rem;
	color:#fff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.aboutus-wrap-head{
		height:2.64rem;
		width:100%;
		text-align: center;
		line-height:1.32rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover ;
		position: relative;
		font-size:0.56rem;
		color:#fff;
	}
}
.aboutus-wrap-head i{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.aboutus-wrap-contaire{
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	line-height:0.74rem;
	font-size:0.44rem;
	color:#666;
	padding:0.5rem;
}
.aboutus-wrap-contaire p{
	text-indent: 2em;
}
.aboutus-wrap-contaire h3{
	font-size:0.56rem;
	margin:0.24rem 0;
}
.aboutus-wrap-contaire h1{
	font-size:0.6rem;
	margin:0.24rem 0;
}
</style>