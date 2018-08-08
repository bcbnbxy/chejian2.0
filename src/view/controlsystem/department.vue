<template>
<div class="department-wrap">
	<div class="department-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>管理系统</span>
		<span @click="isdisplay=!isdisplay">编辑</span>
	</div>
	<div class="department-wrap-contaire">
		<div class="department-wrap-contaire-head">
			<span>我的团队</span>
		</div>
		<div class="department-wrap-contaire-list">
			<accordion
		      v-for="(item,index) in dataList"
		      :key='item.departseq'
		      :title="item"	      
		      :list="item.staffs"
		      :department='dataList'>
		    </accordion>
		</div>
	</div>
	<div class="Groupmanagement" :class="isdisplay?'Groupmanagement-block':'Groupmanagement-none'">
		<Groupmanagement  v-on:listenTochildEvent="toggle" :departmentInfo="dataList"></Groupmanagement>
	</div>
</div>
</template>

<script>
 import Accordion from '@/components/controlsystem/Accordion'
  import Groupmanagement from '@/components/controlsystem/Groupmanagement'
export default{
	 components: {
      	Accordion,
      	Groupmanagement
    },
	data(){
		return {
			dataList:[],			
			isdisplay:false
		}
	},
	mounted:function(){
		this.getdepartments();
	},
	methods:{
		toggle(){
			this.isdisplay=!this.isdisplay;
			this.getdepartments();
		},
		getdepartments(){//获取部门列表及部门人员信息
			var that=this;
			this.$api('/Execute.do',{action:'device.departments'}).then(function(r){
				if(r.errorCode==0){
					that.dataList=r.data.departments;
				}else{
					that.$toast({
						message:r.errorMessage,
						position:'bottom',
						duration:1500
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.department-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}
.Groupmanagement-none{
	width:100%;
	height:100%;
	background:tan;
	position: absolute;
	left:0;
	top:100%;
	transition:all 0.3s ;
}
.Groupmanagement-block{
	width:100%;
	height:100%;
	background:tan;
	position: absolute;
	left:0;
	top:0;
	transition:all 0.3s ;
}
.department-wrap-head{
	width:100%;
	height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size: cover;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color:#fff;
	font-size:0.56rem;
}
.department-wrap-head span:last-child{
	font-size:0.44rem;
}
.department-wrap-head .icon-fanhui{
	font-size:0.6rem;
}
.department-wrap-contaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.department-wrap-contaire-head{
	height:1.6rem;
	padding:0 0.5rem;
	margin-bottom:0.3rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#222;
	background: #fff;
}
.department-wrap-contaire-head .icon-bianji{
	font-size:0.56rem;
	color:#666;
}
.department-wrap-contaire-list{
	flex:1;
	overflow: auto;
}
</style>