<template>
<div class="accountandsecurity-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>账号与安全</span>
	</header>
	<div class="scan-bind">
		<span>手机号码</span>
		<span>{{telphone}}</span>
	</div>
	<ul class="intercalate-list">
		<!--<li><span>微信绑定</span><p><b>未绑定</b><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></li>-->
		<router-link tag="li" to="/changepassword"><span>修改密码</span><p><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p></router-link>				
	</ul>
</div>
</template>

<script>
	export default{
		data () {
			return {
				tel:JSON.parse(localStorage.getItem('loginInfo')).mobileno
			}
		},
		computed:{
			telphone:function(){
				return this.tel.replace(this.tel.substring(3,8),'*****');
			}
		},
		created(){
			console.log(localStorage.getItem('loginInfo'))
		}
	}
</script>
<style scoped>
.accountandsecurity-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.accountandsecurity-wrap>header{
	height:1.92rem;
	padding:0 0.5rem;
	padding-top:0.6rem;
	line-height:1.32rem;
	text-align: center;
	position: relative;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.accountandsecurity-wrap>header{
		height:2.64rem;
		padding:0 0.5rem;
		padding-top:1.32rem;
		line-height:1.32rem;
		text-align: center;
		position: relative;
		font-size:0.56rem;
		color:#fff;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
	}
}
.accountandsecurity-wrap>header span:nth-child(1){
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
	border-bottom: 1px solid #ddd;
	/*margin-bottom:0.3rem;*/
	padding:0 0.5rem;
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
.intercalate-list li b{
	font-weight: normal;
}
.icon-fanhui{
	font-size:0.44rem;
}
</style>