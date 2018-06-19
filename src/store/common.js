
export default {
	state : {
		publicOption:{
			__uuid__:'863064010002246',
	        __platform__:'android',
 		    __version__:'1.0.0',
 		    __timestamp__:new Date().getTime()
		},
		searchstatus:false
	},
	mutations: {
		getversion(state,version){
			state.publicOption.version=version;
		},
		getplatform(state,platform){
			state.publicOption.platform=platform;
		},
		getuuid(state,uuid){
			state.publicOption.uuid=uuid;
		},
		toggleSearchStatus(state, status) {
	        state.searchstatus = status;
	  }
	}
}