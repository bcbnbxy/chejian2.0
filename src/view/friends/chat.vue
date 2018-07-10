<template>
<div class="chat-wrap">
	<div class="chat-wrap-head">
		<i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
		<span>哒哒</span>
	</div>
	<div class="chat-wrap-chatlist">
		<ul>
			<li>
			   	<span class='twoimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='twox'></span>
			   	<span class='chattwo'>是啊，好久不见了，明天会展中心举办车展，我这里有几张票，一起去看一下，意下如何？？哈哈。</span>
		    </li>
		    <li>
			   	<span class='oneimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='onex'></span>
			   	<span class='chatone'>哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?454646541313131sd</span>
		    </li>
		    <li>
			   	<span class='twoimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='twox'></span>
			   	<span class='chattwo'>是啊，好久不见了，明天会展中心举办车展，我这里有几张票，一起去看一下，意下如何？？哈哈。</span>
		    </li>
		    <li>
			   	<span class='oneimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='onex'></span>
			   	<span class='chatone'>哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?454646541313131sd</span>
		    </li>
		    <li>
			   	<span class='twoimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='twox'></span>
			   	<span class='chattwo'>是啊，好久不见了，明天会展中心举办车展，我这里有几张票，一起去看一下，意下如何？？哈哈。</span>
		    </li>
		    <li>
			   	<span class='oneimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='onex'></span>
			   	<span class='chatone'>哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?454646541313131sd</span>
		    </li>
		    <li>
			   	<span class='twoimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='twox'></span>
			   	<span class='chattwo'>是啊，好久不见了，明天会展中心举办车展，我这里有几张票，一起去看一下，意下如何？？哈哈。</span>
		    </li>
		    <li>
			   	<span class='oneimg'><img src="../../assets/img/faxianimg/avatar.png"/></span>
			   	<span class='onex'></span>
			   	<span class='chatone'>哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?哈喽,在吗?454646541313131sd</span>
		    </li>
		</ul>
	</div>
	<div class="chat-wrap-footer" :class="footSboxshow?'footSboxshow':''">
		<div class="boxinput">
	    	<i class="iconfont icon-jiahao1" @click="toggleNone" :style="footSboxshow?'color:#1989f5':''"></i><input type="text"/><span>发送</span>
	    </div>
	    <div class="footSbox">
	    	<p><img src="../../assets/img/friends/picture.png"/><span>图片</span></p><p><img src="../../assets/img/friends/canmer.png"/><span>相机</span></p>	    	
	    </div>
	</div>
</div>
</template>

<script>
export default{
	data(){
		return {
			footSboxshow:false
		}
	},
	methods:{
		toggleNone(){
			this.footSboxshow=!this.footSboxshow;
		}
	}
}
</script>

<style scoped>
.chat-wrap{
	width:100%;
	height:100%;
	background: #f0f0f0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
}
.chat-wrap-head{
	height:1.32rem;
	width:100%;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size:cover ;
	text-align: center;
	line-height:1.32rem;
	font-size:0.56rem;
	color:#fff;
	position: relative;
	padding:0 0.5rem;
}
.chat-wrap-head .icon-fanhui{
	position: absolute;
	left:0.5rem;
	font-size:0.6rem;
}
.chat-wrap-chatlist{
	flex: 1;
	overflow-y:scroll; 
	-webkit-overflow-scrolling:touch;
	padding-top:0.3rem;
	padding-bottom:1.6rem;
}
.chat-wrap-chatlist>ul{
	padding:0 0.5rem;
}
.chat-wrap-chatlist>ul li{ 
	display:block; 
	position:relative; 
	overflow:hidden; 
	margin-bottom:0.44rem;
}
.oneimg{
	float:right; 
	display:block;
	width:1.2rem; 
	height:1.2rem;
}
.oneimg img{
	width:1.2rem;
	height:1.2rem;
}
.onex{
	display:block;
	width:0.2rem;
	height:0.6rem;
	background:url(../../assets/img/friends/one.png) no-repeat;
	position:absolute;
	right:1.5rem;
	top:0.3rem;
	background-size:0.2rem 0.6rem;
}
.chatone{ 
	float:right;
	max-width:7.5rem; 
	border-radius:5px;
	background:#1989f5;
	margin-right:0.5rem;
	padding:0.2rem;
	text-align:left;
	font-size:0.38rem;
	line-height:0.6rem;
	color:#fff;
}
.twoimg{
	float:left;
	display:block;
	width:1.2rem;
	height:1.2rem;
}
.twoimg img{
	width:1.2rem;
	height:1.2rem;
}
.twox{
	display:block;
	width:0.2rem;
	height:0.6rem; 
	background:url(../../assets/img/friends/two.png) no-repeat;
	position:absolute;
	left:1.5rem;
	top:0.3rem;
	background-size:0.2rem 0.6rem;
}
.chattwo{
	float:left;
	max-width:7.5rem;
	border-radius:5px;
	background:#fff;
	margin-left:0.5rem;
	padding:0.2rem;
	text-align:left;
	line-height:0.6rem;
	color:#000;
	font-size:0.38rem;
}
.chat-wrap-footer{
	width:100%;
	background:#f7f7f7;
	overflow:hidden;
	position: absolute;
	left:0;
	bottom:-4rem;
	transition: all 0.3s;
}
.footSboxshow{
	bottom:0 !important;
	transition: all 0.3s !important;
}
.boxinput{
	overflow:hidden;
	height:1.6rem;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	padding:0 0.5rem;
}
.boxinput .icon-jiahao1{
	font-size:1rem;
	color:#999;
}
.boxinput input{
	flex:1;
	height:1rem;
	border:1px solid #ddd;
	border-radius: 5px;
	background: #fff;
	margin:0 0.5rem;
	font-size:0.38rem;
}
.boxinput span{
	font-size:0.38rem;
	color:#1989f5;
}
.footSbox{
	height:4rem;
	padding-left:1.3rem;
	padding-top:0.5rem;	
}
.footSbox p{
	display: inline-block;
	width:1.6rem;
	line-height: 1;
	margin-right:1.15rem;
}
.footSbox p img{
	width:1.6rem;
	height:1.6rem;
	margin-bottom:0.3rem;
	display: block;
}
.footSbox p span{
	font-size:0.38rem;
	color:#222;
	display: block;
	text-align: center;
}
</style>