export default {
	state : {
		sendcodetrue:true,
		sendcodetime:60,
		sendmessage:'获取验证码',
		yzmtrue:false,
		sendcodetimer:null,
		loginInfo:[],
		restpassword:{
			mobileno:'',
			checkcode:'',
		}
	},
	mutations: {
		changesendmsg(state,msg){
			state.sendmessage=msg
		},
		sendcodedjs(state){
			state.sendcodetime --;
			if(state.sendcodetime==-1){
				state.sendcodetime=60;
				state.sendmessage="获取验证码";
	            state.yzmtrue=false;
	            state.sendcodetrue=true;
				clearInterval(state.sendcodetimer);
			}
		},
		sendcodetime(state){
			state.sendcodetrue=!state.sendcodetrue;
		},
		changeyzmtrue(state){
			state.yzmtrue=!state.yzmtrue;
		},
		getloginInfo(state,data){
			state.loginInfo=data;
		},
		restpasswordInfo(state,data){
			state.restpassword.mobileno=data.mobileno;
			state.restpassword.checkcode=data.checkcode;
		}
	}
}