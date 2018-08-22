<template>
	<div class="consumer-wrap">
		<div class="consumer-wrap-head">
			<div class="consumer-wrap-head-top">
				<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
				<span>客户</span>
			</div>
			<div class="consumer-wrap-head-bottom">
				<img :src="$store.state.common.consumer.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+$store.state.common.consumer.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
				<p>{{$store.state.common.consumer.userInfo.nickname}}</p>
			</div>
			<div class="consumer-wrap-choosecar">
				<div class="consumer-wrap-choosecar-contaire">
					<div class="consumer-wrap-choosecar-contaire-item">
						<img :src="selected&&selected.deviceVehicle&&selected.deviceVehicle.logo"/>
						<p><b>{{selected&&selected.deviceVehicle&&selected&&selected.deviceVehicle.brandname}}</b><span>{{selected&&selected.deviceVehicle&&selected.deviceVehicle.modelname}}</span></p>
						<i class="iconfont icon-jiantou-copy-copy" @click="showlist=!showlist" :class="showlist?'iconrotate':'iconrotate0'"></i>
					</div>
					<div class="consumer-wrap-choosecar-contaire-list" v-show="showlist">
						<div class="consumer-wrap-choosecar-contaire-item border-top" v-for="(item,index) in carlist" :key="index" @click="selectcar(item)">
							<img :src="item.deviceVehicle.logo"/>
							<p><b>{{item.deviceVehicle.brandname}}</b><span>{{item.deviceVehicle.modelname}}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="consumer-wrap-foot">
			<div class="consumer-wrap-foot-contaire">
				<div class="consumer-wrap-foot-contaire-nav">
					<span @click="navactive(1)" :style="index==1?'color:#1989f5':''">本日</span>
					<span @click="navactive(2)" :style="index==2?'color:#1989f5':''" >本周</span>
					<span @click="navactive(3)" :style="index==3?'color:#1989f5':''">本月</span>
				</div>
				<div @click="consumerguzhang" class="consumer-wrap-foot-contaire-guzhangma"><span>故障码</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></div>
				<div class="consumer-wrap-foot-contaire-main">
					<div class="nodata" v-if="warnslist.length==0">暂时没有数据</div>
					<Mycarstate :warnCounts="warnslist" v-else></Mycarstate>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
import Mycarstate from '@/components/controlsystem/mycarstate'
export default{
	components:{Mycarstate},
	data(){
		return {			
			showlist:false,
			index:1,
			carlist:[],			
			selected:[],
			warnslist:[],			
		}
	},
	methods:{
		navactive(index){
			this.index=index;
			var nowdate,endtime,device;
			if(this.index==1){
				 nowdate=new Date().getTime();
				 endtime=nowdate-86400000; 
				 device=this.selected.device
			}else if(this.index==2){
				 nowdate=new Date().getTime();
				 endtime=nowdate-604800000; 
				 device=this.selected.device
			}else if(this.index=3){
				 nowdate=new Date().getTime();
				 endtime=nowdate-2592000000; 
				 device=this.selected.device
			}
			this.getwarnCounts(device,nowdate,endtime)
		},
		consumerguzhang(){
			this.$router.push({name:'consumerguzhang','params':{consumer:this.$store.state.common.consumer}})
		},
		getcustomerdevice(){//获取用户设备列表
			var that=this;
			this.$api('/Execute.do',{action:'device.customerDevices',customerseq:this.$store.state.common.consumer.userseq}).then(function(r){
				if(r.errorCode==0){
					if(r.data.customerDevices==null||r.data.customerDevices==undefined||r.data.customerDevices==''){
						return ;
					}
					that.carlist=r.data.customerDevices;
					that.selected=that.carlist[0];
					var nowdate=new Date().getTime();
					var endtime=nowdate-86400000;
					that.getwarnCounts(that.selected.device,nowdate,endtime);
				}else{
					that.$toast({
						message:r.errorMessage,
						position:'bottom',
						duration:1500
					})
				}
			})
		},
		selectcar(item){//选择车
			this.showlist=!this.showlist;
			this.selected=item;
			var nowdate,endtime,device;
			if(this.index==1){
				 nowdate=new Date().getTime();
				 endtime=nowdate-86400000; 
				 device=this.selected.device
			}else if(this.index==2){
				 nowdate=new Date().getTime();
				 endtime=nowdate-604800000; 
				 device=this.selected.device
			}else if(this.index=3){
				 nowdate=new Date().getTime();
				 endtime=nowdate-2592000000; 
				 device=this.selected.device
			}
			this.getwarnCounts(device,nowdate,endtime)
			
		},
		getwarnCounts(device,begindate,enddate){//获取警告列表
			var that=this;
			this.$api('/Execute.do',{action:'device.warnCounts',device:device,begindate:begindate,enddate}).then(function(r){
				if(r.errorMessage==0){
					if(r.data.warnCounts==null||r.data.warnCounts==undefined||r.data.warnCounts==""){
						return;
					}
					that.warnslist=r.data.warnCounts;
				}else{
					that.$toast({
						message:r.errorMessage,
						position:'bottom',
						duration:1500
					})
				}
			})
		}
	},
	created(){
		this.getcustomerdevice();
	},
}
</script>

