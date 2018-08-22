<template>
	<div class="homepage-wrap">
		<div class="homepage-wrap-head">
			<div class="homepage-wrap-headtop">
				<i class="iconfont icon-fanhui" @click="$router.go(-1)" style="font-size:0.6rem"></i>
				<span>主页</span>
				<span @click="gochat" v-show="friend&&$store.state.faxian.blogs.userseq&&$store.state.faxian.blogs.userseq!=ownerseq">私信</span>
			</div>
			<div class="homepage-wrap-headbottom">
				<img :src="headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+headphoto:require('../../assets/img/shouye/defaultavatar.png')" @click="bigImg(headphoto)"/>
				<div class="homepage-wrap-headbottom-info">
					<p>{{nickname}}</p>
					<p>{{descript}}</p>
					<p @click="addmarker" v-show="friend&&$store.state.faxian.blogs.userseq"><span>{{remarker}}</span><i class="iconfont icon-bianji"></i></p>
				</div>
				<p class="addfriend" v-show="!friend&&$store.state.faxian.blogs.userseq&&$store.state.faxian.blogs.userseq!=ownerseq" @click="addfriend(ownerseq)">加好友</p>
			</div>
		</div>
		<div class="homepage-container">
			<div class="homepage-container-center">
				<span v-for='(list,index) in lists' @click="toggle(index ,list.view)" :class="{active:active===index}">{{list.type}}</span>
				<b></b>
			</div>
			<div class="homepage-container-bottom">
				<div class="picture" v-show="currentView=='picture'">
					<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottom-pull-text="上拉加载">					
						<Picture  :data="item" :index="index" v-for="(item,index) in picturelist" :key="index" v-on:listendelpic="delpic"></Picture>
					</mt-loadmore>
				</div>
				<div class="video" v-show="currentView=='video'">
					<mt-loadmore :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" :auto-fill="false" ref="loadmore1" bottom-pull-text="上拉加载">					
						<Video :data="item" :index="index" v-for="(item,index) in videolist" :key="index" v-on:listendelvideo="delvideo"></Video>
					</mt-loadmore>
				</div>
			</div>
		</div>
		<div :class="showBigImg?'imgMask1':'imgMaskhidden1'" @click.stop="showBigImg=!showBigImg">
            <div class="showImg" >
                <img class="bigImg" :src="bigImgs?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+bigImgs:''">
            </div>
        </div>
	</div>
