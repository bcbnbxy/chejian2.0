<template>
<div class="addfriend-wrap">
	<div class="addfriend-head">
		<i class="iconfont icon-fanhui" @click="$emit('listaddfriendshow')"></i>
		<div class="addfriend-head-search">
			<input type="text" v-model="searchvalue"/>
			<i class="iconfont icon-clear" v-show="searchvalue" @click="searchvalue=''"></i>
		</div>
	</div>
	<div class="addfriend-wrap-main">
		<p v-if="personal.length<=0">搜索用户并添加好友</p>
		<ul class="addfriend-list" v-else>
			<li class="adduser-wrap-result-item" v-for="(item,index) in personal" :key='index' @click="gohomepage(item.userseq,false)">
				<img :src="item.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.headphoto:require('../../assets/img/shouye/defaultavatar.png')" />
				<p>
					<span><i class="iconfont icon-shouji"></i><b>手机：{{item.mobileno}}</b></span>
					<span><i class="iconfont icon-yonghu"></i><span>昵称：{{item.nickname}}</span></span>
				</p>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			searchvalue:'',
			personal:[],
		}
	},
	watch:{
		'searchvalue':function(){
			if(this.searchvalue.trim().length<1){
				this.personal=[];
			}else{
				var that=this;
				this.$api('/Execute.do',{action:'searchUsers',minvalue:0,pageSize:20,keyword:this.searchvalue}).then(function(r){
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
	},
	methods:{
		gohomepage(touserseq,friend){
			this.$router.push('/homepage');
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_friend',friend);
			this.$store.commit('setblog_remark',null);
		}
	}
}
</script>

<style scoped>
	.addfriend-wrap{
		width:100%;
		height:100%;
		background: #f7f7f7;
		display: flex;
		display: -webkit-box;
		flex-direction: column;
	}
	.addfriend-head{
		height:1.32rem;
		width:100%;
		padding:0 0.5rem;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		color:#fff;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
	}
	.addfriend-head .icon-fanhui{
		font-size:0.6rem;
		margin-right:0.3rem;
	}
	.addfriend-head-search{
		flex:1;
		background: #fff;
		height:1rem;
		border-radius: 5px;
		line-height: 0;
		padding:0 0.5rem;
		position: relative;
	}
	.addfriend-head-search input{
		width:100%;
		height:1rem;
		color:#666;
		padding:0 0.5rem;
		font-size:0.44rem;
		
	}
	.addfriend-head-search .icon-clear{
		position: absolute;		
		top:0.5rem;
		right:0.2rem;
		color:#999;
		font-size:0.5rem;
	}
	.addfriend-wrap-main{
		flex:1;
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
	}
	.addfriend-wrap-main>p{
		flex:1;
		text-align: center;
		margin-top:5rem;
		color:#999;
		font-size:0.44rem;
	}
	.addfriend-list{
		flex:1;
		overflow-y: auto;
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