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
				<div class="upload-button">
					<p  @click="actionSheet"></p>
					<mt-actionsheet :actions="actions"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
				</div>
			</div>
			<div class="upload-container-remnant"><span>{{remnant}}/120</span></div>
			<img :src="imgsrc"/>
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
			actions: [{  
		        name: '拍照',  
		        method : this.captureImage// 调用methods中的函数  
		      }, {  
		        name: '从相册中选择',   
		        method : this.getLibrary// 调用methods中的函数  
		      }],  
		      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
		      sheetVisible: false,
		      imgsrc:'',
		}  
	},
	methods:{
		publish:function(){
			if(this.apiflag==0){
				var param={action:'blog.addBlog'}
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
			}else{
				return
			}
			this.$api('/Execute.do',param).then(function(r){
				console.log(JSON.stringify(r));
			})
		},
		actionSheet: function(){
	      this.sheetVisible = true;  
	   },  
	    getLibrary: function(){  
	      console.log("打开相册"); 
	    },
	    descInput:function(){
	        var txtVal = this.content.length;
	        this.remnant = 120 - txtVal;
	    },
	    captureImage:function(){ //调用手机摄像头进行拍照
			var param = (new Date()).getTime() + '.jpg';
			param = '{"filename" : "' + param + '"}';
			param = window.camera.captureImage(param);
			this.imgsrc=param;
			alert(this.imgsrc);
			var formData = new FormData()
			let publicOPtion=store.state.common.publicOption
			publicOPtion.path='headphoto';
			publicOPtion.__sign__=buildSign(publicOPtion,publicOPtion.__uuid__);
			formData.append(param,param)
	        formData.append('__uuid__',publicOPtion.__uuid__);      
	        formData.append('path',publicOPtion.path);
	        formData.append('__mobileno__',publicOPtion.__mobileno__);
	        formData.append('__sign__',publicOPtion.__sign__);
	        formData.append('__timestamp__',publicOPtion.__timestamp__);
	        formData.append('__platform__',publicOPtion.__platform__);
	        alert(formData);
	        var that=this;
	    	this.$api('uploadImage.do',formData).then(function(r){
	    	 	alert(JSON.stringify(r));
	    	})
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