<template>
	<div class="fourpicture" id="fourpicture">
		<div class="fourpicture-avatar">
			<div class="fourpicture-avatar-left"><router-link tag="div" to="/homepage"><img :src="datalist.owner.headphoto?datalist.owner.headphoto:defaultImg"/></router-link><p><b>{{datalist.owner.nickname}}</b><span>{{formatDate(datalist.createtime)}}</span></p></div>
			<div class="fourpicture-avatar-right" v-show="!(userseq==datalist.userseq)"><p v-if="!datalist.owner.favorite">+关注</p><p v-else style='background: #fff;border:1px solid #ff481d;color:#ff481d;'>已关注</p></div>
		</div>
		<div class="fourpicture-content">
			<div class="fourpicture-box" v-if="datalist.images">
				<img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+datalist.images"/>
			</div>
			<p>{{datalist.content}}</p>
		</div>
		<div class="fourpicture-title">
			<p @click="praise(datalist.blogseq)"><i class="iconfont icon-xin" style="vertical-align: baseline;" v-if="!datalist.owner.favorite"></i> <svg class="icon" aria-hidden="true" v-else><use xlink:href="#icon-heart-copy"></use></svg><span>{{datalist.praisecount}}</span></p>
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
	export default{
		props:['data','index'],
		data(){
			return {
				defaultImg:require('../../assets/img/faxianimg/avatar.png') ,
				userseq:JSON.parse(localStorage.getItem('loginInfo')).userseq,
				datalist:this.data
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
			praise:function(blogseq){
				console.log(blogseq)
				console.log(this.datalist.praisecount);
				
//				console.log(data.praisecount);
//				console.log(this.praisecount);
//				this.$api('/Execute.do',{blogseq:blogseq,action:'blog.praiseBlog'}).then(function(r){
//					console.log(JSON.stringify(r));
//				})
			}
		}
	}
</script>

<style>
.fourpicture{
	background: #fff;
	padding:0 0.48rem;
	margin-bottom:0.3rem;
	position: relative;
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
	padding:0.18rem 0.36rem;
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
.fourpicture-box{
	width:100%;
	padding-bottom:0.24rem;
}
.fourpicture-box img{
	width:30%;
	display: block;
}
.fourpicture-title{
	height:1.5rem;
	line-height:1.3rem;
	text-align: right;
}
.fourpicture-title p{
	font-size:0.38rem;
	color:#666;
	margin-left:0.6rem;
	display: inline;
}
.fourpicture-title p:nth-child(3){
	font-size:1rem;
	vertical-align: bottom;
}
.fourpicture-title p .icon{	
	font-size:0.6rem;
	margin-right:0.12rem;
}
.fourpicture-title p .iconfont{
	vertical-align: middle;
	font-size:0.6rem;
	margin-right:0.12rem;
}
.popupmean-more{
	position: absolute;
	width:6rem;
	height:4.72rem;
	background: #fff;
	border-radius: 5px;
	z-index: 11;
	bottom:0;
	right:0.5rem;
}
.popupmean-more li{
	height:1.57rem;
	border-bottom:1px solid #dcdcdc;
	font-size:14px;
	color:#666;
	line-height:1.57rem;
	text-align: center;
}
.popupmean-more li:last-child{
	border-bottom:none;
}
</style>