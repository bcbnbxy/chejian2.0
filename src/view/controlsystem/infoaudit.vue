<template>
<div class="infoaudit-wrap">
	<div class="submissionupgrades-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>资料审核中</span>
	</div>
	<div class="submissionupgrades-wrap-contaire">
		<div class="auditstate">
			<span>审核状态</span>
			<p class="shenhefail">
				<b :style="data.status==2?'color:#ff0000;':'color:#1989f5;'">{{Status(data.status)}}</b>
				<i v-show="data.faultreason">{{data.faultreason}}</i>
			</p>
		</div>
		<div class="company-name">
			<label>公司名称</label>
			<input type="text" v-model="data&&data.company" disabled="disabled"/>
		</div>
		<div class="company-name">
			<label>社会信用代码/注册号</label>
			<input type="text" v-model="data&&data.blicence" disabled="disabled"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>营业执照</p>
			</div>
			<div class="uploadimage-right">
				<img :src="data&&'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+data.licimg"/>
			</div>
		</div>
		<div class="company-name">
			<label>法人名称</label>
			<input type="text" v-model="data&&data.bossname" disabled="disabled"/>
		</div>
		<div class="company-name">
			<label>身份证号码</label>
			<input type="text" v-model="data&&data.idno" disabled="disabled"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>身份证正面</p>
			</div>
			<div class="uploadimage-right">
				<img :src="data&&'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+data.idcoverimg">
			</div>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>身份证反面</p>
			</div>
			<div class="uploadimage-right">
				<img :src="data&&'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+data.idbackimg">
			</div>
		</div>
		<div class="submissionupgrades-wrap-contaire-footer">
			<span>1-3天审核完成，请耐心等待</span>
			<router-link tag="button" :to="{name:'manageupgrade',params:{dataInfo:data}}" v-show="data.status==2" >重新提交</router-link>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			data:'',
		}
	},
	created(){
		this.getagentInfo();
	},
	methods:{
		getagentInfo(){
			var that=this;
			this.$api('/Execute.do',{action:'device.agentInfo'}).then(function(r){
				if(r.errorCode==0){
					that.data=r.data.agentInfo;
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
					  duration: 1500
			       });
				}
			})
		},
		Status:function(status){
			if(status==0){
				return "等待审核"
			};
			if(status==1){
				return "审核成功"
			};
			if(status==2){
				return "审核失败"
			}
		}
	}
}
</script>

<style scoped>
.infoaudit-wrap{
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
}
.submissionupgrades-wrap-head .icon-fanhui{
	font-size:0.6rem;
	float:left;
}
.submissionupgrades-wrap-contaire{
	flex:1;
	overflow: auto;
}
.auditstate{
	height:1.6rem;
	width:100%;
	background: #fff;
	border-bottom: 1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.shehezhong{
	color:#1989F5;
	display: none;
}
.shenhefail{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: flex-end;
}
.shenhefail i{
	font-style: normal;
	color:#999;
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
	overflow: hidden;
}
.uploadimage-right img{
	width:100%;
	height:100%;
}
.submissionupgrades-wrap-contaire-footer{
	padding:0.48rem 0.55rem 0.92rem 0.55rem;
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
	margin-top:0.84rem;
}
</style>