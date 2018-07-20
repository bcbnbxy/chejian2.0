<template>
<div class="msgcontaire-wrap">
	<div class="msgcontaire-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>{{$route.params.title}}</span>
		<span @click="footshow=!footshow">{{footshow?'取消':'编辑'}}</span>
	</div>
	<div class="msgcontaire-wrap-main">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
     		<div class="addfriend" v-for="(item,index) in msglist" :key="index">
				<div class="addfriend-left" v-show="footshow">				
					<input type="checkbox" :checked="msglistIds.indexOf(item.msgseq)>=0" @click='checkedOne(item.msgseq)'/>
					<label ></label>
				</div>
				<div class="addfriend-center">
					<img :src="item.sender.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.sender.headphoto:require ('../../assets/img/shouye/defaultavatar.png')"/>
					<p>
						<b>{{item.sender.nickname}}</b>
						<span>{{item.content}}</span>
						<i>{{item.createtime | formatDate}}</i>
					</p>
				</div>
				<div class="addfriend-right">
					<div class="btn-group" v-show="item.status==0">
						<span @click="accept(index,item.msgseq)">接受</span><span @click="refuse(index,item.msgseq)">拒绝</span>					
					</div>
					<div class="btn-group1" v-show="item.status!=0">
						<span v-show="item.status==1" style="background:#1aad19;">已接受</span>
						<span v-show="item.status==2" style="background: #ff0000;">已拒绝</span>
					</div>
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
</div>
</template>

<script>
export default{
	data(){
		return {
			msglist:[],
			msglistIds:[],
			isCheckedAll: false,
			footshow:false,
			psize:6,
			pnum:0,
			allLoaded:false
		}
	},
	mounted(){
		this.getmessages(this.pnum,this.psize);
	},
	methods:{
		checkedAll () {
      		this.isCheckedAll = !this.isCheckedAll
      		if (this.isCheckedAll) {// 全选时
        		this.msglistIds = []
       			this.msglist.forEach(function (fruit,index) {
          			this.msglistIds.push(fruit.msgseq)
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
	    getmessages(minvalue,pageSize){//获取消息列表
	    	var that=this;
	    	this.$api('/Execute.do',{action:'messages',kind:this.$route.params.kind,minvalue:minvalue,pageSize:pageSize}).then(function(r){
	    		if(r.errorCode==0){
	    			that.msglist=that.msglist.concat(r.data.messages);
					if(r.data.messages.length<6){
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
	    accept(index,msgseq){
	    	var that=this;
	    	if(this.$route.params.kind==3){//成为业务员的客户
	    		this.$api('/Execute.do',{action:"device.bindAgentStaff",msgseq:msgseq}).then(function(r){
	    			if(r.errorCode==0){
	    				that.msglist[index].status=1;
	    			}else{
	    				that.$toast({
		    				message:r.errorMessage,
		    				position:'bottom',
		    				duration:1500
		    			})
	    			}
	    		})
	    	};
	    	if(this.$route.params.kind==4){//成为老板的业务员
	    		this.$api('/Execute.do',{action:"device.acceptAgentOffer",msgseq:msgseq}).then(function(r){
	    			if(r.errorCode==0){
	    				that.msglist[index].status=1;
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
	    refuse(index,msgseq){//拒绝成为业务员
	    	var that=this;
	    	this.$api('/Execute.do',{action:'refuseMessage',msgseq:msgseq}).then(function(r){
	    		if(r.errorCode==0){
	    			that.$toast({
	    				message:'已拒绝',
	    				position:'bottom',
	    				duration:1500
	    			})
	    			that.msglist[index].status=2;
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
	    delate(){//删除消息
	    	var that=this;
	    	that.$api('/Execute.do',{action:'removeMessages',msgseqs:this.msglistIds.join()}).then(function(r){
	    		if(r.errorCode==0){
	    			that.$toast({
	    				message:'删除消息成功',
	    				position:'bottom',
	    				duration:1500
	    			})
	    			that.msglist=[];
	    			that.getmessages(that.pnum,that.psize)
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
.msgcontaire-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.msgcontaire-wrap-head{
	width:100%;
	height:1.32rem;
	padding:0 0.5rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
}
.msgcontaire-wrap-head .icon-fanhui{
	font-size:0.6rem;
}
.msgcontaire-wrap-head span:last-child{
	font-size:0.44rem;
}
.msgcontaire-wrap-main{
	flex:1;
	overflow-y:auto;
}
.addfriend{
	background: #fff;
	height:3.8rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content:space-between;
	padding:0.5rem 0.5rem;
}
.addfriend:last-child{
	border-bottom:none;
}
.addfriend-center{
	height:2.8rem;
	display: flex;
	display: -webkit-flex;
	padding-bottom:0.95rem;
	flex:1;
}
.addfriend-center img{
	width:1.2rem;
	height:1.2rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
.addfriend-center p{
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	justify-content: space-between;
	line-height: 1;
}
.addfriend-center p b{
	font-weight: 400;
	color:#222;
	font-size:0.44rem;
}
.addfriend-center p span{
	font-size:0.38rem;
	color:#666;
}
.addfriend-center p i{
	font-size:0.34rem;
	font-style: normal;
	color:#999;
}
.addfriend-right{
	height:1rem;
	align-self: flex-end;
}
.btn-group,.btn-group1{
	height:1rem;
	line-height: 0;	
}
.btn-group span{
	display: inline-block;
	height:1rem;
	width:2rem;
	line-height:1rem;
	text-align: center;
	font-size:0.34rem;
	color:#fff;
	border-radius: 3px;
}
.btn-group span:first-child{
	background: #1989f5;
	margin-right:0.5rem;
}
.btn-group span:last-child{
	background: #ddd;
}
.btn-group1 span{
	display: inline-block;
	height:1rem;
	width:2rem;
	line-height:1rem;
	text-align: center;
	font-size:0.34rem;
	color:#fff;
	border-radius: 3px;
	background: #ddd;
}
.addfriend-left{
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	margin-right:0.5rem;
	position: relative;
}
.addfriend-left input{
	position: absolute;
	left:0;
	top:0;
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	opacity: 0;
	filter: Alpha(opacity=0);
}
.addfriend-left label{
	width:0.62rem;
	height:0.62rem;
	background-image:url(../../assets/img/my/weixuanzhong.png);
	background-size:cover;
	border-radius: 50%;
	display: block;
}
.addfriend-left input:checked+label{
	background-image:url(../../assets/img/my/xuanzhong.png);
	background-size:cover;
}
.msgcontaire-wrap-footer{
	height:1.6rem;
	padding:0 0.5rem;
	padding:0 0.5rem;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items:center ;
	border-top:1px solid #ddd;
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
	color:#1989F5;
	background: none;
}
</style>