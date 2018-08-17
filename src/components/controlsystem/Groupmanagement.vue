<template>
<div class="Groupmanagement-wrap">
	<div class="Groupmanagement-wrap-head">
		<i class="iconfont icon-fanhui" @click="onfilter"></i>
		<span>部门编辑</span>
	</div>
	<dl>
		<dt @click="addgroup"><i class="iconfont icon-jia"></i><span>添加部门名称</span></dt>
		<dd @click="deletegroup(item.departseq,item.departname,item.staffs.length)" v-for="(item,index) in departmentlist"><i class="iconfont icon-jian"></i><span>{{item.departname}}</span></dd>
		<!--<dd @click="deletegroup"><i class="iconfont icon-jian"></i><span>推广部</span></dd>-->
	</dl>
	<div class="messagebox-prompt" v-if="isprompt">
		<div class="prompt-proup">
			<h1>添加部门</h1>
			<input type="text" placeholder="部门名称" v-model="department"/>
			<textarea placeholder="部门说明"></textarea>
			<p><button @click="isprompt=false">取消</button><button @click="adddepartment" :disabled="!department" :style="!department?'color:#ccc':''">确定</button></p>
		</div>
	</div>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default{
	props:{
		departmentInfo:{
			type:Array,
			default(){
				return[]
			}
		}
	},
	watch: {
            departmentInfo() {
                this.departmentlist=this.departmentInfo;
            }
       },
	data(){
		return {
			isprompt:false,
			department:'',
			departmentlist:[],
		}
	},
	methods:{
		onfilter(){
            this.$emit("listenTochildEvent");
            this.$emit("agingetdepartments");
        },
        deletegroup(departseq,departname,length){
        	var that=this;
      	    if(length>0){
      	    	MessageBox('提示', '请先移除该部门下的人员,再删除该部门');
      	    }else{
      	    	MessageBox.confirm('', {
	                message: '确定删除此部门吗？这项操作会删除该部门下的所有人员，请谨慎操作！',
	                showConfirmButton:true,
	                showCancelButton:true,
	                confirmButtonText:'确定',
	                cancelButtonText:'取消'
	           }).then(action => {
	                if (action == 'confirm') {
	                    that.$api('/Execute.do',{action:'device.updateDepartment;device.departments',departseq:departseq,departname:departname,status:2}).then(function(r){
	                    	if(r.errorCode==0){
	                    		that.departmentlist=r.data.departments;
	                    		that.$toast({
									message:'部门删除成功',
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
      	    }
        },
        addgroup(){
      		this.isprompt=true;
		},
		adddepartment(){
			var that=this;
			this.isprompt=false;
			this.$api('/Execute.do',{action:'device.addDepartment;device.departments',departname:this.department}).then(function(r){
				console.log(JSON.stringify(r));
				if(r.errorCode==0){
					that.departmentlist=r.data.departments;
					that.$toast({
						message:'部门添加成功',
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
	
</script>

<style scoped>
.Groupmanagement-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	position: relative;
}
.Groupmanagement-wrap-head{
	height:1.92rem;
	width:100%;
	padding:0 0.5rem;
	padding-top:0.6rem;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover;
	font-size:0.44rem;
	color:#fff;
	line-height:1.32rem;
	text-align: center;
	position: relative;
}
.Groupmanagement-wrap-head span:nth-child(2){
	font-size:0.56rem;
}
.Groupmanagement-wrap-head i:nth-child(1){
	position:absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.Groupmanagement-wrap dl{
	background: #fff;
}
.Groupmanagement-wrap dl dt{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
	line-height:1.6rem;
	font-size:0.44rem;
	color:#999;
}
.Groupmanagement-wrap dl dt i{
	font-size:0.6rem;
	color:#1aad19;
	margin-right:0.32rem;
}
.Groupmanagement-wrap dl dd{
	height:1.6rem;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
	line-height:1.6rem;
	font-size:0.44rem;
	color:#222;
}
.Groupmanagement-wrap dl dd i{
	font-size:0.6rem;
	color:#ff0000;
	margin-right:0.32rem;
}
.messagebox-prompt{
	width:100%;
	height:100%;
	background: rgba(0,0,0,.5);
	position: absolute;
	top:0;
	left:0;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
}
.prompt-proup{
	background: #fff;
	width:10.24rem;
	border-radius: 5px;
	padding:0 0.5rem;
}
.prompt-proup h1{
	font-size:0.56rem;
	color:#222;
	height:1.6rem;
	line-height:1.6rem;
	text-align: center;
	font-weight: 400;
	margin:0;
}
.prompt-proup input {
	width:100%;
	height:1.6rem;
	font-size:0.44rem;
	border:1px solid #ddd;
	border-radius:3px ;
	color:#222;
	padding:0 0.3rem;
}
.prompt-proup textarea{
	width:100%;
	height:2.2rem;
	border:1px solid #ddd;
	font-size:0.44rem;
	border-radius: 3px;
	padding:0 0.3rem;
	margin-top:0.5rem;
	line-height:0.7rem;
	display: block;
}
.prompt-proup p{
	width:10.24rem;
	height:1.6rem;
	margin-top:0.5rem;
	border-top:1px solid #ddd;
	font-size:0.56rem;
	color:#999;
	margin-left:-0.5rem;
	overflow: hidden;
}
.prompt-proup p button{
	display: inline-block;
	width:50%;
	height:1.6rem;
	line-height: 1.6rem;
	text-align: center;
	background: none;
}
.prompt-proup p button:last-child{
	border-left:1px solid #ddd;
	color:#1989f5;
}
</style>