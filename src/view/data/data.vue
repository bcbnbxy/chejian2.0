<template>
<div class="data-wrap">
	<div class="data-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>数据</span>
	</div>
	<div class="data-contaire">
		<h3>全部<i class="iconfont icon-jiantou-copy-copy"></i></h3>
		<x-chart :id="id" :option="option"></x-chart>
	</div>
	<div class="data-footer">
		<department></department>
	</div>
</div>
</template>

<script>
import department from '@/components/data/department'
import XChart from '@/components/data/chart'
import options from '@/assets/script/chart'
export default{
	components:{department,XChart},
	data() {
	    let option = options.bar
	    return {
	      id: 'test',
	      option: option
	    }
    },
}
</script>

<style>
.data-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.data-head{
	height:1.32rem;
	width:100%;
	line-height: 1.32rem;
	font-size:0.56rem;
	padding:0 0.5rem;
	color:#fff;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
	text-align: center;
}
.data-head .icon-fanhui{
	font-size:0.6rem;
	float:left;
}
.data-contaire{
	height:9rem;
	background: #fff;
	margin-bottom:0.3rem;
}
.data-contaire>h3{
	height:0.89rem;
	line-height:1.34rem;
	text-align: right;
	padding:0 0.5rem;
	font-size:0.44rem;
	color:#999;
	font-weight: 400;
}
.data-contaire>h3 i{
	font-size:0.56rem;
	margin-left:0.2rem;
	vertical-align: middle;
}
#test{
	height:8.11rem;
	width:100%;
	background: tan;
}
.data-footer{
	height:auto;
	background: #fff;
}
</style>