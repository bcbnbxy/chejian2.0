<template>
<div class="fillinfo-wrap">
	<div class="fillinfo-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>查询违章信息</span>
	</div>
	<div class="fillinfo-wrap-contaire">
		<div class="fillinfo-wrap-contaire-list">
			<span>车牌号码</span>
			<div class="carnum">
				<span>{{carnumcity}}</span>
				<i class="iconfont icon-arrow-right-copy-copy-copy" :class="carnumflag?'carnumberactive':'carnumber'" @click="carnum"></i>
				<ul v-show="carnumflag">
					<li v-for="(item,index) in carnumlist" @click="getvalue(item)">{{item}}</li>
				</ul>
			</div>
			<input type="text" v-model="platenumber"/>
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>发动机号</span>
			<input type="text" v-model="engineno" />
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>车架号</span>
			<input type="text" :value="$store.state.homeindex.Violationinquiry.vin" readonly="true"/>
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>最后查询时间</span>
			<input type="text" :value="endtime" readonly="true"/>
		</div>
	</div>
	<div class="fillinfo-footer">
		<mt-button type="default" :disabled="isdisabled" @click="inquiry">查询</mt-button>
	</div>
</div>
</template>
<script>
import Citypicker from '@/components/shouye/citypicker'
export default{
	components:{Citypicker},
	data(){
		return{
			carnumflag:false,
			carnumlist:['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闵','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','黔','滇','藏','陕','甘','青','宁','新','台','港','澳'],
			carnumcity:this.$store.state.homeindex.Violationinquiry.platenumber?this.$store.state.homeindex.Violationinquiry.platenumber.substring(0,1):'粤',
			platenumber:this.$store.state.homeindex.Violationinquiry.platenumber?this.$store.state.homeindex.Violationinquiry.platenumber.substring(1,this.$store.state.homeindex.Violationinquiry.platenumber.length):'',
			engineno:this.$store.state.homeindex.Violationinquiry.engineno?this.$store.state.homeindex.Violationinquiry.engineno:'',
			endtime:'',
			endseconds:''
		}
	},
	created(){
		this.getendtime();
	},
	computed:{
		isdisabled:function(){
			if(this.platenumber.trim().length>0&&this.engineno.trim().length>0){
				return false;
			}else{
				return true;
			}
		}
	},
	methods:{
		carnum:function(){
			this.carnumflag=!this.carnumflag
		},
		getvalue:function(value){
			this.carnumcity=value;
			this.carnumflag=!this.carnumflag;
		},
		inquiry(){
			var nowtime = new Date().getTime()
			if(this.endseconds){				
				var timecha='';
				timecha=parseInt(nowtime)-parseInt(this.endseconds);
				if(timecha>86400000){
					this.getdoPeccancyQuery()
				}else{
					this.getlastPeccancyQuery()
				}
			}else{
				this.getdoPeccancyQuery()
			}
		},
		getendtime(){
			var that=this;
			this.$api('/Execute.do',{action:'device.lastPeccancyQuery',device:this.$store.state.homeindex.Violationinquiry.deviceseq,platenumber:this.$store.state.homeindex.Violationinquiry.platenumber,vin:this.$store.state.homeindex.Violationinquiry.vin,engineno:this.engineno}).then(function(r){
				if(r.errorCode==0){
					if(r.data.lastPeccancyQuery){
						that.platenumber=r.data.lastPeccancyQuery.platenumber?r.data.lastPeccancyQuery.platenumber:'';
						that.engineno=r.data.lastPeccancyQuery.engineno?r.data.lastPeccancyQuery.engineno:'';
						that.endtime=that.changetime(r.data.lastPeccancyQuery.createtime);
						that.endseconds=r.data.lastPeccancyQuery.createtime;
					}
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		changetime(seconds){
			var str = "";
			var year = new Date(seconds).getFullYear();
			var month = parseInt(new Date(seconds).getMonth())+1;
			month = month>9?month:'0'+month;
			var day = new Date(seconds).getDate();
			day = day > 9 ? day : '0'+day;
			str += year+'/'+month+'/'+day;
			return str;			
		},
		getlastPeccancyQuery(){//从缓存中查
			var that=this;
			var Platenumber=this.carnumcity+this.platenumber;
			this.$api('/Execute.do',{action:'device.lastPeccancyQuery',device:this.$store.state.homeindex.Violationinquiry.deviceseq,platenumber:Platenumber,vin:this.$store.state.homeindex.Violationinquiry.vin,engineno:this.engineno}).then(function(r){
				if(r.errorCode==0){
					if(r.data.lastPeccancyQuery){
						that.$router.push({name:'violationinquiry',param:{Peccancy:r.data.lastPeccancyQuery}})
					}else{
						that.$toast({
				          message: '暂时为查询到您的爱车有违章信息',
				          position: 'bottom',
	  					  duration: 1500
				       });
					}
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		getdoPeccancyQuery(){//从数据库查
			var that=this;
			var Platenumber=this.carnumcity+this.platenumber;
			this.$api('/Execute.do',{action:'device.doPeccancyQuery',device:this.$store.state.homeindex.Violationinquiry.deviceseq,platenumber:Platenumber,vin:this.$store.state.homeindex.Violationinquiry.vin,engineno:this.engineno}).then(function(r){
				if(r.errorCode==0){
					if(r.data.lastPeccancyQuery){
						that.$router.push({name:'violationinquiry',param:{Peccancy:r.data.lastPeccancyQuery}})
					}else{
						that.$toast({
				          message: '暂时为查询到您的爱车有违章信息',
				          position: 'bottom',
	  					  duration: 1500
				       });
					}
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		}
	}
}
</script>

<style>
.fillinfo-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}
.fillinfo-wrap-head{
	width:100%;
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	color:#fff;
	font-size:0.56rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.fillinfo-wrap-head{
		width:100%;
		height:2.64rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		color:#fff;
		font-size:0.56rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size: cover;
	}
}
.fillinfo-wrap-head .icon-fanhui{
	float:left;
	font-size:0.6rem;
}
.fillinfo-wrap-contaire{
	flex:1;
}
.fillinfo-wrap-contaire-item{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
	background: #fff;
	font-size:0.44rem;
}
.fillinfo-wrap-contaire-item span{
	color:#222;
	margin-right:0.5rem;
}
.fillinfo-wrap-contaire-item .icon-arrow-right-copy-copy-copy{
	color:#a0a0a0;
	font-size:0.6rem;
	margin-left:0.5rem;
}
.fillinfo-wrap-contaire-item input{
	flex:1;
	text-align: right;
	color:#666;
}
.fillinfo-wrap-contaire-item input::-webkit-input-placeholder{
	color:#999;
}
.fillinfo-wrap-contaire-list{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
}
.fillinfo-wrap-contaire-list>span{
	color:#222;
	flex:1;
}
.fillinfo-wrap-contaire-list>input{
	width:3rem;
	height:0.9rem;
	border:1px solid #ddd;
	text-align: center;
	border-radius: 5px;
}
.fillinfo-wrap-contaire-list>input::-webkit-input-placeholder{
	color:#999;
}
.carnum .iconfont{
	font-size:0.6rem;
	color:#a0a0a0;
	vertical-align: middle;
	margin:0 0.2rem;
}
.carnum{
	color:#666;
	position: relative;
	height:1.6rem;
	line-height:1.6rem;
}
.carnum>ul{
	position: absolute;
	width:1.6rem;
	height:9rem;
	background: #fff;
	overflow: auto;
	top:1.3rem;
	left:-0.3rem;
	border:1px solid #ddd;
	border-radius: 5px;
	box-shadow: 2px 2px 10px rgba(0,0,0,.1);
}
.carnum>ul li{
	width:100%;
	height:1rem;
	line-height:1rem;
	text-align: center;
	font-size:0.38rem;
	color:#666;
}
.fillinfo-footer{
	padding:0 0.62rem 1rem 0.62rem;
}
.fillinfo-footer>button{
	width:100%;
	height:1.6rem;
	text-align: center;
	line-height:1.6rem;
	font-size:0.46rem;
	color:#fff;
	background: #1989F5;
	border-radius: 5px;
}
.carnumberactive::before{
	transform: rotate(90deg) !important;
	display: inline-block;
	transition: all 0.3s;
}
.carnumber::before {
	transform: rotate(0deg) !important;
	display: inline-block;
	transition: all 0.3s;
}
#citypicker{
width:100%;
height:100%;
background: #f7f7f7;
position: absolute;
left:100%;
top:0;
transition: all 0.3s; 
display: flex;
display: -webkit-flex;
flex-direction: column;
overflow: hidden;
}
.citypickershow{
left:0 !important;
transition: all 0.3s; 
}
</style>