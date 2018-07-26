<template>
<div class="faxian-wrap">
	<div class="faxianhead">
		<span>动态</span>
		<i class="iconfont icon-zhaoxiangji" @click="showpictextvideo"></i>
		<div class="pic-text-video" v-show="$store.state.faxian.pic_text_video">
			<router-link to="/upload" tag="p">文图</router-link>
			<router-link to="/uploadvideo" tag="p">视频</router-link>
		</div>
	</div>
	<div class="faxianlist" :style="{'-webkit-overflow-scrolling': scrollMode}">
		<div class="faxian-dynamicslist">			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
		     		<dynamicslist :callbackdata="datalist"></dynamicslist>
		    </mt-loadmore>
		</div>
	</div>
</div>
</template>
<script>
import Dynamicslist from '@/components/search/dynamics'
import { MessageBox } from 'mint-ui'
export default{
	components:{Dynamicslist},
	data(){
		return {
    		datalist:[],   			    		
	        pageNo:0,
	        pageSize:5,
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto" ,//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
		}
	},
	methods:{
		showpictextvideo:function(){
			var that=this;
			if(localStorage.getItem('loginInfo')){
				this.$store.commit('changepopupmean');
				this.$store.commit('changepictextvideo');
			}else{
				MessageBox.confirm('', {
				    message: '您还没有登陆，去登陆',
				    showConfirmButton:true,
				    showCancelButton:true,
				    confirmButtonText:'确定',
				    cancelButtonText:'取消'
			        }).then(action => {
			          if (action == 'confirm') {
			            that.$router.push('/bootPage')
			          }
			        }).catch(err => {
			          if (err == 'cancel') {
			            console.log('123');
			          }
			    });
			}
			
		},
		gettrends:function(minvalue,pageSize){//获取动态列表
			var that=this;
			this.$api('/Execute.do',{minvalue:minvalue,pageSize:pageSize,action:'blog.blogs',userseq:0}).then(function(r){
				if(r.errorCode=="0"){
					console.log(JSON.stringify(r));
					if(r.data.blogs==undefined||r.data.blogs==null||r.data.blogs==""){
						that.$toast({
				            message:'暂无数据',
				            position: 'bottom',
		  				    duration: 1500
				        });
				        that.allLoaded=true;
						return ;
					}else{
						that.datalist=that.datalist.concat(r.data.blogs);
						if(r.data.blogs.length<5){
							that.allLoaded=true;
							return;
						}else{
							that.allLoaded=false;
							that.pageNo=r.data.blogs[r.data.blogs.length-1].blogseq;
						}						
					}					
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
	overflow: hidden;
}
.faxianlist{
	flex:1;
	overflow: auto;
}
.faxianhead{
	height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	width:100%;
	padding:0 0.5rem;
	text-align: center;
	line-height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	position: relative;
}
.faxianhead .icon-zhaoxiangji{
	position: absolute;
	right:0.5rem;
	font-size:0.7rem;
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