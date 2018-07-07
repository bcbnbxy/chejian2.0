<template>
<div class="friendslist-wrap">
	<div class="friendslist-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>好友排行榜</span>
		<router-link tag="span" to="/rankings">总排行</router-link>
	</div>
	<div class="friendslist-wrap-contaire">
		<div class="friendslist-wrap-contaire-nav">
			<p @click="toggle(1)"><span :style="1==index?'color:#3a9dff;border-bottom:1px solid #3a9dff;':''">日</span></p>
			<b></b>
			<p @click="toggle(2)"><span :style="2==index?'color:#3a9dff;border-bottom:1px solid #3a9dff;':''">周</span></p>
			<b></b>
			<p @click="toggle(3)"><span :style="3==index?'color:#3a9dff;border-bottom:1px solid #3a9dff;':''">月</span></p>
		</div>
		<div class="friendslist-wrap-contaire-main">
			<div class="friendslist-wrap-contaire-main-title" v-show="1==index">
				<h3 @click="datapicker"><span>{{formatDate(data)}}</span><i class="iconfont icon-jiantou-copy-copy"></i></h3>
				<mt-datetime-picker ref="picker" type="date" v-model="data"   :startDate="new Date('2008-01')" :visible-item-count="3" :endDate="new Date()"></mt-datetime-picker> 
			</div>
			<div class="friendslist-wrap-contaire-main-title friendslist-wrap-contaire-main-title1" v-show="2==index">
				<h3 @click="weekpicker"><span>{{pcikerweek}}</span><i class="iconfont icon-jiantou-copy-copy"></i></h3>
				<mt-popup v-model="popupVisible" position="bottom" style="width:100%;"> 
					<ul>
						<li @click="pickweek(1)">本周</li>
						<li @click="pickweek(2)">上周</li>
					</ul>
				</mt-popup>
			</div>
			<div class="friendslist-wrap-contaire-main-title friendslist-wrap-contaire-main-title1" v-show="3==index">
				<h3 @click="monthpicker"><span>{{pcikermotn}}</span><i class="iconfont icon-jiantou-copy-copy"></i></h3>
				<mt-popup v-model="popupmonth" position="bottom" style="width:100%;"> 
					<ul>
						<li @click="pickmonth(1)">本月</li>
						<li @click="pickmonth(2)">上月</li>
					</ul>
				</mt-popup>
			</div>
			<div class="friendslist-wrap-contaire-main-paiming">
				<router-link tag="p" to="/personaldata"><img src="../../assets/img/faxianimg/avatar.png"/><span>懒先生</span></router-link>
				<router-link tag="p" to="/personaldata"><img src="../../assets/img/faxianimg/avatar.png"/><span>宋先生</span></router-link>
				<router-link tag="p" to="/personaldata"><img src="../../assets/img/faxianimg/avatar.png"/><span>婉婉宋</span></router-link>
			</div>
		</div>
	</div>
	<div class="friendslist-wrap-footer">
		<ul>
			<router-link tag="li" :to="{name:'listrankings',params:{name:'安全系数'}}"><p><img src="../../assets/img/shouye/anquan.png"/><span>安全系数</span></p><p><img src="../../assets/img/shouye/guanjun.png"/><span>第一名</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></router-link>
			<li><p><img src="../../assets/img/shouye/youhao.png"/><span>汽车油耗</span></p><p><span>第四名</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
			<li><p><img src="../../assets/img/shouye/licheng.png"/><span>行驶里程</span></p><p><span>第九名</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
		</ul>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			index:1,
			popupVisible:false,
			popupmonth:false,
			data:new Date('2010/07/06'),
			pcikerweek:'本周',
			pcikermotn:'本月'
		}
	},
	methods:{
		toggle(index){
			this.index=index;
		},
		datapicker(){
			this.$refs.picker.open();
		},
		weekpicker(){
			this.popupVisible=!this.popupVisible;
		},
		pickweek(value){
			this.popupVisible=!this.popupVisible;
			if(value==1){
				this.pcikerweek="本周";
			}else{
				this.pcikerweek="上周";
			}
		},
		monthpicker(){
			this.popupmonth=!this.popupmonth;
		},
		pickmonth(value){
			this.popupmonth=!this.popupmonth;
			if(value==1){
				this.pcikermotn="本月";
			}else{
				this.pcikermotn="上月";
			}
		},
	    formatDate(date) {
		    const y = date.getFullYear()
		    let m = date.getMonth() + 1
		    m = m < 10 ? '0' + m : m
		    let d = date.getDate()
		    d = d < 10 ? ('0' + d) : d
		    return y + '- ' + m + ' -' + d
		},
	}
}
</script>

