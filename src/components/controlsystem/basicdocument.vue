<template>
<div class="basicdocument-warp">
	<dl>
		<dt><img src="../../assets/img/faxianimg/lanbo.png"/><p><b>兰博基尼</b><span>2018款Aventador S Roadster</span></p></dt>
		<dd><span>地区</span><p>深圳</p></dd>
		<dd><span>驾龄</span><p>2年</p></dd>
		<dd><span>驾龄里程</span><p>8423KM</p></dd>
		<dd><span>当前车辆里程</span><p>9563KM</p></dd>
	</dl>
</div>
</template>

<script>
</script>

<style scoped>
.basicdocument-warp{	
	background:#fff;
}
.basicdocument-warp dt{
	padding:0 0.5rem;
	height:2rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;	
}
.basicdocument-warp dt img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
	display: block;
	margin-right:0.5rem;
}
.basicdocument-warp dt p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	color:#333;
}
.basicdocument-warp dt p b{
	font-size:0.46rem;
	font-weight: 400;
	line-height: 1;
	margin-bottom:0.3rem;
}
.basicdocument-warp dt p span{
	font-size:0.38rem;
	line-height: 1;
}
.basicdocument-warp dd{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
}
.basicdocument-warp dd p{
	color:#666;
}
</style>