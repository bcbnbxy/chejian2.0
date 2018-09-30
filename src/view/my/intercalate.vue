<template>
	<div class="intercalate-wrap">
		<header>
			<span @click="$router.go(-1)"><i class="iconfont icon-fanhui" style="font-size:0.6rem;"></i></span>
			<span>设置</span>
		</header>
		<router-link to="/accountandsecurity" tag="div" class="scan-bind">
			<span>账号与安全</span>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</router-link>
		<ul class="intercalate-list">
			<!--<router-link to="/newmessage" tag="li"><span>新消息通知</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></router-link>-->
			<router-link tag="li" to="/aboutus"><span>关于我们</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></router-link>		
			<router-link tag="li" to="/disclaimer"><span>免责声明</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></router-link>	
			<li @click="ClearCache"><span>清除缓存</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></li>
		</ul>
		<div class="submit">
			<button @click="loginOut" v-show="loginout">退出登录</button>
			<button @click="Login" v-show="login">去登录</button>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
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
			MessageBox.confirm('', {
		        message: '确定要退出吗?',
		        showConfirmButton:true,
		        showCancelButton:true,
		        confirmButtonText:'确定',
		        cancelButtonText:'取消'
	        }).then(action => {
	          if (action == 'confirm') {
	            this.$api('/Execute.do',{action:'logout'}).then(function(r){
					if(r.errorCode=='0'){
						that.$toast({
				          message: '退出登录成功!',
				          position: 'bottom',
						  duration: 1500
				      });
					}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
						  duration: 1500
				       });
					}
					that.login=true;
			        that.loginout=false;
			        localStorage.removeItem('loginInfo');
			        that.$store.commit('setblog_userseq');
				})
	          }
	        }).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });			
		},
		Login:function(){
			this.$router.push('/bootPage')
		},
		ClearCache(){//清理缓存函数
			window.device.cleanCache();
			this.$toast({
	          message: '清理缓存成功',
	          position: 'bottom',
			  duration: 1500
	       });
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
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	position: relative;
	text-align: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.intercalate-wrap>header{
		height:2.64rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		line-height:1.32rem;
		position: relative;
		text-align: center;
		font-size:0.56rem;
		color:#fff;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
	}
}
.intercalate-wrap>header span:nth-child(1){
	position: absolute;
	left:0.5rem;
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