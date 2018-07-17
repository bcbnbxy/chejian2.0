<template>
<div class="devicelist-wrap">
	<div class="chosecar-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>设备列表</span>
	</div>
	<div class="chosecar-wrap-contaire">
		<ul>
			<li v-for="(item,index) in data"><img src="../../assets/img/shouye/device.png"/><p><span>设备编码：{{item.device}}</span><span><b>{{item.deviceVehicle&&item.deviceVehicle.brandname}}  {{item.deviceVehicle&&item.deviceVehicle.manufacturer}} {{item.deviceVehicle&&item.deviceVehicle.modelname}}</b></span></p></li>
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
.devicelist-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.chosecar-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	color:#fff;
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
</style>