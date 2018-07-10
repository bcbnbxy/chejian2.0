<template>
	<div class="upload-wrap">
		<div class="upload-head">
			<span @click="$router.go(-1)">取消</span>
			<span @click="publish">发布</span>
		</div>
		<div class="upload-container">
			<div class="upload-container-top">
				<textarea placeholder="文字不能超过120个" v-model="content" maxlength="120" @input="descInput"></textarea>
			</div>
			<div class="upload-container-bottom">
				<img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item" v-for="(item,index) in data" class="imglist"/>
				<div class="upload-button imglist" v-if="$route.params.id=='picture'" :class="data.length>9?'upload-button-hidden':''">
					<p  @click="actionSheetpic"></p>
					<mt-actionsheet :actions="actionpic"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
				</div>
				<div class="upload-button imglist" v-else-if="$route.params.id=='video'">
					<p  @click="actionSheetpic"></p>
					<mt-actionsheet :actions="actionvideo"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
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
			apiflag:1,
			remnant: 120,
			actionpic: [{  
		        name: '拍照',  
		        method : this.captureImage// 调用methods中的函数  
		      }, {  
		        name: '从相册中选择',   
		        method : this.getLibrary// 调用methods中的函数  
		      }],
		    actionvideo: [{
		        name: '短视频',  
		        method : this.captureVideo// 调用methods中的函数  
		    }, {  
		        name: '选择视频',   
		        method : this.pickervideo// 调用methods中的函数  
		    }],  
		      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
		    sheetVisible: false,
		    data:['blog/216e6e94-bea5-4e2b-9a2c-cf7073ebe5e7.jpg'],
//			data:[],	
		}
	},
	methods:{
		publish:function(){
			var that=this;
			var param={action:'blog.addBlog'}
			if(this.apiflag==0){
				if(this.content.trim().length<1){
					this.$toast({
			          message: '内容不能为空',
			          position: 'bottom',
	  				  duration: 1500
			        });
					return
				}else{
					param.content=this.content;
					param.mediatype="0"
				}
			}else if(this.apiflag==1){
				param.content=this.content;
				param.mediatype="0";
				var images="";
				for(let i=0;i<this.data.length;i++){
					images+=this.data[i];
				}
				param.images=images;
			}
			this.$api('/Execute.do',param).then(function(r){
				console.log(JSON.stringify(r));
				if(r.errorCode==0){
					that.$toast({
			          message: '发表成功',
			          position: 'bottom',
	  				  duration: 1500
			        });
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
	  				  duration: 1500
			        });
				}
			})
		},
		actionSheetpic: function(){
	      this.sheetVisible = true;  
	   },  
	    getLibrary: function(){ //从相册选择视频或图片 
	      var ret =  window.gallery.pickImage();
	      if(ret==""||ret==null||ret==undefined){
	      	that.$toast({
	          message: "请重新选择图片",
	          position: 'bottom',
			  duration: 1500
	        });
	      	return ;
	      }else{
	      	 this.testUploadAli(ret)
	      }	     
	    },
	    descInput:function(){
	        var txtVal = this.content.length;
	        this.remnant = 120 - txtVal;
	    },
	    captureImage:function(){ //调用手机摄像头进行拍照
			var param = (new Date()).getTime() + '.jpg';
			param = '{"filename" : "' + param + '"}';
			param = window.camera.captureImage(param);
			alert(param+"-----113行");
			if(param==""||param==null||param==undefined){
				that.$toast({
		          message: "请重新拍照",
		          position: 'bottom',
				  duration: 1500
		        });
	      		return ;
			}else{
				this.testUploadAli(param);
			}
		},
		captureVideo:function(){
			var param = (new Date()).getTime() + '.mp4';
			param = '{"filename" : "' + param + '"}';
			param = window.camera.captureVideo(param);
			alert(param+'------------------------------130行')
		},
		pickervideo:function(){
		    var ret = window.camera.pickVideo();
		    alert(ret+"-------------------134行")
		  
		},
		testUploadAli(file){
			var ret = window.action.doUpload(file, '{"path":"blog"}');
			ret=JSON.parse(ret);
			if(ret.errorCode=="0"){
				this.apiflag=1;
				this.data.push(ret.data)
			}else{
				this.$toast({
		          message: ret.errorMessage,
		          position: 'bottom',
				  duration: 1500
		        });
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
	height:1.32rem;
	padding:0 0.5rem;
	background:url(../../assets/img/faxianimg/headbg.png) center repeat;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#fff;
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
	flex-wrap:wrap ;
}
.imglist{
	width:3.48rem;
	height:3.48rem;
}
.imglist:nth-child(3n-1){
	margin:0 0.46rem;
}
.upload-button{
	width:3.48rem;
	height:3.48rem;
	position: relative;
}
.upload-button p{
	position: absolute;
	top:0;
	left:0;
	width:3.48rem;
	height:3.48rem;
	background: url(../../assets/img/faxianimg/addfile.png) center repeat;
	background-size:3.48rem 3.48rem;
}
.upload-button input{
	position: absolute;
	top:0;
	left:0;
	z-index: 10;
	width:3.48rem;
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