<template>
<div class="gerenxinxi-wrap">
	<div class="gerenxinxi-wrap-head">
		<div class="gerenxinxi-wrap-head-top">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>个人信息</span>
		</div>
		<div class="gerenxinxi-wrap-head-bottom">
			<img :src="$route.params.personal.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+$route.params.personal.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
			<p>
				<span>{{$route.params.personal.nickname}}</span>
				<span>{{$route.params.personal.gender | sex}}</span>
			</p>
		</div>
	</div>
	<div class="gerenxinxi-wrap-contaire">
		<p><i class="iconfont icon-shouji"></i><span>{{$route.params.personal.mobileno}}</span></p>
	</div>
	<div class="gerenxinxi-wrap-footer">
		<button @click="addconsumer">{{msg}}</button>
	</div>
	<!--<div class="masklayer" :class="masklayerflag?'masklayershow':'masklayerhidden'">
		<div class="masklayer-contaire">
			<h3>选择所在团队</h3>
			<div class="masklayer-contaire-top">
				<div class="beizhu">
					<label>备注</label>
					<input type="text" />
				</div>
				<div class="select">
					<p @click="selectshow"><span>{{department}}</span><i class="iconfont icon-arrow-right-copy-copy-copy" :class="selecttrue?'rotate90':''"></i></p>
					<ul :class="selecttrue?'maxheight':'minheight'">
						<li  v-on:click="aa(item)" v-for="(item,index) in items">{{item}}</li>
					</ul>
				</div>
			</div>
			<div class="masklayer-contaire-bottom">
				<span @click="masklayerflag=!masklayerflag">取消</span>
				<span>添加</span>
			</div>
		</div>
	</div>-->
</div>
</template>
<script>
export default{
	data(){
		return {
//			selecttrue:false,
//			items:['技术部','业务部','销售部','运营部'],
//			department:'请选择',
//			masklayerflag:false,
		}
	},
	filters:{
		sex(value){
			switch(value){
				case 'm':
				return '男'
				break;
				case 'f':
				return '女'
				break;
				default:
				return '未知'
				break;
			}
		}
	},
	computed:{
		msg:function(){
			if(parseInt(localStorage.getItem('identity'))==1){
				return '邀请我的客户'
			}else if(parseInt(localStorage.getItem('identity'))==2){
				return '邀请加入团队'
			}
		}
	},
	methods:{
		addconsumer:function(){
		    var that=this;
			if(parseInt(localStorage.getItem('identity'))==1){
				this.$api('/Execute.do',{action:'device.sendAgentMessage',customerseq:this.$route.params.personal.userseq}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
							message:'邀请已发送',
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
			}else if(parseInt(localStorage.getItem('identity'))==2){
				this.$api('/Execute.do',{action:'device.sendOfferMessage',customerseq:this.$route.params.personal.userseq}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
							message:'邀请已发送',
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
	},
}
</script>

<style scoped>
.gerenxinxi-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}
.gerenxinxi-wrap-head{
	width:100%;
	height:4.7rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.gerenxinxi-wrap-head-top{
	height:1.92rem;
	font-size:0.56rem;
	color:#fff;
	line-height:1.32rem;
	text-align: center;
	padding:0 0.5rem;
	padding-top:0.6rem;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.gerenxinxi-wrap-head-top{
		height:2.64rem;
		font-size:0.56rem;
		color:#fff;
		line-height:1.32rem;
		text-align: center;
		padding:0 0.5rem;
		padding-top:1.32rem;
	}
}
.gerenxinxi-wrap-head-top i{
	float: left;
	font-size:0.6rem;
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
.gerenxinxi-wrap-contaire{
	flex:1;
}
.gerenxinxi-wrap-contaire p{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.48rem;
	color:#222;
	background: #fff;
}
.gerenxinxi-wrap-contaire p i{
	font-size:0.6rem;
	color:#999;
	margin-right:0.5rem;
}
.gerenxinxi-wrap-footer{
	padding:1.04rem 0.5rem;
}
.gerenxinxi-wrap-footer button{
	width:100%;
	height:1.6rem;
	border:none;
	background:#1989f5;
	color:#fff;
	font-size:0.56rem;
	text-align: center;
	line-height:1.6rem;
	border-radius: 3px;
}
.masklayer{
	width:100%;
	height:100%;
	position: absolute;
	left:0;
	
	display: flex;
	display: -webkit-flex;
	align-items: center;
	background: rgba(0,0,0,.5);
	justify-content: center;	
}
.masklayershow{
	top:0;		
	transition: all 0.3s; 
}
.masklayerhidden{
	top:100%;
	transition: all 0.3s; 
}
.masklayer-contaire{
	width:10.24rem;
	height:8.1rem;
	background: #fff;
	border-radius: 5px;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.masklayer-contaire>h3{
	height:1.6rem;
	text-align: center;
	line-height:1.6rem;
	font-size:0.56rem;
}
.masklayer-contaire-top{
	flex:1;
	padding: 0 0.5rem;
}
.beizhu{
	height:1.6rem;
	border:1px solid #ddd;
	border-radius: 5px;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	font-size:0.38rem;
	color:#999;
	align-items: center;
	padding-left:0.5rem;
}
.beizhu input{
	height:100%;
	flex:1;
	margin-left:0.5rem;
}
.select{
	width:100%;
	height:1.6rem;
	border:1px solid #ddd;
	padding:0 0.5rem;
	font-size:0.38rem;
	color:#999;
	border-radius: 5px;
	margin-top:0.5rem;
	position: relative;
}
.select ul{
	position:absolute;
	left:0;
	top:1.6rem;
	background: #fff;
	width:100%;
	overflow: auto;
}
.select ul li{
	height:1.6rem;
	padding:0 0.5rem;
	font-size:0.38rem;
	color:#222;
	line-height:1.6rem;
	text-align: center;
}
.select .minheight{
	height:0;
	transition: all 0.3s;
}
.select .maxheight{
	height:4.8rem;
	transition: all 0.3s;
}

.select p{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.select p .icon-arrow-right-copy-copy-copy{
	transform: rotate(0deg);
	transition: all 0.3s;
}
.select .rotate90{
	transform: rotate(90deg) !important;
	transition: all 0.3s;
}
.masklayer-contaire-bottom{
	width:100%;
	height:1.6rem;
	border-top:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
}
.masklayer-contaire-bottom span{
	width:50%;
	height:100%;
	display: block;
	line-height:1.6rem;
	text-align: center;
	font-size:0.46rem;
	color:#999;
}
.masklayer-contaire-bottom span:nth-child(2){
	color:#1989f5;
	border-left:1px solid #ddd;
}
</style>