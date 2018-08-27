<template>
	<div class="nonetwork">
		<div class="nonetwork-box">
			<p>网络开小差了，请检查网络连接情况</p>
			<button @click="restload">点击重新加载</button>
		</div>
	</div>
</template>

<script>
export default {
	methods:{
		restload(){
			var that=this;
			this.$api('/Execute.do',{action:'areaCodes'}).then(function(r){
				if(r.errorCode==0){
					that.$router.go(-1)
				}
			})
		}
	}
}
</script>

<style>
.nonetwork{
	width:100%;
	height:100%;
	background:#f7f7f7;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
  	align-items: center;
}
.nonetwork p{
	font-size:0.44rem;
	text-align: center;
	color:#a0a0a0;
}
.nonetwork button{
	background: #ddd;
	display: block;
	margin:0.5rem auto;
	font-size:0.44rem;
	border-radius: 5px;
	border:none;
}
</style>