<template>
<div class="mycarstate-wrap">
	<ul>
		<li v-for="(item,index) in warnCounts" :key="index"><span>{{item&&item.warntype}}</span><p><span :style="item&&item.count>0?'color:#ff0000':'color:#1aad19'">{{item&&item.count}}次</span></p></li>
	</ul>
</div>
</template>

<script>
export default{
	props:['warnCounts'],
	watch:{
		warnCounts(){
			console.log(this.warnCounts);
		}
	}
}
</script>

<style scoped>
.mycarstate-wrap{	
	background:#fff;
}
.mycarstate-wrap li{
	height:1.6rem;
	padding:0 0.5rem;
	border-bottom:1px solid #ddd;
	background: #fff;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.mycarstate-wrap li>p>img{
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	vertical-align: middle;
	margin-left:0.4rem;
}
.mycarstate-wrap li>p>span{
	color:#666;
}
</style>