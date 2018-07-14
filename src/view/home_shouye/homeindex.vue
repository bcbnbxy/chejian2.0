<template>
<div class="homeindex-wrap">
	<div class="homeindex-wrap-head">
		<div class="homeindex-wrap-head-top">
			<div class="homeindex-wrap-head-top-left">
				<img src="../../assets/img/faxianimg/lanbo.png"/>
				<span>{{selected&&selected.deviceVehicle.brandname}}{{selected&&selected.deviceVehicle.modelname}}</span>
				<i class="iconfont icon-arrow-right-copy-copy-copy" :class="devicesflag?'iconrotate':''" @click="devicesshow"></i>
				<ul class="devices-list" v-show="devicesflag">
					<li v-for="(item,index) in devices" @click="select(item,index)"><img src="../../assets/img/faxianimg/lanbo.png"/><span>{{item.deviceVehicle.brandname}}{{item.deviceVehicle.modelname}}</span></li>
				</ul>
			</div>
			<i class="iconfont icon-scan"></i>
		</div>
		<div class="homeindex-wrap-head-bottom">
			<div class="homeindex-wrap-head-bottom-contaire">
				<p><b>1356</b><span>/名</span></p>
				<p>当前排名</p>
				<p>车辆安全系数 ： 12365</p>
			</div>
			<div class="homeindex-wrap-head-bottom-guzhang">
				<div class="homeindex-wrap-head-bottom-guzhang-contaire">
					<router-link tag="div" :to="{name:'breakdown',params:{index:2,devicenum:selected&&selected.device}}" class="homeindex-wrap-head-bottom-guzhang-contaire-left">
						<p>当前警告</p>
						<p><b>10</b><span>/处</span></p>
					</router-link>
					<div class="homeindex-wrap-head-bottom-guzhang-contaire-center"></div>
					<router-link tag="div" :to="{name:'breakdown',params:{index:1,devicenum:selected&&selected.device}}" class="homeindex-wrap-head-bottom-guzhang-contaire-right">
						<p>当前故障</p>
						<p><b>5</b><span>/处</span></p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
	<div class="homeindex--wrap-bottom">
		<div class="homeindex-car-service">
			<p class="homeindex-car-service-title">车辆服务</p>			
			<ul>
				<router-link tag="li" to="/chosecar"><img src="../../assets/img/shouye/wzcx.png"><span>违章查询</span></router-link>
				<li><img src="../../assets/img/shouye/sbgm.png"><span>设备购买</span></li>
				<li><img src="../../assets/img/shouye/jqqd.png"><span>敬请期待</span></li>
			</ul>
		</div>
		<div class="homeindex-car-friends">
			<p class="homeindex-car-service-title">我的车友<span>车辆评分</span></p>			
			<div class="homeindex-car-friends-list">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
		     		<div class="homeindex-car-friends-item" v-for="(item,index) in friends"><img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto"><span>{{item.remark?item.remark:item.userInfo.nickname}}</span><i>12345</i></div>
		    	</mt-loadmore>
			</div>
		</div>
	</div>
</div>
</template>
<script>
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
		this.getfriends(0,5);
	},
	methods:{
		getdevices(){//我的设备查询
			var that=this;
			this.$api('/Execute.do',{action:"device.devices"}).then(function(r){
				if(r.errorCode==0){
					that.devices=r.data.devices;
					that.selected=r.data.devices[0];
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		devicesshow(){
			this.devicesflag=!this.devicesflag;
		},
		select(item,index){
			this.devicesflag=!this.devicesflag;
			this.selected=item;
//			console.log(JSON.stringify(this.selected));
		},
		getfriends(minvalue,pageSize){//获取车友列表
			var that=this;
			this.$api('/Execute.do',{action:"friends",minvalue:minvalue, pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					that.friends=that.friends.concat(r.data.friends);
					if(r.data.friends.length<5){
						that.allLoaded=true;
						return;
					}else{
						that.allLoaded=false;
					}
					that.pageNo=r.data.friends[r.data.friends.length-1].userseq;					
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
	overflow-y:auto;
}
.homeindex-car-friends-item{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
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
</style>