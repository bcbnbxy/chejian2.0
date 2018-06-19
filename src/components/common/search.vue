<template>
	<div class="search">
		<div class="searchhead">
			<div class="search-box">
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="搜索用户和动态" v-model="searchvalue"/>
				<i class="iconfont icon-clear" @click="clearsearch"></i>
			</div>
			<p @click="$router.go(-1)">取消</p>
		</div>
		<div class="search-container">
			<ul>
		    	<li @click="toggle(index ,tab.view)" v-for="(tab,index) in tabs" :class="{active:active===index}">{{tab.type}} </li>      
		  	</ul>
		  	<div class="tabbox">
		  		<component :is="currentView" ></component>
		  	</div>
		</div>
	</div>
</template>
<script>
import User from '@/components/search/user'
import Dynamicslist from '@/components/search/dynamics'
export default {
	components:{User,Dynamicslist},
	data(){
		return {
			searchvalue:'',
			currentView: 'User',
			active: 0,
			index:0,
			tabs: [
		        {
		        type: '用户',
		        view: 'user'
		      },{
		        type: '动态',
		        view: 'dynamicslist'
		      }
    		]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	   },
		clearsearch:function(){
			this.searchvalue='';
		}
	}
}
</script>

<style>
.search{
	background:#f7f7f7;
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.searchhead{
	width: 100%;
	height:1.32rem;
	background: url(../../assets/img/faxianimg/headbg.png) center repeat;
	padding:0.21rem 0.5rem;
	font-size:0.42rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.searchhead p{
	flex:1 0 1.4rem;
	text-align: right;
	color:#fff;
}
.search-box{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.2);
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.3rem;
	color:#fff;
	align-items: center;
	font-size:0.42rem;
	border-radius: 5px;
}
.search-box input{
	flex:1;
	padding-left:0.5rem;
}
.search-container{
	width:100%;
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.search-container>ul{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	font-size:0.44rem;
	color:#666;
	align-items: center;
	background: #fff;
}
.search-container>ul li{
	height:1.6rem;
	line-height:1.6rem;
	padding:0 0.45rem;
}
.search-container .active{
  color:#0061ff;
  border-bottom:1px solid #0061ff;
}
.tabbox{
	flex:1;
	overflow: auto;
}
</style>