<template>
<nav class="accWrapper">
	<div class="accTitle" @click="toggleList">
	  <span>{{ title.departname }}</span>
	  <i class="iconfont icon-arrow-right-copy-copy-copy" :class="isDisplay?'open_menu':'close_menu'"/>	  
	</div>
	<ul v-if="isDisplay">
	  <li  v-for="item in list" :key="item.id" class="accListItem" @click="gopersonal(item,title.departname,title.departseq,department)">
	  	<img :src="item.userInfo.headphoto?'https://chd-app-img.oss-cn-shenzhen.aliyuncs.com/'+item.userInfo.headphoto:require('../../assets/img/shouye/defaultavatar.png')">
	    <span>{{ item.staffname?item.staffname:item.userInfo.nickname }}</span>
	  </li>
	</ul>
</nav>
</template>

<script>
export default {
    data () {
        return {
            isDisplay: false
        }
    },
    props: {
        title: {
            type: Object,
            default(){
                return {}
            }
        },
        list: {
            type: Array,
            default(){
        	    return []
            }
        },
        department:{
      	    type:Array,
      	    default(){
      		    return []
      	    }
        }
    },
    methods: {
        toggleList () {
            this.isDisplay = !this.isDisplay
        },
        gopersonal(item,departname,departseq,department){        	
        	this.$store.commit('setstaffinfo',item);
        	this.$store.commit('setdepartmentname',departname);
        	this.$store.commit('setdepartseq',departseq);
        	this.$store.commit('setdepartment',department);
//      	console.log(JSON.stringify(this.$store.state.controls.staffinfo));
        	this.$router.push('/personlInfo')
        }
    }
}
</script>

<style scoped>
.accWrapper {
    display:flex;
    flex-direction: column;
    border-bottom:1px solid #ddd;
  }
 .accTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.6rem;
    font-size: 0.44rem;
    padding:0 0.5rem;
    background: #fff;
    
  }
  .accListItem {
 	background: #fff;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 1.6rem;
    font-size: 0.44rem;
    padding:0 0.5rem;
    cursor: pointer;
  }
  .accListItem img{
  	width:1rem;
  	height:1rem;
  	border-radius: 50%;
  	margin-right:0.3rem;
  }
  @keyframes open-menu {
    to {
      transform: rotate(90deg);
    }
  }
  @keyframes close-menu {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  .open_menu {
    animation: open-menu 0.2s ease-out forwards;
  }
  .close_menu {
    animation: close-menu 0.2s ease-out forwards;
  }
</style>