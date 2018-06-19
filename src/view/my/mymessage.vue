<template>
<div class="mymessage-wrap">
	<mt-header  title="我的消息">
		<mt-button icon="back" slot="left" @click="$router.go(-1)" style="font-size:0.56rem;"></mt-button>
		<span style="font-size:0.44rem;"  slot="right" v-if="currentView==='Unreadmessage'" @click="edit">编辑</span>
	</mt-header>
	<section class="mymessage-contaire">
		<div class="mymessage-contaire-nav" >
			<p @click="toggle(index ,list.view)" v-for="(list,index) in lists"  :class="{active:activenum===index}"><span>{{list.type}}</span><i>{{list.num}}</i></p>
		</div>
		<div class="mymessage-contaire-bottom">
			<component :is="currentView" ></component>
		</div>
	</section>
	<div class="mymessage-footer" v-show="quanxuan">
		<p>
			<input id="quanxuan" type="checkbox"  v-model='checked'>
        	<label for="quanxuan" @click="checkall"></label>
        	<span>全选</span>
		</p>
		<p class="mymessage-footer-right">
			<span>全部已读</span>
			<b></b>
			<span>删除</span>
		</p>
	</div>
</div>
</template>

<script>
import Reademessage from '@/components/my/reademessage'
import Unreadmessage from '@/components/my/unreadmessage'
export default{
	components:{Reademessage,Unreadmessage},
	data(){
		return {
			currentView: 'Unreadmessage',
			activenum: 0,
			index:0,
			quanxuan:false,
			checked:false,
			lists: [
		        {
		        type: '未读消息',
		        view: 'Unreadmessage',
		        num:2
		      },{
		        type: '全部消息',
		        view: 'Reademessage',
		        num:10
		      }
    		]
		}
	},
	methods:{
		toggle(i,v) {
	      this.activenum = i
	      this.currentView = v
	  },
	  edit(){
	  	this.quanxuan=!this.quanxuan;	  	
	  },
	  checkall:function(){
	  		var _this = this;
		    console.log(_this.checkboxModel);
		    if (this.checked) {//实现反选
		      _this.checkboxModel = [];
		    }else{//实现全选
		      _this.checkboxModel = [];
		      _this.checkboxData.forEach(function(item) {
		        _this.checkboxModel.push(item.id);
		      });
		    }
	  }
	}
}
</script>

<style>
.mymessage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	overflow: hidden;
}
.mymessage-wrap>header{
	height:1.32rem;
	padding:0 0.5rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.mymessage-wrap .mint-button--default{
	background: none !important;
	width:auto;
	height:auto;
}
.mymessage-contaire{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	flex:1;
}
.mymessage-contaire-nav{
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	height:1.8rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	background: #fff;
}
.mymessage-contaire-nav p{
	flex:1;
	height:1.2rem;
	line-height:1.2rem;
	font-size:0.38rem;
	color:#222;
	text-align: center;
	border:1px solid #1989f5;
}
.mymessage-contaire-nav p i{
	font-style: normal;
}
.mymessage-contaire-nav .active{
  background: #1989f5;
  color: #fff;
}
.mymessage-contaire-bottom{
	flex:1;
	overflow: auto;
}
.mintui-back:before{
	font-size:0.56rem !important;
}
.mint-header-title{
	font-size:0.56rem;
}
.mymessage-footer{
	height:1.6rem;
	width:100%;
	background:#fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
}
.mymessage-footer p:nth-child(1){
	position: relative;
}
.mymessage-footer p:nth-child(1) span{
	font-size:0.34rem;
	color: #666;
	position:relative;
	top:-0.2rem;
}
.mymessage-footer p:nth-child(1) input[type="checkbox"]{
	width: 0.65rem;
    height: 0.65rem;
    opacity: 0;
}
.mymessage-footer p:nth-child(1) label {
    position: absolute;
    left: 0;
    top: 5px;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1px solid #999;
}
.mymessage-footer p:nth-child(1) input:checked+label { 
    background-color: #1aad19;
    border: 1px solid #1aad19;
}
.mymessage-footer p:nth-child(1) input:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 1px;
    left: 5px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
}
.mymessage-footer-right{
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	align-items: center;
	padding-right:0.66rem;
}
.mymessage-footer-right b{
	display: block;
	width:1px;
	height:0.8rem;
	background:#ddd;
	margin:0 1.15rem;
}
.mymessage-footer-right span:nth-child(1){
	color:#1989f5;
	font-size:0.44rem;
}
.mymessage-footer-right span:last-child{
	font-size:0.44rem;
	color:#999;
}
</style>