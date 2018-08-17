
export default {
	state : {
		publicOption:{
			__uuid__:'',
	        __platform__:'',
 		    __version__:'1.0.0',
 		    __timestamp__:new Date().getTime()
		},
		searchstatus:false,
		selectedcar:0,
		consumer:{},
	},
	mutations: {
		getversion(state,version){
			state.publicOption.version=version;
		},
		getplatform(state,platform){
			state.publicOption.__platform__=platform;
		},
		getuuid(state,uuid){
			state.publicOption.__uuid__=uuid;
		},
		toggleSearchStatus(state, status) {
	        state.searchstatus = status;
	   },
	   selectedcar(state,index){
	   	    state.selectedcar=index;
	   },
	   setconsumer(state,consumer){
	   		state.consumer=consumer;
	   }
	}
}