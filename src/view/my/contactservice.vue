<template>
<div class="contactservice-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>意见反馈</span>
	</header>
	<div class="contactservice-wrap-title">
		您有什么问题可以随时联系我们:
	</div>
	<ul class="contactservice-wrap-tel">
		<li @click="callphone('13012345678')">客服热线:<span>13012345678</span></li>
		<li @click="callphone('2522-525526563')">客服热线：<span>2522-525526563</span></li>
		<li @click="callphone('13012345680')">客服热线:<span>13012345680</span></li>
	</ul>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default{
	methods:{
		callphone(phonenum){
			MessageBox.confirm('', {
		        message: '确定拨打电话？',
		        showConfirmButton:true,
		        showCancelButton:true,
		        confirmButtonText:'确定',
		        cancelButtonText:'取消'
	        }).then(action => {
	          if (action == 'confirm') {
	            window.device.callPhone(phonenum);
	          }
	        }).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });			
		}
	}
}
</script>

<style scoped>
.contactservice-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.icon-fanhui{
	font-size:0.44rem;
}
.contactservice-wrap>header{
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.contactservice-wrap>header{
		height:2.64rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		line-height:1.32rem;
		text-align: center;
		font-size:0.56rem;
		color:#fff;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
		position: relative;
	}
}
.contactservice-wrap>header span:nth-child(1){
	position: absolute;
	left:0.5rem;
}
.contactservice-wrap-title{
	height:1.6rem;
	line-height: 1.6rem;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
	padding:0 0.5rem;
}
.contactservice-wrap-tel{
	background: #fff;
}
.contactservice-wrap-tel li{
	padding:0 0.5rem;
	border-bottom:1px solid #dcdcdc;
	height:1.6rem;
	line-height:1.6rem;
	font-size:0.44rem;
	color:#222;
}
.contactservice-wrap-tel li span{
	color:#1989f5;
}
.contactservice-wrap-tel li:last-child{
	border-bottom:none;
}
</style>