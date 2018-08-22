<template>
<div class="submissionupgrades-wrap">
	<div class="submissionupgrades-wrap-head">
		<i class="iconfont icon-fanhui" @click="submissionupgradeshidden"></i>
		<span>提交升级资料</span>
	</div>
	<div class="submissionupgrades-wrap-contaire">
		<div class="company-name">
			<label>公司名称</label>
			<input type="text" placeholder="请输入公司名称"  v-model="companyname" ref="companyname"/>
		</div>
		<div class="company-name">
			<label>社会信用代码/注册号</label>
			<input type="text" placeholder="请输入营业执照号" v-model="registrmark" ref="registrmark"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传营业执照</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(0)">
				<img :src="businesslicence?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+businesslicence:require ('../../assets/img/faxianimg/addfile.png')"/>
			</div>
		</div>
		<div class="company-name">
			<label>法人名称</label>
			<input type="text" placeholder="请输入法人名称" v-model="bossname" ref="bossname"/>
		</div>
		<div class="company-name">
			<label>身份证号码</label>
			<input type="text" placeholder="请输入身份证号码" v-model="idnum" ref="idnum"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证正面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(1)">
				<img :src="facadecard?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+facadecard:require ('../../assets/img/faxianimg/addfile.png')"/>
			</div>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证反面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right" @click="actionSheetpic(2)">
				<img :src="identitycard?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+identitycard:require ('../../assets/img/faxianimg/addfile.png')"/>
			</div>
		</div>
		<div class="submissionupgrades-wrap-contaire-footer">
			<span>1-3天审核完成，请耐心等待</span>
			<p>	
				<input id="checkbox" type="checkbox" v-model="selected"/>
				<label for="checkbox"></label>
        		<span @click="registerprotocol">平台使用协议</span>
			</p>
			<mt-button type="default" :disabled='isdisabled' @click="subaudit">提交审核</mt-button>
		</div>
	</div>
	<mt-actionsheet :actions="actionpic"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
	<div :class="registerprotocolshow?'protocolshow':'protocolhidden'">
		<Merchantprotocol v-on:listenprotocol="registerprotocol"></Merchantprotocol>
	</div>
</div>
</template>

