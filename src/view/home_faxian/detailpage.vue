<template>
	<div class="detail">
		<div class="detail-head">
			<i class="iconfont icon-fanhui" @click="$router.back(-1)" style="font-size:0.6rem"></i>
			<span>详情</span>
		</div>
		<div class="detail-wrap">
			<div class="pic-detail">
				<div class="fourpicture-avatar clear">
					<div class="fourpicture-avatar-left"><img :src="data.owner.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+data.owner.headphoto:defaultImg" width="46" height="46" style="border-radius: 50%;"/><p><b>{{data.owner.nickname}}</b><span>{{formatDate(data.createtime)}}</span></p></div>
				</div>
				<div class="fourpicture-content">
					<div class="fourpicture-box">
						<div class="swiper-container">
						  <div class="swiper-wrapper">
						    <div class="swiper-slide" v-for="(item,index) in data.images" :key="index"><img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item+'?x-oss-process=image/resize,l_1140'" @click="bigImg(item)"/></div>
						  </div>
						  <div class="swiper-pagination"></div>
						</div>
					</div>
					<p>{{data.content}}</p>
				</div>
				<div class="pic-detail-zan" @click="blogPraisers.length>0&&togglepraise()">
					<ul class="avatar-list">
						<li v-for="(item,index) in blogPraisers"><img :src="item.user.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.user.headphoto:require ('../../assets/img/shouye/defaultavatar.png')"/></li>
					</ul>
					<div class="dianzan-renshu">
						<p>{{data.praisecount}}人觉得很赞</p><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</div>
				</div>
			</div>
			<div class="detail-reply" id="scroll" v-if="replylist.length>0">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">
		     		<Reply-list v-for="(item,index) in replylist" :replyitem="item" :key="index"></Reply-list>
		        </mt-loadmore>				
			</div>
			<div class="detail-noreply" v-else>	
				<p>哎同学，这个沙发你不抢吗~</p>
			</div>
		</div>
		<div class="detail-foot">
			<div class="detail-footer">
				<div class="input" @click="toggleInput"><span>发表评论...</span></div>
				<p @click="togglezan($route.params.datalist.blogseq)"><i class="iconfont icon-dianzan" :style="$route.params.datalist.praised?'color:#ff0000':''"></i><span>{{$route.params.datalist.praisecount}}</span></p>
				<p @click="goTop"><i class="iconfont icon-xiaoxi1"></i><span>{{$route.params.datalist.refcount}}</span></p>
			</div>
			<div class="detail-input" :class="detailinput?'detail-input-show':'detail-input-hidden'">
				<input type="text" ref="send" @blur.prevent="blurFn" v-model="content" v-on:focus="focusIpt"/><span @click="Send">发送</span>
			</div>
		</div>
		<div class="praise-contaire" :class="praiseflag?'praise-contaire-show':'praise-contaire-hidden'">
			<Praise v-on:praiseshow="togglepraise" :praisers="blogPraiserssum"></Praise>
		</div>
		<div :class="showBigImg?'imgMask':'imgMaskhidden'" @click.stop="showBigImg=!showBigImg">
            <div class="showImg" >
                <img class="bigImg" :src="bigImgs?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+bigImgs:''">
            </div>
        </div>
	</div>
</template>

