<template>
	<div class="follow">
		<ul>
			<li><router-link tag="p" to="/homepage"><img src="../../assets/img/faxianimg/avatar.png"/></router-link><p><b>小小</b><span>这个人很懒，什么也没留下</span></p><p><span>+关注</span><span>已关注</span></p></li>
			<li><router-link tag="p" to="/homepage"><img src="../../assets/img/faxianimg/avatar.png"/></router-link><p><b>昭</b><span>这个人很懒，什么也没留下</span></p><p><span>+关注</span><span>已关注</span></p></li>
			<li><router-link tag="p" to="/homepage"><img src="../../assets/img/faxianimg/avatar.png"/></router-link><p><b>鱼丸</b><span>这个人很懒，什么也没留下</span></p><p><span>+关注</span><span>已关注</span></p></li>		
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
.follow{
	width:100%;
	height:100%;
}
.follow ul{
	background: #fff;
	padding:0 0.5rem;
}
.follow ul li{
	border-bottom:1px solid #dcdcdc;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0.3rem 0; 
}
.follow ul li:last-child{
	border-bottom:none;
}
.follow ul li img{
	width:1rem;
	border-radius: 50%;	
}
.follow ul li p:nth-child(1){
	margin-right:0.5rem;
	height:1rem;
	line-height:1rem;	
}
.follow ul li p:nth-child(2){
	flex: 1;
	height:1rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;	
}
.follow ul li p:nth-child(2)  b{
	font-size:0.42rem;
	color:#000;
}
.follow ul li p:nth-child(2) span{
	font-size:0.36rem;
	color:#666;
}
.follow ul li p:nth-child(3) span{
	padding:0.22rem 0.44rem;
	border-radius: 0.45rem;
	font-size:0.36rem;
}
.follow ul li p:nth-child(3) span:nth-child(1){
	background:#ff481d;
	color:#fff;
}
.follow ul li p:nth-child(3) span:nth-child(2){
	border:1px solid #ff481d;
	color:#ff481d;
	display: none;
}
</style>