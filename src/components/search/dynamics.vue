<template>
	<div class="dynamics">
		<div v-for="(list,index) in lists">
		    <Video  v-if="list.type=='video'" :data="list" :index="index"></video>				
		    <Fourpicture  v-if="list.type=='picture'" :data="list" :index="index"></Fourpicture>
	    </div>
	</div>
</template>
<script>
import Video from '@/components/faxian/faxianvideo'
import Fourpicture from '@/components/faxian/fourpicture'
	export default {
		components:{Video,Fourpicture},
		data(){
			return {
				lists:[
					{
						avatar:require ('../../assets/img/faxianimg/avatar.png'),
						type:'picture',
						content:'把赛事赛程的子页面补充上文档里面表明子页面是上海团队负责做的部分客户端不用管。',
						time:'5月23日',
						attention:true,
						mainpic:require ('../../assets/img/faxianimg/car1.png'),
						zan:'236',
						talk:'365',
						id:1
					},{
						avatar:require ('../../assets/img/faxianimg/avatar.png'),
						type:'picture',
						content:'把赛事赛程的子页面补充上文档里面表明子页面是上海团队负责做的部分客户端不用管。',
						time:'5月22日',
						attention:false,
						mainpic:'',
						zan:'236',
						talk:'365',
						id:2
					},{
						avatar:require ('../../assets/img/faxianimg/avatar.png'),
						type:'video',
						content:'把赛事赛程的子页面补充上文档里面表明子页面是上海团队负责做的部分客户端不用管。',
						time:'5月24日',
						attention:false,
						mainpic:require ('../../assets/img/faxianimg/car1.png'),
						zan:'236',
						talk:'365',
						id:3
					},{
						avatar:require ('../../assets/img/faxianimg/avatar.png'),
						type:'picture',
						content:'把赛事赛程的子页面补充上文档里面表明子页面是上海团队负责做的部分客户端不用管。',
						time:'5月25日',
						attention:false,
						mainpic:'',
						zan:'236',
						talk:'365',
						id:4
					},{
						avatar:require ('../../assets/img/faxianimg/avatar.png'),
						type:'video',
						content:'把赛事赛程的子页面补充上文档里面表明子页面是上海团队负责做的部分客户端不用管。',
						time:'5月26日',
						attention:false,
						mainpic:require ('../../assets/img/faxianimg/car1.png'),
						zan:'236',
						talk:'365',
						id:5
					}
				]
			}
		},
		created(){
			this.$store.commit('changepopupmean_more',-1);
		}
	}
	
</script>

<style>
.dynamics{
	width:100%;
	height:100%;
}
</style>