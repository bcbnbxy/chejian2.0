<template>
	<div class="consumer-wrap">
		<div class="consumer-wrap-top">
			<div class="consumer-wrap-head">
				<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
				<span>客户</span>
			</div>
			<div class="consumer-wrap-top-bottom">
				<img src="../../assets/img/faxianimg/avatar.png"/>
				<p>客户01</p>
			</div>
		</div>
		<div class="consumer-wrap-bottom">
			<div class="consumer-wrap-bottom-nav">
				<p @click="toggle(index ,tab.view)" v-for="(tab,index) in tabs" :class="{active:active===index}">{{tab.type}}</p>
			</div>
			<div class="consumer-wrap-bottom-contaire">
				<component :is="currentView" ></component>
			</div>
		</div>
	</div>
</template>

<script>
import Basicdocument from '@/components/controlsystem/basicdocument'
import Mycarstate from '@/components/controlsystem/mycarstate'
export default{
	components:{Basicdocument,Mycarstate},
	data(){
		return {
			active:0,
			index:0,
			currentView: 'Basicdocument',
			tabs:[
				{
					view:"Basicdocument",
					type:"基本资料"
				},{
					view:"Mycarstate",
					type:"爱车状态"
				}
			]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	   },
	}
}
</script>

<style scoped>
.consumer-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.consumer-wrap-top{
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	width:100%;
	height:5.4rem;
}
.consumer-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.56rem;
	position:relative;	
}
.consumer-wrap-head .icon-fanhui{
	position:absolute;
	left:0.5rem;
	font-size:0.6rem;
	top:0;
}
.consumer-wrap-top-bottom{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	padding-top:0.63rem;
}
.consumer-wrap-top-bottom img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
	display: block;
	margin-bottom:0.53rem;
}
.consumer-wrap-top-bottom p{
	color:#fff;
	line-height:1;
	font-size:0.46rem;
}
.consumer-wrap-bottom-nav{
	width:100%;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	background: #fff;
	line-height: 1.6rem;
}
.consumer-wrap-bottom-nav p{
	color:#666;
	font-size:0.5rem;
	height:100%;
	padding:0 0.5rem;
	
}
.consumer-wrap-bottom-nav .active{
	color:#1989F5;
	border-bottom:1px solid #1989F5;
}
.consumer-wrap-bottom-contaire{
	margin-top:0.3rem;
}
</style>