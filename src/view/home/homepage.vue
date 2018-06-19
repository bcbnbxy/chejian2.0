<template>
	<div class="homepage-wrap">
		<div class="homepage-head">
			<span @click="$router.go(-1)">返回</span>
			<span>主页</span>
			<span>私信</span>
		</div>
		<div class="homepage-container">
			<div class="homepage-container-top">
				<img src='../../assets/img/faxianimg/avatar.png'/>
				<div>
					<span>婉婉</span>
					<p>这个人很懒，什么都没有留下</p>
					<router-link tag="p" to="/fensi"><span style="margin-right:0.6rem;">关注:120</span><span>粉丝:530</span></router-link>
				</div>
				<p><span>+关注</span><span>已关注</span></p>
			</div>
			<div class="homepage-container-center">
				<span v-for='(list,index) in lists' @click="toggle(index ,list.view)" :class="{active:active===index}">{{list.type}}</span>
				<b></b>
			</div>
			<div class="homepage-container-bottom">
				<!--<component :is="currentView" ></component>-->
				<div class="picture">
					<picture></picture>
				</div>
				<div class="video">
					<video></video>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import picture from '@/components/faxian/fourpicture'
import video from '@/components/faxian/faxianvideo'
export default{
	data () {
		return {
			currentView:'picture',
			active: 0,
			index:0,
			lists:[
				{
					type:"动态",
					view:'picture'
				},
				{
					type:"视频",
					view:'video'
				}
			]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	   }
	}
}
</script>

<style>
.homepage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homepage-head{
	height:1.32rem;
	padding:0 0.5rem;
	background: url(../../assets/img/faxianimg/headbg.png) center repeat;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
	font-size:0.44rem;
}
.homepage-head span:nth-child(2){
	font-size:0.56rem;
}
.homepage-container{
	flex:1;
	background: #f7f7f7;
}
.homepage-container-top{
	height:3.04rem;
	width:100%;
	background:#0f7afc;
	padding:0.5rem 0.5rem 0.64rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.homepage-container-top>img{
	width:1.8rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.homepage-container-top>div{
	flex: 1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	color:#fff;
}
.homepage-container-top>div>span{
	font-size:0.5rem;
}
.homepage-container-top>div>p{
	font-size:0.36rem;
}
.homepage-container-top>p span{
	padding:0.22rem 0.44rem;
	border-radius: 0.45rem;
	font-size:0.36rem;	
}
.homepage-container-top>p span:nth-child(1){
	background:#ff481d;
	color:#fff;
}
.homepage-container-top>p span:nth-child(2){
	border:1px solid #ff481d;
	color:#ff481d;
	display: none;
}
.homepage-container-center{
	height:1.58rem;
	background:url(../../assets/img/faxianimg/headbg.png) center repeat;
	color:#fff;
	font-size:0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	position: relative;
}
.homepage-container-center span{
	padding:0 0.52rem;
	height:1.58rem;
	line-height:1.58rem;
	text-align: center;
	position: relative;
}
.homepage-container-center b{
	content:'';
	height:1rem;
	width:1px;
	background:#fff;
	display: block;
	position: absolute;
	right:50%;
	top:0.29rem;
}
.homepage-container-center .active{
	border-bottom:1px solid #fff;
}
</style>