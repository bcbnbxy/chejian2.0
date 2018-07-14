<template>
	<div class="personal-wrap">
		<div class="personal-top">
			<header>
				<span></span>
				<span>我的</span>
				<router-link to="/mymessage" tag="span"><i class="iconfont icon-youjian"></i></router-link>
			</header>
			<div class="personal-top-main">
				<div><img src="headphoto" :onerror="defaultImg"/></div>
				<div>
					<p><span>{{nickname ? nickname: loginname}}</span><i class="iconfont"  :class="Sex"></i></p>
					<router-link tag="p" to="/editprofile"><span>{{mobileno}}</span><i class="iconfont icon-xiugaimima"></i></router-link>
				</div>
			</div>
		</div>
		<section class="personal-bottom">
			<nav>
				<div @click="gopersonal"><p><svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanli"></use></svg></p><span>管理</span></div>
				<router-link tag="div" to="/devicelist"><p><i class="iconfont icon-wodeshebei" style="color:#1989f5;"></i></p><span>设备</span></router-link>
			</nav>
			<router-link to="/devicebinding" tag="div" class="personal-bottom-shebei">
				<i class="iconfont icon-bangding"></i><span>设备绑定</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</router-link>
			<ul class="personal-bottom-shezhi">
				<router-link to="/manageaddress" tag="li">
					<i class="iconfont icon-dizhi"></i><span>收货地址</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</router-link>
				<router-link to="/contactservice" tag="li">
					<i class="iconfont icon-kefu1"></i><span>联系客服</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</router-link>
				<router-link to="/feedback" tag="li">
					<i class="iconfont icon-yijianfankui1"></i><span>意见反馈</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</router-link>
				<router-link to="/intercalate" tag="li">
					<i class="iconfont icon-shezhi1"></i><span>设置</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</router-link>
			</ul>
		</section>
	</div>
</template>

<script>
export default{
	computed:{
		Sex:function(){
			if(this.sex==='m'){
				return 'icon-nanxing'
			}else if(this.sex==='f'){
				return 'icon-zuihoudinggao-'
			}
		}
	},
	beforeRouteEnter(to,from,next){
		if(!localStorage.getItem('loginInfo')){
			next({path:'/nologin'});
		}else{
			next();
		}
	},
	created(){
		this.getUserInfo();
	},
	data () {
		return {
			nickname:'',
			mobileno:'',
			headphoto:'../../assets/img/faxianimg/avatar.png',
			loginname:'',
			defaultImg:'this.src="' + require('../../assets/img/faxianimg/avatar.png') + '"' ,
			sex:'',
			//identity:parseInt(localStorage.getItem('identity')),//用户身份标示，-1表示普通用户，1表示业务员，2表示老板
		}
	},
	methods:{
		getUserInfo:function(){
			let userInfo=JSON.parse(localStorage.getItem('loginInfo'));
			let that=this;
			this.$api('/Execute.do',{action:'userInfo;device.agentOrStaff',userseq:userInfo.userseq}).then(function(r){
				if(r.errorCode == '0'){
					that.nickname=r.data.userInfo.nickname;
					that.mobileno=r.data.userInfo.mobileno;
					that.loginname=r.data.userInfo.loginname;
					that.sex=r.data.userInfo.gender;
					localStorage.setItem("loginInfo",JSON.stringify(r.data.userInfo));
					localStorage.setItem('identity',2)//r.data.agentOrStaff
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		gopersonal(){
			if(parseInt(localStorage.getItem('identity'))==-1){
				this.$router.push('/manageupgrade');
			}else if(parseInt(localStorage.getItem('identity'))==1){
				this.$router.push('/mycontrolsystem');
			}else if(parseInt(localStorage.getItem('identity'))==2){
				this.$router.push('/mycontrolsystem');
			}else if(parseInt(localStorage.getItem('identity'))==3){
				this.$router.push('/infoaudit');
			}
		}
	}
}
</script>

<style scoped>
.personal-wrap{
	width:100%;
	height:100%;
	background:#f7f7f7;
}
.personal-top{
	height:4.7rem;
	width:100%;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;
}
.personal-top header{
	height:1.32rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
	font-size:0.56rem;
}
.personal-top header i{
	font-size:0.56rem;
}
.personal-top-main{
	height:1.8rem;
	padding:0 0.5rem;
	margin-top:0.47rem;
	display: flex;
	display: -webkit-flex;
	align-items: center;
}
.personal-top-main>div:nth-child(1) img{
	width:1.8rem;
	border-radius: 50%;
	margin-right:0.7rem;
	display: block;
}
.personal-top-main>div:nth-child(2){
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	font-size:0.5rem;
	color:#fff;
	height:100%;
}
.personal-top-main>div:nth-child(2) span{
	margin-right:0.4rem;
}
.personal-bottom>nav{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding-top:0.66rem;
	padding-bottom:0.68rem;
	background: #fff;
	margin-bottom:0.3rem;
}
.personal-bottom>nav>div{
	width:50%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
}
.personal-bottom>nav>div>p{
	width:100%;
	text-align: center;
	border-right:1px solid #dcdcdc;
}
.personal-bottom>nav>div:last-child p{
	border-right:none;
}
.personal-bottom>nav>div span{
	font-size:0.38rem;
	color:#222;
}
.personal-bottom>nav>div i{
	font-size:0.96rem;
}
.personal-bottom-shebei{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	padding:0 0.5rem;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
}
.personal-bottom-shebei span,.personal-bottom-shezhi li span{
	flex: 1;
	padding-left:0.52rem;
}
.personal-bottom-shebei .icon-bangding{
	font-size:0.96rem;
	color:#f5694d;
}
.personal-bottom-shezhi li .icon-dizhi{
	font-size:0.96rem;
	color:#16c34b;
}
.personal-bottom-shezhi li .icon-kefu1{
	font-size:0.96rem;
	color:#51bfb5;
}
.personal-bottom-shezhi li .icon-yijianfankui1{
	font-size:0.96rem;
	color:#ff818d;
}
.personal-bottom-shezhi li .icon-shezhi1{
	font-size:0.96rem;
	color:#f39800;
}
.colora0{
	color:#a0a0a0;
	font-size:0.96rem;
}
.personal-bottom-shezhi{
	background: #fff;
	padding:0 0.5rem;
}
.personal-bottom-shezhi li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	border-bottom:1px solid #dcdcdc;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
}
.personal-bottom-shezhi li:last-child{
	border-bottom: none;
}
.icon-zuihoudinggao-,.icon-nanxing,.icon-xiugaimima,.icon-arrow-right-copy-copy-copy{
	font-size:0.44rem;
}
</style>