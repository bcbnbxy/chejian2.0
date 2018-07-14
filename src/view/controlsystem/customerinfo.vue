<template>
<div class="customerinfo-wrap">
	<div class="personlInfo-wrap-top">
		<div class="personlInfo-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>编辑客户信息</span>
			<!--<span style="font-size:0.44rem;" @click="deleteuser">删除</span>-->
		</div>
		<div class="gerenxinxi-wrap-head-bottom">
			<img src="../../assets/img/faxianimg/avatar.png"/>
			<p>
				<span>客户01</span>
				<span>24岁   女</span>
			</p>
		</div>
	</div>
	<ul class="customerinfo-wrap-list">
		<li><span>手机号码</span><p>12345678912</p></li>
		<li @click="Revisenotes"><span>备注</span><p>{{remark}}<i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
		<li><span>他的主页</span><p><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
	</ul>
	<div class="customerinfo-wrap-footer"><button>保存</button></div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
	data(){
		return {
			remark:'李四'
		}
	},
	methods:{
		deleteuser(){
			MessageBox.confirm('确定删除此成员吗？').then(action => {
	          if (action == 'confirm') {
	            console.log('abc');
	          }
	        }).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });
		},
		Revisenotes(){
			var that=this;
			MessageBox.prompt('',{
				message:'请填写备注',
				showConfirmButton:true,
          		showCancelButton:true,
          		confirmButtonText:'确定',
          		cancelButtonText:'取消'
			}).then(({ value, action }) => {
				if (action == 'confirm') {
	            	if(value.trim().length>1){
	            		that.remark=value;
	            	}
	          	}
			}).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });
		}
	}
}
</script>

<style scoped>
.customerinfo-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	position: relative;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.personlInfo-wrap-top{
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	width:100%;
	height:4.7rem;
}
.personlInfo-wrap-head{
	padding:0 0.5rem;
	height:1.32rem;	
	color:#fff;
	font-size:0.56rem;
	width:100%;
	line-height:1.32rem;
	text-align: center;
	position: relative;
}
.personlInfo-wrap-head i{
	font-size:0.6rem;
	position: absolute;
	left:0.5rem;
}
.gerenxinxi-wrap-head-bottom{
	padding:0 0.5rem;
	padding-top:0.72rem;
	display: flex;
	display: -webkit-flex;	
}
.gerenxinxi-wrap-head-bottom img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.gerenxinxi-wrap-head-bottom p{
	height:1.8rem;
	font-size:0.48rem;
	color:#fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content:space-around;
	margin-left:0.5rem;
}
.customerinfo-wrap-list{
	flex:1;
}
.customerinfo-wrap-list li{
	height:1.6rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	border-bottom:1px solid #ddd;
}
.customerinfo-wrap-list li:last-child{
	border-bottom:none;
}
.customerinfo-wrap-footer{
	height:2.65rem;
	width:100%;
	padding:0 0.6rem;
}
.customerinfo-wrap-footer button{
	height:1.6rem;
	line-height:1.6rem;
	color:#fff;
	font-size:0.56rem;
	text-align: center;
	background: #1989f5;
	width:100%;
	border-radius: 5px;
}
</style>