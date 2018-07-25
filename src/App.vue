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
        		this.$store.commit('setblog_userseq');
			      this.$store.commit('setblog_touserseq',null);
			      this.$store.commit('setblog_friend',null);
			      this.$store.commit('setblog_remark',null);
//	 localStorage.removeItem('loginInfo');
//	 	this.checklogin();
    },
	  methods:{
	  	//判断用户的登录状态
	  checklogin:function(){
		    if(localStorage.getItem('loginInfo')){
				    this.$router.push('/home');
			  }else{
				    this.$router.push('/');
	  			  }  		
	  	  },
	  }
}
</script>

<style>
	#app{
		height:100%;
	}
</style>
