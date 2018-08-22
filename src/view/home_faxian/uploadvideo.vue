<template>
	<div class="upload-wrap">
		<div class="upload-head">
			<span @click="$router.go(-1)">取消</span>
			<span @click="publish">发布</span>
		</div>
		<div class="upload-container">
			<div class="upload-container-top">
				<textarea placeholder="文字不能超过120个" v-model="content" maxlength="120" @input="descInput" ref="textareaed"></textarea>
			</div>
			<div class="upload-container-bottom">
				<div class="picturelist">
					<img :src="poster" v-if="poster" style="width:3.48rem;height:3.48rem;"/>
					<div class="upload-button imglist" :class="videoflag?'':'upload-button-hidden'">
						<p  @click="actionSheetpic"></p>
						<mt-actionsheet :actions="actionpic"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
					</div>
				</div>				
			</div>
			<div class="upload-container-remnant"><span>{{remnant}}/120</span></div>
		</div>
	</div>
</template>
<script>
import store from '../../store'
import {buildSign} from '../../assets/script/until.js'
export default{
	data(){
		return {
			content:'',
			remnant: 120,
			actionpic: [{  
		        name: '选择视频',  
		        method : this.pickervideo// 调用methods中的函数   选择视频
		      }, {  
		        name: '拍摄视频',   
		        method : this.testVideo// 调用methods中的函数  拍摄视频
		      }], 
		    sheetVisible: false,
		    videoid:'',
		    videoflag:true,
		    poster:'',
		    params:{
		    	action:'blog.addBlog',
		    	mediatype:'1',
		    }
		}
	},
	methods:{
		actionSheetpic(){
		  this.$refs.textareaed.blur();
	      this.sheetVisible = true;  
	    },  
	    pickervideo(){//选择视频
	    	var that=this;
	    	window.pickVideo(function(result){
	    		if(result==""||result==null||result==undefined){
		        	that.sheetVisible=false;
		      	    that.$toast({
		                message: "请重新选择图片",
		                position: 'bottom',
				        duration: 1500
		            });
		      	    return ;
		       }else{		      	    
		      	    setTimeout(function(){
						that.testUploadVodAli(result)
					},50)
		        }	
	    	},function(code,error){
	    		 that.$toast({
	                message: 'pickVideo code:'+code+'error:'+error,
	                position: 'bottom',
			        duration: 1500
	            });
	    	})
	    },
	    descInput(){
	        var txtVal = this.content.length;
	        this.remnant = 120 - txtVal;
	    },
	    testVideo(){ //拍摄视频
	    	var that=this;
		    window.captureVideo(
		        function(result){
		          if(result==""||result==null||result==undefined){
						that.sheetVisible=false;
						that.$toast({
				          message: "请重新拍照",
				          position: 'bottom',
						  duration: 1500
				        });
			      		return ;
					}else{						
						setTimeout(function(){
							that.testUploadVodAli(result);
						},50)
					}
		        },function(code, err){
		          that.$toast({
			          message: 'captureVideo code:'+code+'error:'+err,
			          position: 'bottom',
					  duration: 1500
			        });
		        });		        
		},
		testUploadVodAli(filename){
			var str="";
			var that=this;
			str=filename.split('/')[filename.split('/').length-1];
			var params='{"localfile":"'+filename+'","title":"'+str+(new Date()).getTime()+'"}';
			var ret = window.aliUpload.doUploadVideo(params);
			if(ret){
				this.videoflag=false;
				this.videoid=ret;
				setTimeout(function(){
					that.getVideoPlayInfo(ret);
				},5000)
			}else{
				this.videoflag=true;	
				this.$toast({
		          message: '上传视频失败',
		          position: 'bottom',
				  duration: 1500
		       });
	   		}
		},
		publish:function(){//发表动态
			if(!this.videoid){
				if(!this.content){
					this.$toast({
						message:'发布内容不能为空!',
						position:'bottom',
						duration:1500
					})
				}else{
					this.params.mediatype='0';
					this.senddongtai();		
				}
			}else{
				if(this.poster){
					this.senddongtai();
				}				
			}
		},
		getVideoPlayInfo(videoid){
			var that=this;
			this.$api('/Execute.do',{action:'blog.getVideoPlayInfo',videoId:videoid}).then(function(r){
				if(r.errorCode==0){
					that.$toast({
			            message: '视频上传成功',
			            position: 'bottom',
					    duration: 1500
			       });
			        if(r.data.getVideoPlayInfo.coverURL){
			       	    that.poster=r.data.getVideoPlayInfo.coverURL;
			       	    that.params.videocover=that.poster;
			        }else{
			        	that.getVideoPlayInfo(that.videoid);
			        }
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
	  				  duration: 1500
			        });
				}
			})
		},
		senddongtai(){
			var that=this;
			this.$api('/Execute.do',this.params).then(function(r){
				if(r.errorCode==0){
					that.$toast({
			          message: '发表成功',
			          position: 'bottom',
	  				  duration: 1500
			        });
			        that.$router.go(-1);
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
	  				  duration: 1500
			        });
				}
			})
		}
	},
	watch:{
		content:function(){
			if(this.content.length>0){
				this.params.content=this.content;
			}			
		},
		videoid:function(){
			if(this.videoid.length>0){
				this.params.video=this.videoid;
			}
		}
	}
}
</script>

<style>
.upload-wrap{
	width:100%;
	height:100%;
	display: flex;
	background: #f7f7f7;
	display: -webkit-flex;
	flex-direction: column;
}
.upload-head{
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	text-align: center;
	font-size:0.44rem;
	line-height: 1.32rem;
	position: relative;
	color:#fff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.upload-head{
		height:2.64rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image:url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		text-align: center;
		font-size:0.44rem;
		line-height: 1.32rem;
		position: relative;
		color:#fff;
	}
}
.upload-head span:nth-child(1){
	position: absolute;
	left:0.5rem;
}
.upload-head span:nth-child(2){
	position: absolute;
	right:0.5rem;
}
.upload-container{
	width:100%;
	background: #fff;
}
.upload-button-hidden{
	display: none;
}
.upload-container-top{
	height:4rem;
	padding:0 0.5rem;
}
.upload-container-top textarea{
	width:100%;
	height:100%;
	font-size:0.36rem;
	color:#333;
	line-height:0.8rem;
}
.upload-container-bottom{
	padding:0 0.5rem 0.5rem 0.5rem;
	display: flex;
	display: -webkit-flex;
}
.picturelist{
	width:100%;
	flex: 1;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;	
}
.imglist{
	width:32%;
	height:3.48rem;
	margin:0.1rem 0;
}
.imglist:nth-child(3n-1){
	margin:0.1rem 2%;
}
.upload-button{
	position: relative;
}
.upload-button p{
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height:3.48rem;
	background: url(../../assets/img/faxianimg/addfile.png) center repeat;
	background-size:100% 3.48rem;
}
.upload-button input{
	position: absolute;
	top:0;
	left:0;
	z-index: 10;
	width:33%;
	height:3.48rem;
	opacity: 0;
	filter:Alpha(opacity=0);	
}
.upload-container-remnant{
	width:100%;
	height:1.36rem;
	text-align: right;
	font-size:0.44rem;
	color:#999;
	line-height:1.36rem;
	padding:0 0.5rem;
}
</style>