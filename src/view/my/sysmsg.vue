<template>
<div class="sysmsg-wrap">
	<div class="sysmsg-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>{{$route.params.title}}</span>
		<span @click="footshow=!footshow">{{footshow?'取消':'编辑'}}</span>
	</div>
	<div class="sysmsg-wrap-contaire">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">		
			<div class="sysmsg-wrap-msgitem" v-for="(item,index) in msglist" :key="index" @click="!footshow&&gomsgcontent()">
				<div class="sysmsg-wrap-msgitem-left" v-show="footshow">
					<input type="checkbox" :checked="msglistIds.indexOf(index)>=0" @click='checkedOne(index)'/>
					<label></label>
				</div>
				<div class="sysmsg-wrap-msgitem-right">
					<h3>{{item.title}}</h3>
					<p>{{item.content}}</p>
					<span>{{item.createtime | formatDate}}</span>
				</div>
			</div>
    	</mt-loadmore>		
	</div>
	<div class="msgcontaire-wrap-footer" v-show="footshow">
		<div class="msgcontaire-wrap-footer-left">
			<p>
				<input type="checkbox" :checked="msglistIds.length === msglist.length" @click='checkedAll()'/>
				<label></label>
			</p>
			<span>全选</span>
		</div>
		<div class="msgcontaire-wrap-footer-right">
			<button @click="delate" :disabled="!msglistIds.length>0" :style="!msglistIds.length>0?'color:#ccc':''">删除</button>
		</div>
	</div>
	<div class="msgcontent" :class="msgcontent?'msgcontent-show':'msgcontent-hidden'">
		<Msgcontent v-on:listenmsgcontent="msgcontent=false"></Msgcontent>
	</div>
</div>
</template>

