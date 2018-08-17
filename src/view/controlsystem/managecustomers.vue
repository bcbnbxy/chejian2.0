<template>
<div class="managecustomers-wrap">
	<div class="managecustomers-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>管理我的客户</span>
	</div>
	<div class="managecustomers-wrap-list">
		<ul>
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
				<li @click="gocustomerinfo(item)" v-for="(item,index) in customerlist" :key="index"><img :src="item.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/><span>{{item.remark?item.remark:item.userInfo.nickname}}</span></li>						
	   	    </mt-loadmore>
		</ul>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return{
			psize:13,
			pnum:0,
			allLoaded:false,
			customerlist:[],
		}
	},
	methods:{
		getcustomers(minvalue,pageSize){//获取客户列表
			var that=this;
			this.$api('/Execute.do',{action:'device.customers',minvalue:minvalue,pageSize:pageSize}).then(function(r){
				if(r.errorCode==0){
					if(r.data.customers==null||r.data.customers==undefined||r.data.customers==""){
						return;
					}else{
						that.customerlist=that.customerlist.concat(r.data.customers);
						if(r.data.customers.length<13){
							that.allLoaded=true;
						}else{
							that.allLoaded=false;
							that.pnum=r.data.customers[r.data.customers.length-1].userseq;
						}
					}					
				}
			})
		},
		loadTop(){//下拉刷新
			this.customerlist=[];
			this.getcustomers(0,this.psize);
			this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
		},
		loadBottom(){//上拉加载
			this.getcustomers(this.pnum,this.psize);
	    	this.$refs.loadmore.onBottomLoaded();	 
		},
		gocustomerinfo(customerinfo){
			this.$store.commit('setcustomerinfo',customerinfo);
			this.$router.push('/customerinfo')
//			:to="{name:'customerinfo',params:{customerinfo:item}}"
		}

	},
	mounted(){
		this.getcustomers(this.pnum,this.psize);
	}
}
</script>
<style scoped>
.managecustomers-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: flex;
	flex-direction: column;
}
.managecustomers-wrap-head{
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
	position: relative;
}
.managecustomers-wrap-head i{
	position:absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.managecustomers-wrap-list{
	flex:1;
	overflow: auto;
}
.managecustomers-wrap-list li{
	background: #fff;
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.managecustomers-wrap-list li img{
	height:1rem;
	width:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
}
</style>