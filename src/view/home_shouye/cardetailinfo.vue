<template>
<div class="cardetailinfo-wrap">
	<div class="cardetailinfo-wrap-head">
		<i class="iconfont icon-fanhui"  @click="$router.go(-1)"></i>
		<span>车辆信息</span>
	</div>
	<div class="cardetailinfo-selectcar">
		<div class="cardetailinfo-selectcar-top">
			<img :src="selected.deviceVehicle.logo">
			<span>{{selected.deviceVehicle.brandname}}{{selected.deviceVehicle.modelname}}</span>
			<i class="iconfont icon-arrow-right-copy-copy-copy" :class="devicesflag?'iconrotate':''"  @click="devicesshow"></i>
			<ul class="cardetailinfo-selectcar-fixed" v-show="devicesflag">
				<li v-for="(item,index) in devices" @click="select(item,index)">
					<img :src="item&&item.deviceVehicle&&item.deviceVehicle.logo">
					<span>{{item&&item.deviceVehicle&&item.deviceVehicle&&item.deviceVehicle.brandname}}{{item&&item.deviceVehicle&&item.deviceVehicle.modelname}}</span>
				</li>
			</ul>
		</div>
	</div>
	<div class="cardetailinfo-main">
		<div class="cardetailinfo-main-top">
			<div class="cardetailinfo-main-top-left">
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-dianpingdianya"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.voltage">{{cardetailinfo.voltage}}V</b>
						<b v-else>暂无数据</b>
						<span>电瓶电压</span>
					</p>
				</div>
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-lengque"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.coolanttemperature">{{cardetailinfo.coolanttemperature}}℃</b>
						<b v-else>暂无数据</b>
						<span>冷却液温度</span>
					</p>
				</div>
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-shijian"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.totaltravelhours">{{cardetailinfo.totaltravelhours}}H</b>
						<b v-else>暂无数据</b>
						<span>累计行驶时间</span>
					</p>
				</div>
			</div>
			<div class="cardetailinfo-main-top-right">
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-licheng"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.totaldistance">{{cardetailinfo.totaldistance}}KM</b>
						<b v-else>暂无数据</b>
						<span>总里程</span>
					</p>
				</div>
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-guzhang"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.faultcodeCount">{{cardetailinfo.faultcodeCount}}个</b>
						<b v-else>暂无数据</b>
						<span>故障码数量</span>
					</p>
				</div>
				<div class="cardetailinfo-main-top-left-item">
					<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icon-youhao"></use>
					</svg>
					<p>
						<b v-if="cardetailinfo&&cardetailinfo.totalfuel">{{cardetailinfo.totalfuel}}L</b>
						<b v-else>暂无数据</b>
						<span>累计油耗量</span>
					</p>
				</div>
			</div>
		</div>
		<div class="cardetailinfo-main-bottom">
			<ul>
				<li><span>发动机转速</span><span v-if="cardetailinfo&&cardetailinfo.gvrate">{{cardetailinfo.gvrate}}RPM</span><span v-else>暂无数据</span></li>
				<li><span>节气门开度</span><span v-if="cardetailinfo&&cardetailinfo.throttle">{{cardetailinfo.throttle}}%</span><span v-else>暂无数据</span></li>
				<li><span>发动机负荷</span><span v-if="cardetailinfo&&cardetailinfo.engineload">{{cardetailinfo.engineload}}%</span><span v-else>暂无数据</span></li>
				<li><span>平均油耗</span><span v-if="cardetailinfo&&cardetailinfo.averagefuel">{{cardetailinfo.averagefuel}}L/100KM</span><span v-else>暂无数据</span></li>
				<li><span>本次行驶里程</span><span v-if="cardetailinfo&&cardetailinfo.distance">{{cardetailinfo.distance}}KM</span><span v-else>暂无数据</span></li>
				<li><span>总点火次数</span><span v-if="cardetailinfo&&cardetailinfo.totalignitecount">{{cardetailinfo.totalignitecount}}次</span><span v-else>暂无数据</span></li>
				<li><span>累计怠速时间</span><span v-if="cardetailinfo&&cardetailinfo.totalidlehours">{{cardetailinfo.totalidlehours}}H</span><span v-else>暂无数据</span></li>
				<li><span>平均热车时间</span><span v-if="cardetailinfo&&cardetailinfo.averagewarmupsecond">{{cardetailinfo.averagewarmupsecond}}S</span><span v-else>暂无数据</span></li>
				<li><span>平均车速</span><span v-if="cardetailinfo&&cardetailinfo.averagespeed">{{cardetailinfo.averagespeed}}KM/H</span><span v-else>暂无数据</span></li>
				<li><span>最高车速</span><span v-if="cardetailinfo&&cardetailinfo.maxspeed">{{cardetailinfo.maxspeed}}KM/H</span><span v-else>暂无数据</span></li>
				<li><span>最高转速</span><span v-if="cardetailinfo&&cardetailinfo.maxgyrate">{{cardetailinfo.maxgyrate}}RPM</span><span v-else>暂无数据</span></li>
				<li><span>累计急加速</span><span v-if="cardetailinfo&&cardetailinfo.acceleratecount">{{cardetailinfo.acceleratecount}}T</span><span v-else>暂无数据</span></li>
				<li><span>累计急减速</span><span v-if="cardetailinfo&&cardetailinfo.deceleratecount">{{cardetailinfo.deceleratecount}}T</span><span v-else>暂无数据</span></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			devicesflag:false,
			selected:this.$route.params.selected,
			devices:this.$route.params.devices||this.$route.params.carlist,
			cardetailinfo:null,
		}
	},
	methods:{
		devicesshow(){
			this.devicesflag=!this.devicesflag;
		},
		select(item,index){//选择车辆
			this.$store.commit('selectedcar',index);
			this.devicesflag=!this.devicesflag;
			this.selected=item;
		},
		deviceTrace(){//获取车辆详细信息
			var that=this;
			this.$api('/Execute.do',{action:'device.deviceTrace',device:this.selected.device}).then(function(r){
				if(r.errorCode==0){
					that.cardetailinfo=r.data.deviceTrace
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
					  duration: 1500
			      });
				}
			})
		}		
	},
	created(){
		this.deviceTrace();
	}
}
</script>

