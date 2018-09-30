import Vue from 'vue'
import Router from 'vue-router'
//import BootPage from '@/view/register/BootPage'
import Register from '@/view/register/register'
//import Login from '@/view/login/login'
//import Restpassword from '@/view/login/restpassword'
//import Setpassword_login from '@/view/login/SetPassword_login'
//import RestSuccess from '@/view/login/restsuccess'
//import Nonetwork from '@/view/home/nonetwork'
//import Nologin from '@/view/home/nologin'
//import Homeindex from '@/view/home_shouye/homeindex'
//import Friends from '@/view/friends/friendslist'
//import Chat from '@/view/friends/chat'
//import Breakdown from '@/view/home_shouye/breakdown'
//import Violationinquiry from '@/view/home_shouye/Violationinquiry'
//import Chosecar from '@/view/home_shouye/chosecar'
//import Fillinfo from '@/view/home_shouye/fillinfo'
//import Detailsviolation from '@/view/home_shouye/detailsviolation'
//import Faxian from '@/view/home_faxian/faxian'
//import Detailpage from '@/view/home_faxian/detailpage'
//import Detailvideo from '@/view/home_faxian/detailvideo'
//import Homepage from '@/view/home/homepage'
//import Upload from '@/view/home_faxian/upload'
//import Uploadvideo from '@/view/home_faxian/uploadvideo'
//import Personal from '@/view/my/personal'
//import Devicebind from '@/view/my/Devicebinding'
//import ContactService from '@/view/my/contactservice'
//import Feedback from '@/view/my/feedback'
//import Intercalate from '@/view/my/intercalate'
//import Accountandsecurity from '@/view/my/accountandsecurity'
//import Changepassword from '@/view/my/changepassword'
//import Newmessage from '@/view/my/newmessage'
//import EditProfile from '@/view/my/editprofile'
//import Mymessage from '@/view/my/mymessage'
//import AboutUs from '@/view/my/aboutus'
//import Disclaimer from '@/view/my/disclaimer'
//import Msgcontaire from '@/view/my/msgcontaire'
//import Sysmsg from '@/view/my/sysmsg'
//import Devicelist from '@/view/my/devicelist'
//import Mycontrolsystem from '@/view/controlsystem/mycontrolsystem'
//import controlsystem_My from '@/view/controlsystem/controlsystem_my'
//import Adduser from '@/view/controlsystem/adduser'
//import Consumer from '@/view/controlsystem/consumer'
//import Consumerguzhang from '@/view/controlsystem/consumerguzhang'
//import Workshop from '@/view/controlsystem/workshop'
//import Department from '@/view/controlsystem/department'
//import PersonlInfo from '@/view/controlsystem/personlInfo'
//import Controlsearch from '@/view/controlsystem/controlsearch'
//import Gerenxinxi from '@/view/controlsystem/gerenxinxi'
//import Managecustomers from '@/view/controlsystem/managecustomers'
//import Manageupgrade from '@/view/controlsystem/manageupgrade'
//import Infoaudit from '@/view/controlsystem/infoaudit'
//import Customerinfo from '@/view/controlsystem/customerinfo'
//import Data from '@/view/data/data'
Vue.use(Router)
export default new Router({
	linkExactActiveClass:'v-link-active',
  routes: [
  	{
      path: '/',
      redirect:'/faxian'
    },{
      path: '/bootPage',
      component:resolve => require(['@/view/register/BootPage'],resolve),
    },{
      path: '/register',
      component: Register,
    },{
      path: '/login',
      component: resolve => require(['@/view/login/login'],resolve), 
    },{
      	path: '/login/SetPassword_login',
      	component: resolve => require(['@/view/login/SetPassword_login'],resolve), 
    },{
      	path: '/login/restpassword',
      	component: resolve => require(['@/view/login/restpassword'],resolve), 
    },{
      	name:'restsuccess',
      	path: '/login/restsuccess',
      	component: resolve => require(['@/view/login/restsuccess'],resolve),  
    }, {   
		path:'/homeindex',
		component:resolve => require(['@/view/home_shouye/homeindex'],resolve),
	},{
		path:'/faxian',
		component:resolve => require(['@/view/home_faxian/faxian'],resolve),
		name:'faxian',
		meta: {
	      title: 'faxian',
	      keepAlive: true
	    }
	},{
		path:'/friends',
		component:resolve => require(['@/view/friends/friendslist'],resolve),
	},{
		path:'/personal',
		component:resolve => require(['@/view/my/personal'],resolve),
    },{
		path:'/homepage',
		name:'homepage',
		component:resolve => require(['@/view/home/homepage'],resolve),
	},{
		path:'/detailpage',
		name:'detailpage',
		component:resolve => require(['@/view/home_faxian/detailpage'],resolve),
    },{
		path:'/detailvideo',
		name:'detailvideo',
		component:resolve => require(['@/view/home_faxian/detailvideo'],resolve),
    },{
		path:'/upload',
		name:"upload",
		component:resolve => require(['@/view/home_faxian/upload'],resolve),
	},{
		path:'/uploadvideo',
		name:"uploadvideo",
		component:resolve => require(['@/view/home_faxian/uploadvideo'],resolve),
	},{
		path:'/devicebinding',
		component:resolve => require(['@/view/my/Devicebinding'],resolve),
	},{
		path:'/contactservice',
		component:resolve => require(['@/view/my/contactservice'],resolve),
	},{
		path:'/feedback',
		component:resolve => require(['@/view/my/feedback'],resolve),
	},{
		path:'/intercalate',
		component:resolve => require(['@/view/my/intercalate'],resolve),
	},{
		path:'/accountandsecurity',
		component:resolve => require(['@/view/my/accountandsecurity'],resolve),
	},{
		path:'/changepassword',
		component:resolve => require(['@/view/my/changepassword'],resolve),
	},{
		path:'/newmessage',
		component:resolve => require(['@/view/my/newmessage'],resolve),
	},{
		path:'/aboutus',
		component:resolve => require(['@/view/my/aboutus'],resolve),
	},{
		path:'/disclaimer',
		component:resolve => require(['@/view/my/disclaimer'],resolve),
	},{
		path:'/editprofile',
		name:'editprofile',
		component:resolve => require(['@/view/my/editprofile'],resolve),
	},{
		path:'/mymessage',
		component:resolve => require(['@/view/my/mymessage'],resolve),
	},{
		path:'/msgcontaire',
		name:'msgcontaire',
		component:resolve => require(['@/view/my/msgcontaire'],resolve),
	},{
		name:'mycontrolsystem',
		path:'/mycontrolsystem',
		component:resolve => require(['@/view/controlsystem/mycontrolsystem'],resolve),
	},{
		name:'sysmsg',
		path:'/sysmsg',
		component:resolve => require(['@/view/my/sysmsg'],resolve),
	},{
		path:'/controlsystem_my',
		name:'controlsystem_my',
		component:resolve => require(['@/view/controlsystem/controlsystem_my'],resolve),
	},{	
		name:'adduser',
		path:'/adduser',
		component:resolve => require(['@/view/controlsystem/adduser'],resolve),
	},{
		path:'/consumer',
		name:'consumer',
		component:resolve => require(['@/view/controlsystem/consumer'],resolve),
	},{
		path:'/consumerguzhang',
		name:'consumerguzhang',
		component:resolve => require(['@/view/controlsystem/consumerguzhang'],resolve),
	},{
		path:'/workshop',
		component:resolve => require(['@/view/controlsystem/workshop'],resolve),
	},{
		path:'/department',
		component:resolve => require(['@/view/controlsystem/department'],resolve),
	},{
		path:'/personlInfo',
		name:'personlInfo',
		component:resolve => require(['@/view/controlsystem/personlInfo'],resolve),
	},{
		path:'/controlsearch',
		component:resolve => require(['@/view/controlsystem/controlsearch'],resolve),
	},{
		name:'gerenxinxi',
		path:'/gerenxinxi',
		component:resolve => require(['@/view/controlsystem/gerenxinxi'],resolve),
	},{
		path:'/managecustomers',
		component:resolve => require(['@/view/controlsystem/managecustomers'],resolve),
	},{
		name:'manageupgrade',
		path:'/manageupgrade',
		component:resolve => require(['@/view/controlsystem/manageupgrade'],resolve),
	},{
		name:'infoaudit',
		path:'/infoaudit',
		component:resolve => require(['@/view/controlsystem/infoaudit'],resolve),
	},{
		path:'/customerinfo',
		name:'customerinfo',
		component:resolve => require(['@/view/controlsystem/customerinfo'],resolve),
	},{
		path:'/data',
		component:resolve => require(['@/view/data/data'],resolve),
	},{
		path:'/breakdown',
		name:'breakdown',
		component:resolve => require(['@/view/home_shouye/breakdown'],resolve),
	},{
		path:'/violationinquiry',
		name:'violationinquiry',
		component:resolve => require(['@/view/home_shouye/Violationinquiry'],resolve),
	},{
		path:'/chosecar',
		name:'chosecar',
		component:resolve => require(['@/view/home_shouye/chosecar'],resolve),
	},{
		path:'/fillinfo',
		name:'fillinfo',
		component:resolve => require(['@/view/home_shouye/fillinfo'],resolve),
	},{
		path:'/devicelist',
		component:resolve => require(['@/view/my/devicelist'],resolve),
	},{
		path:'/friends/chat',
		name:'chat',
		component:resolve => require(['@/view/friends/chat'],resolve),
	},{
		path:'/nonetwork',
		component:resolve => require(['@/view/home/nonetwork'],resolve),
	},{
		path:'/nologin',
		component:resolve => require(['@/view/home/nologin'],resolve), 
	},{
		path:'/cardetailinfo',
		name:'cardetailinfo',
		component:resolve => require(['@/view/home_shouye/cardetailinfo'],resolve), 
	},{
		path:'/emergencyTelephone',
		name:'emergencyTelephone',
		component:resolve => require(['@/view/home_shouye/emergencyTelephone'],resolve), 
	},{
		path:'/caragency',
		name:'caragency',
		component:resolve => require(['@/view/home_shouye/caragency'],resolve), 
	}
  ],
})
