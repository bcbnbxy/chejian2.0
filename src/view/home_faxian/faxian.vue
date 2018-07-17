<template>
<div class="faxian-wrap">
		<div class="faxianhead">
			<router-link tag="p" to="/search"><i class="iconfont icon-sousuo"></i></router-link>
			<p class="tabs-p"><span @click="toggle(index ,tab.view)" v-for="(tab,index) in tabs" :class="{active:active===index}">{{tab.type}} </span></p>
			<p @click="showpictextvideo"><i class="iconfont icon-zhaoxiangji" v-show="currentView==='dynamicslist'"></i></p>
			<div class="pic-text-video" v-show="$store.state.faxian.pic_text_video">
				<router-link :to="{name:'upload',params:{id:'picture'}}" tag="p">文图</router-link>
				<router-link :to="{name:'upload',params:{id:'video'}}" tag="p">视频</router-link>
			</div>
		</div>
	<div class="faxianlist" :style="{'-webkit-overflow-scrolling': scrollMode}">
		<div class="faxian-dynamicslist" v-show="currentView=='dynamicslist'">			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
		     		<dynamicslist :callbackdata="datalist"></dynamicslist>
		    </mt-loadmore>
		</div>
		<div class="faxian-attention" v-show="currentView=='Attention'">
			<Attention></Attention>
		</div>
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
    		],
    		datalist:[],                
	        pageNo:0,
	        pageSize:5,
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto" ,//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
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
		},
		gettrends:function(minvalue,pageSize){//获取动态列表
			var that=this;
			this.$api('/Execute.do',{minvalue:minvalue,pageSize:pageSize,action:'blog.blogs'}).then(function(r){
				if(r.errorCode=="0"){
					that.datalist=that.datalist.concat(r.data.blogs);
					if(r.data.blogs.length<5){
						that.allLoaded=true;
						return;
					}else{
						that.allLoaded=false;
					}
					that.pageNo=r.data.blogs[r.data.blogs.length-1].blogseq;
				}else{
					that.$toast({
			          message:r.errorMessage,
			          position: 'bottom',
	  				  duration: 1500
			        });
				}
			})
		},
		 loadTop:function() { //组件提供的下拉触发方法
	        //下拉刷新
	        this.datalist=[];
	        this.gettrends(0,5);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom:function(){
	    	this.gettrends(this.pageNo,5);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	    }
	},
	created(){
		this.gettrends(0,5)
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
	padding:0 0.48rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.48rem;
	position: relative;
}
.faxianhead>p:nth-child(1){
	position: absolute;
	left:0.48rem;
	top:0;
}
.faxianhead>p:nth-child(3){
	position: absolute;
	right:0.48rem;
	top:0;
}
.faxianhead>p i{
	font-size:0.66rem;
}
.faxianhead>p span{
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
	width:100%;
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
.mint-loadmore-text{
	font-size:0.56rem;
}
</style>