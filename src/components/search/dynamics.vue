<template>
	<div class="dynamics">
		<div v-for="(list,index) in data">
		    <Video  v-if="list.mediatype=='1'" :data="list" :index="index" v-on:listendel="delindex"></video>				
		    <Fourpicture  v-if="list.mediatype=='0'" :data="list" :index="index" v-on:listendel="delindex"></Fourpicture>
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
	    data(){
	    	return {
	    		data:[],
	    	}
	    },
		components:{Video,Fourpicture},
		created(){
			this.$store.commit('changepopupmean_more',-1);
		},
		methods:{
			delindex(obj){
				this.$emit('listendel',obj)
			}
		},
		watch:{
			callbackdata:function(){
				this.data=this.callbackdata;
			}
		}
	}
	
</script>

<style>
.dynamics{
	width:100%;
	height:100%;
}
</style>