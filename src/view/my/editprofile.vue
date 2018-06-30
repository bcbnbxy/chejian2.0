<template>
<div class="editprofile-wrap">
	<mt-header  title="我的">
		<mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
		<span style="font-size:0.44rem;" @click="save()" v-if="unbind" slot="right">保存</span>
		<span style="font-size:0.44rem;" v-else slot="right">保存</span>
	</mt-header>
	<div class="editprofile-list">
		<div class="editheadphoto"><p>修改头像</p><p><img :src="headerImage"/><input type="file" id="change" accept="image" @change="change"></p></div>
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
		<div class="editbirthday" @click="showpopupVisible"><span>所在地</span><p>{{city1}}{{address}}</p></div>
		<mt-field label="签名"  type="textarea" rows="4" v-model="sign"></mt-field>
	</div>
	<div class="container" v-show="panel">  
        <div>  
            <img id="image" :src="url" alt="Picture">  
        </div>  
        <div class="btn-group">
        	<button type="button" id="button" @click="commit">确定</button>  
        	<button type="button"id="cancel" @click="cancel">取消</button> 
        </div>
    </div>
    <mt-datetime-picker ref="picker" type="date"  year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate="new Date('1900')" :endDate="new Date()"  @confirm="handleConfirm"></mt-datetime-picker>  	    	    	    	
	<mt-popup v-model="popupVisible" position="bottom" class="picker-city">
		 <div class="citypicker1">
		 	<mt-picker :slots="provinces"  @change="onProvinceChange"  value-key="pname" :visible-item-count="5"></mt-picker>
		 </div>
		 <div class="citypicker2">
		 	<mt-picker :slots="citys"  @change="onCityChange"  value-key="cname" :visible-item-count="5"></mt-picker>
		 </div>
	</mt-popup>	 