<style scoped>
.friendslist-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.friendslist-wrap-head{
	width:100%;
	height:1.32rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image: url(../../../dist/static/img/headbg.32103ac.png);
	background-size: cover;
	position: relative;
}
.friendslist-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;	
}
.friendslist-wrap-head span:last-child{
	position: absolute;
	right:0.5rem;
	font-size:0.44rem;
}
.friendslist-wrap-contaire{
	height:auto;
	background: #fff;
	margin-bottom:0.3rem;
}
.friendslist-wrap-contaire-nav{
	height:1.6rem;
	width:100%;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.friendslist-wrap-contaire-nav>b{
	display: block;
	width:1px;
	height:0.7rem;
	background: #ddd;
}
.friendslist-wrap-contaire-nav>p{
	flex:1;
	text-align: center;
	height:1.6rem;
	font-size:0.44rem;
	color:#222;
}
.friendslist-wrap-contaire-nav>p>span{
	display: inline-block;
	padding:0 0.9rem;
	height:1.6rem;
	line-height: 1.6rem;
}
.friendslist-wrap-contaire-main{
	height:12rem;
	position: relative;
}
.friendslist-wrap-contaire-main-title>h3{
	font-weight: 400;
	height:1.53rem;
	line-height:1.53rem;
	font-size:0.44rem;
	color:#222;
	text-align: center;
}
.friendslist-wrap-contaire-main-title>h3 .icon-jiantou-copy-copy:before{
	font-size:0.56rem;
	display: inline-block;
	vertical-align: bottom;
	margin-left:0.3rem;
	color:#a0a0a0;
}
.friendslist-wrap-contaire-main-paiming{
	width:4.83rem;
	height:6.73rem;
	background-image: url(../../assets/img/shouye/lingjiangtai.png);
	background-size: cover;
	background-repeat:no-repeat;
	position: absolute;
	top:3.35rem;
	left:3.63rem;
}
.friendslist-wrap-contaire-main-paiming>p{
	display: flex;
	display: inline-block;
	font-size:0.38rem;
	color:#222;
	width:auto;
	position: absolute;
}
.friendslist-wrap-contaire-main-paiming>p img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	display: block;
	margin:0 auto;
}
.friendslist-wrap-contaire-main-paiming>p span{
	display: block;
	margin-top:0.15rem;
}
.friendslist-wrap-contaire-main-paiming>p:nth-child(1){
	left:1.9rem;
	top:-1.8rem;
}
.friendslist-wrap-contaire-main-paiming>p:nth-child(2){
	left:-1.45rem;
	top:2.58rem;
}
.friendslist-wrap-contaire-main-paiming>p:nth-child(3){
	right:-1.32rem;
	top:1.2rem;
}
.friendslist-wrap-footer>ul{
	background: #fff;
}
.friendslist-wrap-footer>ul li{
	height:1.6rem;
	width:100%;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.friendslist-wrap-footer>ul li p:nth-child(1),.friendslist-wrap-footer>ul li p:nth-child(2){
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.friendslist-wrap-footer>ul li p:nth-child(1) img{
	height:0.62rem;
	margin-right:0.55rem;
}
.friendslist-wrap-footer>ul li p:nth-child(1) span{
	font-size:0.38rem;
	color:#222;
}
.friendslist-wrap-footer>ul li p:nth-child(2) img{
	width:0.63rem;
}
.friendslist-wrap-footer>ul li p:nth-child(2) span{
	font-size:0.38rem;
	color:#666;
	margin:0 0.3rem;
}
.friendslist-wrap-footer>ul li p:nth-child(2) i{
	font-size:0.6rem;
	color:#999;
}
.friendslist-wrap-contaire-main-title1 ul li{
	width:100%;
	height:1.6rem;
	line-height:1.6rem;
	font-size:0.44rem;
	text-align: center;
	color:#666;
	border-bottom:1px solid #ddd;
}
</style>