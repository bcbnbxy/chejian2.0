<template>
<div id="app">
		  <router-view/>  
</div>
</template>

<script>

//let platform="";
//document.addEventListener( "plusready",function(){
//			alert(plus.device.uuid);
//			var u = navigator.userAgent;
//			var isAndroid=true;
//			if(isAndroid){
//				platform="Android";
//			}else{
//				platform="iOS";
//			}		
//	}, false );
export default {
  name: 'App',
  created(){
	 localStorage.removeItem('loginInfo');
//	 console.log(localStorage.getItem('loginInfo'))
//	 	this.checklogin();
	 	this.getCityInfo();
  },
  methods:{
  	//判断用户的登录状态
  	checklogin:function(){
//		  localStorage.removeItem('loginInfo');
  		if(localStorage.getItem('loginInfo')){
  				this.$router.push('/home');
  			}else{
  				this.$router.push('/');
  			}  		
  	},
  	getCityInfo:function(){
   	this.$api('/Execute.do',{action:"provinces"}).then(function(r){
	   		if(r.errorCode=='0'){
	   			 localStorage.setItem('CITY_DATA',JSON.stringify(r.data.provinces))
	   		}
	   	})
	  }
  }
}
</script>

<style>
	#app{
		height:100%;
	}
</style>
