<template>
<div id="app">
	<transition :name="transitionName">
	 <keep-alive :include="$store.state.common.catchPages">
	      <router-view v-if="$route.meta.keepAlive"></router-view>
	 </keep-alive>
	</transition>
	<transition :name="transitionName">
	  <router-view v-if="!$route.meta.keepAlive"></router-view>
	</transition>
	<div class="footer1" v-show="$route.path=='/homeindex'||$route.path=='/faxian'||$route.path=='/friends'||$route.path=='/personal'">
		<Footer></Footer>
	</div>
</div>
</template>
<script>
import Footer from '@/components/common/footer'
export default {
    name: 'App',
    components:{Footer},
    data(){
    	return {
				transitionName:'',
				showfooter:true,
			}
    },
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
//	  	localStorage.removeItem('loginInfo');
    },
	watch: {//使用watch 监听$router的变化
	    $route(to, from) {
	        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
	        if(to.meta.index > from.meta.index){
	            //设置动画名称
	            this.transitionName = 'slide-left';
	        }else{
	            this.transitionName = 'slide-right';
	        }
	    }
	}
}
</script>

<style>
	#app{
		height:100%;
		width:100%;
	}
	
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
