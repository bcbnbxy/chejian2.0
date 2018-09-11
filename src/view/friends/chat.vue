<template>
<div class="chat-wrap">
	<div class="chat-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>{{this.$route.params.nickname}}</span>
	</div>
	<div class="chat-wrap-chatlist" id="viewBox">
		<div class="chat-wrap-chatlist-contaire">
			<mt-loadmore :top-method="loadBottom" :bottom-method="loadTop"  :auto-fill="false" top-pull-text="下拉加载" top-drop-text="释放更新" :top-loading-text="!allLoaded?'没有更多数据了':'加载中'" @top-status-change="handleTopChange" ref="loadmore" bottom-pull-text="上拉刷新">
				<ul v-for="(item,index) in chats" :key="index">
					<li v-if="userseq!=item.senderseq">
					   	<span class='twoimg'><img @click="gohomepage(item.senderseq,true)" :src="item.sender.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.sender.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/></span>
					   	<span class='twox'></span>
					   	<span class='chattwo'>{{item.content}}</span>
				    </li>
				    <li v-else>
					   	<span class='oneimg'><img :src="item.sender.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.sender.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/></span>
					   	<span class='onex'></span>
					   	<span class='chatone'>{{item.content}}</span>
				    </li>
			  </ul>
		   </mt-loadmore>
		</div>
	</div>
	<div class="chat-wrap-footer">
		<div class="boxinput">
	    	<input type="text" v-model="content"/>
	    	<button :style="content?'':'color:#ccc;'" @click="content&&send()">发送</button>
	    </div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			userseq:JSON.parse(localStorage.getItem('loginInfo')).userseq,
			chats:[],
			psize:15,
			pnum:0,
			content:'',
			allLoaded:false,
			box:'',
			topStatus:'',
			scroll:true,
			lastchatseq:'',
			lastchatseqflag:true,
		}
	},
	methods:{
		getchats(minvalue,psize){//获取聊天明细列表
			var that=this;
			this.$api('/Execute.do',{action:'chating.chats',chatgroup:this.$route.params.chatgroup,minvalue:minvalue,pageSize:psize,touserseq:this.$route.params.userseq}).then(function(r){
				if(r.errorCode==0){
					if(r.data.chats==null||r.data.chats==undefined||r.data.chats==''){
						return ;
					}else{
						that.lastchatseq=r.data.chats[0].chatseq;
						that.chats=r.data.chats.reverse().concat(that.chats);
						if(r.data.chats.length<15){
							that.allLoaded=false;
						}else{
							that.allLoaded=true;
							that.pnum=r.data.chats[0].chatseq
						}						
						that.$nextTick(function(){
							if(this.scroll){
								document.getElementById('viewBox').scrollTop=document.getElementById('viewBox').scrollHeight;
							}else{
								document.getElementById('viewBox').scrollTop=document.getElementById('viewBox').offsetHeight/2;
							};
							if(that.lastchatseqflag){
								this.$api('/Execute.do',{action:'chating.updateChatgroupRead',chatgroup:that.$route.params.chatgroup,lastchatseq:that.lastchatseq}).then(function(r){									
									if(r.errorCode==0){
										that.lastchatseqflag=false;
									}
								})
							}
						})
					}
				}
			})	
		},
		loadTop(){//下拉加载
			this.chats=[],
	    	this.getchats(0,this.psize);	    	
	    	this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位	
		},
		loadBottom(){//上拉刷新
			this.scroll=false;
			if(this.allLoaded){
				this.getchats(this.pnum,this.psize);
				this.$refs.loadmore.onTopLoaded();	
			}
		},
		handleTopChange(status){
			this.topStatus=status;
		},
		send(){//发送消息
			var that=this;
			this.$api('/Execute.do',{action:'chating.addChat',content:this.content,touserseq:this.$route.params.userseq,chattype:0,chatgroup:0,}).then(function(r){
				if(r.errorCode==0){
					that.$toast({
						message:'已发送',
						position:'bottom',
						duration:1500
					})
					that.content="";
					that.chats=[],
					that.getchats(0,that.psize);
					that.$nextTick(function(){						
						document.getElementById('viewBox').scrollTop=document.getElementById('viewBox').scrollHeight;
					})
				}else{
					that.$toast({
						message:r.errorCode,
						position:'bottom',
						duration:1500
					})
				}
			})
		},
		gohomepage(touserseq,friend){
			this.$router.replace('/homepage');
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_friend',friend);
			this.$store.commit('setblog_remark',null);
		},
	},
	created(){
		this.getchats(0,this.psize);
	}
}
</script>

<style>
.chat-wrap{
	width:100%;
	height:100%;
	background: #f0f0f0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
}
.chat-wrap-head{
	height:1.92rem;
	width:100%;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	position: relative;
	padding:0 0.5rem;
	padding-top:0.6rem;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.chat-wrap-head{
		height:2.64rem;
		width:100%;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size:cover ;
		text-align: center;
		line-height:1.32rem;
		font-size:0.56rem;
		color:#fff;
		position: relative;
		padding:0 0.5rem;
		padding-top:1.32rem;
	}
	.chat-wrap{
		overflow: visible;
	}
	.chat-wrap-footer{
		bottom:-1.02rem !important;
		padding-bottom:1.02rem;
	}
}
.chat-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.chat-wrap-chatlist{
	flex: 1;
	overflow-y:scroll; 
	-webkit-overflow-scrolling:touch;
	padding-top:0.3rem;
	padding-bottom:1.6rem;
}
.chat-wrap-chatlist-contaire{
	padding:0 0.5rem;
}
.chat-wrap-chatlist-contaire li{ 
	display:block; 
	position:relative; 
	overflow:hidden; 
	margin-bottom:0.44rem;
}
.oneimg{
	float:right; 
	display:block;
	width:1.2rem; 
	height:1.2rem;
}
.oneimg img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.onex{
	display:block;
	width:0.2rem;
	height:0.6rem;
	background:url(../../assets/img/friends/one.png) no-repeat;
	position:absolute;
	right:1.5rem;
	top:0.3rem;
	background-size:0.2rem 0.6rem;
}
.chatone{ 
	float:right;
	max-width:7.5rem; 
	border-radius:5px;
	background:#1989f5;
	margin-right:0.5rem;
	padding:0.2rem;
	text-align:left;
	font-size:0.38rem;
	line-height:0.6rem;
	color:#fff;
}
.twoimg{
	float:left;
	display:block;
	width:1.2rem;
	height:1.2rem;
}
.twoimg img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
}
.twox{
	display:block;
	width:0.2rem;
	height:0.6rem; 
	background:url(../../assets/img/friends/two.png) no-repeat;
	position:absolute;
	left:1.5rem;
	top:0.3rem;
	background-size:0.2rem 0.6rem;
}
.chattwo{
	float:left;
	max-width:7.5rem;
	border-radius:5px;
	background:#fff;
	margin-left:0.5rem;
	padding:0.2rem;
	text-align:left;
	line-height:0.6rem;
	color:#000;
	font-size:0.38rem;
}
.chat-wrap-footer{
	width:100%;
	background:#f7f7f7;
	overflow:hidden;
	position: absolute;
	left:0;
	bottom:0;
}
.boxinput{
	overflow:hidden;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
}
.boxinput input{
	flex:1;
	height:1rem;
	border:1px solid #ddd;
	border-radius: 5px;
	background: #fff;
	margin-right:0.5rem;
	font-size:0.38rem;
}
.boxinput button{
	font-size:0.44rem;
	background: none;
	color:#1989F5;
}
</style>