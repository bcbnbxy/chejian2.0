<template>
	<div class="follower-wrap">
		<div class="follower-head">
			<p @click="$router.go(-1)">返回</p>
			<p class="tabs-p"><span @click="toggle(index ,list.view)" v-for="(list,index) in lists" :class="{active:active===index}">{{list.type}}</span></p>
			<p>筛选</p>
		</div>
		<div class="follower-container">
			<component :is="currentView" ></component>
		</div>
	</div>
</template>

<script>
import tafensi from '@/components/faxian/tafensi'
import taguanzhu from '@/components/faxian/taguanzhu'
export default{
	components:{tafensi,taguanzhu},
	data(){
		return {
			currentView: 'taguanzhu',
			active: 0,
			index:0,
			lists: [
		        {
		        type: 'TA的关注',
		        view: 'taguanzhu'
		      },{
		        type: 'TA的粉丝',
		        view: 'tafensi'
		      }
    		]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	   }
	}
}
</script>

<style scoped>
.follower-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.follower-head{
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
}
.tabs-p{
	height:100%;
}
.tabs-p span{
	height:1.32rem;
	line-height:1.32rem;
	padding:0 0.5rem;
	display: inline-block;
	font-size:0.56rem;
}
.follower-container{
	flex:1;
}
.follower-head .active{
	border-bottom:1px solid #fff;
}
</style>