<template>
<div class="friends-wrap">
	<div class="friends-wrap-head">
		<span>好友</span>
	</div>
	<div class="friends-cotaire">
		<div class="friends-cotaire-search">
			<p><i class="iconfont icon-search"></i><input type="text" placeholder="搜索"/></p>
		</div>
		<div class="friends-cotaire-list">
			<ul>
				<router-link tag="li" to="/friends/chat"><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>明天下午车展约吗？？</span></p></router-link>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>昨天下午车被划了，好难过。。</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>开车不喝酒，喝酒不开车。</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>滴滴，上车啦。</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>明天下午车展约吗??</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>我明天要去保养车，一起不？</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>OK，没问题。</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"></p><p><span><b>哒哒</b><i>14:48</i></span><span>明天下午车展约吗??明天下午车展约吗??明天下午车展约吗??明天下午车展约吗??</span></p></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.friends-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.friends-wrap-head{
	height:1.32rem;
	width:100%;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.friends-cotaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.friends-cotaire-search{
	width:100%;
	height:1.6rem;
	padding:0.35rem 0.5rem;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.friends-cotaire-search p{
	line-height:1;
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: #eee;
	border-radius: 5px;
	padding-left:0.3rem;
}
.friends-cotaire-search p input{
	flex:1;
	padding-left:0.3rem;
	color:#222;
	font-size:0.38rem;
	height:100%;
}
.friends-cotaire-search p input::-webkit-input-placeholder{
	color:#999;
}
.friends-cotaire-search p .icon-search{
	font-size:0.45rem;
	color:#999;
}
.friends-cotaire-list{
	width:100%;
	flex:1;
	overflow-y: auto;
}
.friends-cotaire-list ul{
	background: #fff;
	width:100%;
}
.friends-cotaire-list ul li{
	height:2rem;
	width:100%;
	padding-left:0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	overflow: hidden;
}
.friends-cotaire-list ul li>p:nth-child(1){
	flex:0 0 1.4rem;
	height:1.4rem;
	border-radius: 50%;
	overflow:hidden;
}
.friends-cotaire-list ul li>p:nth-child(1) img{
	width:100%;
}
.friends-cotaire-list ul li>p:nth-child(2){
	flex:1;
	height:100%;
	padding:0.3rem 0;
	padding-right:0.5rem;
	border-bottom:1px solid #ddd;
	margin-left:0.5rem;
	display: flex;
	display:-webkit-flex;
	flex-direction: column;
	justify-content: space-around;
	font-size:0.38rem;
	color:#666;
}
.friends-cotaire-list ul li>p:nth-child(2) span:nth-child(1){
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.friends-cotaire-list ul li>p:nth-child(2) span:nth-child(1) b{
	font-weight: 400;
	color:#222;
}
.friends-cotaire-list ul li>p:nth-child(2) span:nth-child(1) i{
	font-style: normal;
	color:#999;
}
.friends-cotaire-list ul li>p:nth-child(2) span:nth-child(2){
	width:9.58rem;
	overflow:hidden;
	white-space: nowrap;
	text-overflow:ellipsis;  	 
}
.friends-cotaire-list ul li:last-child p:last-child{
	border-bottom:none;
}
</style>