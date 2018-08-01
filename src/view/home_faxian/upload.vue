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
				<div class="picturelist">
					<img :src="'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item" v-for="(item,index) in data" class="imglist"/>
					<div class="upload-button imglist" :class="data.length>8?'upload-button-hidden':''">
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
		        name: '拍照',  
		        method : this.captureImage// 调用methods中的函数  
		      }, {  
		        name: '从相册中选择',   
		        method : this.getLibrary// 调用methods中的函数  
		      }], 
		    sheetVisible: false,
		    data:[],//'blog/216e6e94-bea5-4e2b-9a2c-cf7073ebe5e7.jpg'
		    params:{
		    	action:'blog.addBlog',
		    	mediatype:'0',
		    }
		}
	},
	methods:{
		publish:function(){//发表动态
			var that=this;
			if(!this.content&&this.data.length<1){
				this.$toast({
					message:'发布内容能为空!',
					position:'bottom',
					duration:1500
				})
			}else{
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
		testUploadAli(file){
			var ret = window.action.doUploadImage(file, '{"path":"blog"}');
			ret=JSON.parse(ret);
			if(ret.errorCode=="0"){
				this.data.push(ret.data)
			}else{
				this.$toast({
		          message: ret.errorMessage,
		          position:'bottom',
				  duration: 1500
		        });
			}			
		}
	},
	watch:{
		content:function(){
			if(this.content.length>0){
				this.params.content=this.content;
			}			
		},
		data:function(){
			if(this.data.length>0){
				var str = "";
				for(let i=0;i<this.data.length;i++){
					if(str.length > 0){
						str  += ",";
					}
					str+=this.data[i];
				}
				this.params.images=str;
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