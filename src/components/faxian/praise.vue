<template>
	<div class="praise-wrap">
		<div class="praise-head">
			<span @click="praisehidden">返回</span>
			<span>他们也点赞了</span>
			<span></span>
		</div>
		<div class="praise-list">
			<ul>
				<li v-for="(item,index) in praisers"><img :src="item.user.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.user.headphoto:require ('../../assets/img/faxianimg/avatar.png')"/><span>{{item.user.nickname}}</span><p v-show="!(userseq==item.userseq)"><span v-if="item.user.favorite" class="yiguanzhu">已关注</span><span v-else class="jiaguanzhu" @click="addMyFavorite()">+关注</span></p></li>
			</ul>
		</div>
	</div>
</template>
<script>
import User from '@/components/search/user'
export default {
	props:{
		praisers:{
			type:Array,
			default(){
				return {}
			}
		}
	},
	components:{User},
	data(){
		return{
			userseq:localStorage.getItem('loginInfo')==null?'':JSON.parse(localStorage.getItem('loginInfo')).userseq,
		}
	},
	methods:{
		praisehidden(){
			this.$emit('praiseshow')
		}
	}
}
</script>

<style>
	.praise-wrap{
		background:#f7f7f7;
		width:100%;
		height:100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	.praise-head{
		width: 100%;
		height:1.32rem;
		background: url(../../assets/img/faxianimg/headbg.png) center no-repeat;
		padding:0.21rem 0.5rem;
		font-size:0.42rem;
		color:#fff;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
	}
.praise-head span:nth-child(2){
	font-size:0.56rem;
}
.praise-list{
	flex:1;
	overflow:auto;
}
.praise-list>ul{
	width:100%;
	background: #fff;
	padding:0 0.5rem;
}
.praise-list>ul li{
	height:1.6rem;
	border-bottom:1px solid #dcdcdc;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 0.1rem;
}
.praise-list>ul li:last-child{
	border-bottom:none;
}
.praise-list>ul li img{
	width:1rem;
	height:1rem;
	margin-right:0.52rem;
}
.praise-list>ul li>span{
	font-size:0.48rem;
	color:#666;
	flex:1;
}
.praise-list>ul li>p{
	font-size:0.34rem;
}
.praise-list>ul li>p .yiguanzhu{
	padding:0.15rem 0.33rem;
	border:1px solid #ff481d;
	color:#ff481d;
	border-radius: 15px;
	display: block;
}
.praise-list>ul li>p .jiaguanzhu{
	padding:0.2rem 0.46rem;
	display: block;
	background:#ff481d ;
	color:#fff;
	border-radius: 15px;
}
</style>