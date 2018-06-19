<template>
	<div class="unreadmessage-wrap">
		<div class="unreadmessage-request">
			<div class="unreadmessage-request-checkbox">
				<input id="item1" type="checkbox">
        		<label for="item1"></label>
			</div>
			<div class="unreadmessage-request-right">
				<div class="unreadmessage-request-right-top">
					<p>
						<b>12345678900</b>
						<span>BOSS<mark>12345678900</mark>邀请您加入他的团队</span>
					</p>
					<p>9:00</p>
				</div>
				<div class="unreadmessage-request-right-bottom">
					<p>同意</p><p class="refuse">拒绝</p>					
				</div>
			</div>
		</div>
		<div class="unreadmessage-sysmsg">
			<div class="unreadmessage-request-checkbox">
				<input id="item2" type="checkbox">
        		<label for="item2"></label>
			</div>
			<div class="unreadmessage-sysmsg-right">
				<p><b>13354223552</b><span>您的爱车于6月8日需要保养</span></p>
				<p>8:00</p>
			</div>
		</div>
		<div class="unreadmessage-friend">
			<div class="unreadmessage-request-checkbox">
				<input id="item3" type="checkbox">
        		<label for="item3"></label>
			</div>
			<div class="unreadmessage-friend-right">
				<p><b>好友01</b><span>最近爱车状态怎么样？</span></p>
				<p>昨天</p>
			</div>
		</div>
		<div class="unreadmessage-request">
			<div class="unreadmessage-request-checkbox">
				<input id="item1" type="checkbox">
        		<label for="item1"></label>
			</div>
			<div class="unreadmessage-request-right">
				<div class="unreadmessage-request-right-top">
					<p>
						<b>12345678900</b>
						<span>BOSS<mark>12345678900</mark>邀请您加入他的团队</span>
					</p>
					<p>9:00</p>
				</div>
				<div class="unreadmessage-request-right-bottom">
					<p>同意</p><p class="refuse">拒绝</p>					
				</div>
			</div>
		</div>
		<div class="unreadmessage-sysmsg">
			<div class="unreadmessage-request-checkbox">
				<input id="item2" type="checkbox">
        		<label for="item2"></label>
			</div>
			<div class="unreadmessage-sysmsg-right">
				<p><b>13354223552</b><span>您的爱车于6月8日需要保养</span></p>
				<p>8:00</p>
			</div>
		</div>
		<div class="unreadmessage-friend">
			<div class="unreadmessage-request-checkbox">
				<input id="item3" type="checkbox">
        		<label for="item3"></label>
			</div>
			<div class="unreadmessage-friend-right">
				<p><b>好友01</b><span>最近爱车状态怎么样？</span></p>
				<p>昨天</p>
			</div>
		</div>
		<div class="unreadmessage-request">
			<div class="unreadmessage-request-checkbox">
				<input id="item1" type="checkbox">
        		<label for="item1"></label>
			</div>
			<div class="unreadmessage-request-right">
				<div class="unreadmessage-request-right-top">
					<p>
						<b>12345678900</b>
						<span>BOSS12345678900邀请您加入他的团队</span>
					</p>
					<p>9:00</p>
				</div>
				<div class="unreadmessage-request-right-bottom">
					<p>同意</p><p class="refuse">拒绝</p>					
				</div>
			</div>
		</div>
		<div class="unreadmessage-sysmsg">
			<div class="unreadmessage-request-checkbox">
				<input id="item2" type="checkbox">
        		<label for="item2"></label>
			</div>
			<div class="unreadmessage-sysmsg-right">
				<p><b>13354223552</b><span>您的爱车于6月8日需要保养</span></p>
				<p>8:00</p>
			</div>
		</div>
		<div class="unreadmessage-friend">
			<div class="unreadmessage-request-checkbox">
				<input id="item3" type="checkbox">
        		<label for="item3"></label>
			</div>
			<div class="unreadmessage-friend-right">
				<p><b>好友01</b><span>最近爱车状态怎么样？</span></p>
				<p>昨天</p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
.unreadmessage-wrap{
	width:100%;
	background: #fff;
}
.unreadmessage-request{
	height:3.1rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.unreadmessage-request mark{
	color:#1989f5;
	background: none;
}
.unreadmessage-request-checkbox{
	position: relative;
	margin-right:0.53rem;
}
.unreadmessage-request-checkbox input[type="checkbox"]{
	width: 0.65rem;
    height: 0.65rem;
    opacity: 0;
}
.unreadmessage-request-checkbox label {
    position: absolute;
    left: 0;
    top: 5px;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1px solid #999;
}
.unreadmessage-request-checkbox input:checked+label { 
    background-color: #1aad19;
    border: 1px solid #1aad19;
}
.unreadmessage-request-checkbox input:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 1px;
    left: 5px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
}
.unreadmessage-request-right{
	flex:1;
	height:100%;
	padding-top:0.3rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom:0.3rem;
	text-align: right;
}
.unreadmessage-request-right-bottom p{
	display: inline-block;
	width:2rem;
	height:1.2rem;
	text-align: center;
	line-height:1.2rem;
	color:#fff;
	font-size:0.32rem;
	background: #1989f5;
	border-radius: 5px;	
}
.unreadmessage-request-right-bottom .refuse{
	margin-left:0.5rem;
	background: #ddd;
}
.unreadmessage-request-right-top{
	height:1.3rem;
	padding-bottom:0.3rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.unreadmessage-request-right-top p:nth-child(2){
	font-size:0.3rem;
	color:#666;
}
.unreadmessage-request-right-top p:nth-child(1){
	flex:1;
	height:1rem;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
}
.unreadmessage-request-right-top p:nth-child(1) b{
	font-size:0.36rem;
	color:#222;
	text-align: left;
	line-height:1;
}
.unreadmessage-request-right-top p:nth-child(1) span{
	font-size:0.36rem;
	color:#666;
	text-align: left;
	line-height:1;
}
.unreadmessage-sysmsg{
	border-bottom:1px solid #ddd;
	padding:0.3rem 0.5rem 0.54rem 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.unreadmessage-sysmsg-right{
	flex:1;
	height:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.unreadmessage-sysmsg-right p:nth-child(1){
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	font-size:0.36rem;
}
.unreadmessage-sysmsg-right p:nth-child(1) b{
	text-align: left;
	line-height: 1;
	color:#222;
	margin-bottom:0.3rem;
}
.unreadmessage-sysmsg-right p:nth-child(1) span{
	text-align: left;
	line-height: 1;
	color:#666;
}
.unreadmessage-sysmsg-right p:nth-child(2){
	color:#666;
	font-size:0.36rem;
	line-height: 1;
}
.unreadmessage-friend{
	padding:0.26rem 0.5rem 0.56rem 0.5rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.unreadmessage-friend-right{
	flex:1;
	height:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}
.unreadmessage-friend-right p:nth-child(1){
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	font-size:0.36rem;
}
.unreadmessage-friend-right p:nth-child(1) b{
	text-align: left;
	line-height: 1;
	color:#222;
	margin-bottom:0.3rem;
}
.unreadmessage-friend-right p:nth-child(1) span{
	text-align: left;
	line-height: 1;
	color:#666;
}
.unreadmessage-friend-right p:nth-child(2){
	color:#666;
	font-size:0.36rem;
	line-height: 1;
}
</style>