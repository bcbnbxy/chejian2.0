<template>
	<div class="praise-wrap">
		<div class="praise-head">
			<span @click="praisehidden">返回</span>
			<span>他们也点赞了</span>
			<span></span>
		</div>
		<div class="praise-list">
			<ul>
				<li v-for="(item,index) in praisers">
					<img :src="item.user.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.user.headphoto:require ('../../assets/img/shouye/defaultavatar.png')"/>
					<span>{{item.user.nickname}}</span>
					<p v-show="userseq!=item.userseq&&!item.user.friend" @click="addfriend(item.userseq)">加好友</p>					
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import User from '@/components/search/user'
export default {
	props:{
		praisers:{
			type:Array,
			default(){
				return []
			}
		}
	},
	components:{User},
	data(){
		return{
			userseq:localStorage.getItem('loginInfo')==null?'':JSON.parse(localStorage.getItem('loginInfo')).userseq,
		}
	},
	methods:{
		praisehidden(){
			this.$emit('praiseshow')
		},
		addfriend(userseq){//添加好友
				var that=this;
				if(localStorage.getItem('loginInfo')){
					this.$api('/Execute.do',{action:'sendFriendMessage',userseq:userseq}).then(function(r){
						if(r.errorCode==0){
							that.$toast({
				          		message:'消息已发送',
					            position: 'bottom',
			  				    duration: 1500
				            });
						}else{
							that.$toast({
				          		message:r.errorMessage,
					            position: 'bottom',
			  				    duration: 1500
				            });
						}
					})
				}else{
					MessageBox.confirm('', {
				        message: '您还没有登陆，去登陆',
				        showConfirmButton:true,
				        showCancelButton:true,
				        confirmButtonText:'确定',
				        cancelButtonText:'取消'
			        }).then(action => {
			          if (action == 'confirm') {
			            that.$router.push('/bootPage')
			          }
			        }).catch(err => {
			          if (err == 'cancel') {
			            console.log('123');
			          }
			        });
				}
			}
	}
}
</script>

<style>
.praise-wrap{
	background:#f7f7f7;
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.praise-head{
	width: 100%;
	height:1.32rem;
	background: url(../../assets/img/faxianimg/headbg.png) center no-repeat;
	padding:0.21rem 0.5rem;
	font-size:0.42rem;
	color:#fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.praise-head span:nth-child(2){
	font-size:0.56rem;
}
.praise-list{
	flex:1;
	overflow:auto;
}
.praise-list>ul{
	width:100%;
	background: #fff;
	padding:0 0.5rem;
}
.praise-list>ul li{
	height:1.6rem;
	border-bottom:1px solid #dcdcdc;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 0.1rem;
}
.praise-list>ul li:last-child{
	border-bottom:none;
}
.praise-list>ul li img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	margin-right:0.52rem;
}
.praise-list>ul li>span{
	font-size:0.48rem;
	color:#666;
	flex:1;
}
.praise-list>ul li>p{
	padding:0.23rem 0.36rem;
	background: #ff481d;
	color:#fff;
	font-size:0.4rem;
	border-radius: 15px;
}
</style>