<template>
<div class="gerenxinxi-wrap">
	<div class="gerenxinxi-wrap-head">
		<div class="gerenxinxi-wrap-head-top">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>个人信息</span>
		</div>
		<div class="gerenxinxi-wrap-head-bottom">
			<img src="../../assets/img/faxianimg/avatar.png"/>
			<p>
				<span>客户01</span>
				<span>24岁   女</span>
			</p>
		</div>
	</div>
	<div class="gerenxinxi-wrap-contaire">
		<p><i class="iconfont icon-yonghu"></i><span>123456789</span></p>
	</div>
	<div class="gerenxinxi-wrap-footer">
		<button>{{msg}}</button>
	</div>
</div>
</template>

<script>
export default{
	created(){
		console.log(this.$route.params.identity)
	},
	computed:{
		msg:function(){
			if(this.$route.params.identity==1){
				return '邀请我的客户'
			}else if(this.$route.params.identity==2){
				return '邀请加入团队'
			}
		}
	}
}
</script>

<style scoped>
.gerenxinxi-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.gerenxinxi-wrap-head{
	width:100%;
	height:4.7rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.gerenxinxi-wrap-head-top{
	height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	line-height:1.32rem;
	text-align: center;
	padding:0 0.5rem;
}
.gerenxinxi-wrap-head-top i{
	float: left;
	font-size:0.6rem;
}
.gerenxinxi-wrap-head-bottom{
	padding:0 0.5rem;
	padding-top:0.72rem;
	display: flex;
	display: -webkit-flex;	
}
.gerenxinxi-wrap-head-bottom img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.gerenxinxi-wrap-head-bottom p{
	height:1.8rem;
	font-size:0.48rem;
	color:#fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content:space-around;
	margin-left:0.5rem;
}
.gerenxinxi-wrap-contaire{
	flex:1;
}
.gerenxinxi-wrap-contaire p{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.48rem;
	color:#222;
	background: #fff;
}
.gerenxinxi-wrap-contaire p i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.5rem;
}
.gerenxinxi-wrap-footer{
	padding:1.04rem 0.5rem;
}
.gerenxinxi-wrap-footer button{
	width:100%;
	height:1.6rem;
	border:none;
	background:#1989f5;
	color:#fff;
	font-size:0.56rem;
	text-align: center;
	line-height:1.6rem;
	border-radius: 3px;
}
</style>