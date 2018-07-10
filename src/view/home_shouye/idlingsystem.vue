<template>
	<div class="idlingsystem-wrap">
		<div class="powersystem-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>怠速系统</span>
			<i class="iconfont icon-yunongtongjingshigantanhao"></i>
		</div>
		<div class="powersystem-wrap-contaire">
		<div class="powersystem-wrap-contaire-top">
			<div class="powersystem-wrap-contaire-top-pingfen">
				<span>系统评分</span>
				<b>3654</b>
			</div>
			<p>您的爱车电源系统状态:<b>正常</b></p>
		</div>
		<div class="powersystem-wrap-contaire-bottom">
			<div class="powersystem-wrap-contaire-bottom-content">
				<div class="powersystem-wrap-contaire-bottom-discharging">
					<h3>当前怠速：<span>790r/min</span></h3>
					<dl>
						<dt>状态说明:</dt>
						<dd><span>796-996r/min</span><span>放电电压亏电</span></dd>
						<dd><span>>996r/min</span><span>放电电压过高</span></dd>
					</dl>
				</div>
			</div>
			<div class="powersystem-wrap-contaire-bottom-tips">
				<h3>Tips:</h3>
				<p>1.车辆如果出现怠速不稳或怠速过高的现象，说明发动机存在故障 </p>
				<p>2.怠速不稳容易使车出现抖动，动力下降，以及冷启动困难 </p>
				<p>3.怠速过高容易导致发动机升温过高，造成冷却系统循环不畅</p>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
</script>

<style scoped>
.idlingsystem-wrap{
	width:100%;
	height:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.powersystem-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	position: relative;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
}
.powersystem-wrap-head .icon-fanhui{
	font-size:0.6rem;
	position:absolute;
	left:0.5rem;
}
.powersystem-wrap-head .icon-yunongtongjingshigantanhao{
	font-size:0.7rem;
	position:absolute;
	right:0.5rem;
}
.powersystem-wrap-contaire{
	flex:1;
	overflow: auto;
}
.powersystem-wrap-contaire-top{
	height:9.75rem;
	width:100%;
	padding-top:0.88rem;
}
.powersystem-wrap-contaire-top>p{
	font-size:0.48rem;
	color:#222;
	line-height:1;
	text-align: center;
	margin-top:0.5rem;
}
.powersystem-wrap-contaire-top>p b{
	color:#1aad19;
}
.powersystem-wrap-contaire-top-pingfen{
	width:7.6rem;
	height:7.08rem;
	background-image:url(../../assets/img/shouye/duobianxing.png) ;
	background-size:cover;
	background-repeat: no-repeat;
	margin:0 auto;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size:0.52rem;
	color:#222;	
	line-height: 1;
}
.powersystem-wrap-contaire-top-pingfen b{
	font-size:0.9rem;
	color:#1989f5;
	margin-top:0.4rem;
}
.powersystem-wrap-contaire-bottom{
	padding:0 0.5rem;
	padding-bottom:0.7rem;
}
.powersystem-wrap-contaire-bottom-content{
	width:100%;
	margin:0.3rem 0;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
}
.powersystem-wrap-contaire-bottom-discharging{
	width:100%;
	padding:0.6rem 0.5rem 0.52rem 0.5rem;
}
.powersystem-wrap-contaire-bottom-discharging>h3{
	font-weight: 400;
	color:#222;
	height:0.94rem;
	line-height:0.94rem;
	width:100%;
	text-align: center;
	font-size:0.52rem;
}
.powersystem-wrap-contaire-bottom-discharging>h3>span{
	color:#1aad19;
	margin-left:0.3rem;
}
.powersystem-wrap-contaire-bottom-discharging>dl>dt{
	font-size:0.38rem;
	color:#222;
	height:1.15rem;
	line-height:1.15rem;
}
.powersystem-wrap-contaire-bottom-discharging>dl>dd{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	height:0.94rem;
}
.powersystem-wrap-contaire-bottom-tips {
	padding:0.2rem 0.5rem 0.44rem 0.5rem;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
}
.powersystem-wrap-contaire-bottom-tips h3{
	font-size:0.44rem;
	color:#222;
	height:0.88rem;
	line-height:0.88rem;
}
.powersystem-wrap-contaire-bottom-tips p{
	line-height:0.72rem;
	font-size:0.38rem;
	color:#666;
}
</style>