<template>
<div class="editprofile-wrap">
	<mt-header  title="我的">
		<mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
		<span style="font-size:0.44rem;" slot="right" @click="save()">保存</span>
	</mt-header>
	<div class="editprofile-list">
		<div class="editheadphoto"><p>修改头像</p><img :src="headImg?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+headImg:require('../../assets/img/shouye/defaultavatar.png')" @click="sheetVisible=!sheetVisible"></div>
		<mt-field label="修改昵称" v-model="nickname"></mt-field>
		<div class="editsex">
			<span>性别</span>
			<p>
				<input id="item1" type="radio" name="item" value="m"  v-model="param">
        		<label for="item1"></label>
        		<span>男</span>
			</p>
			<p>
				<input id="item2" type="radio" name="item" value="f"  v-model="param">
        		<label for="item2"></label>
        		<span>女</span>
			</p>
		</div>
		<div class="editbirthday" @click="openPicker"><span>生日</span><input type="text" v-model="birthday" readonly/></div>
		<div class="editbirthday" @click="popupVisible=true"><span>所在地</span><p>{{provinces}}{{city}}</p></div>
		<mt-field label="签名"  type="textarea" rows="4" v-model="sign"></mt-field>
	</div>
    <mt-datetime-picker ref="picker" type="date" :startDate="new Date('1960')" :endDate="new Date()"  @confirm="handleConfirm" :visible-item-count="3"></mt-datetime-picker>  	    	    	    	
	<mt-actionsheet :actions="actionpic"  v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
	<mt-popup v-model="popupVisible" position="bottom" class="picker-city">
		 <div class="citypicker1">
		 	<mt-picker :slots="province"  @change="onProvinceChange"  value-key="pname" :visible-item-count="5"></mt-picker>
		 </div>
		 <div class="citypicker2">
		 	<mt-picker :slots="citys"  @change="onCityChange"  value-key="cname" :visible-item-count="5"></mt-picker>
		 </div>
	</mt-popup>	
</div>
</template>
<script>
import City from '@/assets/script/city'
export default {
	 data() {
	    return {	     
	        param:this.$route.params.userInfo.gender,
	        nickname:this.$route.params.userInfo.nickname,
	        birthday:this.$route.params.userInfo.birthday?this.formatDate(new Date(parseInt(this.$route.params.userInfo.birthday))):'未知',
	        sign:this.$route.params.userInfo.descript,
	        headImg:this.$route.params.userInfo.headphoto,
	        provinces:this.$route.params.userInfo.province,
	        city:this.$route.params.userInfo.city,
	        sheetVisible:false,
	        popupVisible:false,
	        flag:0, //最开始省市区那三个picker会初始化调用change事件，但是此时没有省市区数据，因此会报错，所以以这个标识符来控制当时第一次初始化时调用change事件时直接return
	        actionpic: [{
	            name: '拍照',  
	            method : this.captureImage// 调用methods中的函数  
	        }, {  
	            name: '从相册中选择',   
	            method : this.getLibrary// 调用methods中的函数  
	        }],
	        province:[{	        	
	            flex: 1,
	            values: this._getProvince(),
	            className: 'slot1',
	            textAlign: 'center'	       
	        }],
	        citys: [{	        
	            flex: 1,
	            values: this._getCity('北京市'),
	            className: 'slot1',
	            textAlign: 'center'	        
	        }],
	    }
	},
  	methods:{
		//生日选择
	    openPicker() {
	        this.$refs.picker.open();
	    },
	     handleConfirm(data){//选择日期
			this.birthday=this.formatDate(data);
	     },
	    formatDate(date) {//时间转换
		    const y = date.getFullYear()
		    let m = date.getMonth() + 1
		    m = m < 10 ? '0' + m : m
		    let d = date.getDate()
		    d = d < 10 ? ('0' + d) : d
		    return y + ' ' + m + ' ' + d
		},
	    captureImage(){//拍照
			var that=this;
			window.captureImage(
		        function(result){
		          if(result==""||result==null||result==undefined){
						that.sheetVisible=false;
						that.$toast({
				          message: "请重新拍照",
				          position: 'bottom',
						  duration: 1500
				        });
			      		return ;
					}else{
						that.testUpload(result);
					}
		        },function(code, err){
		          that.$toast({
			          message: 'captureImage code:'+code+'error:'+err,
			          position: 'bottom',
					  duration: 1500
			        });
		        });	
		},
		getLibrary(){ //从相册选择视频或图片  
			var that=this;
			window.pickImage(
		        function(result){
		          if(result==""||result==null||result==undefined){
						that.sheetVisible=false;
						that.$toast({
				          message: "请重新选择图片",
				          position: 'bottom',
						  duration: 1500
				        });
			      		return ;
					}else{
						that.testUpload(result);
					}
		        },function(code, err){
		          that.$toast({
			          message: 'pickImage code:'+code+'error:'+err,
			          position: 'bottom',
					  duration: 1500
			        });
		        });	
	    },
	    testUpload(file){//上传头像到服务器
			var ret = window.action.doUploadImage(file, '{"path":"headphoto"}');
			ret=JSON.parse(ret);
			if(ret.errorCode=="0"){
				this.headImg=ret.data
			}else{
				this.$toast({
		          message: ret.errorMessage,
		          position: 'bottom',
				  duration: 1500
		        });
			}	
		},
		onProvinceChange(picker, values) {
	        if(this.flag===0){
	            return
	        }
	        let provinceIndex=picker.getSlotValue(0)
	      	let city=this._getCity(provinceIndex.pname)
	      	this.citys[0].values=city
	      	this.provinces=provinceIndex.pname+'/';
	    },
	    onCityChange(picker, values) {
	        if(this.flag===0){
	      	    this.flag=1
	            return
	        }
	        let cityIndex=picker.getSlotValue(0)
	     	this.city=cityIndex.cname;
	    },
	    //得到省份数据
	    _getProvince(){
		    var CITY_DATA=City.provinces
		    let province=[]
		    CITY_DATA.forEach(function(item,index){
			    let obj={}
			    obj.pid=item.pid
			    obj.pname=item.pname
			    province.push(obj)
		    })
		    return province      
	    },
	    //根据省份得到城市数据
	    _getCity(province){
	        var CITY_DATA=City.provinces;
	        let city=[]
	        CITY_DATA.forEach((item,index)=>{
	            if(item.pname === province){
	                item.cities.forEach((item,index)=>{
	                    let obj={}
	                    obj.cid=item.cid
	                    obj.cname=item.cname
	                    city.push(obj)
	                    return 
	                })
	            }
	        })
	        return city
	    },
	    save(){
			var that=this;
			this.$api('/Execute.do',{
				action:"updateUserInfo",
				nickname:this.nickname,
				headphoto:this.headImg,
				descript:this.sign,
				gender:this.param,
				birthday:new Date(this.birthday).getTime(),
				province:this.provinces,
				city:this.city
			}).then(function(r){
				if(r.errorCode==='0'){
					that.$toast({
				          message: '修改资料成功',
				          position: 'bottom',
						  duration: 1500
				       });
					localStorage.setItem("loginInfo",JSON.stringify(r.data.updateUserInfo));
				}else{
					that.$toast({
				          message: r.errorMessage,
				          position: 'bottom',
						  duration: 1500
				       });
				}
			})
	    }
  	}
}
</script>

