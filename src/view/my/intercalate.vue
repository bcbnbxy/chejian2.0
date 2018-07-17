<template>
	<div class="intercalate-wrap">
		<header>
			<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
			<span>设置</span>
			<span></span>
		</header>
		<router-link to="/accountandsecurity" tag="div" class="scan-bind">
			<span>账号与安全</span>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</router-link>
		<ul class="intercalate-list">
			<!--<router-link to="/newmessage" tag="li"><span>新消息通知</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></router-link>-->
			<li><span>关于我们</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></li>		
			<li><span>免责声明</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></li>		
		</ul>
		<div class="submit">
			<button @click="loginOut" v-show="loginout">退出登录</button>
			<button @click="Login" v-show="login">去登陆</button>
		</div>
	</div>
</template>

<script>
export default{
	created(){
		if(localStorage.getItem('loginInfo')){
			this.loginout=true;
			this.login=false;
		}else{
			this.loginout=false;
			this.login=true;
		}
	},
	data () {
		return {
			loginout:null,
			login:null
		}
	},
	methods:{
		loginOut:function(){
			let that=this;
			this.$api('/Execute.do',{action:'logout'}).then(function(r){
				if(r.errorCode=='0'){
					that.$toast({
			          message: '退出登录成功!',
			          position: 'bottom',
  					  duration: 1500
			       });
			       that.login=true;
			       that.loginout=false;
			       localStorage.removeItem('loginInfo');
				}else{
					that.$toast({
			          message: r.errorMessage,
			          position: 'bottom',
  					  duration: 1500
			       });
				}
			})
		},
		Login:function(){
			this.$router.push('/bootPage')
		}
	}
}
</script>

<style scoped>
.intercalate-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.intercalate-wrap>header{
	height:1.32rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.scan-bind{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	background: #fff;
	margin-bottom:0.3rem;
	padding:0 0.5rem;
}
.intercalate-list{
	background: #fff;
}
.intercalate-list li{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
	background: #fff;
	padding:0 0.5rem;
	border-bottom:1px solid #dcdcdc;
}
.intercalate-list li:last-child{
	border-bottom:none;
}
.submit{
	padding:0 0.6rem;
	padding-top:0.5rem;
}
.submit>button{
	width:100%;
	text-align: center;
	background:#369cf9;
	line-height:1.6rem;
	height:1.6rem;
	border:none;
	font-size:0.48rem;
	color:#fff;
	border-radius: 5px;
}
.icon-fanhui{
	font-size:0.44rem;
}
</style>