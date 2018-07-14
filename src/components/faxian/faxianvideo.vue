<template>
	<div class="fourpicture">
		<div class="fourpicture-avatar">
			<div class="fourpicture-avatar-left"><router-link tag="div" to="/homepage"><img :src="datalist.owner.headphoto?datalist.owner.headphoto:defaultImg"/></router-link><p><b>{{datalist.owner.nickname}}</b><span>{{formatDate(datalist.createtime)}}</span></p></div>
			<div class="fourpicture-avatar-right" v-show="!(userseq==datalist.userseq)"><p v-if="!favorite" @click="addMyFavorite(datalist.userseq)">+关注</p><p v-else style='background: #fff;border:1px solid #ff481d;color:#ff481d;' @click="removeMyFavorit(datalist.userseq)">已关注</p></div>
		</div>
		<div class="fourpicture-content">
			<div class="video-box">
				<video width="1" height="1" style="background: tan;"></video>				
				<img src="../../assets/img/faxianimg/playbtn.png" class="playbtn"/>
				<img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+datalist.images"/>
			</div>
			<p>{{datalist.content}}</p>
		</div>
		<div class="fourpicture-title">
			<p><i class="iconfont icon-xin" style="vertical-align: baseline;" v-if="!praiseflag" @click="praise(datalist.blogseq,praisecount)"></i> <svg class="icon" aria-hidden="true" v-else @click="cancelPraiseBlog(datalist.blogseq,praisecount)"><use xlink:href="#icon-heart-copy"></use></svg><span>{{praisecount}}</span></p>
			<router-link :to="{name:'detailpage',params:{datalist}}" tag="p"><i class="iconfont icon-pinglun"></i><span>365</span></router-link>
			<p @click="more(index)">···</p>
		</div>
		<ul v-show="$store.state.faxian.popupmean_more == index" class="popupmean-more" @touchmove.prevent>
			<li @click="showshare">转发</li>
			<li @click="popupmeanreport">举报</li>
			<li>减少推荐此类内容</li>
		</ul>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default{		
	props:['data','index'],
	data(){
		return {
			defaultImg:require('../../assets/img/faxianimg/avatar.png') ,
			datalist:this.data,
			userseq:localStorage.getItem('loginInfo')==null?'':JSON.parse(localStorage.getItem('loginInfo')).userseq,
			favorite:this.data.owner.favorite,
			praiseflag:false,
			praisecount:this.data.praisecount
		}
	},
	methods:{
		more:function($index){
			this.$store.commit('changepopupmean');
			this.$store.commit('changepopupmean_more',$index);
		},
		popupmeanreport:function(){
			this.$store.commit('changepopupmean_more');
			this.$store.commit('changereport');
		},
		showshare:function(){
			this.$store.commit('changepopupmean_more');
			this.$store.commit('changeshare');
		},
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
		praise(blogseq,count){//点赞帖子
			var that=this;
			if(localStorage.getItem('loginInfo')){
				this.$api('/Execute.do',{action:'blog.praiseBlog',blogseq:blogseq}).then(function(r){
					if(r.errorCode==0){
						that.praiseflag=!that.praiseflag;
						that.praisecount=parseInt(count)+1
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
		},
		cancelPraiseBlog(blogseq,count){//取消点赞帖子
			var that=this;
			if(localStorage.getItem('loginInfo')){
				this.$api('/Execute.do',{action:'blog.cancelPraiseBlog',blogseq:blogseq}).then(function(r){
					if(r.errorCode==0){
						that.praiseflag=!that.praiseflag;
						that.praisecount=parseInt(count)-1
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
		},
		addMyFavorite(userseq){//关注
				var that=this;
			if(localStorage.getItem('loginInfo')){
				this.$api('/Execute.do',{action:'addMyFavorite',favorite:userseq}).then(function(r){
					if(r.errorCode==0){
						that.favorite=!that.favorite;
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
		},
		removeMyFavorit(userseq){//取消关注
			var that=this;
			if(localStorage.getItem('loginInfo')){					
				this.$api('/Execute.do',{action:'removeMyFavorite',favorite:userseq}).then(function(r){
					console.log(JSON.stringify(r));
					if(r.errorCode==0){
						that.favorite=!that.favorite;
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
.fourpicture{
	background: #fff;
	padding:0 0.48rem;
	margin-bottom:0.3rem;
}
.fourpicture-avatar{
	padding-top:0.81rem;
	height:2.7rem;
}
.fourpicture-avatar-left{
	float: left;
	display: flex;
	display: -webkit-flex;
}
.fourpicture-avatar-left img{
	margin-right:0.51rem;
	width:1.42rem;
	height:1.42rem;
	border-radius: 50%;
}
.fourpicture-avatar-left p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	font-size:0.42rem;
	color:#222;
	font-weight: 500;
	justify-content: space-around;
}
.fourpicture-avatar-left p span{
	font-size:0.3rem;
	color:#666;
}
.fourpicture-avatar-right{
	float:right;
	padding-top:0.3rem;
}
.fourpicture-avatar-right p{
	padding:0.15rem 0.36rem;
	background: #ff481d;
	color:#fff;
	font-size:0.3rem;
	border-radius: 15px;
}
.fourpicture-content p{
	line-height:0.54rem;
	font-size:0.36rem;
	color:#333;
	margin:0;
	padding:0;
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.video-box{
	width:100%;
	margin-bottom:0.24rem;
	height:6.2rem;
	position: relative;
}
.video-box video{
	position: absolute;
	left:0;
	top:0;
}
.video-box .playbtn{
	position: absolute;
	left:50%;
	top:50%;
	margin-left:-0.8rem;
	margin-top:-0.8rem;
	width:1.6rem;
	height:1.6rem;
	display: block;
}
.video-box img{
	width:100%;
	height:6.2rem;
}
.fourpicture-title{
	height:1.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	padding-top:0.36rem;
}
.fourpicture-title p{
	font-size:0.3rem;
	color:#666;
	margin-left:0.6rem;
}
.fourpicture-title p i{
	vertical-align: middle;
	font-size:0.6rem;
	margin-right:0.12rem;
}
</style>