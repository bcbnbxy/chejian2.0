export default {
	state : {
		popupmean:false,
		popupmean_more:-1,
		report:false,
		pic_text_video:false,
		share:false
	},
	mutations: {
		changepopupmean(state){
			state.popupmean=!state.popupmean;
		},
		changepopupmean_more(state,index){
			state.popupmean_more=index;
		},
		changereport(state){
			state.report=!state.report;
		},
		changepictextvideo(state){
			state.pic_text_video=!state.pic_text_video;
		},
		changeshare(state){
			state.share=!state.share;
		}
	}
}