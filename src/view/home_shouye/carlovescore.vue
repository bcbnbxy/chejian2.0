<template>
<div class="carlovescore-wrap">
	<div class="carlovescore-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>爱车评分</span>
		<i class="iconfont icon-zhuzhuangtu"></i>
	</div>
	<div class="carlovescore-wrap-contaire">
		<div class="swipe-wrapper">
			<mt-swipe :auto="0" :show-indicators="false" ref="swipeWrapper">
			    <mt-swipe-item v-for="item in list" :key="item.name">
			    	<div class="swipe-wrapper-title">
			    		<img :src="item.imgsrc"/>
			    		<p><span>{{item.name}}</span><span>当前排名:{{item.paiming}}</span></p>
			    	</div>
			    	<div class="swipe-wrapper-paiming">
			    		<span>综合得分</span>
			    		<b>{{item.pingfen}}</b>
			    	</div>
			    </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="button-wrapper">
	        <button class="prev-button" @click="prev"><i class="iconfont icon-fanhui"></i></button>
	        <button class="next-button" @click="next"><i class="iconfont icon-fanhui"></i></button>
	    </div>
	</div>
	<div class="carlovescore-wrap-footer">
		<div class="carlovescore-wrap-footer-contarie">
			<ul class="carlovescore-wrap-footer-contarie-left">
				<router-link tag="li" to="/powersystem">
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianyuan"></use></svg>
    				<p><b>3654</b><span>电源系统</span></p>
				</router-link>
				<li>
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-lengque"></use></svg>
    				<p><b>2365</b><span>冷却系统</span></p>
				</li>
				<li>
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-jinqi"></use></svg>
    				<p><b>1338</b><span>进气系统</span></p>
				</li>
			</ul>
			<ul class="carlovescore-wrap-footer-contarie-left">
				<router-link tag="li" to="/idlingsystem">
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-daisu"></use></svg>
    				<p><b>2389</b><span>怠速系统</span></p>
				</router-link>
				<li>
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-paifang"></use></svg>
    				<p><b>1658</b><span>排放系统</span></p>
				</li>
				<li>
					<svg class="icon" aria-hidden="true"><use xlink:href="#icon-haoyou"></use></svg>
    				<p><b>3689</b><span>平均油耗</span></p>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data(){
		return{
			list:[{
				imgsrc:require ('../../assets/img/faxianimg/masha.png'),
				name:'玛莎拉蒂',
				pingfen:'12345',
				paiming:2
			},{
				imgsrc:require ('../../assets/img/faxianimg/lanbo.png'),
				name:'兰博基尼',
				pingfen:'456123',
				paiming:5
			},{
				imgsrc:require ('../../assets/img/faxianimg/masha.png'),
				name:'保时捷911',
				pingfen:'66666',
				paiming:3
			},{
				imgsrc:require ('../../assets/img/faxianimg/lanbo.png'),
				name:'奔驰梅德赛斯',
				pingfen:'99999',
				paiming:1
			}]
		}
	},
	methods:{
		prev: function () {
            this.$refs.swipeWrapper.prev();
        },
        next: function () {
            this.$refs.swipeWrapper.next();
        }
	}
}
</script>
<style scoped>
.carlovescore-wrap{
	width:100%;
	height:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.carlovescore-wrap-head{
	height:1.32rem;
	line-height:1.32rem;
	text-align: center;
	padding:0 0.5rem;
	font-size:0.56rem;
	color:#fff;
	position: relative;
	background-image: url(../../../dist/static/img/headbg.32103ac.png);
	background-size:cover ;
}
.carlovescore-wrap-head .icon-fanhui{
	font-size:0.6rem;
	position:absolute;
	left:0.5rem;
}
.carlovescore-wrap-head .icon-zhuzhuangtu{
	font-size:0.6rem;
	position:absolute;
	right:0.5rem;
}
.carlovescore-wrap-contaire{
	flex:1;
	position: relative;
}
.button-wrapper{
	width:100%;
	height:1.16rem;
	position: absolute;
	left:0;
	top:50%;
	margin-top:-0.58rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;	
	align-items: center;
	color:#8cc4fa;
	padding:0 0.5rem;
	line-height: 1;
}
.button-wrapper>button{
	background: none;
}
.button-wrapper .iconfont{
	font-size:1rem;
}
.next-button .iconfont:before{
	display: inline-block;
	transform: rotate(180deg);
}
.swipe-wrapper{
    width: 100%;
    height: 100%;
}
.swipe-wrapper-title{
	width:100%;
	height:2.2rem;
	padding:0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	line-height:1;
}
.swipe-wrapper-title>img{
	width:1.6rem;
	height:1.6rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.swipe-wrapper-title p{
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-around;
	font-size:0.38rem;
	color:#222;
}
.swipe-wrapper-paiming{
	width:7.6rem;
	height:7.08rem;
	background-image:url(../../assets/img/shouye/duobianxing.png) ;
	background-size:cover;
	background-repeat: no-repeat;
	margin:0 auto;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size:0.52rem;
	color:#222;	
	line-height: 1;
	margin-top:0.3rem;
}
.swipe-wrapper-paiming b{
	font-size:0.9rem;
	color:#1989f5;
	margin-top:0.4rem;
}
.carlovescore-wrap-footer{
	padding:0.5rem;
}
.carlovescore-wrap-footer-contarie{
	width:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0.8rem 0;
	background: #fff;
	box-shadow: 2px 2px 20px 8px rgba(114,183,250,.01),2px -2px 20px 8px rgba(114,183,250,.01),-2px 2px 20px 8px rgba(114,183,250,.01),-2px -2px 20px 8px rgba(114,183,250,.01);
}
.carlovescore-wrap-footer-contarie-left{
	flex:1;
	border-right:1px solid #ddd;
}
.carlovescore-wrap-footer-contarie-left:last-child{
	border-right:0;
}
.carlovescore-wrap-footer-contarie-left li{
	display: flex;
	display: -webkit-flex;
	align-items: center;
	height:1.6rem;
	padding:0.22rem 0;
	padding-left:1.25rem;
	margin-bottom:0.6rem;
}
.carlovescore-wrap-footer-contarie-left li:last-child{
	margin-bottom:0;
}
.carlovescore-wrap-footer-contarie-left li svg{
	font-size:1rem;
	margin-right:0.5rem;
}
.carlovescore-wrap-footer-contarie-left li p{
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	line-height: 1;
}
.carlovescore-wrap-footer-contarie-left li p b{
	font-size:0.38rem;
	color:#222;
}
.carlovescore-wrap-footer-contarie-left li p span{
	font-size:0.34rem;
	color:#666;
}
</style>