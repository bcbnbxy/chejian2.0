<template>
	<div class="follow-wrap">
		<div class="follow-nologin">
			登陆后发现你感兴趣的动态哦~
		</div>
		<ul class="follow-friends">
			<router-link tag="li" to="/phonebook"><p>通讯录好友</p><p><span>有2个好友在</span><i  class="iconfont icon-arrow-right-copy-copy-copy"></i></p></router-link>
			<li><p>新浪微博好友</p><p><span></span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
		</ul>
		<div class="follow-trends">
			<div class="follow-trends-title">
				为你推荐动态
			</div>
			<Dynamicslist></Dynamicslist>
		</div>
	</div>
</template>
<script>
import Dynamicslist from '@/components/search/dynamics'
export default {
	components:{Dynamicslist}
}
</script>

<style>
.follow-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.follow-nologin{
	width:100%;
	height:3rem;
	line-height:3rem;
	text-align: center;
	font-size:0.36rem;
	color:#999;
	background: #fff;
	margin-bottom:0.3rem;
}
.follow-friends{
	background: #fff;
	margin-bottom:0.3rem;
}
.follow-friends li:last-child{
	border-bottom:none;
}
.follow-friends li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
	border-bottom:1px solid #dcdcdc;
}
.follow-friends li p:nth-child(1){
	font-size:0.42rem;
	color:#222;
}
.follow-friends li p:nth-child(2) span{
	font-size:0.38rem;
	color:#666;
}
.follow-friends li p:nth-child(2) i{
	font-size:0.4rem;
	color:#a0a0a0;
	margin-left:0.3rem;
}
.follow-trends-title{
	padding-top:0.6rem;
	height:0.98rem;
	line-height:0.38rem;
	font-size:0.38rem;
	color:#999;
	background: #fff;
	padding-left:0.5rem;
}
</style>