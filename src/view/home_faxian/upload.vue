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
		</div>
	</div>
</template>
<script>
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
		      sheetVisible: false  
		}  
	},
	methods:{
		publish:function(){
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
	      console.log("打开相册")  
	    },
	    descInput:function(){
	        var txtVal = this.content.length;
	        this.remnant = 120 - txtVal;
	    },
	    captureImage:function(){ //调用手机摄像头进行拍照
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			cmr.captureImage(function(path) {
					savePicture(path);
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						var locaURL = entry.toLocalURL()
//						createUpload(locaURL,"image")
					})
				},
				function(error) {
					alert("Capture image failed: " + error.message);
				}, {
					resolution: res,
					format: fmt
				});	
		},
		savePicture :function (path) { //保存图片路径
			plus.gallery.save(path, function() {});
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