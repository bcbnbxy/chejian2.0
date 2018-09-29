<template>
<div class="Violationinquiry-wrap">
	<div class="Violationinquiry-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>违章详情</span>
	</div>
	<div class="Violationinquiry-wrap-contaire">
		<div class="Violationinquiry-carinfo-title">
			<!--<img src="../../assets/img/faxianimg/lanbo.png"/>-->
			<b>{{Violationinquiry.platenumber}}</b>
		</div>
		<div class="Violationinquiry-carinfo">
			<!--<div class="Violationinquiry-carinfo-sum">
				<p><span>违章</span><b>2</b></p>
				<p><span>罚款</span><b>500元</b></p>
				<p><span>扣分</span><b>4分</b></p>
			</div>-->
			<div class="Violationinquiry-carinfo-item" v-for="(item,index) in Violationinquiry.peccancies">
				<ul>
					<li><span>违章时间:</span><span>{{item.happentime | changetime}}</span><span>{{item.happentime | gethour}}</span></li>
					<li><span>城市:</span><span>{{item.cityName}}</span></li>
					<li><span>地点:</span><span>{{item.address}}</span></li>
					<li><span>行为:</span><span>{{item.reason}}</span></li>
					<li><span>罚款金额:</span><span>￥{{item.money}}</span><span>扣分:&nbsp;&nbsp;&nbsp;&nbsp;{{item.degree}}分</span></li>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			Violationinquiry:this.$route.param.Peccancy
		}
	},
	filters:{
		changetime(seconds){
			var str = "";
			var year = new Date(seconds).getFullYear();
			var month = parseInt(new Date(seconds).getMonth())+1;
			month = month>9?month:'0'+month;
			var day = new Date(seconds).getDate();
			day = day > 9 ? day : '0'+day;
			str += year+'/'+month+'/'+day;
			return str;			
		},
		gethour(seconds){
			var str = "";
			var hour=new Date(seconds).getHours();
			hour= hour>9?hour:'0'+hour;
			var minutes=new Date(seconds).getMinutes();
			minutes = minutes>9?minutes:'0'+minutes;
			str= hour+':'+minutes;
			return str;
		}
	}
}
</script>

<style scoped>
.Violationinquiry-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.Violationinquiry-wrap-head{
	height:1.92rem;
	text-align: center;
	line-height:1.32rem;
	color:#fff;
	padding:0 0.5rem;
	padding-top:0.6rem;
	font-size:0.56rem;
	width:100%;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.Violationinquiry-wrap-head{
		height:2.64rem;
		text-align: center;
		line-height:1.32rem;
		color:#fff;
		padding:0 0.5rem;
		padding-top:1.32rem;
		font-size:0.56rem;
		width:100%;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover;
	}
}
.Violationinquiry-wrap-head .icon-fanhui{
	float:left;
	font-size:0.6rem;
}
.Violationinquiry-wrap-contaire{
	flex:1;
}
.Violationinquiry-carinfo-title{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	margin-bottom:0.3rem;
	background: #fff;
	
}
.Violationinquiry-carinfo-title img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.Violationinquiry-carinfo-title b{
	font-size:0.44rem;
	font-weight: 600;
	color:#222;
	flex:1;
}
.Violationinquiry-carinfo{
	background: #fff;
}
.Violationinquiry-carinfo-sum{
	height:3rem;
	border-bottom: 1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 1rem;
	align-items: center;
}
.Violationinquiry-carinfo-sum p>span{
	width:1.4rem;
	height:1.4rem;
	display: block;
	border-radius:50% ;
	background: #1989f5;
	color:#fff;
	font-size:0.4rem;
	text-align: center;
	line-height: 1.4rem;
}
.Violationinquiry-carinfo-sum p>b{
	display: block;
	text-align: center;
	font-size:0.4rem;
	font-weight: 500;
	margin-top:0.2rem;
	color:#222;
}
.Violationinquiry-carinfo-item{
	height:6.5rem;
	background: #fff;
	border-bottom: 1px solid #ddd;
	padding:0.34rem 0.5rem 0.34rem 0.5rem;
}
.Violationinquiry-carinfo-item:last-child{
	border-bottom:none;
}
.Violationinquiry-carinfo-item li{
	height:1.16rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.4rem;
	color:#222;
	
}
.Violationinquiry-carinfo-item li span:nth-child(1){
	width:2.7rem;
}
.Violationinquiry-carinfo-item li span:nth-child(2){
	width:3.05rem;
}
.Violationinquiry-carinfo-item li:last-child{
	color:#ff0000;
}
</style>