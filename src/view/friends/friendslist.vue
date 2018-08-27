<template>
<div class="friends-wrap">
	<div class="friends-wrap-head">
		<span>好友</span>
		<span @click="toggleaddfriend">添加好友</span>
	</div>
	<div class="friends-cotaire">
		<div class="friends-cotaire-nav"><p><span :class="index==1?'navcontaire':''" @click="togglenav(1)">车友</span><span :class="index==2?'navcontaire':''" @click="togglenav(2)">消息</span></p></div>
		<div class="friends-cotaire-chatlist" v-if="index==2">
			<ul>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
					<router-link tag="li" :to="{name:'chat',params:{nickname:item.target.nickname,userseq:item.target.userseq,chatgroup:item.chatgroup}}" v-for="(item,index) in chatlist" :key="index" ><p><img :src="item.target.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.target.headphoto:require('../../assets/img/shouye/defaultavatar.png')"></p><p><span><b>{{item.target.nickname}}</b><i>{{item.lastChat.createtime | formatDate}}</i></span><span>{{item.lastChat.content}}</span></p></router-link>		    		
				</mt-loadmore>
			</ul>
		</div>
		<div class="addresslist" v-else>
			<mt-index-list>
				<mt-index-section :index="item.initial" v-for="(item,index) in friends" :key="index">
				    <div @click="gohomepage(list.friend,true,list.remark)" class="addresslist-item" v-for="(list,Index) in item.friends" :key="Index">
				    	<img :src="list.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+list.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/><span class="cell-content">{{list.remark?list.remark:list.userInfo.nickname}}</span>
				    </div>
				</mt-index-section>
			</mt-index-list>
		</div>
	</div>
	<div class="addfriend-contaire" :class="addfriend?'addfriend-show':'addfriend-hidden'">
		<v-Addfriend v-on:listaddfriendshow="toggleaddfriend"></v-Addfriend>
	</div>
