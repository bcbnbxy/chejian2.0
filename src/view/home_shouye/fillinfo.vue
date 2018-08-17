<template>
<div class="fillinfo-wrap">
	<div class="fillinfo-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>违章查询</span>
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
			<input type="text" placeholder="请输入车牌号"/>
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>牌号类型</span>
			<input type="text" placeholder="请选择牌号类型" v-model="choseplatevalue" readonly="true" @click="choseplate"/>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>查询城市</span>
			<input type="text" placeholder="请选择查询城市" readonly="true" @click="citypicker" v-model="chosecity"/>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>发动机号</span>
			<input type="text" placeholder="请输入完整的发动机号码" />
		</div>
		<div class="fillinfo-wrap-contaire-item">
			<span>车架号</span>
			<input type="text" :value="$route.params.vin" readonly="true"/>
		</div>
	</div>
	<div class="fillinfo-footer">
		<!--<router-link tag="button" to="/violationinquiry">查询</router-link>-->
		<button @click="inquiry">查询</button>
	</div>
	<mt-popup v-model="popupVisible"  position="bottom" style="width:100%;">
 		<mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" ></mt-picker>
   </mt-popup>
   <Citypicker :id="'citypicker'" :flag="citypickerflag" v-on:listenTochildEvent="citypicker" v-on:child-say="listenToMyBoy" :cityInfo="citylist"></Citypicker>
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
			carnumcity:'粤',
			popupVisible:false,
			citypickerflag:false,
			choseplatevalue:'',
			chosecity:'',
			slots:[{
				flex:1,
				className:'slots1',
				values:['小型汽车(蓝底白字牌)','大型汽车(黄底黑子牌)'],
				textAlign: 'center',
			}],
			citylist:[],
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
		choseplate:function(){
			this.popupVisible=!this.popupVisible;
		},
		onValuesChange:function(picker,value){
			this.choseplatevalue=value[0];
		},
		citypicker:function(){
			this.citypickerflag=!this.citypickerflag;
		},
		listenToMyBoy: function (data){
		    this.chosecity=data;
		},
		inquiry(){
//			this.$router.replace('/violationinquiry')
			this.$toast({
				message:'暂未开放，敬请期待!',
				position:'bottom',
				duration:1500
			})
		},
		getcity(){//获取省份信息
			var that=this;
			this.$api('/Execute.do',{action:'orderProvinces'}).then(function(r){
				if(r.errorCode==0){					
					that.citylist=r.data.orderProvinces;
				}else{
					that.$toast({
						message:r.errorMessage,
						position:'bottom',
						duration:1500
					})
				}
			})
		}
	},
	mounted(){
		this.getcity();
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