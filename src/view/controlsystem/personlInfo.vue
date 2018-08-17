<template>
<div class="personlInfo-wrap">
	<div class="personlInfo-wrap-top">
		<div class="personlInfo-wrap-head">
			<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<span>编辑成员信息</span>
			<span style="font-size:0.44rem;" @click="deleteuser">删除</span>
		</div>
		<div class="gerenxinxi-wrap-head-bottom">
			<img :src="$store.state.controls.staffinfo.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+$store.state.controls.staffinfo.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
			<p>
				<span>{{$store.state.controls.staffinfo.userInfo.nickname}}</span>
			</p>
		</div>
	</div>
	<div class="personlInfo-list">
		<div class="personlInfo-list-item">
			<p>手机号</p>
			<p>{{$store.state.controls.staffinfo.userInfo.mobileno}}</p>
		</div>
		<div class="personlInfo-list-item" @click="Revisenotes">
			<p>备注</p>
			<p><span>{{remark}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</div>
		<div class="personlInfo-list-item" @click="popupVisible=!popupVisible">
			<p>所属团队</p>
			<p><span>{{group}}</span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</div>
		<div class="personlInfo-list-item" @click="gohomepage($store.state.controls.staffinfo.staffseq)">
			<p>他的主页</p>
			<p><span></span><i class="iconfont icon-arrow-right-copy-copy-copy"></i></p>
		</div>
	</div>
	<div class="personlInfo-wrap-save"><button @click="save" :style="(remark!=$store.state.controls.staffinfo.staffname||group!=$store.state.controls.departmentname)?'':'background:#ccc;'">保存</button></div>
	<mt-popup v-model="popupVisible"  position="bottom"  style="width:100%;"> 	  	 
		<mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" valueKey="departname"></mt-picker>
	</mt-popup>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
	data(){
		return {
			remark:this.$store.state.controls.staffinfo.staffname?this.$store.state.controls.staffinfo.staffname:'',
			popupVisible:false,
			flag:0,
			departseq:this.$store.state.controls.departseq,
			group:'',
			slots:[
				{
		          flex: 1,
		          values:this.getdepartment(),
		          className: 'slot1',
		          textAlign: 'center',
		        }
			]
		}
	},
	methods:{
		onValuesChange(picker, values){
			if(this.flag==0){
				this.flag=1;
				this.group=this.$store.state.controls.departmentname;
				return;
			}
			this.group=values[0].departname;
			this.departseq=values[0].departseq;
		},
		deleteuser(){//删除业务员
			var that=this;
			MessageBox.confirm('确定删除此成员吗？').then(action => {
	            if (action == 'confirm') {
	            	that.$api('/Execute.do',{action:'device.fireAgentStaff',staffseq:this.$store.state.controls.staffinfo.staffseq}).then(function(r){
	            		if(r.errorCode==0){
	            			that.$toast({
								message:'删除业务员成功',
								position:'bottom',
								duration:1500
							})
	            		}else{
	            			that.$toast({
								message:r.errorMessage,
								position:'bottom',
								duration:1500
							})
	            		}
	            	})
	            }
	        }).catch(err => {
	            if (err == 'cancel') {
	                console.log('123');
	            }
	        });
		},
		gohomepage(touserseq){
			this.$router.push('/homepage')
			this.$store.commit('setblog_touserseq',touserseq);
			this.$store.commit('setblog_remark',null);
		},
		Revisenotes(){
			var that=this;
			MessageBox.prompt('',{
				message:'请填写备注',
				showConfirmButton:true,
          		showCancelButton:true,
          		confirmButtonText:'确定',
          		cancelButtonText:'取消'
			}).then(({ value, action }) => {
				if (action == 'confirm') {
	            	if(value.trim().length>1){
	            		that.remark=value;
	            	}
	          	}
			}).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });
		},
		getdepartment(){
			var departmentlist=[];
			for(var i=0;i<this.$store.state.controls.department.length;i++){
				let obj={};
				obj.departname=this.$store.state.controls.department[i].departname;
				obj.departseq=this.$store.state.controls.department[i].departseq;
				departmentlist.push(obj)
			}
			return departmentlist;
		},
		save(){
			var that=this;
			if(this.remark!=this.$store.state.controls.staffinfo.staffname||this.group!=this.$store.state.controls.departmentname){
				this.$api('/Execute.do',{action:'device.updateAgentStaff',staffname:this.remark,departseq:this.departseq,staffseq:this.$store.state.controls.staffinfo.staffseq}).then(function(r){
					if(r.errorCode==0){
						that.$toast({
							message:'修改资料成功',
							position:'bottom',
							duration:1500
						})
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
}
</script>

<style scoped> 
.personlInfo-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	position: relative;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.personlInfo-wrap-top{
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	width:100%;
	height:5.3rem;
	padding-top:0.6rem;
}
.personlInfo-wrap-head{
	padding:0 0.5rem;
	height:1.32rem;	
	color:#fff;
	font-size:0.56rem;
	width:100%;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
}
.personlInfo-wrap-head i{
	font-size:0.6rem;
}
.gerenxinxi-wrap-head-bottom{
	padding:0 0.5rem;
	padding-top:0.72rem;
	display: flex;
	display: -webkit-flex;	
}
.gerenxinxi-wrap-head-bottom img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.gerenxinxi-wrap-head-bottom p{
	height:1.8rem;
	font-size:0.48rem;
	color:#fff;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content:space-around;
	margin-left:0.5rem;
}
.personlInfo-list{
	flex:1;
}
.personlInfo-list-item{
	padding:0 0.5rem;
	height:1.6rem;
	border-bottom:1px solid #ddd;	
	background: #fff;
}
.personlInfo-list-item p:nth-child(1){
	float: left;
	font-size:0.48rem;
	height:1.6rem;
	line-height:1.6rem;
	color:#222;
}
.personlInfo-list-item p:nth-child(2){
	float: right;
	font-size:0.44rem;
	height:1.6rem;
	line-height:1.6rem;
	color:#999;
}
.personlInfo-list-item p:nth-child(2) input{
	height:100%;
	text-align: right;
}
.personlInfo-list-item p:nth-child(2) i{
	font-size:0.6rem;
	margin-left:0.3rem;
}
.sex-popup-hidden{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.5);
	position: absolute;
	left:0;
	top:100%;
	transition: all 0.3s;
}
.sex-popup-show{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.5);
	position: absolute;
	left:0;
	top:0;
	transition: all 0.3s;
}
.sex-popup{
	display: flex;
	display: -webkit-flex;
	align-items: flex-end;
}
.sex-popup p{
	width:100%;
	background: #fff;
}
.sex-popup p span{
	display: block;
	height:1.6rem;
	line-height:1.6rem;
	border-bottom:1px solid #ddd;
	text-align: center;
	font-size:0.52rem;
	color:#666;
}
.personlInfo-wrap-save{
	height:2.65rem;
	width:100%;
	padding:0 0.6rem;
}
.personlInfo-wrap-save button{
	height:1.6rem;
	line-height:1.6rem;
	color:#fff;
	font-size:0.56rem;
	text-align: center;
	background: #1989f5;
	width:100%;
	border-radius: 5px;
}
</style>