</template>
<script>
import Video from '@/components/faxian/video'
import Picture from '@/components/faxian/picture'
import { MessageBox } from 'mint-ui';
export default{
	components:{Video,Picture},
	data () {
		return {
			currentView:'picture',
			ownerseq:this.$store.state.faxian.blogs.touserseq,//点击的那个用户的唯一标示
			headphoto:null,
			friend:false,
			remarker:this.$store.state.faxian.blogs.remark?this.$store.state.faxian.blogs.remark:'请添加备注',
			nickname:null,
			descript:null,
			picturelist:[],
			videolist:[],
			allLoaded1:false,
			allLoaded:false,
			pagenum:0,
			pnum:0,
			pagesize:5,
			psize:5,
			bigImgs:'',
			showBigImg:false,
			active: 0,
			index:0,
			lists:[
				{
					type:"动态",
					view:'picture'
				},
				{
					type:"视频",
					view:'video',
				}
			]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	      if(this.currentView=='picture'){
	      		this.picturelist=[];
	      		this.videolist=[];
	      		this. getblogs(0,5);
	      }else if(this.currentView=='video'){
	      	this.picturelist=[];
	      	this.videolist=[];
	      	this.getblogsvideo(0,5);
	      }
	  },
	  delpic(obj){//删除图文动态
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
		            			that.picturelist.splice(obj.index,1);
		            		}
		            	})
		          }
		        }).catch(err => {
		          if (err == 'cancel') {
		            console.log('123');
		          }
		    });
	  },
	  delvideo(obj){//删除视频动态
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
		            			that.videolist.splice(obj.index,1);
		            		}
		            	})
		          }
		        }).catch(err => {
		          if (err == 'cancel') {
		            console.log('123');
		          }
		    });
	  },
	  bigImg(index){
    	  this.showBigImg = true;
    	  this.bigImgs = index;
	  },
	  addmarker(){//添加备注
	  	var that=this;
			MessageBox.prompt('',{
				message:'请填写备注',
				showConfirmButton:true,
          		showCancelButton:true,
          		confirmButtonText:'确定',
          		cancelButtonText:'取消'
			}).then(({ value, action }) => {
				if (action == 'confirm') {
	            	if(value.trim().length>1){	            		
	            		that.$api('/Execute.do',{action:'updateFriendInfo',friend:this.ownerseq,remark:value}).then(function(r){
	            			if(r.errorCode==0){
	            				that.remarker=value;
	            			}else{
	            				that.$toast({
				    				message:r.errorMessage,
				    				position:'bottom',
				    				duration:1500
				    			})
	            			}
	            		})
	            	}
	          	}
			}).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });
	    },
	    getuserInfo(){//获取用户信息
	    	var that=this;
	    	this.$api('/Execute.do',{action:'userInfo',userseq:this.ownerseq}).then(function(r){
	    		if(r.errorCode==0){
	    			if(r.data.userInfo==null||r.data.userInfo==undefined||r.data.userInfo==""){
	    				that.$toast({
		    				message:'没有数据',
		    				position:'bottom',
		    				duration:1500
		    			})
	    			}else{
	    				that.headphoto=r.data.userInfo.headphoto;
	    				that.nickname=r.data.userInfo.nickname;
	    				that.descript=r.data.userInfo.descript?r.data.userInfo.descript:'这个人很懒，什么也没有说';
	    				that.friend=r.data.userInfo.friend;
	    			}
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	}).then(function(r){
	    		that.$api('/Execute.do',{action:'blog.blogs',userseq:that.ownerseq,mediatype:0,minvalue:0,pageSize:5}).then(function(r){
		    		if(r.errorCode==0){
		    			console.log(JSON.stringify(r));
		    			if(r.data.blogs==undefined||r.data.blogs==null||r.data.blogs==""){
		    				that.$toast({
			    				message:"没有数据",
			    				position:'bottom',
			    				duration:1500
			    			})
		    				that.allLoaded=true;
		    			}else{
		    				that.picturelist=that.picturelist.concat(r.data.blogs);
							if(r.data.blogs.length<5){
								that.allLoaded=true;
							}else{
								that.allLoaded=false;
								that.pnum=r.data.blogs[r.data.blogs.length-1].blogseq;
							}
		    			}
		    		}else{
		    			that.$toast({
		    				message:r.errorMessage,
		    				position:'bottom',
		    				duration:1500
		    			})
		    		}
		    	})
	    	})
	    },
	    gochat(){//跳往聊天页面
	    	this.$router.push({name:'chat',params:{chatgroup:0,nickname:this.remarker=='添加备注'?this.nickname:this.remarker,userseq:this.ownerseq}});
	    },
	    getblogs(pnum,psize){//获取动态列表
	    	var that=this;
	    	this.$api('/Execute.do',{action:'blog.blogs',userseq:this.ownerseq,mediatype:0,minvalue:pnum,pageSize:psize}).then(function(r){
	    		if(r.errorCode==0){
	    			if(r.data.blogs==undefined||r.data.blogs==null||r.data.blogs==""){
	    				that.$toast({
		    				message:"没有数据",
		    				position:'bottom',
		    				duration:1500
		    			})
	    				that.allLoaded=true;
	    			}else{
	    				that.picturelist=that.picturelist.concat(r.data.blogs);
						if(r.data.blogs.length<5){
							that.allLoaded=true;
						}else{
							that.allLoaded=false;
							that.pnum=r.data.blogs[r.data.blogs.length-1].blogseq;
						}
	    			}
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	})
	    },
	    loadTop(){ //组件提供的下拉触发方法
	        //下拉刷新
	        this.picturelist=[];
	        this.getblogs(0,5);
	        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom(){
	    	this.getblogs(this.pnum,5);
	    	this.$refs.loadmore.onBottomLoaded();	    	
	    },
	    getblogsvideo(pnum,psize){//获取视频动态列表
	    	var that=this;
	    	this.$api('/Execute.do',{action:'blog.blogs',userseq:this.ownerseq,mediatype:1,minvalue:pnum,pageSize:psize}).then(function(r){
	    		if(r.errorCode==0){
	    			console.log(JSON.stringify(r));
	    			if(r.data.blogs==undefined||r.data.blogs==null||r.data.blogs==""){
	    				that.$toast({
		    				message:"没有数据",
		    				position:'bottom',
		    				duration:1500
		    			})
	    				that.allLoaded1=true;
	    			}else{
	    				that.videolist=that.videolist.concat(r.data.blogs);
						if(r.data.blogs.length<5){
							that.allLoaded1=true;
						}else{
							that.allLoaded1=false;
							that.pagenum=r.data.blogs[r.data.blogs.length-1].blogseq;
						}
	    			}
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	})
	    },
	    loadTop1(){ //组件提供的下拉触发方法
	        //下拉刷新
	        this.videolist=[];
	        this.getblogsvideo(0,5);
	        this.$refs.loadmore1.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    },
	    loadBottom1(){
	    	this.getblogsvideo(this.pagenum,5);
	    	this.$refs.loadmore1.onBottomLoaded();	    	
	    },
	    addfriend(userseq){//添加好友
			var that=this;
			if(localStorage.getItem('loginInfo')){
				this.$api('/Execute.do',{action:'sendFriendMessage',userseq:userseq}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
			          		message:'消息已发送',
				            position: 'bottom',
		  				    duration: 1500
			            });
					}else{
						that.$toast({
			          		message:r.errorMessage,
				            position: 'bottom',
		  				    duration: 1500
			            });
					}
				})
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
	},
	mounted(){
		this.getuserInfo();
	}
}
</script>

