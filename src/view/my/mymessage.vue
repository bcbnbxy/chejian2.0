<template>
<div class="mymessage-wrap">
	<div class="mymessage-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>我的消息</span>
	</div>
	<section class="mymessage-contaire">
		<ul>
			<router-link tag="li" :to="{name:'sysmsg',params:{title:'系统消息',kind:0}}">
				<p><img src="../../assets/img/my/xitong.png"/>系统消息</p>
				<p><span v-show="sysmsg">{{sysmsg}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
			</router-link>
			<router-link tag="li" :to="{name:'msgcontaire',params:{title:'新的车友',kind:2}}">
				<p><img src="../../assets/img/my/carmsg.png"/>新的车友</p>
				<p><span v-show="friendmsg">{{friendmsg}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
			</router-link>
			<router-link tag="li" :to="{name:'msgcontaire',params:{title:'服务消息',kind:3}}">
				<p><img src="../../assets/img/my/tuisong.png"/>服务消息</p>
				<p><span v-show="agentmsg">{{agentmsg}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
			</router-link>			
			<router-link tag="li" :to="{name:'msgcontaire',params:{title:'工作消息',kind:4}}">
				<p><img src="../../assets/img/my/haoyou.png"/>工作消息</p>
				<p><span v-show="staffmsg">{{staffmsg}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
			</router-link>
		</ul>
	</section>
</div>
</template>

<script>
export default{
	data(){
		return{
			sysmsg:null,
			friendmsg:null,
			agentmsg:null,
			staffmsg:null
		}
	},
	mounted(){
		this.getmessageCounts()
	},
	methods:{
		getmessageCounts(){
			var that=this;
			this.$api('/Execute.do',{action:"messageCounts"}).then(function(r){
				if(r.errorCode==0){
					if(r.data.messageCounts==null||r.data.messageCounts==undefined||r.data.messageCounts==''){
						return;
					}else{
						for(var i=0;i<r.data.messageCounts.length;i++){
							if(r.data.messageCounts[i].kind==0&&r.data.messageCounts[i].unread!=0){
								that.sysmsg=r.data.messageCounts[i].unread;
							}else if(r.data.messageCounts[i].kind==2&&r.data.messageCounts[i].unread!=0){
								that.friendmsg=r.data.messageCounts[i].unread;
							}else if(r.data.messageCounts[i].kind==3&&r.data.messageCounts[i].unread!=0){
								that.agentmsg=r.data.messageCounts[i].unread;
							}else if(r.data.messageCounts[i].kind==4&&r.data.messageCounts[i].unread!=0){								
								that.staffmsg=r.data.messageCounts[i].unread;
							}
						}
					}
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
</script>

<style>
.mymessage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	overflow: hidden;
}
.mymessage-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	position:relative;
}
.mymessage-wrap-head .icon-fanhui{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.mymessage-contaire{
	background: #fff;
}
.mymessage-contaire li{
	height:1.6rem;
	width:100%;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	align-items: center;
}
.mymessage-contaire li p{
	display: inline-block;
	line-height: 0;
}
.mymessage-contaire li p:nth-child(1) img{
	width:0.62rem;
	height:0.5rem;
	margin-right:0.5rem;
	vertical-align: middle
}
.mymessage-contaire li p:nth-child(1){
	font-size:0.38rem;
	color:#222;	
	vertical-align: top;
}
.mymessage-contaire li p:nth-child(2) span{
	width:0.52rem;
	height:0.52rem;
	border-radius: 50%;
	background: #ff0000;
	text-align: center;
	line-height:0.58rem;
	font-size:0.38rem;
	color:#fff;
	display: inline-block;
	vertical-align: middle;
}
.mymessage-contaire .icon-arrow-right-copy-copy-copy{
	font-size:0.56rem;
	color:#a0a0a0;
	display: inline-block;
	vertical-align: middle;
}
</style>