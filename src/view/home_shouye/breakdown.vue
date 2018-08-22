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
			<div v-show="yijiindex==1" class="breakdown-wrap-contaire-main-guzhang">
				<div class="breakdown-wrap-contaire-main-guzhang-title"><i></i><span>故障码</span><b>时间</b></div>
				<div style="flex:1;overflow-y: scroll;-webkit-overflow-scrolling: touch;">
					<mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" :auto-fill="false" ref="loadmore1" bottom-pull-text="上拉加载">
			     		<div class="breakdown-wrap-contaire-main-guzhang-item" v-for="(item,index) in faultCodes"><span>{{item.faultcode}}</span><span>{{item.descript}}</span><span>{{item.happentime | getdate}}&nbsp;&nbsp;{{item.happentime | gettime}}</span></div>
			    	</mt-loadmore>
				</div>				
			</div>
			<div class="breakdown-wrap-jinggao" v-show="yijiindex==2">
				<ul class="breakdown-wrap-jinggao-contaire-jinggao" >
					<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
			     		<li v-for="(item,index) in warns"><span>{{item.warntype | getwarnsInfo}}</span><p><span>{{item.happentime | getdate}}</span><b>{{item.happentime | gettime}}</b></p></li>
			    	</mt-loadmore>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			yijiindex:this.$route.params.index,
			pagesize:12,
			psize:10,
			pagenum:0,
			pnum:0,
			warns:[],
			faultCodes:[],
			allLoaded:false,
			allLoaded1:false,
		}
	},
	methods:{
		yijitab:function(index){
			this.yijiindex=index;
			if(this.yijiindex==1){
				this.faultCodes=[];
				this.getfaultCodes(0,this.psize);			
			}else if(this.yijiindex==2){
				this.warns=[];
	       		this.getwarns(0,this.pagesize);
			}
		},
		getwarns(minvalue,pageSize){//获取警告信息列表
			var that=this;
			this.$api('/Execute.do',{action:'device.warns',device:this.$route.params.devicenum,minvalue:minvalue, pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					that.warns=that.warns.concat(r.data.warns);
					if(r.data.warns.length<3){
						that.allLoaded=true;
						return;
					}else{
						that.allLoaded=false;
					}
					that.pagenum=r.data.warns[r.data.warns.length-1].warnseq;
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		loadTop(){//组件提供的下拉触发方法
			 //下拉刷新
			this.warns=[];
	        this.getwarns(0,this.pagesize);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom(){//组件提供的上拉加载触发方法
	    	this.getwarns(this.pagenum,this.pagesize);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	   },
	   getfaultCodes(minvalue,pageSize){//获取故障信息列表
	   		var that=this;
	   		this.$api('/Execute.do',{action:'device.faultCodes',minvalue:minvalue,pageSize:pageSize,device:this.$route.params.devicenum,vin:this.$route.params.vin}).then(function(r){
	   			if(r.errorCode==0){
					that.faultCodes=that.faultCodes.concat(r.data.faultCodes);
					if(r.data.faultCodes.length<10){
						that.allLoaded1=true;
						return;
					}else{
						that.allLoaded1=false;
					}
					that.pnum=r.data.faultCodes[r.data.faultCodes.length-1].faultseq;
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
	   		})
	   },
	   loadTop1(){//组件提供的下拉触发方法
			 //下拉刷新
			this.faultCodes=[];
	        this.getfaultCodes(0,this.psize);
	        this.$refs.loadmore1.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom1(){//组件提供的上拉加载触发方法
	    	this.getfaultCodes(this.pnum,this.psize);
	    	this.$refs.loadmore1.onBottomLoaded();	    	
	   },
	},
	filters:{
		getdate:function(seconds){			
			var myDate = new Date(parseInt(seconds));
			var month=myDate.getMonth()+1;
			var day=myDate.getDate();
			return month+'/'+day;
		},
		gettime:function(seconds){
			var myDate = new Date(parseInt(seconds));
			var hours=myDate.getHours()
			if(hours<10){
				hours='0'+hours;
			}
			var minutes=myDate.getMinutes();
			if(minutes=='0'){
				minutes='00'
			}
			return hours+':'+minutes;
		},
		getwarnsInfo:function(value){
			switch(value){
				case '03':
				return '熄火'
				break;
				case '02':
				return '启动'
				break;
				case '04':
				return '休眠'
				break;
				case '07':
				return '超速'
				break;
				case '08':
				return '电压低'
				break;
				case '09':
				return '碰撞'
				break;
				case '11':
				return '震动'
				break;
				case '16':
				return 'SOS'
				break;
				case '18':
				return '非法授权'
				break;
				case '20':
				return '设备初始化错误'
				break;
			}
		}
	},
	created(){
		if(this.yijiindex==1){
			this.getfaultCodes(this.pnum,this.psize);			
		}else if(this.yijiindex==2){
			this.getwarns(this.pagenum,this.pagesize);
		}
	}
}
</script>
<style>
.breakdown-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display:-webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.breakdown-wrap-head{
	width:100%;
	height:1.92rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	text-align: center;
	line-height:1.32rem;
	color:#fff;
	font-size:0.56rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.breakdown-wrap-head{
		width:100%;
		height:2.64rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		text-align: center;
		line-height:1.32rem;
		color:#fff;
		font-size:0.56rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		position: relative;
	}
}
.breakdown-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.breakdown-wrap-contaire{
	width:100%;
	flex:1;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
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
	flex:1;
	overflow: hidden;
}
.breakdown-wrap-contaire-main-guzhang{
	height:100%;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.breakdown-wrap-contaire-main-guzhang-title{
	width:100%;
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	padding:0 0.5rem;
}
.breakdown-wrap-contaire-main-guzhang-title i{
	width:0.12rem;
	height:0.6rem;
	background: #1989f5;
	margin-right:0.32rem;
}
.breakdown-wrap-contaire-main-guzhang-title span{
	font-size:0.44rem;
	color:#222;
}
.breakdown-wrap-contaire-main-guzhang-title b{
	flex: 1;
	text-align: right;
	font-size:0.44rem;
	font-weight: 400;
}
.breakdown-wrap-contaire-main-guzhang-item{
	width:100%;
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	border-bottom:1px solid #ddd;
	justify-content: space-between;
	font-size:0.44rem;
	color:#222;
}
.breakdown-wrap-jinggao{
	background: #fff;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow-y:scroll ;
	-webkit-overflow-scrolling: touch;
}
.breakdown-wrap-jinggao-contaire-jinggao li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.44rem;
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