</div>
</template>
<script>
import Addfriend from '@/components/faxian/addfriend'
export default{
	components:{"v-Addfriend":Addfriend},
	data(){
		return{
			chatlist:[],
			pnum:0,
			psize:10,
			allLoaded:false,
			index:1,
			friends:null,
			addfriend:false,
		}
	},
	mounted(){
		if(this.index==2){
			this.getchatlist(this.pnum,this.psize);
		}else if(this.index==1){
			this.getcarfriends();
		}
		
	},
	methods:{
		getchatlist(minseq,psize){//获取私信列表
			
			var that=this;
			this.$api('/Execute.do',{action:'chating.talkers;messageCounts',minvalue:minseq,pageSize:psize}).then(function(r){
				if(r.errorCode==0){
					if(r.data.talkers==null||r.data.talkers==undefined||r.data.talkers==''){
						that.$toast({
							message:'没有数据',
							position:'bottom',
							duration:1500
						})
						return ;
					}else{
						that.chatlist=r.data.talkers;
						if(r.data.talkers.length<10){
							that.allLoaded=true;
						}else{
							that.allLoaded=false;
							that.num=r.data.talkers[r.data.talkers.length-1].chatgroup
						}
					}
				}else{
					that.$toast({
						message:r.errorCode,
						position:'bottom',
						duration:1500
					})
				}
			})
		},
		loadTop(){//下啦刷新函数
			this.chatlist=[],
			this.getchatlist(0,this.psize);
			this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom(){//上拉加载函数
			this.getchatlist(this.pnum,this.psize);
	    	this.$refs.loadmore.onBottomLoaded();
		},
		togglenav(index){
			this.index=index;
			if(this.index==2){
				this.getchatlist(this.pnum,this.psize);
			}else if(this.index==1){
				this.getcarfriends();
			}
		},
		toggleaddfriend(){
			this.addfriend=!this.addfriend;
		},
		getcarfriends(){//获取我的车友列表
			var that=this;
			this.$api('/Execute.do',{action:'friends;messageCounts'}).then(function(r){
				if(r.errorCode==0){
					if(r.data.friends==null||r.data.friends==undefined||r.data.friends==""){
						that.$toast({
							message:'没有数据',
							position:'bottom',
							duration:1500
						})
						return ;
					}else{
						that.friends=r.data.friends;
					}
				}else{
					that.$toast({
						message:r.errorCode,
						position:'bottom',
						duration:1500
					})
				}
			})
		},
		gohomepage(touserseq,friend,remark){
			this.$router.push('/homepage');
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_friend',friend);
			this.$store.commit('setblog_remark',remark);
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
	},
	beforeRouteEnter(to,from,next){
		if(!localStorage.getItem('loginInfo')){
			next({path:'/nologin'});
		}else{
			next();
		}
	}
}
</script>

<style>
.friends-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
}
.friends-wrap-head{
	height:1.92rem;
	width:100%;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.friends-wrap-head{
		height:2.64rem;
		width:100%;
		text-align: center;
		line-height:1.32rem;
		font-size:0.56rem;
		color:#fff;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
		position: relative;
	}
}
.friends-wrap-head span:last-child{
	position: absolute;
	right:0.5rem;
	font-size:0.44rem;
}
.friends-cotaire-nav{
	width:100%;
	height:2rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	padding:0 2.2rem;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.friends-cotaire-nav>p{
	height:1.18rem;
	width:100%;
	text-align: center;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
}
.friends-cotaire-nav>p span{
	display: inline-block;
	width:50%;
	height:1.18rem;
	line-height:1.18rem;
	text-align: center;
	font-size:0.44rem;
	color:#999;	
}
.friends-cotaire-nav>p span:nth-child(1){
	border-radius: 5px 0 0 5px;
	border:1px solid #ddd;
	border-right:none;
}
.friends-cotaire-nav>p span:nth-child(2){
	border-radius: 0 5px 5px 0;
	border:1px solid #ddd;
	border-left:none;
}
.navcontaire{
	background: #1989F5;
	color:#fff !important;
	border:none !important;
}
.friends-cotaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.friends-cotaire-chatlist {
	width:100%;
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.friends-cotaire-chatlist ul{
	background: #fff;
	width:100%;
}
.friends-cotaire-chatlist ul li{
	height:2rem;
	width:100%;
	padding-left:0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	overflow: hidden;
}
.friends-cotaire-chatlist ul li>p:nth-child(1){
	flex:0 0 1.4rem;
	height:1.4rem;
	border-radius: 50%;
	overflow:hidden;
}
.friends-cotaire-chatlist ul li>p:nth-child(1) img{
	width:1.4rem;
	height:1.4rem;
}
.friends-cotaire-chatlist ul li>p:nth-child(2){
	flex:1;
	height:100%;
	padding:0.3rem 0;
	padding-right:0.5rem;
	border-bottom:1px solid #ddd;
	margin-left:0.5rem;
	display: flex;
	display:-webkit-flex;
	flex-direction: column;
	justify-content: space-around;
	font-size:0.38rem;
	color:#666;
}
.friends-cotaire-chatlist ul li>p:nth-child(2) span:nth-child(1){
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.friends-cotaire-chatlist ul li>p:nth-child(2) span:nth-child(1) b{
	font-weight: 400;
	color:#222;
}
.friends-cotaire-chatlist ul li>p:nth-child(2) span:nth-child(1) i{
	font-style: normal;
	color:#999;
}
.friends-cotaire-chatlist ul li>p:nth-child(2) span:nth-child(2){
	width:9.58rem;
	overflow:hidden;
	white-space: nowrap;
	text-overflow:ellipsis;  	 
}
.friends-cotaire-chatlist ul li:last-child p:last-child{
	border-bottom:none;
}
.addresslist{
	width:100%;
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.addresslist-item{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	padding-left:0.5rem;
	background: #fff;
}
.addresslist-item img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
}
.addresslist-item span{
	font-size:0.4rem;
	color:#222;
	height:1.6rem;
	line-height:1.6rem;
	flex:1;
	padding-left:0.5rem;
	border-bottom:1px solid #ddd;
}
.mint-indexlist{
	height:100% !important;
}
.mint-indexlist-content{
	margin-right:0 !important;
}
.mint-indexlist-nav{
	background: none !important;
	border-left:none !important;
}
.mint-indexlist-navitem{
	font-size:0.44rem !important;
	color:#222 !important;
}
.mint-indexsection-index{
	font-size:0.48rem;
	color:#999 !important;
	/*padding:0.15rem !important;*/
	padding:0 !important;
	padding-left:0.2rem !important;
	height:0.8rem !important;
	line-height:0.8rem !important;
}
.addfriend-contaire{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	z-index: 1000;	
}
.addfriend-show{
	left:0;
	transition: all 0.3s;
}
.addfriend-hidden{
	left:100%;
	transition: all 0.3s;
}
</style>