<template>
<div class="faxian-wrap">
		<div class="faxianhead">
			<router-link tag="p" to="/search"><i class="iconfont icon-sousuo"></i></router-link>
			<p class="tabs-p"><span @click="toggle(index ,tab.view)" v-for="(tab,index) in tabs" :class="{active:active===index}">{{tab.type}} </span></p>
			<p @click="showpictextvideo"><i class="iconfont icon-zhaoxiangji" v-show="currentView==='dynamicslist'"></i></p>
			<div class="pic-text-video" v-show="$store.state.faxian.pic_text_video">
				<router-link to="/upload" tag="p">文图</router-link>
				<router-link to="/upload" tag="p">视频</router-link>
			</div>
		</div>
	<div class="faxianlist">
		<component :is="currentView" ></component>
	</div>
</div>
</template>
<script>
import Dynamicslist from '@/components/search/dynamics'
import Attention from '@/components/faxian/attention'
export default{
	components:{Dynamicslist,Attention},
	data(){
		return {
			currentView: 'dynamicslist',
			active: 0,
			index:0,
			tabs: [
		        {
		        type: '最新',
		        view: 'dynamicslist'
		      },{
		        type: '关注',
		        view: 'Attention'
		      }
    		]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	   },
		showpictextvideo:function(){
			this.$store.commit('changepopupmean');
			this.$store.commit('changepictextvideo');
		}		
	}
}
</script>

<style>
.faxian-wrap{
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.faxianlist{
	flex:1;
	overflow: auto;
}
.faxianhead{
	height:1.32rem;
	background: url(../../assets/img/faxianimg/headbg.png) center repeat;
	width:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.48rem;
	align-items: center;
	color:#fff;
	font-size:0.48rem;
	position: relative;
}
.faxianhead p i{
	font-size:0.66rem;
}
.faxianhead p span{
	padding:0 0.36rem;
	display: inline-block;
	height:1.32rem;
	line-height:1.32rem;	
}
.faxianhead .tabs-p span:nth-child(1){
	margin-right:0.48rem;
}
.pic-text-video{
	width:6rem;
	background:#fff;
	position: absolute;
	right:0.48rem;
	top:100%;
	z-index: 101;
	border-radius: 5px;
}
.pic-text-video p{
	border-bottom:1px solid #dcdcdc;
	color:#666;
	height:1.6rem;
	line-height:1.6rem;
	text-align: center;
	font-size:0.42rem;
}
.pic-text-video p:last-child{
	border-bottom:none;
}
.faxianhead .active{
  border-bottom:1px solid #fff;
}
</style>