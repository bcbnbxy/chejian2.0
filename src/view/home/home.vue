<template>
	<div class="home-wrap">
		<div class="home-main">
			<keep-alive>
			<router-view></router-view>
			</keep-alive>
		</div>
		<footer class="footer">
			<router-link to="/homeindex" tag="div" ><p class="bghome"></p><span>首页</span></router-link>
			<router-link to="/home" tag="div"><p class="bgfaxian"></p><span>发现</span></router-link>
			<router-link to="/friends" tag="div"><p class="bgcheyou"></p><span>车友</span></router-link>
			<router-link to="/personal" tag="div"><p class="bgmy"></p><span>我的</span></router-link>
		</footer>
		<div v-show="$store.state.faxian.popupmean" class="popupmean" @touchmove.prevent @click.self="popupmeanhidden">
			<dl class="popupmean-report" v-show="$store.state.faxian.report" >
				<dt>请选择举报类型</dt>
				<dd>营销广告</dd>
				<dd>整治反动或敏感话题</dd>
				<dd>淫秽色情</dd>
				<dd>恶意谩骂攻击</dd>
				<dd>垃圾内容</dd>
			</dl>
			<div class="share" v-show="$store.state.faxian.share">
				<ul>
					<li><img src="../../assets/img/faxianimg/wechat.png"><span>微信</span></li>
					<li><img src="../../assets/img/faxianimg/Friendcircle.png"><span>朋友圈</span></li>
					<li><img src="../../assets/img/faxianimg/weibo.png"><span>微博</span></li>
					<li><img src="../../assets/img/faxianimg/QQ.png"><span>QQ</span></li>
					<li><img src="../../assets/img/faxianimg/copy.png"><span>复制链接</span></li>
				</ul>
				<p @click="popupmeanhidden">取消</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	methods:{
		popupmeanhidden:function(e){
			if(this.$store.state.faxian.popupmean_more !== -1){
				this.$store.commit('changepopupmean_more',-1);
			};
			if(this.$store.state.faxian.report){
				this.$store.commit('changereport');
			};
			if(this.$store.state.faxian.pic_text_video){
				this.$store.commit('changepictextvideo');
			};
			if(this.$store.state.faxian.share){
				this.$store.commit('changeshare');
			};
			this.$store.commit('changepopupmean');						
		}
	}
}
</script>
<style>
.home-wrap{
	width:100%;
	height:100%;
	position: relative;
	background: #f4f4f4;
	overflow: hidden;
	padding-bottom:1.45rem;
}
.home-main{
	height:100%;
	width:100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar{
	display: none;
}
.footer{
	position:absolute;
	left:0;
	bottom:0;
	width:100%;
	height:1.45rem;
	background: #fff;
	padding:0 0.48rem 0 0.48rem;
	background:#f8f8f8;
	border-top:1px solid #dcdcdc;
}
.footer>div{
	float: left;
	width:25%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding:0.1rem 0;
	line-height:1;
	border-top:1px solid #dcdcdc;
	position: relative;
	top:-1px;
	border-top: 1px solid #dcdcdc;
}
.footer>div>p{
	width:0.7rem;
	height:0.7rem;
	background-size:0.7rem 0.7rem;
}
@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
	.bghome{	
		background-image: url(../../assets/img/shouye/home@3x.png);
	}
	.bgfaxian{
		background-image: url(../../assets/img/shouye/faxian@3x.png);
	}
	.bgcheyou{
		background-image: url(../../assets/img/shouye/cheyou@3x.png);
	}
	.bgmy{
		background-image: url(../../assets/img/shouye/my@3x.png);
	}
	.v-link-active .bghome{
		background-image: url(../../assets/img/shouye/homeactive@3x.png);
	}
	.v-link-active .bgfaxian{
		background-image: url(../../assets/img/shouye/faxianactive@3x.png);
	}
	.v-link-active .bgcheyou{
		background-image: url(../../assets/img/shouye/cheyouactive@3x.png);
	}
	.v-link-active .bgmy{
		background-image: url(../../assets/img/shouye/myactive@3x.png);
	}
}
.bghome{	
	background-image: url(../../assets/img/shouye/home@2x.png);
}
.bgfaxian{
	background-image: url(../../assets/img/shouye/faxian@2x.png);
}
.bgcheyou{
	background-image: url(../../assets/img/shouye/cheyou@2x.png);
}
.bgmy{
	background-image: url(../../assets/img/shouye/my@2x.png);
}
.v-link-active .bghome{
	background-image: url(../../assets/img/shouye/homeactive@2x.png);
}
.v-link-active .bgfaxian{
	background-image: url(../../assets/img/shouye/faxianactive@2x.png);
}
.v-link-active .bgcheyou{
	background-image: url(../../assets/img/shouye/cheyouactive@2x.png);
}
.v-link-active .bgmy{
	background-image: url(../../assets/img/shouye/myactive@2x.png);
}
.footer>div>span{
	font-size:0.36rem;
}
.popupmean{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.3);
	position: fixed;
	top:0;
	left:0;
	z-index: 10;
}
.popupmean-report{
	width:100%;
	position: absolute;
	bottom:0;
	background:#fff ;
}
.popupmean-report dt,.popupmean-report dd{
	height:1.46rem;
	line-height:1.46rem;
	border-bottom:1px solid #dcdcdc;
	font-size:0.46rem;
	color:#1161ff;
	text-align: center;
}
.popupmean-report dd:last-child{
	border-bottom:none;
	font-size:0.42rem;
}
.popupmean-report dd{
		color:#666;
}
.share{
	width:100%;
	position: absolute;
	bottom:0;
	background:#f7f7f7;
	z-index: 101;
	padding-bottom:2rem;
}
.share ul{
	width:100%;
	padding:0 0.7rem;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
}
.share ul li{
	width:2rem;
	padding:0.6rem 0 0.22rem 0;
	margin-right:1rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height:3.6rem;
}
.share ul li img{
	display: block;
	width:2rem;
}
.share ul li span{
	font-size:0.38rem;
	color:#666;
}
.share ul li:nth-child(4n){
	margin-right:0;
}
.share p{
	position: absolute;
	bottom:0;
	width:100%;
	text-align: center;
	height:1.56rem;
	line-height:1.56rem;
	background: #fff;
	font-size:0.44rem;
	color:#666;
}
</style>