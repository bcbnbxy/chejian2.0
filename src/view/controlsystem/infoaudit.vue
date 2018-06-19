<template>
<div class="infoaudit-wrap">
	<div class="submissionupgrades-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>资料审核中</span>
	</div>
	<div class="submissionupgrades-wrap-contaire">
		<div class="auditstate">
			<span>审核状态</span>
			<p class="shehezhong">审核中</p>
			<p class="shenhefail">
				<b>审核失败</b>
				<i>营业执照与法人身份证信息不符</i>
			</p>
		</div>
		<div class="company-name">
			<label>公司名称</label>
			<input type="text" value="深圳市*****有限公司" disabled="disabled"/>
		</div>
		<div class="company-name">
			<label>社会信用代码/注册号</label>
			<input type="text" value="1234567890987" disabled="disabled"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传营业执照</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right">
				<p></p>
				<input type="file" disabled="disabled"/>
			</div>
		</div>
		<div class="company-name">
			<label>法人名称</label>
			<input type="text" value="婉婉" disabled="disabled"/>
		</div>
		<div class="company-name">
			<label>身份证号码</label>
			<input type="text" value="123456789123456789123" disabled="disabled"/>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证正面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right">
				<p></p>
				<input type="file" disabled="disabled"/>
			</div>
		</div>
		<div class="uploadimage">
			<div class="uploadimage-left">
				<p>上传身份证反面</p>
				<span>提醒：上传后不可更改，请谨慎操作</span>
			</div>
			<div class="uploadimage-right">
				<p></p>
				<input type="file" disabled="disabled"/>
			</div>
		</div>
		<div class="submissionupgrades-wrap-contaire-footer">
			<span>1-3天审核完成，请耐心等待</span>
			<button>重新提交</button>
		</div>
	</div>
</div>
</template>

<script>
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
.shenhefail b{
	color:#ff0000;
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
	position: relative;
	overflow: hidden;
}
.uploadimage-right p{
	width:100%;
	height:100%;
	background-image:url(../../assets/img/faxianimg/addfile.png) ;
	background-size:cover ;
}
.uploadimage-right input{
	position: absolute;
	width:100%;
	height:100%;
	top:0;
	left:0;
	opacity: 0;
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