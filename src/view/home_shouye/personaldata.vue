<template>
<div class="personaldata-wrap">
	<div class="personaldata-top">
		<div class="personaldata-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>个人资料</span>
		</div>
		<div class="personaldata-wrap-topcontaire">
			<img src="../../assets/img/faxianimg/avatar.png"/>
			<span>客户01</span>
			<p>获赞次数: 12365</p>
		</div>
	</div>
	<div class="personaldata-wrap-contaire">
		<div class="personaldata-wrap-contaire-nav">
			<p @click="toggle(1)" :style="index==1?'color:#369cf9;border-bottom:1px solid #369cf9;':''">基本资料</p>
			<p @click="toggle(2)" :style="index==2?'color:#369cf9;border-bottom:1px solid #369cf9;':''">他的车库</p>
		</div>
		<div class="personaldata-wrap-contaire-main">
			<ul class="personaldata-wrap-contaire-main-tabs1" v-show="index==1">
				<li><span>车间ID</span><span>123456</span></li>
				<li><span>驾龄</span><span>2年</span></li>
				<li><span>所在地区</span><span>广东/深圳</span></li>
				<li><span>所在地区</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></li>
			</ul>
			<ul class="personaldata-wrap-contaire-main-tabs2" v-show="index==2">
				<li><img src="../../assets/img/faxianimg/lanbo.png"/><p><span>保时捷</span><span>1.75T 双离合 基本型 2015款</span><span>行驶里程 258963KM</span></p></li>
				<li><img src="../../assets/img/faxianimg/lanbo.png"/><p><span>保时捷</span><span>1.75T 双离合 基本型 2015款</span><span>行驶里程 258963KM</span></p></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return{
			index:1
		}
	},
	methods:{
		toggle(index){
			this.index=index;
		}
	}
}
</script>

<style>
.personaldata-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
}
.personaldata-top{
	width:100%;
	height:5.84rem;
	background-image:url(../../assets/img/shouye/bg.png) ;
	background-size:cover;
}
.personaldata-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	position: relative;
}
.personaldata-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.personaldata-wrap-topcontaire{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	padding-top:0.3rem;
}
.personaldata-wrap-topcontaire img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.personaldata-wrap-topcontaire span{
	font-size:0.46rem;
	color:#fff;
	margin-top:0.53rem;
	margin-bottom:0.3rem;
}
.personaldata-wrap-topcontaire p{
	font-size:0.38rem;
	color:#fff;
}
.personaldata-wrap-contaire-nav{
	height:1.6rem;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	padding:0 2rem;
	font-size:0.44rem;
	color:#222;
	margin-bottom:0.3rem;
}
.personaldata-wrap-contaire-nav p{
	height:1.6rem;
	line-height:1.6rem;
	padding:0 0.3rem;
}
.personaldata-wrap-contaire-main{
	background: #fff;
}
.personaldata-wrap-contaire-main-tabs1 li{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:#222;
	padding:0 0.5rem;
	font-size:0.44rem;
}
.personaldata-wrap-contaire-main-tabs1 li span:nth-child(2){
	color:#666;
}
.personaldata-wrap-contaire-main-tabs1 li i{
	font-size:0.6rem;
	color:#a0a0a0;
}
.personaldata-wrap-contaire-main-tabs2 li{
	height:2.4rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
}
.personaldata-wrap-contaire-main-tabs2 li img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.personaldata-wrap-contaire-main-tabs2 li p{
	font-size:0.38rem;
	color:#222;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	line-height:1;
	height:1.5rem;
	margin-left:0.5rem;
}
.personaldata-wrap-contaire-main-tabs1 li:last-child,.personaldata-wrap-contaire-main-tabs2 li:last-child{
	border-bottom: none;
}
</style>