</div>
</template>
<script>
import Cropper from "cropperjs";
import store from '../../store'
import {buildSign} from '../../assets/script/until.js'
export default {
  created(){
  	if(JSON.parse(localStorage.getItem('loginInfo')).gender=='m'){
  		this.param='m'
  	}else if(JSON.parse(localStorage.getItem('loginInfo')).gender=='f'){
  		this.param='f'
  	}else{
  		this.param=''
  	}
  },
  data() {
    return {
      headerImage:JSON.parse(localStorage.getItem('loginInfo')).headphoto?JSON.parse(localStorage.getItem('loginInfo')).headphoto:require ("../../assets/img/faxianimg/avatar.png"),
      picValue: "",
      cropper: "",
      checkedValue:'',
      croppable: false,
      avatar:null,
      panel: false,
      param:'',
      url: "",
      imgCropperData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      popupVisible:false,
      unbind:true,
      nickname:JSON.parse(localStorage.getItem('loginInfo')).nickname,
      birthday:JSON.parse(localStorage.getItem('loginInfo')).birthday?new Date(parseInt(JSON.parse(localStorage.getItem('loginInfo')).birthday)).getFullYear()+'/'+(new Date(parseInt(JSON.parse(localStorage.getItem('loginInfo')).birthday)).getMonth()+1)+'/'+new Date(parseInt(JSON.parse(localStorage.getItem('loginInfo')).birthday)).getDate() : '未知',
      city1:JSON.parse(localStorage.getItem('loginInfo')).city ? JSON.parse(localStorage.getItem('loginInfo')).city:'',
      sign:JSON.parse(localStorage.getItem('loginInfo')).descript ? JSON.parse(localStorage.getItem('loginInfo')).descript:'随便说点什么',
      address:JSON.parse(localStorage.getItem('loginInfo')).province ? JSON.parse(localStorage.getItem('loginInfo')).province:'',
      province:
      {
	      pname:'北京市',
	      pid:'1'
      },
      maskFlag:false,
      city:{
        cname:'北京市',
        cid:'1'
      },
      flag:0, //最开始省市区那三个picker会初始化调用change事件，但是此时没有省市区数据，因此会报错，
              //所以以这个标识符来控制当时第一次初始化时调用change事件时直接return
      provinces: [
        {
          flex: 1,
          values: this._getProvince(),
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      citys: [
        {
          flex: 1,
          values: this._getCity('北京市'),
          className: 'slot1',
          textAlign: 'center'
        }
      ]
  }
},
  mounted() {
    //初始化这个裁剪框
    var self = this;
    var image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function() {
        self.croppable = true;
      }
    });
  },
  methods:{
    //取消上传
    cancel() {
        this.panel = false;
        var obj = document.getElementById('change') ; 
        obj.outerHTML=obj.outerHTML; 
    },
    //创建url路径
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //input框change事件，获取到上传的文件
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let type = files[0].type; //文件的类型，判断是否是图片
      let size = files[0].size; //文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 5242880) {
        alert("请选择5M以内的图片！");
        return false;
      }
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    //确定提交
    commit() {
      this.panel = false;
      var croppedCanvas;
      var roundedCanvas;
      if (!this.croppable) {
        return;
      }
      croppedCanvas = this.cropper.getCroppedCanvas();
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      //上传图片
      this.postImg(roundedCanvas.toDataURL());
      this.headerImage=roundedCanvas.toDataURL();
    },
    //canvas画图
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();
      return canvas;
    },
    //提交上传函数
    postImg(dataUrl) {
    	this.unbind=false;
    	var base64 = dataUrl.split(',')[1];
    	var blob = this.toBlob(base64,'image/jpeg');
		var formData = new FormData()
		let publicOPtion=store.state.common.publicOption
		publicOPtion.path='headphoto';
		publicOPtion.__sign__=buildSign(publicOPtion,publicOPtion.__uuid__);
		formData.append(this.picValue.name,blob)
        formData.append('__uuid__',publicOPtion.__uuid__);      
        formData.append('path',publicOPtion.path);
        formData.append('__mobileno__',publicOPtion.__mobileno__);
        formData.append('__sign__',publicOPtion.__sign__);
        formData.append('__timestamp__',publicOPtion.__timestamp__);
        formData.append('__version__',publicOPtion.__version__);
        formData.append('__platform__',publicOPtion.__platform__);
        var that=this;
    	this.$api('uploadImage.do',formData).then(function(r){
    	 	that.unbind=true;
    	 	that.avatar=r.data.headphoto;
    	})
    },
    toBlob(urlData,fileType){
        var bytes=window.atob(urlData),
            n=bytes.length,
            u8arr=new Uint8Array(n);
        while(n--){
            u8arr[n]=bytes.charCodeAt(n);
        }
        return new Blob([u8arr],{type:fileType});
    },
    save(){
		var that=this;
		this.$api('/Execute.do',{
			action:"updateUserInfo",
			nickname:this.nickname,
			headphoto:"../../assets/img/faxianimg/avatar.png",
			descript:this.sign,
			gender:this.checkedValue,
			birthday:new Date(this.birthday).getTime(),
			province:this.city1,
			city:this.address
		}).then(function(r){
			console.log(JSON.stringify(r));
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
    },
//生日选择
    openPicker() {
        this.$refs.picker.open();
     },
     handleConfirm(data){
		this.birthday=this.formatDate(data);
     },
    formatDate(date) {
	    const y = date.getFullYear()
	    let m = date.getMonth() + 1
	    m = m < 10 ? '0' + m : m
	    let d = date.getDate()
	    d = d < 10 ? ('0' + d) : d
	    return y + ' ' + m + ' ' + d
	  },
//城市选择
	showpopupVisible(){
		this.popupVisible=true;
    },
   onProvinceChange(picker, values) {
      if(this.flag===0){
        return
      }
      let provinceIndex=picker.getSlotValue(0)
      this.province=provinceIndex
      let city=this._getCity(provinceIndex.pname)
      this.citys[0].values=city
      this.city=city[0]
      this.city1=provinceIndex.pname+'/';
    },
    onCityChange(picker, values) {
      if(this.flag===0){
      	this.flag=1
        return
      }
      let cityIndex=picker.getSlotValue(0)
      this.city=cityIndex
     this.address=this.city.cname;
    },
    //得到省份数据
    _getProvince(){
    	var CITY_DATA=JSON.parse(localStorage.getItem('CITY_DATA'));
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
      var CITY_DATA=JSON.parse(localStorage.getItem('CITY_DATA'));
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
  }
};
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
.editprofile-list .editheadphoto{
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
.editprofile-list .editheadphoto p:last-child{
	position: relative;
}
.editprofile-list .editheadphoto p:last-child input{
	position: absolute;
	left:0;
	right:0;
	z-index: 10;
	width:100%;
	height:100%;
	opacity: 0;
	filter:Aplpha(opacity=0);
}
.editprofile-list .editheadphoto img{
	width:1.4rem;
	vertical-align: middle;
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
.btn-group{
	width:100%;
	height:1.32rem;
	position: absolute;
	top:0;
	left:0;
	display: flex;
	display:-webkit-flex;
	justify-content: space-between;
	padding:0 0.5rem;
	align-items: center;
}
.btn-group button{
	padding:0.22rem 0.44rem;
	font-size:0.44rem;
	color:#fff;
	background: rgba(255,255,255,.3);
	border-radius: 0.45rem;
}
.container {
  z-index: 99;
  position: fixed;
  padding-top: 1.32rem;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}
#image {
  max-width: 100%;
}
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.cropper-container img {
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}
.cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
.cropper-line {
  background-color: #39f;
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.cropper-point {
  width: 5px;
  height: 5px;
  opacity: 0.75;
  background-color: #39f;
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}
@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}
@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}
@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>