<template>
<div class="data-department">
	<dl>
		<dt><span>部门</span><i class="iconfont icon-shaixuan" @click="popupVisible=!popupVisible"></i></dt>
		<dd><span>运营部</span><span>60/人</span></dd>
		<dd><span>推广部</span><span>50/人</span></dd>
		<dd><span>技术部</span><span>50/人</span></dd>
	</dl>
	<mt-popup v-model="popupVisible"  position="bottom"  style="width:100%;"> 
		<div class="mtpicker-title"><span>选择月份</span><span @click="popupVisible=!popupVisible">确定</span></div>
		<mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3"></mt-picker>
	</mt-popup>
</div>
</template>

<script>
export default{
	data(){
		return {
			popupVisible:false,
			slots:[
				{
		          flex: 1,
		          values: ['一月份', '二月份', '三月份', '四月份','五月份', '六月份', '七月份', '八月份','九月份', '十月份', '十一月份', '十二月份'],
		          className: 'slot1',
		          textAlign: 'center',
		          defaultIndex:1,
		        }
			]
		}
	},
	methods:{
		onValuesChange(picker, values){
			console.log(values[0])
		}
	}
}
</script>

<style>
.data-department dt,.data-department dd{
	height:1.6rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	line-height:1.7rem;
	padding:0 0.5rem;
	font-size:0.44rem;
	color:#222;
	border-bottom:1px solid #ddd;
}
.data-department dt i{
	font-size:0.56rem;
	color:#999;
}
.data-department dd span:nth-child(2){
	color:#666;
}
.mtpicker-title{
	height:36px;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	padding:0 10px;
	font-size:18px;
	align-items: center;
	border-bottom:1px solid #efefef;
}
.mtpicker-title span:nth-child(2){
	color:#1989f5;
}
</style>
