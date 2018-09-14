<template>
	<div class="consumer-wrap">
		<div class="consumer-wrap-head">
			<div class="consumer-wrap-head-top">
				<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
				<span>客户</span>
			</div>
			<div class="consumer-wrap-head-bottom">
				<img :src="this.$route.params.consumer.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+this.$route.params.consumer.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
				<p>{{this.$route.params.consumer.userInfo.nickname}}</p>
			</div>
			<div class="consumer-wrap-choosecar">
				<div class="consumer-wrap-choosecar-contaire">
					<div class="consumer-wrap-choosecar-contaire-item">
						<img :src="selected&&selected.deviceVehicle&&selected.deviceVehicle.logo"/>
						<p><b>{{selected&&selected.deviceVehicle&&selected&&selected.deviceVehicle.brandname}}</b><span>{{selected&&selected.deviceVehicle&&selected.deviceVehicle.modelname}} {{selected&&selected.deviceVehicle&&selected.deviceVehicle.vehiclelevel}}</span></p>
						<i class="iconfont icon-jiantou-copy-copy" @click="showlist=!showlist" :class="showlist?'iconrotate':'iconrotate0'"></i>
					</div>
					<div class="consumer-wrap-choosecar-contaire-list" v-show="showlist">
						<div class="consumer-wrap-choosecar-contaire-item border-top" v-for="(item,index) in carlist" :key="index" @click="selectcar(item)">
							<img :src="item.deviceVehicle.logo"/>
							<p><b>{{item.deviceVehicle.brandname}}</b><span>{{item.deviceVehicle.modelname}} {{item.deviceVehicle.vehiclelevel}}</span></p>
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
				<div class="consumer-wrap-foot-contaire-main">
					<div class="nodata" v-show="faultCodes.length==0">暂时没有数据</div>
					<mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" :auto-fill="false" ref="loadmore1" bottom-pull-text="上拉加载">
			     		<div class="breakdown-wrap-contaire-main-guzhang-item" v-for="(item,index) in faultCodes"><span>{{item.faultcode}}</span><span>{{item.descript}}</span><span>{{item.happentime | getdate}}&nbsp;&nbsp;{{item.happentime | gettime}}</span></div>
			    	</mt-loadmore>
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
			faultCodes:[],
			psize:0,
			pnum:8,
			mindate:'',
			allLoaded1:false,
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
			this.getwarnCounts(device,0,8,endtime)
		},
		getcustomerdevice(){//获取用户设备列表
			var that=this;
			this.$api('/Execute.do',{action:'device.customerDevices',customerseq:this.$route.params.consumer.userseq}).then(function(r){
				if(r.errorCode==0){
					if(r.data.customerDevices==null||r.data.customerDevices==undefined||r.data.customerDevices==''){
						return ;
					}
					that.carlist=r.data.customerDevices;
					that.selected=that.carlist[0];
					var nowdate=new Date().getTime();
					var endtime=nowdate-86400000;
					that.mindate=endtime;
					that.getwarnCounts(that.selected.device,0,8,endtime);
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
				 this.mindate=endtime;
				 device=this.selected.device
			}else if(this.index==2){
				 nowdate=new Date().getTime();
				 endtime=nowdate-604800000;
				 this.mindate=endtime;
				 device=this.selected.device
			}else if(this.index=3){
				 nowdate=new Date().getTime();
				 endtime=nowdate-2592000000; 
				 this.mindate=endtime;
				 device=this.selected.device
			}
			this.getwarnCounts(device,0,8,endtime)			
		},
		getwarnCounts(device,psize,pnum,enddate){//获取故障列表
			var that=this;
			this.$api('/Execute.do',{action:'device.faultCodes',device:device,mindate:enddate,minvalue:pnum,pageSize:psize}).then(function(r){
				if(r.errorCode==0){
					that.faultCodes=that.faultCodes.concat(r.data.faultCodes);
					if(r.data.faultCodes.length<10){
						that.allLoaded1=true;
						return;
					}else{
						that.allLoaded1=false;
					}
					that.pnum=r.data.faultCodes[r.data.faultCodes.length-1].faultseq;
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		loadTop1(){//组件提供的下拉触发方法
			 //下拉刷新
			this.faultCodes=[];
	        this.getwarnCounts(this.selected.device,0,this.psize,this.mindate);
	        this.$refs.loadmore1.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom1(){//组件提供的上拉加载触发方法
	    	this.getwarnCounts(this.selected.device,this.pnum,this.psize,this.mindate);
	    	this.$refs.loadmore1.onBottomLoaded();	    	
	   },
	},
	filters:{
		getdate:function(seconds){			
			var myDate = new Date(parseInt(seconds));
			var month=myDate.getMonth()+1;
			var day=myDate.getDate();
			return month+'/'+day;
		},
		gettime:function(seconds){
			var myDate = new Date(parseInt(seconds));
			var hours=myDate.getHours()
			if(hours<10){
				hours='0'+hours;
			}
			var minutes=myDate.getMinutes();
			if(minutes=='0'){
				minutes='00'
			}
			return hours+':'+minutes;
		},
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
.nodata{
	width:100%;
	padding-top:3rem;
	font-size:0.44rem;
	color:#999;
	text-align: center;
}
.breakdown-wrap-contaire-main-guzhang-item{
	width:100%;
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
	justify-content: space-between;
	font-size:0.44rem;
	color:#222;
}
</style>