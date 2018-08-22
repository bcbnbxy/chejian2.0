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
			<router-link tag="div" :to="{name:'gerenxinxi',params:{personal:item}}" class="adduser-wrap-result-item" v-for="(item,index) in personal" :key='index'>
				<img :src="item.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.headphoto:require('../../assets/img/shouye/defaultavatar.png')" />
				<p>
					<span><i class="iconfont icon-shouji"></i><b>手机：{{item.mobileno}}</b></span>
					<span><i class="iconfont icon-yonghu"></i><span>昵称：{{item.nickname}}</span></span>
				</p>
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
			identity:this.$route.params.identity,
			personal:[],
		}
	},
	watch:{
		'value':function(){
			if(this.value.trim().length<1){
				this.personal=[];
			}else{
				var that=this;
				this.$api('/Execute.do',{action:'device.searchUsers',minvalue:0,pageSize:20,keyword:this.value}).then(function(r){
					if(r.errorCode==0){
						if(r.data.searchUsers==null||r.data.searchUsers==undefined||r.data.searchUsers==''){
							that.$toast({
								message:'没有搜索到该用户',
								position:'bottom',
								duration:1500
							})
						}
						that.personal=r.data.searchUsers
					}else{
						that.$toast({
							message:r.errorMessage,
							position:'bottom',
							duration:1500
						})
					}
				})
			}
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
	height:1.92rem;
	line-height:1.32rem;
	width:100%;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.adduser-wrap-head{
		height:2.64rem;
		line-height:1.32rem;
		width:100%;
		text-align: center;
		font-size:0.56rem;
		color:#fff;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
	}
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
.adduser-wrap-result-item{
	height: 1.6rem;
	width:100%;
	padding:0.2rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.adduser-wrap-result-item:last-child{
	border-bottom:none;
}
.adduser-wrap-result-item img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.adduser-wrap-result-item p{
	flex:1;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	font-size:0.38rem;
	color:#666;
}
.adduser-wrap-result-item p b{
	font-weight: 400;
}
.adduser-wrap-result-item p i{
	display: inline-block;
	vertical-align: middle;
	margin-right:0.3rem;
	font-size:0.5rem;
}
.adduser-wrap-result-item p span{
	line-height: 1;
}
</style>