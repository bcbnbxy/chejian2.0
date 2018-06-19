<template>
<div class="personlInfo-wrap">
	<div class="personlInfo-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>人员信息维护</span>
	</div>
	<div class="personlInfo-list">
		<div class="personlInfo-list-item">
			<p>昵称</p>
			<p><input type="text" value="婉婉"/></p>
		</div>
		<div class="personlInfo-list-item">
			<p>性别</p>
			<p @click="toggleSexpopup"><span>{{sex}}</span><i class="iconfont icon-jiantou-copy-copy"></i></p>
		</div>
		<div class="personlInfo-list-item">
			<p>年龄</p>
			<p><input type="text" value="24"/></p>
		</div>
		<div class="personlInfo-list-item">
			<p>所属部门</p>
			<p @click="popupVisible=!popupVisible"><span>{{group}}</span><i class="iconfont icon-jiantou-copy-copy"></i></p>
		</div>
		<div class="personlInfo-list-item">
			<p>工薪</p>
			<p><input type="text" value="1000"/></p>
		</div>
	</div>
	<div class="personlInfo-wrap-save"><button>保存</button></div>
	<div class="sex-popup" :class="issexpopup?'sex-popup-show':'sex-popup-hidden'" @click="issexpopup=!issexpopup">
		<p><span @click="getvalue('男')">男</span><span @click="getvalue('女')">女</span></p>
	</div>
	<mt-popup v-model="popupVisible"  position="bottom"  style="width:100%;"> 	  	 
		<mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3"></mt-picker>
	</mt-popup>
</div>
</template>

<script>
export default{
	data(){
		return {
			issexpopup:false,
			sex:'女',
			popupVisible:false,
			group:'技术部',
			slots:[
				{
		          flex: 1,
		          values: ['技术部', '业务部', '市场部', '运营部'],
		          className: 'slot1',
		          textAlign: 'center'
		        }
			]
		}
	},
	methods:{
		toggleSexpopup(){
			this.issexpopup=!this.issexpopup;
		},
		getvalue(sex){
			this.sex=sex;
			this.issexpopup=!this.issexpopup;
		},
		onValuesChange(picker, values){
			this.group=values[0];
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
.personlInfo-wrap-head{
	padding:0 0.5rem;
	height:1.32rem;
	background-image:url(../../assets/img/faxianimg/headbg.png);
	background-size:cover;
	color:#fff;
	font-size:0.56rem;
	width:100%;
	text-align: center;
	line-height:1.32rem;
}
.personlInfo-wrap-head i{
	font-size:0.6rem;
	float:left;
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
	font-size:0.56rem;
	height:1.6rem;
	line-height:1.6rem;
	color:#222;
}
.personlInfo-list-item p:nth-child(2){
	float: right;
	font-size:0.52rem;
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