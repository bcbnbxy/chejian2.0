<template>
	<div class="feedback-wrap">
		<header>
			<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
			<span>意见反馈</span>
		</header>
		<div class="feedback-textarea">
			<textarea placeholder="请输入您的意见或者建议，我们将为您提供更好的服务" v-model="content"></textarea>
		</div>
		<div class="submit">
			<mt-button type="default"  @click="submit">确定</mt-button>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			content:''
		}
	},
	methods:{
		submit:function(){
			if(this.content.trim().length<1){
				this.$toast({
		          message: '内容不能为空',
		          position: 'bottom',
				  duration: 1500
		      });
			}else{
				var that=this;
				this.$api('/Execute.do',{action:"sendFeedback",userseq:JSON.parse(localStorage.getItem('loginInfo')).userseq,content:this.content}).then(function(r){
					console.log(JSON.stringify(r));
					if(r.errorCode=='0'){
						that.$toast({
				          message: '你的反馈我们已经查收！',
				          position: 'bottom',
						  duration: 1500
				      });
					}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
						  duration: 1500
				      });
					}
				})
				
			}
		}
	}
}
</script>

<style scoped>
.feedback-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.feedback-wrap>header{
	height:1.92rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	position: relative;
	font-size:0.56rem;
	padding-top:0.6rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.feedback-wrap>header{
		height:2.64rem;
		padding:0 0.5rem;
		line-height:1.32rem;
		text-align: center;
		position: relative;
		font-size:0.56rem;
		padding-top:1.32rem;
		color:#fff;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
	}
}
.feedback-wrap>header span:nth-child(1){
	position: absolute;
	left:0.5rem;
}
.feedback-textarea textarea{
	width:100%;
	height:5rem;
	padding:0 0.5rem;
	background: #fff;
	border:none;
	font-size:0.4rem;
	color:#222;
	line-height:1rem;
	margin-bottom: 0.3rem;
}
.icon-fanhui{
	font-size:0.44rem;
}
.submit{
	padding:0 0.6rem;
	padding-top:0.2rem;
}

</style>