<template>
<div :class="flag?'citypickershow':''" :id="id" >
	<div class="citypicker-head">
		<i class="iconfont icon-fanhui" @click="onfilter"></i>
		<span>选择城市</span>
		<span @click="save">保存</span>
	</div>
	<div class="citypicker-contaire">
		<div class="citypicker-contaire-title"><span v-show="provice">{{provice}}</span><span v-show="city">{{city}}</span><span v-show="!city">请选择</span></div>
		<div class="citypicker-provice">
			<mt-index-list>
			    <mt-index-section :index="item.name" v-for="(item,Index) in datalist" :key="item.name">
			        <div @click="getprovice(item.name,index,Index)"  v-for="(item,index) in item.item" class="cell-content"  :key="item.name">
			    	    <span :style="index==colorindex&&Index==currentindex?'color:#1989f5':''">{{item.name}}</span>
			        </div>
			    </mt-index-section>
			</mt-index-list>
			<ul class="citypicker-city" :class="cityactive?'citypicker-city-active':''">
				<li v-for="(item,index) in infolist" @click="getcity(item.name,index)" :style="index==cityindex?'color:#1989f5':''">{{item.name}}</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default{
	props:{
		id:{
			type:String,
			default(){
				return {}
			}
		},
		flag:{
			type:Boolean,
			default(){
				return {}
			}
		}
	},
	data(){
		return {
			cityactive:false,
			colorindex:-1,
			currentindex:-1,
			cityindex:-1,
			infolist:[],
			provice:'',
			city:'',
			datalist:[{
				name:'A',
				item:[{
					name:'Aaron',
					info:[{name:'Aaron1'},{name:'Aaron2'},{name:'Aaron3'}]
				},{
					name:'Alden',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Austin',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				}]
			},{
				name:'B',
				item:[{
					name:'Baldwin',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Braden',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				}]
			},{
				name:'C',
				item:[{
					name:'Carl',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Chandler',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Clyde',
					info:[{name:'Aldensd'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Car',
					info:[{name:'Aldends'},{name:'Alden2'},{name:'Alden3'}]
				}]
			},{
				name:'D',
				item:[{
					name:'David',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Dad',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Document',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Double',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				}]
			},{
				name:'E',
				item:[{
					name:'Edgar',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Elton',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Element',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				},{
					name:'Eight',
					info:[{name:'Alden'},{name:'Alden2'},{name:'Alden3'}]
				}]
			}]
		}
	},
	methods:{
		onfilter(){
//		console.log(111);
			this.$emit("listenTochildEvent");
		},
		getprovice:function(value,index,index1){
			this.cityactive=true;
			this.colorindex=index;
			this.currentindex=index1;
			this.provice=value;
			for (var i=0;i<this.datalist.length;i++){
				for(var j=0;j<this.datalist[i].item.length;j++){
					if(value==this.datalist[i].item[j].name){
						this.infolist=this.datalist[i].item[j].info;
					}
				}
			}
		},
		getcity:function(value,index){
			this.city=value;
			this.cityindex=index;
		},
		save(){
			this.onfilter();
			var data=""
			if(this.provice&&this.city){
				data=this.provice+'/'+this.city
			}else if(!this.city){
				data=this.provice;
			}
			this.$emit('child-say',data);
		}
	}
}
</script>

<style>
.citypicker-head{
	height:1.32rem;
	width:100%;
	padding:0 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size:0.56rem;
	color:#fff;
	background-image: url(../../assets/img/faxianimg/headbg.png);
	background-size: cover;	
}
.citypicker-head .icon-fanhui{
	font-size:0.6rem;
}
.citypicker-head span:last-child{
	font-size:0.44rem;
}
.citypicker-contaire{
	flex:1;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;	
	overflow: hidden;
}
.citypicker-contaire-title{
	width:100%;
	height:1.6rem;
	background: #fff;
	border-bottom:1px solid #ddd;
	display: flex;
	display: -webkit-flex;
	padding:0 0.5rem;
	color:#1989f5;
	font-size:0.44rem;
}
.citypicker-contaire-title span{
	height:1.6rem;
	line-height:1.6rem;
	margin-right:1rem;
}
.citypicker-contaire-title span:last-child{
	border-bottom:1px solid #1989f5;
}
.citypicker-provice{
	flex:1;
	background: tan;
	overflow: hidden;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	position: relative;
}
.mint-indexlist{
flex:1;
overflow: auto;
}
.mint-indexlist-nav{
	background: none;
	border-left:none;
}
.mint-indexlist-content{
	margin-right:0 !important;
}
.mint-indexsection .mint-indexsection-index{
	height:0.6rem;
	font-size:0.44rem;
	color:#666;
	line-height:0.6rem;
	padding:0 0.5rem;
}
.mint-indexsection .cell-content{
	width:100%;
	height:1.6rem;
	background: #fff;
	border-bottom:1px solid #ddd;
	font-size:0.44rem;
	color:#666;
	padding:0 0.5rem;
	line-height:1.6rem;
}
.mint-indexlist-content .cell-content:last-child{
	border-bottom:none;
}
.mint-indexlist-navitem{
	color:#1989f5;
}
.citypicker-city{
	width:50%;
	height:100%;
	position: absolute;
	left:100%;
	top:0;
	background: #fff;
	box-shadow:2px 0 10px rgba(0,0,0,.1);
	transition: all 0.3s;	
}
.citypicker-city>li{
	width:100%;
	height:1.6rem;
	font-size:0.44rem;
	color:#666;
	line-height:1.6rem;
	padding-left:0.5rem;
	border-bottom:1px solid #ddd;
}
.citypicker-city-active{
	left:50%;
	transition: all 0.3s;
}
</style>