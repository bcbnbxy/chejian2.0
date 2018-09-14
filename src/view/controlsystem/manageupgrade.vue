<template>
<div class="manageupgrade-wrap">
	<div class="manageupgrade-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>升级管理系统</span>
	</div>
	<div class="manageupgrade-wrap-contaire">
		<p>您还没有升级管理系统哦！暂时没有数据。升级管理系统后，更智能的管理您的公司、门店！</p>
		<button @click="toggleSubmissionupgrades">去升级</button>
	</div>
	<div :class="submissionupgradesflag?'submissionupgrades-contaire-show':'submissionupgrades-contaire-hidden'">
		<Submissionupgrades v-on:listenSubmissionupgrades="toggleSubmissionupgrades" :dataInfo="$route.params.dataInfo"></Submissionupgrades>
	</div>
</div>
</template>

<script>
import Submissionupgrades from '@/components/controlsystem/submissionupgrades'
export default{
	components:{Submissionupgrades },
	data(){
		return{
			submissionupgradesflag:this.$route.params.dataInfo?true:false,
		}
	},
	methods:{
		toggleSubmissionupgrades(){
			this.submissionupgradesflag=!this.submissionupgradesflag;
		}
	}
}
</script>

<style scoped>
.manageupgrade-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}
.manageupgrade-wrap-head{
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.manageupgrade-wrap-head{
		height:2.64rem;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		line-height:1.32rem;
		text-align: center;
		font-size:0.56rem;
		color:#fff;
	}
}
.manageupgrade-wrap-head .icon-fanhui{
	font-size:0.6rem;
	float:left;
}
.manageupgrade-wrap-contaire{
	flex:1;
	padding-top:3.85rem;
}
.manageupgrade-wrap-contaire p{
	font-size:0.38rem;
	color:#999;
	text-align: center;
	line-height:0.72rem;
	padding:0 2rem;
}
.manageupgrade-wrap-contaire button{
	width:8rem;
	height:1.6rem;
	background: #1989f5;
	font-size:0.56rem;
	text-align: center;
	line-height:1.6rem;
	border-radius: 5px;
	border:none;
	color:#fff;
	margin-left:2.2rem;
	margin-top:1.92rem;
}
.submissionupgrades-contaire-show{
	width:100%;
	height:100%;
	background: tan;
	position: absolute;
	left:0;
	top:0;
	transition: all 0.3s;
}
.submissionupgrades-contaire-hidden{
	width:100%;
	height:100%;
	background: tan;
	position: absolute;
	left:100%;
	top:0;
	transition: all 0.3s;
}
</style>