<script>
import Msgcontent from '@/components/my/msgcontent'
export default{
	components:{Msgcontent},
	data(){
		return {
			msglist:[
				{nickname:'婉婉',msg:'我是婉婉',time:'今天'},
			],
			msglistIds:[],
			isCheckedAll: false,
			footshow:false,
			msgcontent:false,
			psize:7,
			pnum:0,
			allLoaded:false
		}
	},
	methods:{
		checkedAll () {
      		this.isCheckedAll = !this.isCheckedAll
      		if (this.isCheckedAll) {// 全选时
        		this.msglistIds = []
       			this.msglist.forEach(function (fruit,index) {
          			this.msglistIds.push(index)
        		}, this)
      		} else {
        		this.msglistIds = []
      		}
    	},
    	checkedOne (index) {
	        let idIndex = this.msglistIds.indexOf(index)
	        if (idIndex >= 0) {// 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)	          
	            this.msglistIds.splice(idIndex, 1)
	        } else {// 选中该checkbox	          
	            this.msglistIds.push(index)
	        }
	    },
	    delate(){
	    	console.log('删除')
	    },
	    gomsgcontent(){
	    	this.msgcontent=true;
	    },
	    getmessages(minvalue,pageSize){//获取消息列表
	    	var that=this;
	    	this.$api('/Execute.do',{action:'messages',kind:this.$route.params.kind,minvalue:minvalue,pageSize:pageSize}).then(function(r){
	    		console.log(JSON.stringify(r));
	    		if(r.errorCode==0){
	    			that.msglist=that.msglist.concat(r.data.messages);
					if(r.data.messages.length<7){
						that.allLoaded=true;
						return;
					}else{
						that.allLoaded=false;
					}
					that.pnum=r.data.messages[r.data.messages.length-1].msgseq;
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	})
	    },
	    loadTop(){//下拉刷新
	    	this.msglist=[];
	        this.getmessages(0,this.psize);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom(){//组件提供的上拉加载触发方法
	    	this.getmessages(this.pnum,this.psize);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	    },
	},
	filters:{
		formatDate(seconds){//时间转换函数
			seconds=new Date().getTime()-parseInt(seconds);
			seconds= seconds / 1000;
			var day =  Math.floor(seconds / 86400 );
			seconds = seconds % 86400;
			var hour =  Math.floor( seconds / 3600);
			seconds = seconds % 3600;
			var mintues = Math.floor( seconds / 60);
			var beforeStr = "";
			if(day>0){
				beforeStr += day;
				return beforeStr+"天前";
			}else if(hour>0){
				beforeStr += hour;
				return beforeStr +"小时前"
			}else if(mintues>0){
				beforeStr += mintues;
				return beforeStr +"分钟前"
			}else{
				return "刚刚"
			}				
		}
	}
}
</script>

<style scoped>
.sysmsg-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
}
.sysmsg-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
}
.sysmsg-wrap-head .icon-fanhui{
	font-size:0.6rem;
}
.sysmsg-wrap-head span:last-child{
	font-size:0.44rem;
}
.sysmsg-wrap-contaire{
	flex:1;
	padding:0 0.5rem;
	padding-top:0.3rem;
	overflow-y: auto;
}
.sysmsg-wrap-msgitem{
	display: flex;
	display: -webkit-flex;
	align-items: center;
	width:100%;
	height:2.8rem;
	background: #fff;
	margin-bottom:0.3rem;
	border-radius: 5px;	
	padding:0.48rem 0.5rem;
}
.sysmsg-wrap-msgitem-right{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	height:100%;
	width:0;
	line-height: 1;
	flex:1 0 auto;
}
.sysmsg-wrap-msgitem-right>*{
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.sysmsg-wrap-msgitem-right h3{
	font-size:0.48rem;
	color:#222;
	font-weight: 400;
}
.sysmsg-wrap-msgitem-right p{
	font-size:0.44rem;
	color:#666;
}
.sysmsg-wrap-msgitem-right span{
	font-size:0.38rem;
	color:#999;
}
.sysmsg-wrap-msgitem-left{
	flex:0 0 0.62rem;
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	margin-right:0.5rem;
	position: relative;
}
.sysmsg-wrap-msgitem-left input{
	width:0.62rem;
	height:0.62rem;
	position: absolute;
	left:0;
	top:0;
	border-radius: 50%;
	opacity: 0;
	filter:Alpha(opacity=0);
}
.sysmsg-wrap-msgitem-left label{
	width:0.62rem;
	height:0.62rem;
	background-image:url(../../assets/img/my/weixuanzhong.png);
	background-size:cover;
	border-radius: 50%;
	display: block;
}
.sysmsg-wrap-msgitem-left input:checked+label{
	background-image:url(../../assets/img/my/xuanzhong.png);
	background-size:cover;
}
.msgcontaire-wrap-footer{
	height:1.6rem;
	padding:0 0.5rem;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items:center ;
	overflow: hidden;
}
.msgcontaire-wrap-footer-left{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.38rem;
	color:#666;
}
.msgcontaire-wrap-footer-left p{
	position: relative;
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	margin-right:0.3rem;
}
.msgcontaire-wrap-footer-left p input{
	width:062rem;
	height:0.62rem;
	border-radius: 50%;
	position: absolute;
	left:0;
	top:0;
	opacity: 0;
	filter:Alpha(opacity=0);
}
.msgcontaire-wrap-footer-left p label{
	width:0.62rem;
	height:0.62rem;
	background-image:url(../../assets/img/my/weixuanzhong.png);
	background-size:cover;
	border-radius: 50%;
	display: block;
}
.msgcontaire-wrap-footer-left p input:checked+label{
	background-image:url(../../assets/img/my/xuanzhong.png);
	background-size:cover;
}
.msgcontaire-wrap-footer-right{
	height:1.3rem;
	line-height:1.3rem;
	font-size:0.44rem;
	position: relative;
	right:-0.5rem;
}
.msgcontaire-wrap-footer-right button{
	padding:0 1.15rem;
	display: inline-block;
	background: none ;
	color:#1989F5;
}
.msgcontent{
	width:100%;
	height:100%;
	background: tan;
	position: absolute;
	right:0;
}
.msgcontent-show{
	left:0;
	transition: all 0.3s;
}
.msgcontent-hidden{
	left:100%;
	transition: all 0.3s;
}
</style>