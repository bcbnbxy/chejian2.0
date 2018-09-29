<template>
<div class="faxian-wrap">
	<div class="faxianhead">
		<span>动态</span>
		<i class="iconfont icon-zhaoxiangji" @click="showpictextvideo"></i>		
	</div>
	<div class="faxianlist">
		<div class="faxian-dynamicslist" id="scrollTop">			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载" :bottom-distance="50">
		     	<dynamicslist :callbackdata="datalist" v-on:listendel="deltrends"></dynamicslist>
		    </mt-loadmore>
		</div>
	</div>
	<div class="vmint-poup" v-show="popupVisible" @click="popupVisible=!popupVisible">
    	<div class="pic-text-video">
			<router-link to="/upload" tag="p">文图</router-link>
			<router-link to="/uploadvideo" tag="p">视频</router-link>
		</div>
	</div>
</div>
</template>
<script>
import Dynamicslist from '@/components/search/dynamics'
import { MessageBox } from 'mint-ui'
export default{
	name:'faxian',
	components:{Dynamicslist},
	data(){
		return {
    		datalist:[],    		
	        pageNo:0,
	        pageSize:5,
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            popupVisible:false
		}
	},
	methods:{
		showpictextvideo:function(){
			var that=this;
			if(localStorage.getItem('loginInfo')){
				that.popupVisible=true;
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
		deltrends(obj){
			var that=this;
			MessageBox.confirm('', {
			    message: '确定要删除此条动态码？',
			    showConfirmButton:true,
			    showCancelButton:true,
			    confirmButtonText:'确定',
			    cancelButtonText:'取消'
		        }).then(action => {
		          if (action == 'confirm') {
		            	that.$api('Execute.do',{action:'blog.removeBlog',blogseq:obj.blogseq}).then(function(r){
		            		if(r.errorCode==0){
		            			that.datalist.splice(obj.index,1);
		            		}
		            	})
		          }
		        }).catch(err => {
		          if (err == 'cancel') {
		            console.log('123');
		          }
		    });
		},
		gettrends:function(minvalue,pageSize){//获取动态列表
			var that=this;
			this.$api('/Execute.do',{minvalue:minvalue,pageSize:pageSize,action:'blog.blogs',userseq:0}).then(function(r){
				if(r.errorCode=="0"){
					if(r.data.blogs==undefined||r.data.blogs==null||r.data.blogs==""){
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
    },
    beforeRouteLeave(to, from, next) {
    	if(to.path=='/detailpage' || to.path=='/detailvideo' || to.path=='/homepage'){
    		localStorage.setItem('ScrollTop',document.getElementById('scrollTop').scrollTop)
    		from.meta.keepAlive = true;
    		this.$store.commit('add','faxian');
    		next();
    	}else{    		
    		from.meta.keepAlive = false;
    		localStorage.removeItem('ScrollTop')
    		this.$store.commit('add','');
    		next();
    	} 
    },
     beforeRouteEnter(to, from, next) {
        next(setTimeout(()=>{ 
        	if(to.meta.keepAlive){
		        document.getElementById('scrollTop').scrollTop=parseInt(localStorage.getItem('ScrollTop'));
		    }
	       },300) 
        );
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
	padding-bottom: 1.45rem;
}
.faxianhead{
	height:1.92rem;
	font-size:0.56rem;
	color:#fff;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.faxianhead{
		height:2.64rem;
		font-size:0.56rem;
		color:#fff;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		position: relative;
	}
}
.faxianhead .icon-zhaoxiangji{
	position: absolute;
	right:0.5rem;
	font-size:0.7rem;
}
.vmint-poup{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.5);
	position: fixed;
	left:0;
	top:0;
	z-index: 2001;
}
.pic-text-video{
	width:6rem;
	background:#fff;
	position: absolute;
	right:0.5rem;
	top:1.32rem;
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
.faxianlist{
	background: #f7f7f7;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.faxian-dynamicslist{
	flex:1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
</style>