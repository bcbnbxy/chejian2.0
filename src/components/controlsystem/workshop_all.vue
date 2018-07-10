<template>
<div class="workshop_app-wrap">
	<ul>
		<router-link tag="li" to="/consumer">
			<p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户01</span></p>
			<p><span>婉婉01</span><img src="../../assets/img/my/tishi.png"/></p>
		</router-link>
		<router-link tag="li" to="/consumer">
			<p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户02</span></p>
			<p><span>婉婉02</span><img src="../../assets/img/my/tishi.png"/></p>
		</router-link>
		<router-link tag="li" to="/consumer">
			<p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户03</span></p>
			<p><span>婉婉03</span><img src="../../assets/img/my/tishi1.png"/></p>
		</router-link>
		<router-link tag="li" to="/consumer">
			<p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户04</span></p>
			<p><span>婉婉04</span><img src="../../assets/img/my/tishi1.png"/></p>
		</router-link>
		<router-link tag="li" to="/consumer">
			<p><img src="../../assets/img/faxianimg/avatar.png"/><span>客户05</span></p>
			<p><span>婉婉05</span><img src="../../assets/img/my/tishi1.png"/></p>
		</router-link>
	</ul>
</div>
</template>

<script>
</script>

<style scoped>
.workshop_app-wrap{
	background: #fff;
}
.workshop_app-wrap li{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.workshop_app-wrap li p:nth-child(1) img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	display: inline;
	margin-right:0.3rem;
	vertical-align: middle;
}
.workshop_app-wrap li p:nth-child(2) img{
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	display: inline;
	margin-left:0.3rem;
	vertical-align: middle;
}
</style>