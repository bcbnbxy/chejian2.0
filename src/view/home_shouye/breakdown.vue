<template>
<div class="breakdown-wrap">
	<div class="breakdown-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>故障</span>
	</div>
	<div class="breakdown-wrap-contaire">
		<div class="breakdown-wrap-contaire-title">
			<div class="breakdown-wrap-contaire-title-left" @click="yijitab(1)">
				<img :src="yijiindex==1?require ('../../assets/img/shouye/shezhiactive.png'):require ('../../assets/img/shouye/shezhi.png')"/>
				<span :class="yijiindex==1?'coloractive':''">故障</span>
			</div>
			<div class="breakdown-wrap-contaire-title-center"></div>
			<div class="breakdown-wrap-contaire-title-right" @click="yijitab(2)">
				<img :src="yijiindex==2?require ('../../assets/img/shouye/jinggaoactive.png'):require ('../../assets/img/shouye/jinggao.png')"/>
				<span :class="yijiindex==2?'coloractive':''">警告</span>
			</div>
		</div>
		<div class="breakdown-wrap-contaire-main">
			<dl v-show="yijiindex==1">
				<dt><i></i><span>故障码</span><b>原因</b></dt>
				<dd><span>故障码</span><p><span>汽车电路故障</span><span><b>7/3</b><i>10:30</i></span></p></dd>
				<dd><span>故障码</span><p><span>汽车电路故障</span><span><b>7/3</b><i>10:30</i></span></p></dd>
				<dd><span>故障码</span><p><span>汽车电路故障</span><span><b>7/3</b><i>10:30</i></span></p></dd>
				<dd><span>故障码</span><p><span>汽车电路故障</span><span><b>7/3</b><i>10:30</i></span></p></dd>
				<dd><span>故障码</span><p><span>汽车电路故障</span><span><b>7/3</b><i>10:30</i></span></p></dd>
			</dl>
			<div class="breakdown-wrap-jinggao" v-show="yijiindex==2">
				<div class="breakdown-wrap-jinggao-title">
					<div class="breakdown-wrap-jinggao-title-left" @click="erjitab(1)" :class="erjiindex==1?'coloractive':''">警告</div>
					<div class="breakdown-wrap-jinggao-title-center"></div>
					<div class="breakdown-wrap-jinggao-title-right" @click="erjitab(2)" :class="erjiindex==2?'coloractive':''">保养</div>
				</div>
				<div class="breakdown-wrap-jinggao-contaire">
					<ul class="breakdown-wrap-jinggao-contaire-jinggao" v-show="erjiindex==1">
						<li><span>碰撞</span><p><span>7/3</span><b>10:30</b></p></li>
						<li><span>震动</span><p><span>7/3</span><b>10:30</b></p></li>
						<li><span>超速</span><p><span>7/3</span><b>10:30</b></p></li>
						<li><span>电压过低</span><p><span>7/3</span><b>10:30</b></p></li>
						<li><span>车辆熄火</span><p><span>7/3</span><b>10:30</b></p></li>
						<li><span>车辆启动</span><p><span>7/3</span><b>10:30</b></p></li>
					</ul>
					<ul class="breakdown-wrap-jinggao-contaire-baoyang" v-show="erjiindex==2">
						<li><span>更换机油滤清器</span><span>2018/7/3</span></li>
						<li><span>更换刹车盘</span><span>2018/7/3</span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			erjiindex:1,
			yijiindex:this.$route.params.index,
		}
	},
	methods:{
		erjitab:function(index){
			this.erjiindex=index;
		},
		yijitab:function(index){
			this.yijiindex=index;
		}
	}
}
</script>

<style scoped>
.breakdown-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
}
.breakdown-wrap-head{
	width:1005;
	height:1.32rem;
	background-image:url(../../../dist/static/img/headbg.32103ac.png);
	background-size:cover;
	text-align: center;
	line-height:1.32rem;
	color:#fff;
	font-size:0.56rem;
	padding:0 0.5rem;
}
.breakdown-wrap-head .icon-fanhui{
	float:left;
	font-size:0.6rem;
}
.breakdown-wrap-contaire{
	width:100%;
	height:auto;
}
.breakdown-wrap-contaire-title{
	height:2.58rem;
	width:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.breakdown-wrap-contaire-title-center{
	width:1px;
	height:1.2rem;
	background: #ddd;
}
.breakdown-wrap-contaire-title-left,.breakdown-wrap-contaire-title-right{
	flex:1;
	height:100%;
	padding:0.5rem 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around
}
.breakdown-wrap-contaire-title-left img,.breakdown-wrap-contaire-title-right img{
	width:0.98rem;
	height:0.9rem;
}
.breakdown-wrap-contaire-title-left span,.breakdown-wrap-contaire-title-right span{
	font-size:0.38rem;
	color:#999;
}
.breakdown-wrap-contaire-main{
	margin-top:0.3rem;
}
.breakdown-wrap-contaire-main dl{
	background: #fff;
}
.breakdown-wrap-contaire-main dl dt{
	width:100%;
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	padding:0 0.5rem;
}
.breakdown-wrap-contaire-main dl dt i{
	width:0.12rem;
	height:0.6rem;
	background: #1989f5;
	margin-right:0.32rem;
}
.breakdown-wrap-contaire-main dl dt span{
	font-size:0.44rem;
	color:#222;
}
.breakdown-wrap-contaire-main dl dt b{
	flex: 1;
	text-align: right;
	font-size:0.44rem;
	font-weight: 400;
}
.breakdown-wrap-contaire-main dl dd{
	width:100%;
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
	justify-content: space-between;
}
.breakdown-wrap-contaire-main dl dd>span{
	font-size:0.44rem;
	color:#222;
}
.breakdown-wrap-contaire-main dl dd>p{
	height:100%;
	padding:0.3rem 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
}
.breakdown-wrap-contaire-main dl dd>p span:nth-child(1){
	font-size:0.38rem;
	color:#222;
}
.breakdown-wrap-contaire-main dl dd>p span:nth-child(2){
	font-size:0.34rem;
	color:#222;
	text-align: right;
}
.breakdown-wrap-contaire-main dl dd>p span:nth-child(2) b{
	font-weight: 400;
	margin-right:0.3rem;
}
.breakdown-wrap-contaire-main dl dd>p span:nth-child(2) i{
	font-style:normal;
}
.breakdown-wrap-jinggao{
	background: #fff;
}
.breakdown-wrap-jinggao-title{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.4rem;
	border-bottom:1px solid #ddd;
	color:#999;
}
.breakdown-wrap-jinggao-title-center{
	height:0.9rem;
	width:1px;
	background: #ddd;
}
.breakdown-wrap-jinggao-title-left,.breakdown-wrap-jinggao-title-right{
	flex:1;
	text-align: center;
}
.breakdown-wrap-jinggao-contaire-jinggao li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.4rem;
	color:#222;
	justify-content: space-between;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.breakdown-wrap-jinggao-contaire-jinggao li p b{
	margin-left:0.3rem;
	font-weight: 400;
}
.breakdown-wrap-jinggao-contaire-baoyang li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.4rem;
	color:#222;
	justify-content: space-between;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.coloractive{
	color:#1989F5 !important;
}
</style>