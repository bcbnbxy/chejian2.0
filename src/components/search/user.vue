<template>
	<div class="user">
		<ul>
			<li v-for="(list,index) in lists"><img :src="list.imgsrc"/><span>{{list.username}}</span><p><span v-if="list.attention" class="yiguanzhu">已关注</span><span v-else class="jiaguanzhu">+关注</span></p></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				lists : [
					{
						username:'婉婉婉',
						attention:true,
						imgsrc: require ('../../assets/img/faxianimg/avatar.png')
					},{
						username:'婉婉婉',
						attention:false,
						imgsrc: require ('../../assets/img/faxianimg/avatar.png')
					},{
						username:'婉婉婉',
						attention:true,
						imgsrc: require ('../../assets/img/faxianimg/avatar.png')
					},{
						username:'婉婉婉',
						attention:false,
						imgsrc: require ('../../assets/img/faxianimg/avatar.png')
					}
				]
			}
		}
	}
</script>

<style scoped>
.user{
	width:100%;
	height:100%;
}
.user>ul{
	width:100%;
	background: #fff;
	padding:0 0.5rem;
}
.user>ul li{
	height:1.6rem;
	border-bottom:1px solid #dcdcdc;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	padding:0 0.1rem;
}
.user>ul li:last-child{
	border-bottom:none;
}
.user>ul li img{
	width:1rem;
	height:1rem;
	margin-right:0.52rem;
}
.user>ul li>span{
	font-size:0.4rem;
	color:#666;
	flex:1;
}
.user>ul li>p{
	font-size:0.34rem;
}
.user>ul li>p .yiguanzhu{
	padding:0.15rem 0.33rem;
	border:1px solid #ff481d;
	color:#ff481d;
	border-radius: 15px;
	display: block;
}
.user>ul li>p .jiaguanzhu{
	padding:0.2rem 0.46rem;
	display: block;
	background:#ff481d ;
	color:#fff;
	border-radius: 15px;
}
</style>