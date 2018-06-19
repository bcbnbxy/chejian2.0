<template>
<div class="adduser-wrap">
	<div class="adduser-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>邀请加入团队</span>
	</div>
	<div class="adduser-wrap-contaire">
		<div class="adduser-wrap-search">
			<p>
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="手机号/昵称" v-model="value"/>
				<i class="iconfont icon-clear" v-show="value" @click="value=''"></i>
			</p>
		</div>
		<div class="adduser-wrap-result">
			<router-link tag="div" :to="{name:'gerenxinxi',params:{identity:$route.params.identity}}" class="adduser-wrap-result-item">
				<p><i class="iconfont icon-shouji"></i><span>手机：123456789</span></p>
				<p><i class="iconfont icon-yonghu"></i><span>昵称：123456789</span></p>
			</router-link>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			value:'',
			identity:this.$route.params.identity
		}
	}
}
</script>

<style scoped>
.adduser-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.adduser-wrap-head{
	height:1.32rem;
	line-height:1.32rem;
	width:100%;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.adduser-wrap-head .icon-fanhui{
	font-size:0.6rem;
	float: left;
}
.adduser-wrap-contaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.adduser-wrap-search{
	background: #fff;
	padding:0.35rem 0.5rem;
	height:1.6rem;
	border-bottom: 1px solid #ddd;
	font-size:0.44rem;
	color:#222;
}
.adduser-wrap-search p{
	width:100%;
	height:0.9rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	background: #f6f6f6;
	padding:0 0.3rem;
	border-radius: 3px;
}
::-webkit-input-placeholder{
	color:#999;
}
.adduser-wrap-search input{
	flex: 1;
	padding:0 0.55rem;	
}
.adduser-wrap-search  i{
	color:#999;
	font-size:0.6rem;
}
.adduser-wrap-result{
	flex:1;
}
.adduser-wrap-result-item p{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	padding:0 0.85rem;
}
.adduser-wrap-result-item p i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.45rem;
}
</style>