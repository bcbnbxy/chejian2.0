<template>
<div class="carinfo-wrap">
	<div class="carinfo-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>请选择车型品牌</span>
	</div>
	<div class="carinfo-wrap-contaire">
		<mt-index-list :height="fixBottom" >
			<mt-index-section :index="item.prefix" v-for="(item,index) in carlogodata" :key="index">
			    <div class="carinfolist-item" v-for="(list,Index) in item.carlogolist" :key="Index" @click="choosecarbrand(list.brandname)">
			    	<img :src="list.imgurl"/><span class="cell-content">{{list.brandname}}</span>
			    </div>
			</mt-index-section>
		</mt-index-list>
	</div>
</div>
</template>

<script>
import Carlogos from '@/assets/script/carlogos'
import { MessageBox } from 'mint-ui'
export default{
	data(){
		return {
			carlogodata:Carlogos.carlogos,
			fixBottom:0
		}
	},
	mounted(){
		const height = document.getElementsByClassName('carinfo-wrap')[0].getBoundingClientRect().height	
		this.fixBottom=height - 60 
	},
	methods:{
		choosecarbrand(aa){
			var that=this;			
			MessageBox.confirm('', {
			        message: '确定要修改车辆品牌吗？',
			        showConfirmButton:true,
			        showCancelButton:true,
			        confirmButtonText:'确定',
			        cancelButtonText:'取消'
		        }).then(action => {
		          if (action == 'confirm') {
		           		that.$api('/Execute.do',{action:'device.updateVehicle',vin:that.$route.params.vin,brandname:aa}).then(function(r){
			           		if(r.errorCode==0){
			           			that.$router.push('/homeindex')
			           		}
			           	})
		          }
		        }).catch(err => {
		          if (err == 'cancel') {
		            console.log('123');
		          }
		        });
		}
	}
}
</script>

<style >
	.carinfo-wrap{
		width:100%;
		height:100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		background: #fcfcfc;
	}
	.carinfo-wrap-head{
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	text-align: center;
	line-height:1.32rem;
	padding-top:0.6rem;
	font-size:0.56rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	color:#fff;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.carinfo-wrap-head{
		height:2.64rem;
		width:100%;
		padding:0 0.5rem;
		text-align: center;
		line-height:1.32rem;
		padding-top:1.32rem;
		font-size:0.48rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size: cover;
		color:#fff;
		position: relative;
	}
	.mint-indexlist-content{
		margin-right:0 !important;
		padding-bottom:1.2rem;
	}
}
.carinfo-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.carinfo-wrap-contaire{
	width:100%;
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	background: #eee;
}
.carinfolist-item{
	height:2rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	padding-left:0.5rem;
	background: #fff;
	margin-bottom:1px;
	font-size:0.48rem;
	color:#222;
	overflow: hidden;
}
.carinfolist-item img{
	width:1.4rem;
	margin-right:0.5rem;
}
.mint-indexsection-index{
	padding:3px 0 3px 15px;
	background-color:#eee;
	font-size:20px;
}
.mint-indexlist{
	height:100% !important;
}
.mint-indexlist-content{
	margin-right:0 !important;
	
}
.mint-indexlist-nav{
	background: none !important;
	border-left:none !important;
}
.mint-indexlist-navitem{
	font-size:0.44rem !important;
	color:#222 !important;
}
</style>