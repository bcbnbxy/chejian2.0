<template>
<div class="workshop-wrap">
	<div class="workshop-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>车间</span>
	</div>
	<div class="workshop-wrap-contaire">
		<div class="workshop-wrap-contaire-nav">
			<span @click="toggle(0,'Workshop_all')" :class="{active:active===0}">全部(1203)</span>
			<i></i>
			<span @click="toggle(1,'Workshop_hitch')" :class="{active:active===1}">故障(325)</span>
		</div>
		<div class="workshop-wrap-contaire-webview">
			<component :is="currentView" ></component>
		</div>
	</div>
</div>
</template>

<script>
import Workshop_all from '@/components/controlsystem/workshop_all'
import Workshop_hitch from '@/components/controlsystem/workshop_hitch'
export default{
	components:{Workshop_all,Workshop_hitch},
	data(){
		return {
			active:0,
			currentView: 'Workshop_all'
		}
	},
	methods:{
		toggle(i,v){
			this.active=i;
			this.currentView=v;
		}
	}
}
</script>

<style scoped>
.workshop-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.workshop-wrap-head{
	height:1.32rem;
	width:100%;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	text-align: center;
	line-height:1.32rem;
	position: relative;
	color:#fff;
	font-size:0.56rem;
	padding:0 0.5rem;
}
.workshop-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.workshop-wrap-contaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.workshop-wrap-contaire-nav{
	background: #fff;
	height:1.6rem;
	line-height:1.6rem;
	font-size:0.48rem;
	color:#222;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom:0.3rem;
}
.workshop-wrap-contaire-nav i{
	display: block;
	width:1px;
	height:1rem;
	background: #ddd;
}
.workshop-wrap-contaire-nav  span{
	padding:0 0.5rem;
}
.workshop-wrap-contaire-nav .active{
	color:#1989F5;
	border-bottom:1px solid ;
}
.workshop-wrap-contaire-webview{
	flex:1;
	overflow:auto;
}
</style>