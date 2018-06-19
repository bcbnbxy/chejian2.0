<template>
<div class="manageaddress-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>管理收货地址</span>
		<span></span>
	</header>
	<div class="address-list">
		<div class="address-item">
			<div class="address-item-top">
				<p><span>婉婉</span><span>广东省深圳市龙华新区卫东龙商务大厦B栋611</span></p>
				<p>12345678900</p>
			</div>
			<div class="address-item-bottom">
				<p><i class="iconfont" :class="active ? 'icon-queren' : 'icon-quan'"></i><span>设为默认</span></p>
				<p><router-link to='/editaddress' tag="span"><i class="iconfont icon-bianji" ></i> 编辑 </router-link><span><i class="iconfont icon-shanchu"></i> 删除</span></p>
			</div>
		</div>
		<div class="address-item">
			<div class="address-item-top">
				<p><span>婉婉</span><span>广东省深圳市龙华新区卫东龙商务大厦B栋611</span></p>
				<p>12345678900</p>
			</div>
			<div class="address-item-bottom">
				<p><i class="iconfont" :class="active ? 'icon-queren' : 'icon-quan'"></i><span>设为默认</span></p>
				<p><router-link to='/editaddress' tag="span"><i class="iconfont icon-bianji" ></i> 编辑</router-link><span><i class="iconfont icon-shanchu"></i> 删除</span></p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			active:false
		}
	}
}
</script>

<style scoped>
.manageaddress-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.manageaddress-wrap>header{
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
.address-item{
	background: #fff;
	margin-bottom:0.3rem;
}
.address-item-top{
	height:2rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.address-item-top p:nth-child(1){
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: space-between;
	margin-right:0.5rem;
	white-space: nowrap; 
	overflow: hidden; 
	text-overflow: ellipsis;
}
.address-item-top p:nth-child(2){
	flex:1 0 auto;
}
.address-item-bottom{
	height:1.6rem;
	color:#222;
	font-size:0.44rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
}
.address-item-bottom p:nth-child(2) i{
	color:#999;
	margin-left:0.4rem;
}
.address-item-bottom p:nth-child(2) span{
	margin-left:0.2rem;
}
.address-item-bottom .icon-queren{
	color:#369cf9;
}
.address-item-bottom p:nth-child(1) i{
	margin-right:0.3rem;
}
.icon-fanhui,.icon-bianji,.icon-shanchu,.icon-quan{
	font-size:0.44rem;
}
</style>