<template>
<div class="chosecar-wrap">
	<div class="chosecar-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>选择查询车辆</span>
	</div>
	<div class="chosecar-wrap-contaire">
		<ul>
			<router-link tag="li" :to="{name:'fillinfo',params:{vin:item.vin}}" v-for="(item,index) in data" :key="index"><img src="../../assets/img/shouye/device.png"/><p><span>设备编码：{{item&&item.device}}</span><span><b>{{item&&item.deviceVehicle.brandname}} {{item&&item.deviceVehicle.modelname}}</b></span></p><i class="iconfont icon-arrow-right-copy-copy-copy"></i></router-link>
		</ul>
	</div>
</div>
</template>

<script>
export default{
	created(){
		this.getdevices();
	},
	data(){
		return {
			data:[],
		}
	},
	methods:{
		getdevices(){
			var that=this;
			this.$api("/Execute.do",{action:"device.devices"}).then(function(r){
				if(r.errorCode==0){
					that.data=r.data.devices
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		}
	}
}
</script>
<style scoped>
.chosecar-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.chosecar-wrap-head{
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	color:#fff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.chosecar-wrap-head{
		height:2.64rem;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		font-size:0.56rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size: cover;
		color:#fff;
	}
}
.chosecar-wrap-head .icon-fanhui{
	float:left;
	font-size:0.6rem;
}
.chosecar-wrap-contaire{
	flex:1;
}
.chosecar-wrap-contaire ul{
	background:#fff;
}
.chosecar-wrap-contaire ul li{
	height:2rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
}
.chosecar-wrap-contaire ul li img{
	width:0.6rem;
}
.chosecar-wrap-contaire ul li p{
	display: flex;
	display: -webkit-flex;
	height:1.14rem;
	flex-direction: column;
	justify-content: space-between;
	font-size:0.38rem;
	color:#222;
	flex:1;
	align-items: flex-start;
	padding-left:0.5rem;
}
.chosecar-wrap-contaire ul li p b{
	font-weight: 400;
}
.chosecar-wrap-contaire ul li .icon-arrow-right-copy-copy-copy{
	font-size:0.6rem;
	color:#a0a0a0;
}
</style>