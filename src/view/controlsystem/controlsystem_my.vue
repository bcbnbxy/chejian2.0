<template>
<div class="controlsystem_my-wrap">
	<div class="mycontrolsystem-wrap-top">
		<div class="mycontrolsystem-wrap-header">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>我的</span>
		</div>
		<div class="mycontrolsystem-wrap--top-contaire">
			<img :src="$route.params.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+$route.params.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
			<h3>{{$route.params.company}}</h3>
			<p><span>设备 {{$route.params.deviceCount}}</span><span>客户 {{$route.params.staffCount}}</span></p>
		</div>
	</div>
	<div class="controlsystem_my-wrap-bottom">
		<ul>			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
	     		<router-link tag="li" :to="{name:'consumer',params:{consumer:item}}" v-for="(item,index) in customerlist" :key="index"><p><img :src="item.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/><span>{{item.remark?item.remark:item.userInfo.nickname}}</span></p><p><!--<img src="../../assets/img/my/tishi.png"/>--></p></router-link>
	   		</mt-loadmore>			
		</ul>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return {
			psize:10,
			pnum:0,
			customerlist:[],
			allLoaded:false
		}
	},
	methods:{
		getcustomers(minvalue,pageSize){//获取客户列表
			var that=this;
			this.$api('/Execute.do',{action:'device.customers',minvalue:minvalue,pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					if(r.data.customers==null||r.data.customers==undefined||r.data.customers==""){
						return;
					}else{
						that.customerlist=that.customerlist.concat(r.data.customers);
						if(r.data.customers.length<10){
							that.allLoaded=true;
						}else{
							that.allLoaded=false;
							that.pnum=r.data.customers[r.data.customers.length-1].userseq;
						}
					}					
				}
			})
		},
		loadTop(){//下拉刷新
			this.customerlist=[];
			this.getcustomers(0,this.psize);
			this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom(){//上拉加载
			this.getcustomers(this.pnum,this.psize);
	    	this.$refs.loadmore.onBottomLoaded();	 
		}
	},
	mounted(){
		this.getcustomers(this.pnum,this.psize);
	}
}
</script>
<style scoped>
.controlsystem_my-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.mycontrolsystem-wrap-top{
	width:100%;
	height:6.4rem;
	background-image:url(../../assets/img/shouye/bg.png) ;
	background-size:cover;
}
.mycontrolsystem-wrap-header{
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.56rem;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.mycontrolsystem-wrap-header{
		height:2.64rem;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		line-height:1.32rem;
		text-align: center;
		color:#fff;
		font-size:0.56rem;
	}
}
.mycontrolsystem-wrap-header .icon-fanhui{
	font-size:0.6rem;
	float: left;
}
.mycontrolsystem-wrap--top-contaire{
	padding-top:0.62rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
}
.mycontrolsystem-wrap--top-contaire img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
	display: block;
}
.mycontrolsystem-wrap--top-contaire h3{
	font-weight: 400;
	color:#fff;
	font-size:0.44rem;
	line-height: 1;
	margin-top:0.54rem;
}
.mycontrolsystem-wrap--top-contaire p{
	font-size:0.38rem;
	color:#fff;
	line-height: 1;
	margin-top:0.5rem;
}
.mycontrolsystem-wrap--top-contaire p span:nth-child(1){
	margin-right:1rem;
}
.controlsystem_my-wrap-bottom{
	flex:1;
	overflow: auto;
	background: #f7f7f7;
}
.controlsystem_my-wrap-bottom ul{
	background: #fff;
}
.controlsystem_my-wrap-bottom ul li{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(1) img{
	width:1rem;
	border-radius: 50%;
	vertical-align: middle;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(1) span{
	font-size:0.38rem;
	color:#222;
	margin-left:0.5rem;
}
.controlsystem_my-wrap-bottom ul li p:nth-child(2) img{
	width:0.62rem;
	border-radius: 50%;
	vertical-align: middle;
}
</style>