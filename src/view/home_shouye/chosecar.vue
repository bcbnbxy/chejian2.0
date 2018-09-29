<template>
<div class="chosecar-wrap">
	<div class="chosecar-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>违章查询</span>
	</div>
	<div class="chosecar-wrap-contaire" v-if="nodata">
		<div class="chosecar-item" @click="gofillinfo(item)" v-for="(item,index) in devicelist">
			<ul>
				<li><span>车牌号</span><span>{{item.platenumber}}</span></li>
				<li><span>车架号</span><span>{{item.vin}}</span></li>
				<li><span>发动机号</span><span>{{item.engineno}}</span></li>
				<li><span>车型</span><span>{{item.deviceVehicle&&item.deviceVehicle.brandname}}  {{item.deviceVehicle&&item.deviceVehicle.modelname}}  {{item.deviceVehicle&&item.deviceVehicle.vehiclelevel}}</span></li>
			</ul>
			<p><i class="iconfont icon-fanhui"></i></p>
		</div>
	</div>
	<div class="chosecar-wrap-nodata" v-else><span>没有查询到相关数据</span></div>
</div>
</template>

<script>
export default{
	data(){
		return {
			nodata:false,
			devicelist:[],
		}
	},
	created(){
		this.getdevices();
	},
	methods:{
		gofillinfo(item){
			this.$router.push('/fillinfo');
			this.$store.commit('getViolationinquiry',item)
		},
		getdevices(){
			var that=this;
			this.$api('/Execute.do',{action:"device.devices"}).then(function(r){
				if(r.errorCode==0){
					if(r.data.devices==undefined||r.data.devices==null||r.data.devices==""){
						that.nodata=false
					}else{
						that.nodata=true;
						that.devicelist=r.data.devices;
					}					
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
	padding:0.5rem;
}
.chosecar-item{
	width:100%;
	height:5.35rem;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
	margin-bottom:0.3rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.chosecar-item>ul{
	flex: 1;
	padding:0.4rem 0;
	padding-left:0.54rem;
}
.chosecar-item>ul li{
	height:1.2rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	font-size:0.4rem;
	color:#000b31;
	align-items: center;
}
.chosecar-item>p{
	width:1.2rem;
	height:5.35rem;
	line-height:5.35rem;
	font-size:0.6rem;
	color:#a0a0a0;
	text-align: center;
}
.chosecar-item>p>.iconfont{
	display: inline-block;
	transform: rotate(180deg);
}
.chosecar-wrap-nodata{
	flex:1;
	padding:0.5rem;
	text-align: center;
	padding-top:3rem;
	font-size:0.5rem;
	color:#666;
}
</style>