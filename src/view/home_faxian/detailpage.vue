<template>
	<div class="detail">
		<div class="detail-head">
			<span @click="$router.go(-1)">返回</span>
			<span>详情</span>
			<span @click="share">分享</span>
		</div>
		<div class="detail-wrap">
			<div class="pic-detail">
				<div class="fourpicture-avatar clear">
					<div class="fourpicture-avatar-left"><img :src="data.owner.headphoto?data.owner.headphoto:defaultImg" width="46" height="46" style="border-radius: 50%;"/><p><b>{{data.owner.nickname}}</b><span>{{formatDate(data.createtime)}}</span></p></div>
					<!--<div class="fourpicture-avatar-right"><p v-if="data.attention" style='background: #fff;border:1px solid #ff481d;color:#ff481d;'>已关注</p><p v-else>+关注</p></div>-->
				</div>
				<div class="fourpicture-content">
					<div class="fourpicture-box" v-if="data.images">
						<img :src="data.images"/>
					</div>
					<p>{{data.content}}</p>
				</div>
				<router-link to="/praise" tag="div" class="pic-detail-zan">
					<div class="avatar-list">
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<img src="../../assets/img/faxianimg/avatar.png"/>
					</div>
					<div class="dianzan-renshu">
						<p>{{data.praisecount}}人觉得很赞</p><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</router-link>
			</div>
			<div class="detail-reply">
				<Reply-list></Reply-list>
			</div>
			<!--<div class="detail-noreply">
				<p>哎同学，这个沙发你不抢吗~</p>
			</div>-->
		</div>
		<div class="detail-foot">
			<input type="text" placeholder="发表评论..."/>
			<p><i class="iconfont icon-xin"></i><span>236</span></p>
			<p><i class="iconfont icon-pinglun1"></i><span>365</span></p>
		</div>
	</div>
</template>

<script>
import Reply from '@/components/faxian/replylist'
export default{
	data(){
		return {
			data:this.$route.params.datalist,
			defaultImg:require('../../assets/img/faxianimg/avatar.png') ,
		}
	},
	components:{'Reply-list':Reply},
	methods:{
		share:function(){
			this.$store.commit('changeshare');
			this.$store.commit('changepopupmean');
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
		}
	}
}
</script>

<style>
.detail{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.detail-head{
	width:100%;
	height:1.32rem;
	background: url(../../assets/img/faxianimg/headbg.png) center no-repeat;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
	font-size:0.42rem;
}
.detail-head span:nth-child(2){
	font-size:0.56rem;
}
.detail-wrap{
	flex:1;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction:column ;
}
.pic-detail{
	background: #fff;
	padding:0 0.48rem;
	border-bottom:1px solid #dcdcdc;
}
.detail-reply{
	flex: 1;
	background: #fff;
	overflow: auto;
}
.detail-noreply{
	flex:1;
	display: flex;
	display: -webkit-box;
	align-items: center;
	justify-content: center;
	font-size:0.36rem;
	color:#999;
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
.fourpicture-box{
	width:100%;
	padding-bottom:0.24rem;
}
.fourpicture-box img{
	width:100%;
	display: block;
}
.pic-detail-zan{
	padding-top:0.42rem;
	height:2rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.avatar-list{
	position: relative;
}
.avatar-list img{
	width:0.94rem;
	position: absolute;
	top:0.35rem;
}
.avatar-list img:nth-child(1){
	left:0;
}
.avatar-list img:nth-child(2){
	left:0.65rem;
}
.avatar-list img:nth-child(3){
	left:1.3rem;
}
.avatar-list img:nth-child(4){
	left:1.95rem;
}
.avatar-list img:nth-child(5){
	left:2.6rem;
}
.dianzan-renshu{
	font-size:0.36rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	align-items: center;
}
.detail-foot{
	width: 100%;
	height:1.62rem;
	background: #fff;
	padding:0.3rem 0.48rem;
	display:flex ;
	display: -webkit-flex;
	justify-content: space-between;
	font-size:0.42rem;
	align-items: center;
}
.detail-foot input{
	width:6.4rem;
	background:#eee;
	height:100%;
	padding-left:0.1rem;
	border-radius: 5px;
}
.detail-foot p{
	margin-left:0.8rem;
	color:#666;
}
.detail-foot p i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.3rem;
	vertical-align: bottom;
}
.clear:after {
    clear: both;
    content: " ";
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
.icon-arrow-right-copy-copy-copy{
	font-size:0.44rem;
}
</style>