<template>
<div id="app">
		  <router-view/>  
</div>
</template>
<script>
export default {
    name: 'App',
        created(){
        		this.$store.commit('setblog_userseq');
			      this.$store.commit('setblog_touserseq',null);
			      this.$store.commit('setblog_friend',null);
			      this.$store.commit('setblog_remark',null);
			      var u = navigator.userAgent;
						var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
						var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端						
						if(isAndroid){
							this.$store.commit('getplatform','Android');
						}else if(isiOS){
							this.$store.commit('getplatform','iOS');
						}
						this.$store.commit('getuuid',window.device.getUUID());
			  //	localStorage.removeItem('loginInfo');
    }
}
</script>

<style>
	#app{
		height:100%;
	}
</style>
