<template>
	<div class="devicebind-wrap">
		<header>
			<span><i class="iconfont icon-fanhui"  @click="$router.go(-1)"></i></span>
			<span>设备绑定</span>
		</header>
		<div class="scan-bind" @click="startRecognize()">
			<span>扫描绑定</span>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</div>
		<div class="shibiema">
			<input type="text" placeholder="请输入16位设备识别码" v-model="devicenum"/>
			<p>注：设备识别码及设备二维码在设备底部</p>
		</div>
		<div class="submit">
			<button @click="bindDevice">确定</button>
		</div>
	</div>
</template>

<script>
var scan=null;
export default {
	data (){
		return {
			devicenum:''
		}
	},
	methods:{
		startRecognize:function(){
			var that=this;
			 window.scan(
		        function(result){
		            that.devicenum=result;
		        },
		        function(code, err){
		          that.$toast({
			          message: 'testQrcode code:' + code + 'err:' + err,
			          position: 'bottom',
	  				  duration: 1500
			        });
		        }
		    );
		},
		bindDevice(){
			var that=this;
			if(this.devicenum.trim().length<1){
				this.$toast({
		          message: '请输入设备编号',
		          position: 'bottom',
  			      duration: 1500
		      });
			}else{					
				this.$api("/Execute.do",{action:"device.bindDevice",device:this.devicenum}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
				          message: '设备绑定成功',
				          position: 'bottom',
		  			      duration: 1500
				      	});
				        that.$router.push('/homeindex')
					}else{
						that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
		  			      duration: 1500
				      	});
					}
				})
			}
		}
	}
}
</script>

<style scoped>
.devicebind-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.devicebind-wrap>header{
	height:1.92rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	padding-top:0.6rem;
	font-size:0.56rem;
	color:#fff;
	text-align: center;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
	position: relative;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
	.devicebind-wrap>header{
		height:2.64rem;
		padding:0 0.5rem;
		line-height:1.32rem;
		padding-top:1.32rem;
		font-size:0.56rem;
		color:#fff;
		text-align: center;
		background-image:url(../../assets/img/faxianimg/headbg.png) ;
		background-size:cover ;
		position: relative;
	}
}
.devicebind-wrap>header span:nth-child(1){
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
.shibiema input{
	height:1.6rem;
	padding:0 0.5rem;
	text-align: center;
	font-size:0.38rem;
	background: #fff;
	color:#222;
	width:100%;
	border:none;
}
.shibiema p{
	font-size:0.38rem;
	color:#999;
	text-align: center;
	line-height:0.98rem;
	width:100%;
	margin-bottom:0.9rem;
}
.submit{
	padding:0 0.6rem;
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
#bcid{
	width:100vw;
	height:100vh;
	background:rgba(0,0,0,.3);
	position: fixed;
	top:0;
	left:0;
}
.icon-fanhui{
	font-size:0.44rem;
}
</style>