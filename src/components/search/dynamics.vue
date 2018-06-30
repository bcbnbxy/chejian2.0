<template>
	<div class="dynamics">
		<div v-for="(list,index) in callbackdata">
		    <Video  v-if="list.mediatype=='1'" :data="list" :index="index"></video>				
		    <Fourpicture  v-if="list.mediatype=='0'" :data="list" :index="index"></Fourpicture>
	    </div>
	</div>
</template>
<script>
import Video from '@/components/faxian/faxianvideo'
import Fourpicture from '@/components/faxian/fourpicture'
	export default {
		 props: {
	      callbackdata:{
	      	default(){
	          return {}
	        }
	      }
	    },
		components:{Video,Fourpicture},
		created(){
			this.$store.commit('changepopupmean_more',-1);
		}
	}
	
</script>

<style>
.dynamics{
	width:100%;
	height:100%;
}
</style>