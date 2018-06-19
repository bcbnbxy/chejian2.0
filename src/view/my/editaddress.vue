<template>
<div class="editaddress-wrap">
	<header>
		<span @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></span>
		<span>编辑收货地址</span>
		<span></span>
	</header>
	<ul class="editaddress-list">
		<li>
			<label>收货人</label>
			<input type="text" value="婉婉"/>
		</li>
		<li>
			<label>联系电话</label>
			<input type="text" value="12345678900"/>
		</li>
		<li  @click="showpopupVisible">
			<label>所在地止</label>
			<input type="text" value="广东省深圳市龙华新区" readonly/>
			<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
		</li>
		<li>
			<label>详细地址</label>
			<textarea>卫东龙商务大厦B栋611</textarea>
		</li>
	</ul>
	<div class="submit">
		<button>保存</button>
	</div>
	<mt-popup v-model="popupVisible" position="bottom" class="picker-city">
		<p class="picker-toolbar">
	        <span class="mint-datetime-action mint-datetime-cancel">取消</span>
	        <span class="mint-datetime-action mint-datetime-confirm">确定</span>
	    </p>
		 <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="5" ></mt-picker> 
	</mt-popup>	 	  	
</div>
</template>

<script>
export default {
	data () {
		return {
			popupVisible:false,
			citySlots: [
	        {
	          flex: 1,
	          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
	          className: 'slot1',
	          textAlign: 'right'
	        }, {
	          divider: true,
	          content: '',
	          className: 'slot2'
	        }, {
	          flex: 1,
	          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
	          className: 'slot3',
	          textAlign: 'left'
	        }
	      ]
		}
	},
	methods:{
		showpopupVisible:function(){
			this.popupVisible=true;
		},
		onCityChange(picker, values) {
	      if (values[0] > values[1]) {
	        picker.setSlotValue(1, values[0]);
	      }
	    }
	}
}
</script>

<style scoped>
.editaddress-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
}
.editaddress-wrap>header{
	height:1.32rem;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.editaddress-list{
	background: #fff;
	margin-bottom:0.5rem;
}
.editaddress-list li{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
	font-size:0.44rem;
	border-bottom:1px solid #dcdcdc;
	height:1.6rem;
}
.editaddress-list li input,.editaddress-list li textarea{
	height:100%;
	flex:1;
	border:none;
	color:#999;
}
.editaddress-list li label{
	width:2.1rem;
	text-align: left;
}
.editaddress-list li i{
	font-size:0.8rem;
	color:#999;
}
.editaddress-list li:last-child{
	border-bottom:none;
	height:3.16rem;
	align-items: flex-start;
	padding:0.6rem 0.5rem ;
}
.submit{
	padding:0 0.6rem;
}
.submit>button{
	width:100%;
	text-align: center;
	background:#369cf9;
	line-height:1.6rem;
	height:1.6rem;
	border:none;
	font-size:0.48rem;
	color:#fff;
	border-radius: 5px;
}
.picker-city{
	width:100%;
}
.icon-fanhui{
	font-size:0.44rem;
}
</style>