<template>
<div class="homeindex-wrap">
	<div class="homeindex-wrap-head">
		<div class="homeindex-wrap-head-top">
			<div class="homeindex-wrap-head-top-left">
				<img :src="selected&&selected.deviceVehicle&&selected.deviceVehicle.logo" v-if="selected"/>
				<span v-show="selected">{{selected&&selected.deviceVehicle&&selected.deviceVehicle.brandname}}  {{selected&&selected.deviceVehicle&&selected.deviceVehicle.modelname}}  {{selected&&selected.deviceVehicle&&selected.deviceVehicle.vehiclelevel}}</span>
				<span v-show="!selected">暂无车辆</span>
				<i class="iconfont icon-arrow-right-copy-copy-copy" :class="devicesflag?'iconrotate':''" @click="devicesshow"></i>
				<ul class="devices-list" v-show="devicesflag">
					<router-link tag="li" to="/devicebinding" style="color:#666;font-size:0.44rem;padding-left:0.5rem;" v-show="!selected">您还没有车辆，去添加</router-link>
					<li v-for="(item,index) in devices" @click="select(item,index)"><img :src="item&&item.deviceVehicle&&item.deviceVehicle.logo"/><span>{{item&&item.deviceVehicle&&item.deviceVehicle&&item.deviceVehicle.brandname}} {{item&&item.deviceVehicle&&item.deviceVehicle.modelname}} {{item&&item.deviceVehicle&&item.deviceVehicle.vehiclelevel}}</span></li>
				</ul>
			</div>
			<router-link tag="i" to="/devicebinding" class="iconfont icon-scan"></router-link>
		</div>
		<div class="homeindex-wrap-head-bottom">
			<div class="homeindex-wrap-head-bottom-contaire">
				<p v-if="selected&&selected.ranking"><b>{{selected&&selected.ranking}}</b><span>/名</span></p>
				<p v-else>暂无排名</p>
				<p>当前排名</p>
				<router-link tag="p" :to="{name:'cardetailinfo',params:{selected,devices}}" v-if="selected&&selected.deviceVehicle">查看车辆详细信息</router-link>
			</div>
			<div class="homeindex-wrap-head-bottom-guzhang">
				<div class="homeindex-wrap-head-bottom-guzhang-contaire">
					<router-link tag="div" :to="{name:'breakdown',params:{index:2,devicenum:selected&&selected.device,vin:selected&&selected.vin}}" class="homeindex-wrap-head-bottom-guzhang-contaire-left">
						<p>当前警告</p>
						<p v-if="selected&&selected.warnCount>=0"><b>{{selected&&selected.warnCount}}</b><span>/处</span></p>
						<router-link tag="p" to="/devicebinding" v-else style="font-size:0.44rem;color:#0061ff;padding-top:0.3rem">去添加车辆</router-link>
					</router-link>
					<div class="homeindex-wrap-head-bottom-guzhang-contaire-center"></div>
					<router-link tag="div" :to="{name:'breakdown',params:{index:1,devicenum:selected&&selected.device,vin:selected&&selected.vin}}" class="homeindex-wrap-head-bottom-guzhang-contaire-right">
						<p>当前故障</p>
						<p v-if="selected&&selected.faultCount>=0"><b>{{selected&&selected.faultCount}}</b><span>/处</span></p>
						<router-link tag="p" to="/devicebinding" v-else style="font-size:0.44rem;color:#0061ff;padding-top:0.3rem">去添加车辆</router-link>
					</router-link>
				</div>
			</div>
		</div>
	</div>
	<div class="homeindex--wrap-bottom">
		<div class="homeindex-car-service">
			<p class="homeindex-car-service-title">车辆服务</p>			
			<ul>
				<li @click="weizhangchaxun"><img src="../../assets/img/shouye/wzcx.png" style="width:0.78rem;height:0.91rem;"/><span>违章查询</span></li>
				<router-link tag="li" to="/emergencyTelephone"><img src="../../assets/img/shouye/telphone.png" style="width:0.96rem;height:0.96rem;"/><span>应急电话</span></router-link>
				<router-link tag="li" to="/caragency"><img src="../../assets/img/shouye/chewu.png" style="width:0.89rem;height:0.88rem;"/><span>车务代办</span></router-link>
				<li><img src="../../assets/img/shouye/jqqd.png" style="width:0.74rem;height:0.93rem;"/><span>敬请期待</span></li>
			</ul>
		</div>
		<div class="homeindex-car-friends">
			<p class="homeindex-car-service-title" ><span>我的车友</span><span>车辆评分</span></p>
			<div class="homeindex-car-friends-nodata" v-if="friends.length<=0">暂无数据</div>
			<div class="homeindex-car-friends-list" v-else>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
		     		<div class="homeindex-car-friends-item" v-for="(item,index) in friends">
		     			<img :src="item.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')">
		     			<div class="homeindex-car-friends-item-center">
		     				<span>{{item.friend.remark?item.friend.remark:item.userInfo.nickname}}</span>
		     				<p>
		     					<img :src="item.deviceVehicle&&item.deviceVehicle.logo"/>
		     					<span>{{item.deviceVehicle&&item.deviceVehicle.modelname}}</span>
		     				</p>
		     			</div>
		     			<i>{{item.deviceVehicle&&item.deviceVehicle.assessedvalue}}</i>
		     		</div>
		    	</mt-loadmore>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
	data(){
		return {
			devices:[],
			devicesflag:false,
			selected:null,
			friends:[],
			pageNo:0,
	        pageSize:5,
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
		}
	},
	mounted(){
		this.getdevices();	
	},
	methods:{
		getdevices(){//我的设备查询
			var that=this;
			this.$api('/Execute.do',{action:"device.devices"}).then(function(r){
				if(r.errorCode==0){
					if(r.data.devices==undefined||r.data.devices==null||r.data.devices==""){
						return ;
					}else{
						that.devices=r.data.devices;
						that.selected=r.data.devices[that.$store.state.common.selectedcar];
					}					
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			}).then(function(r){
				that.$api('/Execute.do',{action:"device.friendDeviceScores",minvalue:0, pageSize:5}).then(function(r){
					if(r.errorCode==0){
						if(r.data.friendDeviceScores.length==0){
							that.allLoaded=true;
						}else if(r.data.friendDeviceScores.length==5){
							that.allLoaded=false;
							that.friends=that.friends.concat(r.data.friendDeviceScores);
							that.pageNo=r.data.friendDeviceScores[r.data.friendDeviceScores.length-1].deviceseq;
						}else{
							that.allLoaded=true;
							that.friends=that.friends.concat(r.data.friendDeviceScores);
							that.pageNo=r.data.friendDeviceScores[r.data.friendDeviceScores.length-1].deviceseq;
						}
					}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
						  duration: 1500
				      });
					}
				})
			})
		},
		devicesshow(){
			this.devicesflag=!this.devicesflag;
		},
		select(item,index){
			this.$store.commit('selectedcar',index);
			this.devicesflag=!this.devicesflag;
			this.selected=item;
		},
		weizhangchaxun(){
			this.$router.push('/chosecar')
		},
		getfriends(minvalue,pageSize){//获取车友列表
			var that=this;
			this.$api('/Execute.do',{action:"device.friendDeviceScores",minvalue:minvalue, pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					if(r.data.friendDeviceScores.length==0){
						that.allLoaded=true;
					}else if(r.data.friendDeviceScores.length==5){
						that.allLoaded=false;
						that.friends=that.friends.concat(r.data.friendDeviceScores);
						that.pageNo=r.data.friendDeviceScores[r.data.friendDeviceScores.length-1].deviceseq;
					}else{
						that.allLoaded=true;
						that.friends=that.friends.concat(r.data.friendDeviceScores);
						that.pageNo=r.data.friendDeviceScores[r.data.friendDeviceScores.length-1].deviceseq;
					}
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
					  duration: 1500
			        });
				}
			})
		},
		loadTop:function() { //组件提供的下拉触发方法
	        //下拉刷新
	        this.friends=[];
	        this.getfriends(0,5);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom:function(){
	    	this.getfriends(this.pageNo,5);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	    }
	},
	beforeRouteEnter(to,from,next){
		if(!localStorage.getItem('loginInfo')){
			next({path:'/nologin'});
		}else{
			next();
		}
	},
}
</script>
<style>
.homeindex-wrap{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homeindex-wrap-head{
	width:100%;
	height:7.23rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/shouye/bg.png);
	background-size:cover ;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.homeindex-wrap-head{
		width:100%;
		height:7.95rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/shouye/bg.png);
		background-size:cover ;
	}
}
.homeindex-wrap-head>.icon-scan{
	font-size:0.6rem;
}
.homeindex-wrap-head-top{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
}
.homeindex-wrap-head-top-left{
    flex:1;
	display: flex;
	display: -webkit-flex;
	height:100%;
	align-items: center;
	font-size:0.5rem;
	position: relative;
}
.iconrotate{
	transform: rotate(90deg);
	transition: all 0.3s;
}
.devices-list{
	width:100%;
	position: absolute;
	left:0;
	top:1.32rem;
	background: #fff;
	opacity: 1;
	border-radius: 5px;
	z-index: 999;
}
.devices-list li {
	height:1.6rem;
	width:100%;
	padding-left:0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.devices-list li:last-child{
	border-bottom:none;	
}
.devices-list li img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.devices-list li span{
	font-size:0.38rem;
	color:#222;
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;
}
.homeindex-wrap-head-top-left>i{
	font-size:0.8rem;
	vertical-align: middle;
	position:relative;
	top:1px;
}
.homeindex-wrap-head-top-left img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-wrap-head-bottom{
	height:5.3rem;
	width:100%;
	position:relative;
}
.homeindex-wrap-head-bottom-contaire{
	height:3.66rem;
	width:100%;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(1){
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: flex-end;
	color:#fff;
	font-size:0.38rem;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(1) b{
	font-size:1.25rem;
	line-height: 0.8;
	font-weight: 400;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(2){
	font-size:0.44rem;
	color:#fff;
	text-align: center;
	line-height:0.98rem;
}
.homeindex-wrap-head-bottom-contaire>p:nth-child(3){
	font-size:0.44rem;
	color:#fff;
	text-align: center;
	line-height:0.75rem;
}
.homeindex-wrap-head-bottom-guzhang{
	width:100%;
	height:3rem;
	position: absolute;
	left:0;
	top:3.66rem;
	padding:0 0.5rem;
}
.homeindex-wrap-head-bottom-guzhang-contaire{
	width:100%;
	height:100%;
	border-radius: 5px;
	background: #fff;
	box-shadow: 2px 2px 15px rgba(25,137,245,.1);
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: space-around;
	padding-top: 0.2rem
}
.homeindex-wrap-head-bottom-guzhang-contaire-center{
	width:1px;
	height:0.8rem;
	background: #ddd;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left,.homeindex-wrap-head-bottom-guzhang-contaire-right{
	flex:1;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(1){
	font-size:0.44rem;
	color:#222;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(2) b{
	font-size:0.7rem;
	font-weight: 400;
	color:#ff9c00;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p:nth-child(2) span{
	font-size:0.38rem;
	color:#ff9c00;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(1){
	font-size:0.44rem;
	color:#222;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(2) b{
	font-size:0.7rem;
	font-weight: 400;
	color:#fb6942;
}
.homeindex-wrap-head-bottom-guzhang-contaire-right p:nth-child(2) span{
	font-size:0.38rem;
	color:#fb6942;
}
.homeindex-wrap-head-bottom-guzhang-contaire-left p,.homeindex-wrap-head-bottom-guzhang-contaire-right p{
	text-align: center;
}
.homeindex--wrap-bottom{
	flex:1;
	background: #fff;
	padding-top:2.2rem;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homeindex-car-service-title{
	height:1.17rem;
	padding-right:0.5rem;
	padding-left:1rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#000;
	position: relative;
}
.homeindex-car-service-title::before{
	width:0.12rem;
	height:0.5rem;
	content: "";
	display: block;
	position: absolute;
	left:0.5rem;
	top:0.33rem;
	background: #1989f5;
}
.homeindex-car-service>ul{
	padding:0.3rem 1.18rem 0.85rem 1.18rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.homeindex-car-service>ul li{
	height:1.74rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.homeindex-car-service>ul li img{
	/*width:0.78rem;*/
	display: block;
}
.homeindex-car-service>ul li span{
	font-size:0.4rem;
	color:#2d3461;
}
.homeindex-car-friends{
	flex:1;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	padding-bottom:1.6rem;
}
.homeindex-car-friends-list{
	flex:1;
	background: #f7f7f7;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.homeindex-car-friends-item{
	height:2rem;
	padding:0 0.5rem;
	font-size:0.44rem;
	color:#2d3461;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.homeindex-car-friends-item:last-child{
	border-bottom:none;
}
.homeindex-car-friends-item>img{
	width:1.4rem;
	height:1.4rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-car-friends-item-center{
	flex:1;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction:column ;
	justify-content: space-around;
	padding:0.1rem 0;
}
.homeindex-car-friends-item-center p{
	display: flex;
	display: -webkit-flex;
	align-items: center;
	padding-right:0.5rem;
}
.homeindex-car-friends-item-center p>img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
}
.homeindex-car-friends-nodata{
	flex:1;
	background: #f7f7f7;
	text-align: center;
	font-size:0.44rem;
	color:#999;
	padding-top:3rem;
}
</style>