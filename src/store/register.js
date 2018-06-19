export default {
	state : {
		sendcodetrue:true,
		sendcodetime:60,
		sendmessage:'获取验证码',
		yzmtrue:false,
		sendcodetimer:null,
	},
	mutations:{
		regchangesendmsg(state,msg){
			state.sendmessage=msg
		},
		regsendcodedjs(state){
			state.sendcodetime --;
			if(state.sendcodetime==-1){
				state.sendcodetime=60;
				state.sendmessage="获取验证码";
	            state.yzmtrue=false;
	            state.sendcodetrue=true;
				clearInterval(state.sendcodetimer);
			}
		},
		regsendcodetime(state){
			state.sendcodetrue=!state.sendcodetrue;
		},
		regchangeyzmtrue(state){
			state.yzmtrue=!state.yzmtrue;
		},
	}
}
