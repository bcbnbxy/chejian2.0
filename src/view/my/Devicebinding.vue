<template>
	<div class="devicebind-wrap">
		<header>
			<span><i class="iconfont icon-fanhui"  @click="$router.go(-1)"></i></span>
			<span>设备绑定</span>
			<span></span>
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
			<button>确定</button>
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
			var param = window.barcode.scan();
			alert(param+'------35行')
			if(param==""||param==null||param==undefined){
				this.$toast({
			          message: '扫描失败',
			          position: 'bottom',
	  				  duration: 1500
			        });
			}else{
				this.devicenum=param;
			}			
//			this.bcidflag=true;
//			scan = new plus.barcode.Barcode('bcid');
//			scan.start();			
//			scan.onmarked=this.onmarked;
		},
//		onmarked:function( type, result){ //扫描二维码成功回调函数
//			var text = '未知: ';
//			switch(type){
//				case plus.barcode.QR:
//				text = 'QR: ';
//				break;
//				case plus.barcode.EAN13:
//				text = 'EAN13: ';
//				break;
//				case plus.barcode.EAN8:
//				text = 'EAN8: ';
//				break;
//			}
//			scan.cancel();
//			scan.close();
//			this.bcidflag=false;
//			this.devicenum=result;
//		}
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