<template>
<div class="workshop_app-wrap">
	<ul>
		<li @click="goconsumer">
			<p><img :src="customers.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+customers.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/><span>{{customers.userInfo.nickname}}</span></p>
			<p><span>{{customers.staff.staffname?customers.staff.staffname:customers.staff.userInfo.nickname}}</span><img :src="customers.faultCount>0?require('../../assets/img/my/tishi.png'):require('../../assets/img/my/tishi1.png')"/></p>
		</li>
	</ul>
</div>
</template>

<script>
export default{
	props:{
		customers:{
			type:Object,
			default(){
				return{}
			}
		}
	},
	methods:{
		goconsumer(){
			this.$router.push('/consumer');
			this.$store.commit('setconsumer',this.customers)
		}
	}
}
</script>

<style scoped>
.workshop_app-wrap{
	background: #fff;
}
.workshop_app-wrap li{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.38rem;
	color:#222;
}
.workshop_app-wrap li p:nth-child(1) img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	display: inline;
	margin-right:0.3rem;
	vertical-align: middle;
}
.workshop_app-wrap li p:nth-child(2) img{
	width:0.62rem;
	height:0.62rem;
	border-radius: 50%;
	display: inline;
	margin-left:0.3rem;
	vertical-align: middle;
}
</style>