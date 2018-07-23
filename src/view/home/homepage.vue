<template>
	<div class="homepage-wrap">
		<div class="homepage-wrap-head">
			<div class="homepage-wrap-headtop">
				<span @click="$router.go(-1)">返回</span>
				<span>主页</span>
				<span @click="gochat" v-show="$route.params.friends">私信</span>
			</div>
			<div class="homepage-wrap-headbottom">
				<img :src="headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+headphoto:require('../../assets/img/shouye/defaultavatar.png')"/>
				<div class="homepage-wrap-headbottom-info">
					<p>{{nickname}}</p>
					<p>{{descript}}</p>
					<p @click="addmarker" v-show="$route.params.friends"><span>{{remarker}}</span><i class="iconfont icon-bianji"></i></p>
				</div>
				<p class="addfriend" v-show="!$route.params.friends">加好友</p>
			</div>
		</div>
		<div class="homepage-container">
			<div class="homepage-container-center">
				<span v-for='(list,index) in lists' @click="toggle(index ,list.view)" :class="{active:active===index}">{{list.type}}</span>
				<b></b>
			</div>
			<div class="homepage-container-bottom">
				<div class="picture">
					<picture></picture>
				</div>
				<div class="video">
					<video></video>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import picture from '@/components/faxian/fourpicture'
import video from '@/components/faxian/faxianvideo'
import { MessageBox } from 'mint-ui';
export default{
	data () {
		return {
			currentView:'picture',
			remarker:this.$route.params.remark?this.$route.params.remark:'添加备注',
			headphoto:null,
			nickname:null,
			descript:null,
			active: 0,
			index:0,
			lists:[
				{
					type:"动态",
					view:'picture'
				},
				{
					type:"视频",
					view:'video'
				}
			]
		}
	},
	methods:{
		toggle(i,v) {
	      this.active = i
	      this.currentView = v
	  },
	  addmarker(){//添加备注
	  	var that=this;
			MessageBox.prompt('',{
				message:'请填写备注',
				showConfirmButton:true,
          		showCancelButton:true,
          		confirmButtonText:'确定',
          		cancelButtonText:'取消'
			}).then(({ value, action }) => {
				if (action == 'confirm') {
	            	if(value.trim().length>1){	            		
	            		that.$api('/Execute.do',{action:'updateFriendInfo',friend:this.$route.params.userseq,remark:value}).then(function(r){
	            			console.log(JSON.stringify(r));
	            			if(r.errorCode==0){
	            				that.remarker=value;
	            			}else{
	            				that.$toast({
				    				message:r.errorMessage,
				    				position:'bottom',
				    				duration:1500
				    			})
	            			}
	            		})
	            	}
	          	}
			}).catch(err => {
	          if (err == 'cancel') {
	            console.log('123');
	          }
	        });
	    },
	    getuserInfo(){//获取用户信息
	    	var that=this;
	    	this.$api('/Execute.do',{action:'userInfo',userseq:this.$route.params.userseq}).then(function(r){
	    		console.log(JSON.stringify(r));
	    		if(r.errorCode==0){
	    			if(r.data.userInfo==null||r.data.userInfo==undefined||r.data.userInfo==""){
	    				that.$toast({
		    				message:'没有数据',
		    				position:'bottom',
		    				duration:1500
		    			})
	    			}else{
	    				that.headphoto=r.data.userInfo.headphoto;
	    				that.nickname=r.data.userInfo.nickname;
	    				that.descript=r.data.userInfo.descript?r.data.userInfo.descript:'这个人很懒，什么也没有说';
	    			}
	    		}else{
	    			that.$toast({
	    				message:r.errorMessage,
	    				position:'bottom',
	    				duration:1500
	    			})
	    		}
	    	})
	    },
	    gochat(){//跳往聊天页面
	    	this.$router.replace({name:'chat',params:{chatgroup:0,nickname:this.remarker=='添加备注'?this.nickname:this.remarker,userseq:this.$route.params.userseq}});
	    	console.log()
	    }
	},
	mounted(){
		this.getuserInfo()
		console.log(this.$route.params.userseq);
	}
}
</script>

<style>
.homepage-wrap{
	width:100%;
	height:100%;
	background: #f7f7f7;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homepage-wrap-head{
	width:100%;
	height:4.35rem;
	background-image:url(../../assets/img/shouye/bg.png) ;
	background-size:cover;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}
.homepage-wrap-headtop{
	width:100%;
	height:1.32rem;
	padding:0 0.5rem;
	line-height:1.32rem;
	text-align: center;
	color:#fff;
	font-size:0.44rem;
	position: relative;
	
}
.homepage-wrap-headtop span:nth-child(1){
	position: absolute;
	left:0.5rem;
}
.homepage-wrap-headtop span:nth-child(3){
	position: absolute;
	right:0.5rem;
}
.homepage-wrap-headtop span:nth-child(2){
	font-size:0.56rem;
}
.homepage-wrap-headbottom{
	padding:0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	font-size:0.44rem;
	flex: 1;
}
.homepage-wrap-headbottom>img{
	width:1.8rem;
	height:1.8rem;
	border-radius: 50%;
}
.homepage-wrap-headbottom-info{
	height:100%;
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-around;
	line-height: 1;
	padding-left:0.5rem;
	color:#fff;
}
.homepage-wrap-headbottom-info>p:nth-child(1){
	font-size:0.5rem;
}
.homepage-wrap-headbottom-info>p:nth-child(2){
	font-size:0.38rem;
}
.homepage-wrap-headbottom-info>p:nth-child(3){
	font-size:0.38rem;
}
.homepage-wrap-headbottom-info>p:nth-child(3) .icon-bianji{
	font-size:0.44rem;
	margin-left:0.5rem;
}
.addfriend{
	line-height: 1;
	padding:0.3rem 0.5rem;
	color:#fff;
	border-radius: 0.6rem;
	background: #ff481d;
}
.homepage-container{
	flex:1;
	background: #f7f7f7;
}
.homepage-container-center{
	height:1.58rem;
	background:#006bff;
	color:#fff;
	font-size:0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	position: relative;
}
.homepage-container-center span{
	padding:0 0.52rem;
	height:1.58rem;
	line-height:1.58rem;
	text-align: center;
	position: relative;
}
.homepage-container-center b{
	content:'';
	height:1rem;
	width:1px;
	background:#fff;
	display: block;
	position: absolute;
	right:50%;
	top:0.29rem;
}
.homepage-container-center .active{
	border-bottom:1px solid #fff;
}
</style>