<script>
//import Swiper from "swiper"
import Reply from '@/components/faxian/replylist'
import Praise from '@/components/faxian/praise'
import { MessageBox } from 'mint-ui'
let stop = false;                                   // 全局变量,坑处
let timer = null;
export default{	
	mounted() {
		this.getblogReviews(0,5)
        this.$nextTick(function () {
            window.addEventListener('scroll', this.needToTop);  //滚动事件监听
        });
        this._initSwiper()
   },
	data(){
		return {
			data:this.$route.params.datalist,
			defaultImg:require('../../assets/img/shouye/defaultavatar.png') ,
			praiseflag:false,
			detailinput:false,
			content:'',
			replylist:[],
			pageNo:0,
	        pageSize:5,
	        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
	        sendflag:false,
	        showBigImg:false,
	        bigImgs:'',
	        blogPraisers:[],
	        blogPraiserssum:[],
	        timer:null
		}
	},
	components:{'Reply-list':Reply,'Praise':Praise },
	methods:{
		_initSwiper(){
			var mySwiper = new Swiper('.swiper-container',{
				direction:'horizontal',
				pagination: {
			    el: '.swiper-pagination',
			    type: 'fraction',
			  },
			})
		},
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
		},
		getblogPraiser(){//获取点赞列表
			var that=this;
			this.$api('/Execute.do',{action:'blog.blogPraisers',blogseq:this.$route.params.datalist.blogseq,minvalue:0,pageSize:this.$route.params.datalist.praisecount}).then(function(r){
				if(r.errorCode==0&&r.data.blogPraisers.length!=0){
					if(r.data.blogPraisers.length<=5){
						that.blogPraisers=r.data.blogPraisers;
					}else{						
						for(let i=0;i<5;i++){
							that.blogPraisers.push(r.data.blogPraisers[i])
						}
					}
					that.blogPraiserssum=r.data.blogPraisers;
				}else{
					that.$toast({
		          		message:r.errorMessage,
			            position: 'bottom',
	  				    duration: 1500
	                });
				}
			})
		},
		togglepraise(){
			this.praiseflag=!this.praiseflag;
		},
		toggleInput(){
			this.detailinput=true;
			this.$refs.send.focus();
		},
		blurFn(){
			this.detailinput=false;
			this.$refs.send.blur();
			clearInterval(this.timer)
		},
		focusIpt() { // 解决输入框被激活时被键盘遮住问题
	      this.timer = setInterval(function() {
	          document.body.scrollTop = document.body.scrollHeight
	       }, 100)
	    },
		goTop(){
			if(this.replylist.length==0){
				return ;
			};
			var scroll=document.getElementById('scroll');
			clearInterval(timer);
	        timer = setInterval(function() {
	            let curHeight = scroll.scrollTop
	            var now = curHeight;
	            var speed = (0 - now) / 7;					
	            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	            if (curHeight === 0) {		
	              clearInterval(timer);  		
	            }
	            scroll.scrollTop = curHeight + speed;
	       }, 30);
		},
		needToTop() {
	        if (stop) {			
	          clearInterval(timer);	
	        }
	        stop = true;
	    },
	    Send(){//发表评论
		    	if(localStorage.getItem('loginInfo')){
			    	if(this.content.trim().length<1){
			    		this.$toast({
			          		message:"评论不能为空!",
				            position: 'bottom',
		  				    duration: 1500
			           });
			           this.detailinput=true;
					   this.$refs.send.focus();
			    	}else{
			    		var that=this;
			    		var params={action:'blog.addBlogReview',blogseq:this.data.blogseq,content:this.content}
			    		this.$api('/Execute.do',params).then(function(r){
			    			if(r.errorCode==0){
			    				that.content="";
			    				that.$toast({
					          		message:"发表评论成功",
						            position: 'bottom',
				  				    duration: 1500
					          });
							   that.$route.params.datalist.refcount=parseInt(that.$route.params.datalist.refcount)+1;
							   that.sendflag=true;
					           that.getblogReviews(0,5)
			    			}else{
			    				that.$toast({
					          		message:r.errorMessage,
						            position: 'bottom',
				  				    duration: 1500
				                });
			    			}
			    		})
			    	}
	    	}else{
	    		MessageBox.confirm('', {
			        message: '您还没有登录，去登录',
			        showConfirmButton:true,
			        showCancelButton:true,
			        confirmButtonText:'确定',
			        cancelButtonText:'取消'
		        }).then(action => {
		          if (action == 'confirm') {
		            this.$router.push('/bootPage')
		          }
		        }).catch(err => {
		          if (err == 'cancel') {
		            console.log('123');
		          }
		        });
	    	}
	    },
	     bigImg(index){
            this.showBigImg = true;
            this.bigImgs = index;
        },
	    getblogReviews(minvalue,pageSize){//获取评论列表
	    	var that=this;
	    	this.$api('/Execute.do',{action:'blog.blogReviews',blogseq:this.data.blogseq,minvalue:minvalue,pageSize:pageSize}).then(function(r){
	    		if(r.errorCode==0){
	    			if(r.data.blogReviews.length<1){
	    				that.$toast({
		    				message:'没有更评论了',
		    				position:'bottom',
		    				duration:1500
		    			})
	    			}else{
	    				if(that.sendflag){
		    				that.replylist.unshift(r.data.blogReviews[0]);
		    				that.sendflag=false;
		    				that.pageNo=that.replylist[that.replylist.length-1].reviewseq;
		    			}else{
		    				that.replylist=that.replylist.concat(r.data.blogReviews);
		    				that.pageNo=r.data.blogReviews[r.data.blogReviews.length-1].reviewseq;
		    			}
		    			if(r.data.blogReviews.length<5){
							that.allLoaded=true;
							return;
						}else{
							that.allLoaded=false;
						}
	    			}	    			
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	}).then(function(){
				that.getblogPraiser();
			})
	    },
	    loadTop(){ //组件提供的下拉触发方法
	        //下拉刷新
	        this.replylist=[];
	        this.getblogReviews(0,5);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom(){
	    	this.getblogReviews(this.pageNo,5);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	    },
	    togglezan(blogseq){//点赞和取消点赞
	    	var that=this;
	    	if(localStorage.getItem('loginInfo')){
				if(this.$route.params.datalist.praised){//取消点赞
					this.$api('/Execute.do',{action:'blog.cancelPraiseBlog',blogseq:blogseq}).then(function(r){
						if(r.errorCode==0){
							that.$route.params.datalist.praised=!that.$route.params.datalist.praised;
							that.$route.params.datalist.praisecount=parseInt(that.$route.params.datalist.praisecount)-1;
						}else{
							that.$toast({
				          		message:r.errorMessage,
					            position: 'bottom',
			  				    duration: 1500
				            });
						}
					}).then(function(){
						that.getblogPraiser();
					})
				}else{//点赞
					this.$api('/Execute.do',{action:'blog.praiseBlog',blogseq:blogseq}).then(function(r){
						if(r.errorCode==0){
							that.$route.params.datalist.praised=!that.$route.params.datalist.praised;
							that.$route.params.datalist.praisecount=parseInt(that.$route.params.datalist.praisecount)+1;
						}else{
							that.$toast({
				          		message:r.errorMessage,
					            position: 'bottom',
			  				    duration: 1500
				            });
						}
					}).then(function(){
						that.getblogPraiser();
					})
				}
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
	    }
	}
}
</script>

<style scoped>
.detail{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
	background:#f7f7f7;
	position: relative;
}
.praise-contaire{
	width:100%;
	height:100%;
	background: tan;
	position: absolute;
	top:0;
}
.praise-contaire-show{
	left:0;
	transition: all 0.3s;
}
.praise-contaire-hidden{
	left:100%;
	transition: all 0.3s;
}
.detail-head{
	width:100%;
	height:1.92rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	position:relative;
	color:#fff;
	font-size:0.56rem;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.detail-head{
		width:100%;
		height:2.64rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size:cover ;
		padding:0 0.5rem;
		padding-top:1.32rem;
		text-align: center;
		line-height:1.32rem;
		position:relative;
		color:#fff;
		font-size:0.56rem;
	}
}
.detail-head i{
	font-size:0.6rem;
	position:absolute;
	left:0.5rem;
}
.detail-wrap{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction:column ;
}
.pic-detail{
	background: #fff;
	padding:0 0.48rem;
	border-bottom:1px solid #dcdcdc;
}
.detail-reply{
	flex:1;
	background:#fff;
	overflow: auto;
}
.detail-noreply{
	flex:1;
	font-size:0.52rem;
	color:#999;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
}
.fourpicture-avatar{
	padding-top:0.81rem;
	height:2.7rem;
}
.fourpicture-avatar-left{
	float: left;
	display: flex;
	display: -webkit-flex;
}
.fourpicture-avatar-left img{
	margin-right:0.51rem;
}
.fourpicture-avatar-left p{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	font-size:0.52rem;
	color:#222;
	font-weight: 500;
	justify-content: space-around;
}
.fourpicture-avatar-left p span{
	font-size:0.44rem;
	color:#666;
}
.fourpicture-avatar-right{
	float:right;
	padding-top:0.3rem;
}
.fourpicture-avatar-right p{
	padding:0.15rem 0.36rem;
	background: #ff481d;
	color:#fff;
	font-size:0.3rem;
	border-radius: 15px;
}
.fourpicture-content p{
	line-height:0.74rem;
	font-size:0.44rem;
	color:#333;
	margin:0;
	padding:0;
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	margin-top:0.24rem;
}
.fourpicture-box{
	width:100%;
	height:6.18rem;
}
.fourpicture-box img{
	width:11.4rem;
	height:6.18rem;
	display: block;
}
.fourpicture-box-moreimg{
	width:100%;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
}
.fourpicture-box-moreimg img{
	width:32%;
	height:3.48rem;
	margin:0.1rem 0;
}
.fourpicture-box-moreimg img:nth-child(3n-1){
	margin:0.1rem 2%;
}
.pic-detail-zan{
	padding-top:0.42rem;
	height:2rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.avatar-list{
	position: relative;
}
.avatar-list li{
	width:0.94rem;
	height:0.94rem;
	position: absolute;
	top:0.35rem;
}
.avatar-list li img{
	width:100%;
	height:100%;
	border-radius: 50%;
}
.avatar-list li:nth-child(1){
	left:0;
}
.avatar-list li:nth-child(2){
	left:0.65rem;
}
.avatar-list li:nth-child(3){
	left:1.3rem;
}
.avatar-list li:nth-child(4){
	left:1.95rem;
}
.avatar-list li:nth-child(5){
	left:2.6rem;
}
.dianzan-renshu{
	font-size:0.44rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	align-items: center;
}
.detail-foot{
	width: 100%;
	background: #fff;
	border-top:1px solid #ddd;
	height:1.62rem;
	position: relative;
}
.detail-footer{
	width: 100%;
	height:1.62rem;	
	padding:0.3rem 0.48rem;
	display:flex ;
	display: -webkit-flex;
	justify-content: flex-end;
	font-size:0.52rem;
	align-items: center;
}
.detail-footer>.input{
	flex:1;
	background:#eee;
	height:1.02rem;
	padding-left:0.5rem;
	border-radius: 5px;
	line-height: 1.02rem;
}
.detail-input{
	height:1.62rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	font-size:0.44rem;
	color:#222;
	position: absolute;
	left:0;
	top:0;
}
.detail-input-hidden{
	transform: translateY(-1.6rem) scale(0);
	transition:all 0.1s;
}
.detail-input-show{
	transform: translateY(0) scale(1);
	transition:all 0.1s;
}
.detail-input input{
	flex:1;
	height:1.02rem;
	background: #eee;
	border-radius: 5px;
	margin-right:0.55rem;
	padding:0 0.3rem;
}
.detail-input span{
	font-size:0.52rem;
	padding-left:0.5rem;
}
.detail-foot p{
	margin-left:0.8rem;
	color:#666;
}
.detail-foot p i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.3rem;
	vertical-align: bottom;
}
.clear:after {
    clear: both;
    content: " ";
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
.icon-arrow-right-copy-copy-copy{
	font-size:0.44rem;
}
.imgMask{
    position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,.8); 
    transform: scale(1);
    transition: all 0.3s;
}
.imgMaskhidden{
	position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,.8);
    transform: scale(0);
    transition: all 0.3s;
}
.showImg{
    width:100%;
    padding:0 0.5rem;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
.bigImg{
    max-width:100%;
    height:auto;
}

.swiper-pagination{
	text-align: right;
	color:#fff;
	font-size:0.6rem;
	padding-right:0.5rem;
}
</style>