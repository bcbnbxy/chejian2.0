<template>
	<div class="phonebook-wrap">
		<div class="phonebook-head">
			<span @click="$router.go(-1)">返回</span>
			<span style="font-size:0.56rem;">通讯录联系人</span>	
			<span></span>
		</div>
		<div class="phonebook-online">
			<p>你的通讯录好友在玩奥~</p>
			<ul>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"><span><b>小小</b><i>通讯录:婉婉</i></span></p><p><span class="yiguanzhu">已关注</span><span class="jiaguanzhu">+关注</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"><span><b>昭</b><i>通讯录:昭昭</i></span></p><p><span class="yiguanzhu">已关注</span><span class="jiaguanzhu">+关注</span></p></li>
				<li><p><img src="../../assets/img/faxianimg/avatar.png"><span><b>鱼丸</b><i>通讯录:粗面君</i></span></p><p><span class="yiguanzhu">已关注</span><span class="jiaguanzhu">+关注</span></p></li>
			</ul>
		</div>
		<div class="phonebook-invite">
			<p>邀请好友送30元红包</p>
			<ul>
				<li>
					<p>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>小小</span>
					</p>
					<p>邀请</p>
				</li>
				<li>
					<p>
						<img src="../../assets/img/faxianimg/avatar.png"/>
						<span>昭昭</span>
					</p>
					<p>邀请</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
.phonebook-wrap{
	width:100%;
	height:100%;
}
.phonebook-head{
	height:1.32rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	color:#fff;
	font-size:0.44rem;
	align-items: center;
	background: url(../../assets/img/faxianimg/headbg.png) center no-repeat;
}
.phonebook-online{
	background: #fff;
	padding:0 0.5rem;
	margin-bottom:0.3rem;
}
.phonebook-online>p,.phonebook-invite>p{
	height:1.6rem;
	line-height:1.6rem;
	font-size:0.38rem;
	color:#999;	
}
.phonebook-online li,.phonebook-invite li{
	height:1.6rem;
	padding:0.3rem 0;
	border-bottom:1px solid #dcdcdc;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.phonebook-online li:last-child , .phonebook-invite li:last-child{
	border-bottom:none;
}
.phonebook-online li img,.phonebook-invite li img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	margin-right:0.5rem;
	vertical-align: middle;
}
.phonebook-online li p:nth-child(1){
	display: flex;
	display:-webkit-flex;
}
.phonebook-online li p:nth-child(1) span{
	display: flex;
	display:-webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	height:100%;
}
.phonebook-online li p:nth-child(1) span b{
	font-size:0.42rem;
	color:#222;
	font-weight:normal;
}
.phonebook-online li p:nth-child(1) span i{
	font-size:0.3rem;
	color:#666;
	font-style: normal;
}
.phonebook-online .yiguanzhu{
	padding:0.22rem 0.44rem;
	border-radius: 15px;
	border:1px solid #ff481d;
	font-size:0.32rem;
	color:#ff481d;
	position: relative;
	top:-6px;
	display:none;
}
.phonebook-online .jiaguanzhu{
	padding:0.22rem 0.44rem;
	border-radius: 15px;
	background:#ff481d;
	font-size:0.32rem;
	color:#fff;
	position: relative;
	top:-6px;
}
.phonebook-invite{
	background: #fff;
	padding:0 0.5rem;
}
.phonebook-invite li p:nth-child(2){
	padding:0.22rem 0.44rem;
	font-size:0.32rem;
	background:#ff481d;
	color:#fff;
	border-radius: 15px;
}
.phonebook-invite li span{
	font-size:0.42rem;
	color:#222;
}
</style>