<script>
import Merchantprotocol from '@/components/controlsystem/merchantprotocol'
export default{
	props:{
		dataInfo:{
			type:Object,
			default(){
				return {}
			}
		}
	},
	components:{Merchantprotocol},
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
			companyname:this.dataInfo.company?this.dataInfo.company:'',//公司名称
			registrmark:this.dataInfo.blicence?this.dataInfo.blicence:'',//社会信用代码/注册号
			bossname:this.dataInfo.bossname?this.dataInfo.bossname:'',//法人名称
			idnum:this.dataInfo.idno?this.dataInfo.idno:'',//身份证号码
			sheetVisible:false,
			actiontype:null,
			selected:false,
			businesslicence:this.dataInfo.licimg?this.dataInfo.licimg:'',//营业执照'blog/216e6e94-bea5-4e2b-9a2c-cf7073ebe5e7.jpg'
			facadecard:this.dataInfo.idcoverimg?this.dataInfo.idcoverimg:'',//身份证正面照
			identitycard:this.dataInfo.idbackimg?this.dataInfo.idbackimg:'',//身份证反面面照
			registerprotocolshow:false,
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
			var that=this;
			if(this.companyname.trim().length<1){
				this.$toast({
		          message: "公司名称不能为空",
		          position: 'top',
				  duration: 1500
		        });
			}else if(this.registrmark.trim().length<1){
				this.$toast({
		          message: "社会信用代码不能为空",
		          position: 'top',
				  duration: 1500
		        });
			}else if(this.bossname.trim().length<1){
				this.$toast({
		          message: "法人名称不能为空",
		          position: 'top',
				  duration: 1500
		        });
			}else if(this.idnum.trim().length<1){
				this.$toast({
		          message: "身份证号码不能为空",
		          position: 'top',
				  duration: 1500
		        });
			}else if(!this.businesslicence){
				this.$toast({
		          message: "请上传营业执照",
		          position: 'top',
				  duration: 1500
		        });
			}else if(!this.facadecard){
				this.$toast({
		          message: "请上传身份证正面照",
		          position: 'top',
				  duration: 1500
		        });
			}else if(!this.identitycard){
				this.$toast({
		          message: "请上传身份证反面照",
		          position: 'top',
				  duration: 1500
		        });
			}else{
				var param={
					company:this.companyname,
					blicence:this.registrmark,
					idno:this.idnum,
					bossname:this.bossname,
					licimg:this.businesslicence,
					idcoverimg:this.facadecard,
					idbackimg:this.identitycard,
					province:"abc",
					district:"qwer",
					city:'wpoop'
				}
				if(this.dataInfo.status){
					param.action="device.updateAgentInfo";
					this.$api('/Execute.do',param).then(function(r){
						if(r.errorCode==0){
							that.$toast({
					          message: "资料提交成功",
					          position: 'bottom',
							  duration: 1500
					       });	
					      that.$router.replace('/infoaudit'); 
						}else{
							that.$toast({
					          message: r.errorMessage,
					          position: 'bottom',
							  duration: 1500
					       });
						}
					})
				}else{
					param.action="device.applyAgent";
					this.$api('/Execute.do',param).then(function(r){
						if(r.errorCode==0){
							that.$toast({
					          message: "资料提交成功",
					          position: 'bottom',
							  duration: 1500
					       });	
					      that.$router.replace('/infoaudit'); 
						}else{
							that.$toast({
					          message: r.errorMessage,
					          position: 'bottom',
							  duration: 1500
					       });
						}
					})
				}
				
			}
		},
		captureImage(){
			var that=this;
	    	window.captureImage(
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
						that.testUpload(result);
					},50)
				}
	        },function(code, err){
	          that.$toast({
		          message: 'captureImage code:'+code+'error:'+err,
		          position: 'bottom',
				  duration: 1500
		        });
	        });	
		},
		getLibrary(){ //从相册选择视频或图片    
			var that=this;
    		window.pickImage(
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
						that.testUpload(result);
					},50)
				}
	        },function(code, err){
	          that.$toast({
		          message: 'pickImage code:'+code+'error:'+err,
		          position: 'bottom',
				  duration: 1500
		        });
	        });	
	    },
	    testUpload(file){
			var ret = window.aliUpload.doUploadImage('{"localfile":"'+file+'","path":"carshop"}');
			if(ret){
				if(this.actiontype==0){
					this.businesslicence=ret;
				}else if(this.actiontype==1){
					this.facadecard=ret;
				}else if(this.actiontype==2){
					this.identitycard=ret;
				}
			}else{
				this.$toast({
		          message: '上传图片失败',
		          position:'bottom',
				  duration: 1500
		        });
			}
		},
		actionSheetpic(index){
			this.$refs.companyname.blur();
			this.$refs.registrmark.blur();
			this.$refs.bossname.blur();
			this.$refs.idnum.blur();
			this.sheetVisible = true;
			this.actiontype=index;
		},
		submissionupgradeshidden(){
			if(this.dataInfo.status){
				this.$router.go(-1);
			}else{
				this.$emit('listenSubmissionupgrades');
			}
			
		},
		registerprotocol(){
			this.registerprotocolshow=!this.registerprotocolshow;
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
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	line-height:1.32rem;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.submissionupgrades-wrap-head{
		height:2.64rem;
		width:100%;
		padding:0 0.5rem;
		padding-top:1.32rem;
		background-image: url(../../assets/img/faxianimg/headbg.png);
		background-size:cover;
		line-height:1.32rem;
		text-align: center;
		font-size:0.56rem;
		color:#fff;
		position: relative;
	}
}
.submissionupgrades-wrap-head .icon-fanhui{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.submissionupgrades-wrap-contaire{
	flex:1;
	overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.submissionupgrades-wrap-contaire::-webkit-scrollbar{
	display: none;
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
.protocolshow{
	position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    z-index: 100;
    transition: all 0.3s;
    background: #fff;
    overflow: hidden;
}
.protocolhidden{
	position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:100%;
    z-index: 100;
    transition: all 0.3s;
    overflow: hidden;
    background: #fff;
}
</style>