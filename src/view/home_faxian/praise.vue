<template>
	<div class="praise-wrap">
		<div class="praise-head">
			<span @click="$router.go(-1)">返回</span>
			<span>他们也点赞了</span>
			<span></span>
		</div>
		<div class="praise-list">
			<User></User>
		</div>
	</div>
</template>

<script>
import User from '@/components/search/user'
export default {
	components:{User}
}
</script>

<style>
	.praise-wrap{
		background:#f7f7f7;
		width:100%;
		height:100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	.praise-head{
		width: 100%;
		height:1.32rem;
		background: url(../../assets/img/faxianimg/headbg.png) center no-repeat;
		padding:0.21rem 0.5rem;
		font-size:0.42rem;
		color:#fff;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
	}
	.praise-head span:nth-child(2){
		font-size:0.56rem;
	}
</style>