<style scoped>
.consumer-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.consumer-wrap-head{
	height:7.4rem;
	padding-top:0.6rem;
	width:100%;
	background-image: url(../../assets/img/shouye/bg.png);
	background-size:cover ;
	color:#fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.consumer-wrap-head{
		height:8.12rem;
		padding-top:1.32rem;
		width:100%;
		background-image: url(../../assets/img/shouye/bg.png);
		background-size:cover ;
		color:#fff;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		position: relative;
	}
}
.consumer-wrap-head-top{
	height:1.32rem;
	width:100%;
	padding: 0 0.5rem;
	text-align: center;
	line-height:1.32rem;
	position: relative;
	font-size:0.56rem;
}
.consumer-wrap-head-top .icon-fanhui{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.consumer-wrap-head-bottom{
	flex:1;
	padding-top:0.4rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	line-height: 1;
}
.consumer-wrap-head-bottom img{
	display: block;
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
	margin-bottom:0.45rem;
}
.consumer-wrap-head-bottom p{
	font-size:0.56rem
}
.consumer-wrap-choosecar{
	width:100%;
	height:2.4rem;
	padding:0 0.5rem;
	position: absolute;
	left:0;
	bottom:-1.2rem;
}
.consumer-wrap-choosecar-contaire{
	width:100%;
	height:100%;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
	border-radius: 5px;
	position: relative;
}
.consumer-wrap-choosecar-contaire-item{
	width:100%;
	height:2.4rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
}
.consumer-wrap-choosecar-contaire-item img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.consumer-wrap-choosecar-contaire-item p{
	flex:1;
	height:1.2rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;	
	line-height: 1;
	margin-left:0.45rem;
}
.consumer-wrap-choosecar-contaire-item p b{
	font-size:0.48rem;
	color:#222;
	font-weight: 400;
}
.consumer-wrap-choosecar-contaire-item p span{
	font-size:0.44rem;
	color:#666;
}
.consumer-wrap-choosecar-contaire-item i{
	font-size:0.6rem;
	color:#a0a0a0;
}
.consumer-wrap-choosecar-contaire-list{
	width:100%;
	max-height:4.95rem;
	background: #fff;
	border-radius: 5px;
	position: absolute;
	left:0;
	top:2.25rem;
	padding:0 0.5rem;
	padding-top:0.15rem;
	overflow-y: auto;
}
.border-top{
	border-top:1px solid #ddd;
	padding:0;
}
.iconrotate{
	transform: rotate(180deg);
	transition: all 0.3s;
}
.iconrotate0{
	transform: rotate(0deg);
	transition: all 0.3s;
}
.consumer-wrap-foot{
	flex:1;
	padding:1.7rem 0.5rem;
	overflow: hidden;
}
.consumer-wrap-foot-contaire{
	width:100%;
	height:100%;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.consumer-wrap-foot-contaire-nav{
	width:100%;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.consumer-wrap-foot-contaire-nav span{
	flex:1;
	text-align: center;
	font-size:0.44rem;
	color:#999;
	
}
.consumer-wrap-foot-contaire-nav span:nth-child(2){
	border-right:1px solid #ddd;
	border-left:1px solid #ddd;
}
.consumer-wrap-foot-contaire-main{
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.consumer-wrap-foot-contaire-guzhangma{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.nodata{
	width:100%;
	padding-top:3rem;
	font-size:0.44rem;
	color:#999;
	text-align: center;
}
</style>