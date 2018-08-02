<template>
<div class="homeindex-wrap">
	<div class="homeindex-wrap-head">
		<div class="homeindex-wrap-head-top">
			<div class="homeindex-wrap-head-top-left">
				<img :src="selected&&selected.deviceVehicle&&selected.deviceVehicle.logo" v-if="selected"/>
				<span v-show="selected">{{selected&&selected.deviceVehicle&&selected.deviceVehicle.brandname}}{{selected&&selected.deviceVehicle&&selected.deviceVehicle.modelname}}</span>
				<span v-show="!selected">暂无车辆</span>
				<i class="iconfont icon-arrow-right-copy-copy-copy" :class="devicesflag?'iconrotate':''" @click="devicesshow"></i>
				<ul class="devices-list" v-show="devicesflag">
					<router-link tag="li" to="/devicebinding" style="color:#666;font-size:0.44rem;padding-left:0.5rem;" v-show="!selected">您还没有车辆，去添加</router-link>
					<li v-for="(item,index) in devices" @click="select(item,index)"><img :src="item&&item.deviceVehicle&&item.deviceVehicle.logo"/><span>{{item&&item.deviceVehicle&&item.deviceVehicle&&item.deviceVehicle.brandname}}{{item&&item.deviceVehicle&&item.deviceVehicle.modelname}}</span></li>
				</ul>
			</div>
			<router-link tag="i" to="/devicebinding" class="iconfont icon-scan"></router-link>
		</div>
		<div class="homeindex-wrap-head-bottom">
			<div class="homeindex-wrap-head-bottom-contaire">
				<p v-if="selected&&selected.ranking"><b>{{selected&&selected.ranking}}</b><span>/名</span></p>
				<p v-else>暂无排名</p>
				<p>当前排名</p>
				<p v-if="selected&&selected.deviceVehicle&&selected.deviceVehicle.assessedvalue>=0">车辆安全系数 ： {{selected&&selected.deviceVehicle&&selected.deviceVehicle.assessedvalue}}</p>
				<p v-else>添加车辆获取安全系数</p>
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
				<!--<router-link tag="li" to="/chosecar"><img src="../../assets/img/shouye/wzcx.png"><span>违章查询</span></router-link>-->
				<li @click="weizhangchaxun"><img src="../../assets/img/shouye/wzcx.png"><span>违章查询</span></li>
				<li @click="shebeigoumai"><img src="../../assets/img/shouye/sbgm.png"><span>设备购买</span></li>
				<li><img src="../../assets/img/shouye/jqqd.png"><span>敬请期待</span></li>
			</ul>
		</div>
		<div class="homeindex-car-friends">
				<p class="homeindex-car-service-title">我的车友<span>车辆评分</span></p>
				<div class="homeindex-car-friends-nodata" v-if="friends.length<=0">暂无数据</div>
				<div class="homeindex-car-friends-list" v-else>
					<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
			     		<div class="homeindex-car-friends-item" v-for="(item,index) in friends"><img :src="item.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"><span>{{item.friend.remark?item.friend.remark:item.userInfo.nickname}}</span><i>{{item.deviceVehicle.assessedvalue}}</i></div>
			    	</mt-loadmore>
				</div>
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
						that.$toast({
				          message: '没有数据',
				          position: 'bottom',
	  					  duration: 1500
				       });
					}else{
						that.devices=r.data.devices;
						that.selected=r.data.devices[0];
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
						if(r.data.friendDeviceScores.length<=0){
							that.$toast({
						        message: '没有数据了',
						        position: 'bottom',
								duration: 1500
						    });
						}else{
							that.friends=that.friends.concat(r.data.friendDeviceScores);
							if(r.data.friendDeviceScores.length<5){
								that.allLoaded=true;
								return;
							}else{
								that.allLoaded=false;
								that.pageNo=r.data.friendDeviceScores[r.data.friendDeviceScores.length-1].deviceseq;	
							}						
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
			this.devicesflag=!this.devicesflag;
			this.selected=item;
		},
		shebeigoumai(){
			MessageBox.alert('暂未开放，敬请期待!')
		},
		weizhangchaxun(){
			MessageBox.alert('暂未开放，敬请期待!')
		},
		getfriends(minvalue,pageSize){//获取车友列表
			var that=this;
			this.$api('/Execute.do',{action:"device.friendDeviceScores",minvalue:minvalue, pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					if(r.data.friendDeviceScores==null||r.data.friendDeviceScores==undefined||r.data.friendDeviceScores==''){
						that.$toast({
					        message: '没有数据了',
					        position: 'bottom',
							duration: 1500
					    });
					}else{
						that.friends=that.friends.concat(r.data.friendDeviceScores);
						if(r.data.friends.length<5){
							that.allLoaded=true;
							return;
						}else{
							that.allLoaded=false;
							that.pageNo=r.data.friends[r.data.friendDeviceScores.length-1].deviceseq;	
						}						
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
	height:6.63rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
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
}
.homeindex-wrap-head-top-left>i{
	font-size:0.5rem;
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
	text-align: left;
	line-height:1.17rem;
	font-size:0.5rem;
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
.homeindex-car-service-title span{
	font-size:0.44rem;
	color:#2d3461;
	position: absolute;
	right:0.5rem
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
	width:0.78rem;
	display: block;
}
.homeindex-car-service>ul li span{
	font-size:0.4rem;
	color:#2d3461;
}
.homeindex-car-friends{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.homeindex-car-friends-list{
	flex:1;
	background: #f7f7f7;
	overflow-y:auto;
}
.homeindex-car-friends-item{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: #fff;
}
.homeindex-car-friends-item img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homeindex-car-friends-item span{
	font-size:0.44rem;
	color:#2d3461;
}
.homeindex-car-friends-item i{
	flex:1;
	font-size:0.44rem;
	color:#2d3461;
	font-style: normal;
	text-align: right;
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