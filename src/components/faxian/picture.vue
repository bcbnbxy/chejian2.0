<template>
	<div class="fourpicture" id="fourpicture">
		<div class="fourpicture-avatar">
			<div class="fourpicture-avatar-left"><img :src="datalist.owner.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+datalist.owner.headphoto:defaultImg"/><p><b>{{datalist.owner.nickname}}</b><span>{{formatDate(datalist.createtime)}}</span></p></div>
		</div>
		<router-link tag="div" class="fourpicture-content" :to="{name:'detailpage',params:{datalist}}">
			<p>{{datalist.content}}</p>
			<div class="fourpicture-box" v-if="datalist.images&&datalist.images.length==1">
				<img  v-lazy="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+datalist.images"/>
			</div>
			<div class="fourpicture-box-moreimg" v-else-if="datalist.images&&datalist.images.length>1">
				<img  v-lazy="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item+'?x-oss-process=image/resize,m_fill,h_348,w_364'" v-for="(item,index) in datalist.images" :key="index"/>
			</div>
		</router-link>
		<div class="fourpicture-title">
			<p><i class="iconfont icon-xin" :style="datalist.praised?'color:#ff0000':''" @click="togglePraise(datalist.blogseq,datalist.praisecount)"></i><span>{{datalist.praisecount}}</span></p>
			<router-link :to="{name:'detailpage',params:{datalist}}" tag="p"><i class="iconfont icon-xiaoxi1"></i><span>{{data.refcount}}</span></router-link>
			<p @click="deltrends(index,datalist.blogseq)" style="vertical-align: middle;" v-show="$store.state.faxian.blogs.userseq==datalist.userseq"><i class="iconfont icon-shanchu" style="font-size:0.46rem;"></i></p>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	export default{
		props:['data','index'],
		data(){
			return {
				defaultImg:require('../../assets/img/shouye/defaultavatar.png') ,
				datalist:this.data,
				obj:{
					index:'',
					blogseq:''
				}
			}
		},
		methods:{
			popupmeanreport:function(){
				this.$store.commit('changepopupmean_more');
				this.$store.commit('changereport');
			},
			deltrends(index,blogseq){
				this.obj.index=index;
				this.obj.blogseq=blogseq;
				this.$emit('listendelpic',this.obj)
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
			togglePraise(blogseq,count){//点赞帖子
				var that=this;
				if(localStorage.getItem('loginInfo')){
					if(this.datalist.praised){//取消点赞
						this.$api('/Execute.do',{action:'blog.cancelPraiseBlog',blogseq:blogseq}).then(function(r){
							if(r.errorCode==0){
								that.datalist.praised=!that.datalist.praised;
								that.datalist.praisecount=parseInt(count)-1;
							}else{
								that.$toast({
					          		message:r.errorMessage,
						            position: 'bottom',
				  				    duration: 1500
					            });
							}
						})
					}else{//点赞
						this.$api('/Execute.do',{action:'blog.praiseBlog',blogseq:blogseq}).then(function(r){
							if(r.errorCode==0){
								that.datalist.praised=!that.datalist.praised;
								that.datalist.praisecount=parseInt(count)+1;
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
		watch:{
			data:function(){
				this.datalist=this.data;
			}
		}
	}
</script>

<style scoped>
.fourpicture{
	background: #fff;
	padding:0 0.48rem;
	margin-bottom:0.3rem;
	position: relative;
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
	width:1.42rem;
	height:1.42rem;
	border-radius: 50%;
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
	line-height: 1;
	padding:0.23rem 0.36rem;
	background: #ff481d;
	color:#fff;
	font-size:0.52rem;
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
	margin-top:0.24rem;
}
.fourpicture-box img{
	max-width:11.4rem;
	max-height:6.18rem;
	display: block;
}
.fourpicture-box-moreimg{
	width:100%;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
	margin-top:0.24rem;
}
.fourpicture-box-moreimg img{
	width:3.64rem;
	height:3.48rem;
	margin:0.1rem 0;
}
.fourpicture-box-moreimg img:nth-child(3n-1){
	margin:0.1rem 2%;
}
.fourpicture-title{
	height:1.5rem;
	line-height:1.3rem;
	text-align: right;
}
.fourpicture-title p{
	font-size:0.38rem;
	color:#666;
	margin-left:0.6rem;
	display: inline;
}
.fourpicture-title p:nth-child(3){
	font-size:1rem;
	vertical-align: bottom;
}
.fourpicture-title .icon-xin{
	display: inline-block;
	vertical-align: baseline !important;
}
.fourpicture-title p .icon{	
	font-size:0.6rem;
	margin-right:0.12rem;
}
.fourpicture-title p .iconfont{
	vertical-align: middle;
	font-size:0.6rem;
	margin-right:0.12rem;
}
.popupmean-more{
	position: absolute;
	width:6rem;
	height:4.72rem;
	background: #fff;
	border-radius: 5px;
	z-index: 11;
	bottom:0;
	right:0.5rem;
}
.popupmean-more li{
	height:1.57rem;
	border-bottom:1px solid #dcdcdc;
	font-size:14px;
	color:#666;
	line-height:1.57rem;
	text-align: center;
}
.popupmean-more li:last-child{
	border-bottom:none;
}
</style>