<template>
<div class="mycontrolsystem-wrap">
	<div class="mycontrolsystem-wrap-top">
		<div class="mycontrolsystem-wrap-header">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>我的管理系统</span>
			<i class="iconfont icon-jiahao" @click='goadduser'></i>
		</div>
		<div class="mycontrolsystem-wrap--top-contaire">
			<img :src="headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
			<h3>{{company}}</h3>
			<p><span>设备 {{deviceCount}}</span><span>客户 {{staffCount}}</span></p>
		</div>
	</div>
	<div class="mycontrolsystem-wrap-bottom">
		<ul>
			<li @click="goworkshop">
				<p><img src="../../assets/img/my/chejian.png"/></p>
				<span>车间</span>
			</li>			
			<li @click="goguanli">
				<p><img src="../../assets/img/my/guanli.png"/></p>
				<span>管理</span>
			</li>
			<li @click="godata">
				<p><img src="../../assets/img/my/shuju.png"/></p>
				<span>数据</span>
			</li>
			<li>
				<p><img src="../../assets/img/my/qidai.png"/></p>
				<span>敬请期待</span>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default{
	data(){
		return {
			//1为业务员，2为老板
		 	identity:parseInt(localStorage.getItem('identity')),
		 	headphoto:'',
		 	company:'',
		 	deviceCount:0,
		 	staffCount:0
		}
	},
	methods:{
		goworkshop(){			
			if(this.identity===1){
				this.$router.push({name:'controlsystem_my',params:{headphoto:this.headphoto,company:this.company,deviceCount:this.deviceCount,staffCount:this.staffCount}})
			}else if(this.identity===2){
				this.$router.push('/workshop')
			}
		},
		goguanli(){
			if(this.identity===1){
				this.$router.push('/managecustomers')
			}else if(this.identity===2){
				this.$router.push('/department')
			}
		},
		goadduser(){
			if(this.identity==1){
				this.$router.push({name:'adduser'})
			}else if(this.identity==2){
				this.$router.push({name:'adduser'})
			}
		},
		godata(){
			MessageBox('提示', '该功能暂未开发,敬请期待!');
		},
		getuserInfo(){
			var that=this;
			this.$api('/Execute.do',{action:'device.carshopInfo'}).then(function(r){
				if(r.errorCode==0){
					if(that.identity==1){
						that.headphoto=r.data.carshopInfo.userInfo.headphoto;
						that.company=r.data.carshopInfo.userInfo.nickname;
						that.deviceCount=r.data.carshopInfo.deviceCount;
						that.staffCount=r.data.carshopInfo.customerCount;
					}else if(that.identity==2){
						that.company=r.data.carshopInfo.agent.company;
						that.headphoto=r.data.carshopInfo.userInfo.headphoto;
						that.deviceCount=r.data.carshopInfo.deviceCount;
						that.staffCount=r.data.carshopInfo.customerCount;
					}					
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
	mounted(){
		this.getuserInfo();
	}
}
</script>

<style scoped>
.mycontrolsystem-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
}
.mycontrolsystem-wrap-top{
	width:100%;
	height:7rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/shouye/bg.png) ;
	background-size:cover ;
}
.mycontrolsystem-wrap-header{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	color:#fff;
	font-size:0.56rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.mycontrolsystem-wrap-top{
		width:100%;
		height:7.72rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/shouye/bg.png) ;
		background-size:cover ;
	}
}
.mycontrolsystem-wrap-header i{	
	font-size:0.6rem;
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
.mycontrolsystem-wrap-bottom{
	padding:1rem 0.5rem;
}
.mycontrolsystem-wrap-bottom ul{
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
}
.mycontrolsystem-wrap-bottom ul li{
	width:50%;
	height:3.56rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding:
}
.mycontrolsystem-wrap-bottom ul li span{
	font-size:0.38rem;
	color:#666;
}
.mycontrolsystem-wrap-bottom ul li p{
	position: relative;
}
.mycontrolsystem-wrap-bottom ul li p span{
	position: absolute;
	right:0;
	top:0;
	border-radius: 50%;
	background: #ff0000;
	color:#fff;
	text-align: center;
	height:0.52rem;
	line-height:0.55rem;
	width:0.52rem;
	font-size:0.3rem;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(1) img{
	width:1.16rem;
	height:1.11rem;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(2) img{
	width:0.97rem;
	height:0.97rem;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(3) img{
	width:1.01rem;
	height:1.01rem;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(4) img{
	width:0.99rem;
	height:1rem;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(2n+1){
	border-right:1px solid #ddd;
}
.mycontrolsystem-wrap-bottom ul li:nth-child(1),.mycontrolsystem-wrap-bottom ul li:nth-child(2){
	border-bottom:1px solid #ddd;
}
</style>