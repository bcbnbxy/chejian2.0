<template>
	<div class="nonetwork">
		<div class="nonetwork-head">
			<i class="iconfont icon-fanhui" v-on:click="$router.go(-1)"></i>
		</div>
		<div class="nonetwork-box">
			<p>网络开小差了，请检查网络连接情况</p>
			<button v-on:click="restload">点击重新加载</button>
		</div>
	</div>
</template>

<script>
export default {
	methods:{
		restload(){
			var that=this;
			this.$api('/Execute.do',{action:'areaCodes'}).then(function(r){
				if(r.errorCode==0){
					that.$router.go(-1)
				}
			})
		}
	}
}
</script>

<style>
.nonetwork{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
  	align-items: center;
  	position: relative;
}
.nonetwork-head{
	height:1.92rem;
	font-size:0.6rem;
	color:#fff;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	position: absolute;
	top:0;
	left:0;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.nonetwork-head{
		height:2.64rem;
		font-size:0.6rem;
		color:#fff;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		position: absolute;
		top:0;
		left:0;
	}
}
.nonetwork-head .icon-fanhui{
	float:left;
	touch-action: none;
}
.nonetwork p{
	font-size:0.44rem;
	text-align: center;
	color:#a0a0a0;
}
.nonetwork button{
	background: #ddd;
	display: block;
	margin:0.5rem auto;
	font-size:0.44rem;
	border-radius: 5px;
	border:none;
	touch-action: none;
}
</style>