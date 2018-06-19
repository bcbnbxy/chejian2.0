<template>
	<div class="fourpicture">
		<div class="fourpicture-avatar">
			<div class="fourpicture-avatar-left"><router-link tag="div" to="/homepage"><img :src="data.avatar"/></router-link><p><b>{{data.username}}</b><span>{{data.time}}</span></p></div>
			<div class="fourpicture-avatar-right"><p v-if="data.attention">+关注</p><p v-else style='background: #fff;border:1px solid #ff481d;color:#ff481d;'>已关注</p></div>
		</div>
		<div class="fourpicture-content">
			<div class="fourpicture-box" v-if="data.mainpic">
				<img :src="data.mainpic"/>
			</div>
			<p>{{data.content}}</p>
		</div>
		<div class="fourpicture-title">
			<p><i class="iconfont icon-xin"></i><span>236</span></p>
			<router-link to="/detailpage" tag="p"><i class="iconfont icon-pinglun"></i><span>365</span></router-link>
			<p><b style="font-size:30px;position: relative;top:-16px;" @click="more(index)">...</b></p>
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
		props:{
			data:{
				type: Object
			},
			index:{
				type:Number
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
	width:100%;
	display: block;
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