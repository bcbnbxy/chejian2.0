
export default {
	state : {
		publicOption:{
			__uuid__:'',
	        __platform__:'',
 		    __version__:'1.0.0',
		},
		searchstatus:false,
		selectedcar:0,
		consumer:{},
		catchPages: "faxian"
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
	   },
	   add(state, item) {        
            state.catchPages=item;
	   },
	}
}