<style>
.cardetailinfo-wrap{
	height:100%;
	width:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.cardetailinfo-wrap-head{
	height:1.92rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	padding-top:0.6rem;
	font-size:0.56rem;
	color:#fff;
	text-align: center;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.cardetailinfo-wrap-head{
		height:2.64rem;
		padding:0 0.5rem;
		line-height:1.32rem;
		padding-top:1.32rem;
		font-size:0.56rem;
		color:#fff;
		text-align: center;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
		position: relative;
	}
}
.cardetailinfo-wrap-head .icon-fanhui{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.cardetailinfo-selectcar{
	width:100%;
	height:2.2rem;
	padding:0 0.5rem;
}
.cardetailinfo-selectcar-top{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	position: relative;
}
.cardetailinfo-selectcar-top>img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.cardetailinfo-selectcar-top>span{
	font-size:0.5rem;
	color:#222;
}
.cardetailinfo-selectcar-top>i{
	font-size:0.8rem;
	vertical-align: middle;
	position:relative;
	top:1px;
}
.iconrotate{
	transform: rotate(90deg);
	transition: all 0.3s;
}
.cardetailinfo-selectcar-fixed{
	width:100%;
	position: absolute;
	left:0;
	top:2.1rem;
	background: #fff;
	opacity: 1;
	border-radius: 5px;
	z-index: 999;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
}
.cardetailinfo-selectcar-fixed li {
	height:1.6rem;
	width:100%;
	padding-left:0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.cardetailinfo-selectcar-fixed li:last-child{
	border-bottom:none;	
}
.cardetailinfo-selectcar-fixed li img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.cardetailinfo-selectcar-fixed li span{
	font-size:0.38rem;
	color:#222;
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;
}
.cardetailinfo-main{
	flex:1;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.cardetailinfo-main-top{
	width:100%;
	height:7.6rem;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
	margin-bottom:0.5rem;
	padding:0.8rem 0;
	display: flex;
	display: -webkit-flex;
}
.cardetailinfo-main-top-left{
	width:50%;
	height:100%;
	border-right:1px solid #ddd;
	padding:0.2rem 0;
}
.cardetailinfo-main-top-right{
	width:50%;
	height:100%;
	padding:0.2rem 0;
}
.cardetailinfo-main-top-left-item{
	height:1.2rem;
	width:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
}
.cardetailinfo-main-top-left-item svg{
	font-size:0.8rem;
	margin-right:0.5rem;
}
.cardetailinfo-main-top-left-item p{
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	line-height: 1;
}
.cardetailinfo-main-top-left-item p b{
	font-size:0.48rem;
	color:#000;
	font-weight: 600;
}
.cardetailinfo-main-top-left-item p span{
	font-size:0.4rem;
	color:#000;
}
.cardetailinfo-main-top-left .cardetailinfo-main-top-left-item:nth-child(2),.cardetailinfo-main-top-right .cardetailinfo-main-top-left-item:nth-child(2){
	margin:0.98rem 0;
}
.cardetailinfo-main-bottom{
	flex: 1;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
	width:100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.cardetailinfo-main-bottom li{
	height:1.6rem;
	width:100%;
	border-bottom:1px solid #eee;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: space-between;
	font-size:0.4rem;
	color:#222;
	padding:0 0.5rem;
}
</style>