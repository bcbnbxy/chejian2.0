<template>
<div class="mycarstate-wrap">
	<ul>
		<li><span>碰撞</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
		<li><span>保养</span><p><span>滤清器</span><img src="../../assets/img/my/tishi.png"/></p></li>
		<li><span>超速</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
		<li><span>震动</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
		<li><span>电压过低</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
		<li><span>车辆熄火</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
		<li><span>车辆启动</span><p><span></span><img src="../../assets/img/my/tishi1.png"/></p></li>
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.mycarstate-wrap{	
	background:#fff;
}
.mycarstate-wrap li{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.mycarstate-wrap li>p>img{
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	vertical-align: middle;
	margin-left:0.4rem;
}
.mycarstate-wrap li>p>span{
	color:#666;
}
</style>