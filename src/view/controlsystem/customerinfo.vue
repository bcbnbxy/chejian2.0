<template>
<div class="customerinfo-wrap">
	<div class="personlInfo-wrap-top">
		<div class="personlInfo-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>编辑客户信息</span>
		</div>
		<div class="gerenxinxi-wrap-head-bottom">
			<img :src="$store.state.controls.customerinfo.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+$store.state.controls.customerinfo.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
			<p>
				<span>{{$store.state.controls.customerinfo.userInfo.nickname}}</span>
				<span>{{$store.state.controls.customerinfo.userInfo.gender | sex}}</span>
			</p>
		</div>
	</div>
	<ul class="customerinfo-wrap-list">
		<li><span>手机号码</span><p>{{$store.state.controls.customerinfo.userInfo.mobileno}}</p></li>
		<li @click="Revisenotes"><span>备注</span><p>{{remark}}<i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
		<li @click="gohomepage($store.state.controls.customerinfo.userseq)"><span>他的主页</span><p><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>
	</ul>
	<div class="customerinfo-wrap-footer"><button @click="save" :style="remark!=$store.state.controls.customerinfo.remark?'':'background:#ccc'">保存</button></div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
	data(){
		return {
			remark:this.$store.state.controls.customerinfo.remark,
		}
	},
	methods:{
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
		},
		save(){//修改备注
			var that=this;
			if(this.remark!=this.$store.state.controls.customerinfo.remark){			
				this.$api('/Execute.do',{action:'device.updateCustomerInfo',remark:this.remark,userseq:this.$store.state.controls.customerinfo.userseq}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
							message:'修改资料成功',
							position:'bottom',
							duration:1500
						})
					}else{
						that.$toast({
							message:r.errorMessage,
							position:'bottom',
							duration:1500
						})
					}
				})
			}
		},
		gohomepage(touserseq){
			this.$router.push('/homepage')
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_remark',null);
		}
	},
	filters:{
		sex(value){
			switch (value){
				case 'm':
				return '男'
				break;
				case 'f':
				return '女'
				break;
				default :
				return '未知'
				break ;
			}
		}
	},
	created(){
		
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