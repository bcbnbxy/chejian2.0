<template>
	<div class="footer-wrap">
		<footer class="footer">
			<router-link to="/homeindex" tag="div" exact><p class="bghome"></p><span>首页{{$router.path}}</span></router-link>
			<router-link to="/faxian" tag="div" exact><p class="bgfaxian"></p><span>发现</span></router-link>
			<router-link to="/friends" tag="div" exact><p class="bgcheyou"></p><span>车友</span></router-link>
			<router-link to="/personal" tag="div" exact><p class="bgmy"></p><span>我的</span></router-link>
		</footer>
	</div>
</template>
<script>
</script>

<style>
.footer-wrap{
	width:100%;
	height:100%;
}
.footer{
	position:absolute;
	left:0;
	bottom:0;
	width:100%;
	height:1.45rem;
	padding:0 0.48rem 0 0.48rem;
	background:#f8f8f8;
	border-top:1px solid #dcdcdc;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){ 
   .footer{
		position:absolute;
		left:0;
		bottom:0rem;
		width:100%;
		height:2.47rem;
		padding:0 0.48rem 0 0.48rem;
		padding-bottom:1.02rem;
		background:#f8f8f8;
		border-top:1px solid #dcdcdc;
	}
}
.footer div{
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
.footer div p{
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
.footer div span{
	font-size:0.36rem;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>