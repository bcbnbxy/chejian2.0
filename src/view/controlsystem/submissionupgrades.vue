<template>
<div class="submissionupgrades-wrap">
	<div class="submissionupgrades-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>提交升级资料</span>
	</div>
	<div class="submissionupgrades-wrap-contaire">
		<div class="company-name">
			<label>公司名称</label>
			<input type="text" placeholder="请输入公司名称"  v-model="companyname"/>
		</div>
		<div class="company-name">
			<label>社会信用代码/注册号</label>
			<input type="text" placeholder="请输入营业执照号" v-model="registrmark"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传营业执照</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(0)">
				<img :src="businesslicence"/>
			</div>
		</div>
		<div class="company-name">
			<label>法人名称</label>
			<input type="text" placeholder="请输入法人名称"/>
		</div>
		<div class="company-name">
			<label>身份证号码</label>
			<input type="text" placeholder="请输入身份证号码"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证正面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(1)">
				<img :src="facadecard"/>
			</div>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证反面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(2)">
				<img :src="identitycard"/>
			</div>
		</div>
		<div class="submissionupgrades-wrap-contaire-footer">
			<span>1-3天审核完成，请耐心等待</span>
			<p>	
				<input id="checkbox" type="checkbox" v-model="selected"/>
				<label for="checkbox"></label>
        		<span>平台使用协议</span>
			</p>
			<!--<button @click="subaudit" disabled>提交审核</button>-->
			<mt-button type="default" :disabled='isdisabled' @click="subaudit">提交审核</mt-button>
		</div>
	</div>
	<mt-actionsheet :actions="actionpic"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
</div>
</template>

<script>
export default{
	computed:{
		isdisabled:function(){
			if(this.selected){
				return false;
			}else{
				return true;
			}
		}
	},
	data(){
		return{
			companyname:'',//公司名称
			registrmark:"",//社会信用代码/注册号
			judicialname:"",//法人名称
			idnum:"",//身份证号码
			sheetVisible:false,
			actiontype:null,
			selected:false,
			businesslicence:require ('../../assets/img/faxianimg/addfile.png'),
			facadecard:require ('../../assets/img/faxianimg/addfile.png'),//身份证正面照
			identitycard:require ('../../assets/img/faxianimg/addfile.png'),//身份证反面面照
			actionpic: [{  
		        name: '拍照',  
		        method : this.captureImage// 调用methods中的函数  
		      }, {  
		        name: '从相册中选择',   
		        method : this.getLibrary// 调用methods中的函数  
		      }],
		}
	},
	methods:{
		subaudit(){
			console.log(this.selected);
		},
		captureImage(){
			var param = (new Date()).getTime() + '.jpg';
			param = '{"filename" : "' + param + '"}';
			param = window.camera.captureImage(param);
			alert(param+"---------------------------------109行");
			if(param==""||param==null||param==undefined){
				this.$toast({
		          message: "请重新拍照",
		          position: 'bottom',
				  duration: 1500
		        });
	      		return ;
			}else{
				this.testUpload(param);
			}
		},
		getLibrary(){ //从相册选择视频或图片 
	      var ret =  window.gallery.pickImage();
	      alert(ret+"---------------------------------109行 ");
	      if(ret==""||ret==null||ret==undefined){
	      	this.$toast({
	          message: "请重新选择图片",
	          position: 'bottom',
			  duration: 1500
	        });
	      	return ;
	      }else{
	      	 this.testUpload(ret)
	      }	     
	    },
	    testUpload(file){
			var ret = window.action.doUpload(file, '{"path":"blog"}');
			ret=JSON.parse(ret);
			alert(JSON.stringify(ret))
			if(ret.errorCode=="0"){
				if(this.actiontype==0){
					this.businesslicence='https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+ret.data;
				}else if(this.actiontype==1){
					this.facadecard='https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+ret.data;
				}else if(this.actiontype==2){
					this.identitycard='https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+ret.data;
				}
			}else{
				this.$toast({
		          message: ret.errorMessage,
		          position: 'bottom',
				  duration: 1500
		        });
			}	
		},
		actionSheetpic(index){
			this.sheetVisible = true;
			this.actiontype=index;
		}
	}
}
</script>

<style scoped>
.submissionupgrades-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.submissionupgrades-wrap-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
}
.submissionupgrades-wrap-head .icon-fanhui{
	font-size:0.6rem;
	float:left;
}
.submissionupgrades-wrap-contaire{
	flex:1;
	overflow: auto;
}
.company-name{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	height:1.6rem;
	width:100%;
	border-bottom:1px solid #ddd;
	background: #fff;
	
}
.company-name input{
	height:100%;
	flex:1;
	padding-left:0.5rem;
	text-align: right;
}
.company-name ::-webkit-input-placeholder{
	color:#999;
}
.uploadimage{
	height:3.8rem;
	width:100%;
	background: #fff;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	padding:0.64rem 0.5rem;
}
.uploadimage-left{
	flex:1;	
}
.uploadimage-left p{
	font-size:0.38rem;
	color:#222;
	line-height:1;
}
.uploadimage-left span{
	display: block;
	font-size:0.34rem;
	color:#999;
	line-height:1;
	margin-top:0.36rem;
}
.uploadimage-right{
	width:2.52rem;
	height:2.52rem;
	position: relative;
	overflow: hidden;
}
.uploadimage-right img{
	width:100%;
	height:100%;
}
.submissionupgrades-wrap-contaire-footer{
	padding:0.48rem 0.55rem 1.35rem 0.55rem;
}
.submissionupgrades-wrap-contaire-footer span{
	font-size:0.34rem;
	color:#999;
	display: block;
	width:100%;
	text-align: center;
}
.submissionupgrades-wrap-contaire-footer button{
	display: block;
	width:100%;
	height:1.6rem;
	text-align: center;
	line-height:1.6rem;
	font-size:0.5rem;
	color:#fff;
	background: #1989F5;
	border-radius: 5px;
}
.submissionupgrades-wrap-contaire-footer p{
	line-height:1;
	width:3.5rem;
	margin:0 auto;
	margin-top:0.32rem;
	margin-bottom:0.78rem;
	font-size:0.34rem;
	color:#1989F5;	
	text-align: left;
	position: relative;
}
.submissionupgrades-wrap-contaire-footer p span{
	display: inline;
	color:#1989F5;
}
.submissionupgrades-wrap-contaire-footer p input[type="checkbox"]{
	width:20px;
	height:20px;
	visibility: hidden;
	margin-right:0.2rem;
	background: red;
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	border:none;
}
.submissionupgrades-wrap-contaire-footer p label{
	position: absolute;
	width:20px;
	height:20px;
	border-radius: 50%;
	top:0;
	left:0;
	background-color: #ddd;
    border: 1px solid #ddd;
}
#checkbox:checked+label{
	background-color: #1989F5;
    border: 1px solid #1989F5;
}
#checkbox:checked+label::after,#checkbox+label::after{
	position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 1px;
    left: 5px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
}
</style>