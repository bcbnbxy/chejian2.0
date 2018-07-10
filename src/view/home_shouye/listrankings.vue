<template>
<div class="listrankings-wrap">
	<div class="listrankings-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>{{$route.params.name}}</span>
	</div>
	<div class="listrankings-wrap-contaire">
		<div class="listrankings-wrap-contaire-my">
			<img src="../../assets/img/faxianimg/avatar.png"/>
			<div>
				<span>懒先生</span>
				<p>
					<img src="../../assets/img/shouye/falali.png"/>
					<span>保时捷911</span>
				</p>
			</div>
			<span>第2365名</span>
		</div>
		<div class="listrankings-wrap-contaire-list">
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><img src="../../assets/img/shouye/guanjun.png"/><span>第1名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><img src="../../assets/img/shouye/yajun.png"/><span>第2名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><img src="../../assets/img/shouye/jijun.png"/><span>第3名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><span>第4名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><span>第5名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><span>第6名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><span>第7名</span></p>
			</div>
			<div class="listrankings-wrap-contaire-item">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<div>
					<span>懒先生</span>
					<p>
						<img src="../../assets/img/shouye/falali.png"/>
						<span>保时捷911</span>
					</p>
				</div>
				<p><span>第8名</span></p>
			</div>
		</div>
	</div>
</div>	
</template>

<script>
</script>

<style>
.listrankings-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.listrankings-wrap-head{
	height:1.32rem;
	text-align: center;
	padding:0 0.5rem;
	width:100%;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size: cover;
	position: relative;
	line-height:1.32rem;
}
.listrankings-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.listrankings-wrap-contaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.listrankings-wrap-contaire-my{
	height:2rem;
	padding:0.4rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: #fff;
	margin-bottom:0.3rem;
}
.listrankings-wrap-contaire-my>img,.listrankings-wrap-contaire-item>img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.listrankings-wrap-contaire-my>div,.listrankings-wrap-contaire-item>div{
	flex: 1;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-around;
	padding-left:0.5rem;
}
.listrankings-wrap-contaire-my>div>span,.listrankings-wrap-contaire-item>div>span{
	font-size:0.38rem;
	color:#222;
}
.listrankings-wrap-contaire-my>div>p,.listrankings-wrap-contaire-item>div>p {
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.listrankings-wrap-contaire-my>div>p img,.listrankings-wrap-contaire-item>div>p img{
	width:0.35rem;
	height:0.46rem;
	display: inline-block;
	margin-right:0.3rem;
}
.listrankings-wrap-contaire-my>div>p span,.listrankings-wrap-contaire-item>div>p span{
	font-size:0.34rem;
	color:#666;
}
.listrankings-wrap-contaire-my>span{
	font-size:0.38rem;
	color:#222;
}
.listrankings-wrap-contaire-list{
	flex:1;
	overflow:auto;
}
.listrankings-wrap-contaire-item{
	height:2rem;
	padding:0.4rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.listrankings-wrap-contaire-item:last-child{
	border-bottom:none;
}
.listrankings-wrap-contaire-item>p{
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.listrankings-wrap-contaire-item>p img{
	width:0.63rem;
	display: inline-block;
}
.listrankings-wrap-contaire-item>p span{
	font-size:0.38rem;
	color:#222;
	margin-left:0.3rem;
}
</style>