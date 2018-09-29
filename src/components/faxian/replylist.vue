<template>
	<div class="replaylist-wrap">
		<div class="reply-list">
			<div class="reply-avatar clear">
				<div class="reply-avatar-left">
					<img :src="replyitem.owner.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+replyitem.owner.headphoto:require('../../assets/img/shouye/defaultavatar.png')" @click="gohomepage(replyitem.userseq,replyitem.owner.friend)"/>
					<p>
						<b>{{replyitem.owner.nickname}}</b>
						<span>{{formatDate(replyitem.createtime)}}</span>
					</p>
				</div>
				<div class="reply-avatar-right">
					<i class="iconfont icon-xin" :style="replyitem.praised?'color:#ff0000':''" @click="togglepraise(replyitem.reviewseq)"></i>
					<span>{{replyitem.praisecount}}</span>
				</div>
			</div>
			<div class="reply-list-container">
				{{replyitem.content}}
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		replyitem:{
			type:Object,
			default(){
				return{}
			}
		}
	},
	methods:{
		formatDate(seconds){//时间转换函数
			seconds=new Date().getTime()-parseInt(seconds);
			seconds= seconds / 1000;
			var day =  Math.floor(seconds / 86400 );
			seconds = seconds % 86400;
			var hour =  Math.floor( seconds / 3600);
			seconds = seconds % 3600;
			var mintues = Math.floor( seconds / 60);
			var beforeStr = "";
			if(day>0){
				beforeStr += day;
				return beforeStr+"天前";
			}else if(hour>0){
				beforeStr += hour;
				return beforeStr +"小时前"
			}else if(mintues>0){
				beforeStr += mintues;
				return beforeStr +"分钟前"
			}else{
				return "刚刚"
			}				
		},
		togglepraise(reviewseq){//点赞评论
			var that=this;
			if(localStorage.getItem('loginInfo')){
				if(that.replyitem.praised){//取消点赞
					this.$api('/Execute.do',{action:'blog.cancelPraiseBlogReview',reviewseq:reviewseq}).then(function(r){
						if(r.errorCode==0){
							that.replyitem.praised=!that.replyitem.praised;
							that.replyitem.praisecount=parseInt(that.replyitem.praisecount)-1;
						}else{
							that.$toast({
				          		message:r.errorMessage,
					            position: 'bottom',
			  				    duration: 1500
				            });
						}
					})
				}else{//点赞
					this.$api('/Execute.do',{action:'blog.praiseBlogReview',reviewseq:reviewseq}).then(function(r){
						if(r.errorCode==0){
							that.replyitem.praised=!that.replyitem.praised;
							that.replyitem.praisecount=parseInt(that.replyitem.praisecount)+1;
						}else{
							that.$toast({
				          		message:r.errorMessage,
					            position: 'bottom',
			  				    duration: 1500
				            });
						}
					})
				}
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
		},
		gohomepage(touserseq,friend){
	    	this.$router.replace('/homepage')
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_friend',friend);
			this.$store.commit('setblog_remark',null);
		}
	}
}
</script>

<style>
.reply-list{
	width:100%;
	padding:0 0.48rem;
	padding-top:0.3rem;
}
.reply-avatar{
	height:1.2rem;
	overflow: hidden;
}
.reply-avatar-left{
	float:left;
	display: flex;
	display: -webkit-flex;
}
.reply-avatar-left img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	display: block;
	margin-right:0.5rem;
}
.reply-avatar-left p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	font-size:0.48rem;
	color:#222;
	justify-content: space-around;
}
.reply-avatar-left p span{
	font-size:0.42rem;
	color:#666;
}
.reply-avatar-right{
	float:right;
	height:1rem;
	line-height:0.6rem;
}
.reply-avatar-right i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.3rem;
}
.reply-avatar-right span{
	font-size:0.48rem;
	color:#666;
}
.reply-list-container{
	padding:0.36rem 0;
	line-height:0.6rem;
	font-size:0.48rem;
	color:#666;
}
.reply-list-container span{
	color:#0061ff;
}
</style>