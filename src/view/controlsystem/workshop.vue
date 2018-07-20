<template>
<div class="workshop-wrap">
	<div class="workshop-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>车间</span>
	</div>
	<div class="workshop-wrap-contaire">
		<div class="workshop-wrap-contaire-nav">
			<b></b><span>全部({{customerCount}})</span>
		</div>
		<div class="workshop-wrap-contaire-webview">			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
	     		<Workshop_all v-for="(item,index) in customers" :customers="item" :key="index" :str="1"></Workshop_all>
	    	</mt-loadmore>
		</div>
	</div>
</div>
</template>

<script>
import Workshop_all from '@/components/controlsystem/workshop_all'
export default{
	components:{Workshop_all},
	data(){
		return {
			customers:[],
			customerCount:0,
			pnum:0,
			psize:12,
			allLoaded:false,
		}
	},
	mounted(){
		this.getcustomers(this.pnum,this.psize);
	},
	methods:{
		getcustomers(minvalue,pageSize){//获取客户列表
			var that=this;
			this.$api('/Execute.do',{action:'device.customers;device.customerCount',minvalue:minvalue,pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					that.customerCount=r.data.customerCount;
					that.customers=that.customers.concat(r.data.customers);
					if(r.data.customers.length<10){
						that.allLoaded=true;
					}else{
						that.allLoaded=false;
						that.pnum=r.data.customers[r.data.customers.length-1].userseq;
					}
				}
			})
		},
		loadTop(){//下拉刷新
			this.customers=[];
			this.getcustomers(0,this.psize);
			this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom(){//上拉加载
			this.getwarns(this.pnum,this.psize);
	    	this.$refs.loadmore.onBottomLoaded();	 
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
	align-items: center;
	text-align: left;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
}
.workshop-wrap-contaire-nav b{
	width: 0.12rem;
    height: 0.5rem;
    background: #1989f5;
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