<style>
.editprofile-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	overflow: hidden;
}
.editprofile-wrap>header{
	height:1.32rem;
	padding:0 0.5rem;
	color:#fff;
	background-image:url(../../assets/img/faxianimg/headbg.png) ;
	background-size:cover ;
}
.editprofile-wrap .mint-button--default{
	background: none !important;
	width:auto;
	height:auto;
}
.editprofile-wrap .mint-header-title{
	font-size:0.52rem;
}
.editprofile-wrap .mint-cell{
	min-height:1.6rem;
}
.editprofile-wrap .mint-cell-wrapper{
	font-size:0.44rem !important;
	color:#888;
	padding:0 0.5rem;
	background-image:none ;
	border-bottom:1px solid #dcdcdc;
}

.editprofile-list{
	background: #fff;
}
.editprofile-list .editsex{
	height:1.6rem;
	display:flex;
	display: -webkit-flex;
	align-items: center;
	font-size:0.44rem;
	color:#888;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;
}
.editprofile-list .editsex span{	
	flex:1;
}
.editprofile-list .editsex p{
	position: relative;
    line-height: 30px;
    margin-left:1rem;
}
.editprofile-list .mint-field-core{
	text-align: right;
}
.editprofile-list .editsex p span{
	margin-left:0.3rem;
}
.editprofile-list .editsex p input[type="radio"]{
	width: 20px;
    height: 20px;
    opacity: 0;
}
.editprofile-list .editsex p label {
    position: absolute;
    left: 0;
    top: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #999;
}
.editprofile-list .editsex p input:checked+label { 
    background-color: #369cf9;
    border: 1px solid #369cf9;
}
.editprofile-list .editsex p input:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 1px;
    left: 5px;
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
}
.editheadphoto{
	height:2.4rem;
	display:flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	color:#888;
	border-bottom:1px solid #ddd;
	padding:0 0.5rem;	
}
.editheadphoto img{
	width:1.6rem;
	height:1.6rem;
	border-radius: 50%;
}
.editbirthday{
	height:1.6rem;
	padding:0 0.5rem;
	color:#888;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.44rem;
	border-bottom:1px solid #dcdcdc;
}
.editbirthday input,.editbirthday p {
	flex: 1;
	text-align: right;
}
.picker-city{
	width:100%;
}
.citypicker1{
	float:left;
	width:60%;
}
.citypicker2{
	float:left;
	width:30%;
}
</style>