<style scoped>
.homepage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
}
.homepage-wrap-head{
	width:100%;
	height:4.95rem;
	background-image:url(../../assets/img/shouye/bg.png) ;
	padding-top:0.6rem;
	background-size:cover;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.homepage-wrap-head{
		width:100%;
		height:5.67rem;
		background-image:url(../../assets/img/shouye/bg.png) ;
		padding-top:1.32rem;
		background-size:cover;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
}
.homepage-wrap-headtop{
	width:100%;
	height:1.32rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.44rem;
	position: relative;
	
}
.homepage-wrap-headtop .icon-fanhui{
	position: absolute;
	left:0.5rem;
}
.homepage-wrap-headtop span:nth-child(3){
	position: absolute;
	right:0.5rem;
}
.homepage-wrap-headtop span:nth-child(2){
	font-size:0.56rem;
}
.homepage-wrap-headbottom{
	padding:0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	font-size:0.44rem;
	flex: 1;
}
.homepage-wrap-headbottom>img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.homepage-wrap-headbottom-info{
	height:100%;
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-around;
	line-height: 1;
	padding-left:0.5rem;
	color:#fff;
}
.homepage-wrap-headbottom-info>p:nth-child(1){
	font-size:0.5rem;
}
.homepage-wrap-headbottom-info>p:nth-child(2){
	font-size:0.38rem;
}
.homepage-wrap-headbottom-info>p:nth-child(3){
	font-size:0.38rem;
}
.homepage-wrap-headbottom-info>p:nth-child(3) .icon-bianji{
	font-size:0.44rem;
	margin-left:0.5rem;
}
.addfriend{
	line-height: 1;
	padding:0.3rem 0.5rem;
	color:#fff;
	border-radius: 0.6rem;
	background: #ff481d;
}
.homepage-container{
	flex:1;
	background: #f7f7f7;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homepage-container-center{
	height:1.58rem;
	background:#006bff;
	color:#fff;
	font-size:0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	position: relative;
}
.homepage-container-center span{
	padding:0 0.52rem;
	height:1.58rem;
	line-height:1.58rem;
	text-align: center;
	position: relative;
}
.homepage-container-center b{
	content:'';
	height:1rem;
	width:1px;
	background:#fff;
	display: block;
	position: absolute;
	right:50%;
	top:0.29rem;
}
.homepage-container-center .active{
	border-bottom:1px solid #fff;
}
.homepage-container-bottom{
	flex:1;
	overflow:hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.picture,.video{
	flex:1;
	overflow-y: auto;
}
.imgMask1{
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
.imgMaskhidden1{
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
</style>