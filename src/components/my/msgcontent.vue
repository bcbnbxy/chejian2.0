<template>
<div class="msgcontent-wrap">
	<div class="msgcontent-wrap-head">
		<i class="iconfont icon-fanhui" @click="$emit('listenmsgcontent')"></i>
		<span>系统消息</span>
	</div>
	<div class="msgcontent-wrap-contaire">
		<h3>{{title}}</h3>
		<div class="msgcontent-wrap-contaire-content">
			<p>{{content}}</p>
		</div>
		<div class="msgcontent-wrap-contaire-time">{{time | formatDate}}</div>
	</div>
</div>
</template>

<script>
export default{
	props:['msgseq'],
	data(){
		return {
			title:'',
			content:'',
			time:''
		}
	},
	methods:{
		getsyscontent(msgseq){//获取系统消息详细信息
			var that=this;
			this.$api('/Execute.do',{action:'message',msgseq:msgseq}).then(function(r){
				if(r.errorCode==0){
					that.title=r.data.message.title;
					that.content=r.data.message.content;
					that.time=r.data.message.createtime;
				}else{
					that.$toast({
						message:r.errorCode,
						position:'bottom',
						duration:1500
					})
				}
			})
		}
	},
	watch:{
		msgseq(){
			if(this.msgseq){
				this.getsyscontent(this.msgseq)
			}
		}
	},
	filters:{
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
		}
	}
}
</script>

<style scoped>
.msgcontent-wrap{
	width:100%;
	height:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.msgcontent-wrap-head{
	width:100%;
	height:1.92rem;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
	position: relative;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;	
	padding-top:0.6rem;
}
.msgcontent-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
}
.msgcontent-wrap-contaire{
	flex:1;
	padding:0 1rem;
	padding-top:1rem;
}
.msgcontent-wrap-contaire h3{
	font-size:0.56rem;
	color:#222;
	font-weight: 400;
	margin-bottom:0.3rem;
}
.msgcontent-wrap-contaire-content{
	font-size:0.48rem;
	color:#666;
}
.msgcontent-wrap-contaire-content p{
	text-indent: 2em;
	line-height:0.7rem;
}
.msgcontent-wrap-contaire-time{
	margin-top:0.3rem;
	font-size:0.38rem;
	color:#999;
}
</style>