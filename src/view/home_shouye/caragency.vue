<template>
	<div class="caragency-wrap">
		<div class="emergency-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>车务代办</span>					
		</div>
		<div class="emergency-wrap-contaire">
			<ul>
				<li>
					<img src="../../assets/img/shouye/clgh.png" style="width:0.79rem;height:0.58rem;"/>
					<p><span>车辆过户</span><span>车辆外迁，车辆迁入，本市过户</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
				<li>
					<img src="../../assets/img/shouye/jszyw.png" style="width:0.78rem;height:0.8rem;"/>
					<p><span>驾驶证业务</span><span>驾驶证补换，降低准驾车型</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
				<li>
					<img src="../../assets/img/shouye/dshl.png" style="width:0.75rem;height:0.62rem;"/>
					<p><span>丢失换领</span><span>补换领车牌，补换领登记证或行驶证</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
				<li>
					<img src="../../assets/img/shouye/clnj.png" style="width:0.82rem;height:0.82rem;"/>
					<p><span>车辆年检</span><span>新车年审，异地委托书，异地验车</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
				<li>
					<img src="../../assets/img/shouye/wzdb.png" style="width:0.82rem;height:0.82rem;"/>
					<p><span>违章代办</span><span>疑难违章专业解答</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
				<li>
					<img src="../../assets/img/shouye/qita.png" style="width:0.64rem;height:0.64rem;"/>
					<p><span>其他</span><span>其他车务咨询</span></p>
					<b @click="callphone('13632573001')">咨询办理</b>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default{
	methods:{
		callphone(phonenum){
			MessageBox.confirm('', {
		        message: '确定拨打电话？',
		        showConfirmButton:true,
		        showCancelButton:true,
		        confirmButtonText:'确定',
		        cancelButtonText:'取消'
	        }).then(action => {
	          if (action == 'confirm') {
	            window.device.callPhone(phonenum);
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
.caragency-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
}
.emergency-wrap-head{
	height:1.92rem;
	font-size:0.56rem;
	color:#fff;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	text-align: center;
	line-height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	position: relative;
}
.emergency-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.emergency-wrap-contaire>ul{
	background: #fff;
}
.emergency-wrap-contaire>ul>li{
	height:2rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.emergency-wrap-contaire>ul>li:last-child{
	border-bottom:none;
}
.emergency-wrap-contaire>ul>li>p{
	flex:1;
	height:100%;
	padding:0.45rem 0;
	display: flex;
	display:-webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	margin:0 0.35rem;
}
.emergency-wrap-contaire>ul>li>p>span:nth-child(1){
	line-height:1;
	font-size:0.46rem;
	color:#222222;
}
.emergency-wrap-contaire>ul>li>p>span:nth-child(2){
	line-height:1;
	font-size:0.38rem;
	color:#666;
}
.emergency-wrap-contaire>ul>li>b{
	width:0.8rem;
	font-size:0.36rem;
	color:#666;
}
</style>