import Vue from 'vue'
import Router from 'vue-router'
import BootPage from '@/view/register/BootPage'
import Register from '@/view/register/register'
import Login from '@/view/login/login'
import Restpassword from '@/view/login/restpassword'
import Setpassword_login from '@/view/login/SetPassword_login'
import RestSuccess from '@/view/login/restsuccess'
import Home from '@/view/home/home'
import Nonetwork from '@/view/home/nonetwork'
import Nologin from '@/view/home/nologin'
import Homeindex from '@/view/home_shouye/homeindex'
import Friends from '@/view/friends/friendslist'
import Chat from '@/view/friends/chat'
import Breakdown from '@/view/home_shouye/breakdown'
import Violationinquiry from '@/view/home_shouye/Violationinquiry'
import Chosecar from '@/view/home_shouye/chosecar'
import Fillinfo from '@/view/home_shouye/fillinfo'
import Detailsviolation from '@/view/home_shouye/detailsviolation'
import Faxian from '@/view/home_faxian/faxian'
import Detailpage from '@/view/home_faxian/detailpage'
import Detailvideo from '@/view/home_faxian/detailvideo'
import Homepage from '@/view/home/homepage'
import Upload from '@/view/home_faxian/upload'
import Uploadvideo from '@/view/home_faxian/uploadvideo'
import Personal from '@/view/my/personal'
import Devicebind from '@/view/my/Devicebinding'
import ContactService from '@/view/my/contactservice'
import Feedback from '@/view/my/feedback'
import Intercalate from '@/view/my/intercalate'
import Accountandsecurity from '@/view/my/accountandsecurity'
import Changepassword from '@/view/my/changepassword'
import Newmessage from '@/view/my/newmessage'
import EditProfile from '@/view/my/editprofile'
import Mymessage from '@/view/my/mymessage'
import AboutUs from '@/view/my/aboutus'
import Disclaimer from '@/view/my/disclaimer'
import Msgcontaire from '@/view/my/msgcontaire'
import Sysmsg from '@/view/my/sysmsg'
import Devicelist from '@/view/my/devicelist'
import Mycontrolsystem from '@/view/controlsystem/mycontrolsystem'
import controlsystem_My from '@/view/controlsystem/controlsystem_my'
import Adduser from '@/view/controlsystem/adduser'
import Consumer from '@/view/controlsystem/consumer'
import Consumerguzhang from '@/view/controlsystem/consumerguzhang'
import Workshop from '@/view/controlsystem/workshop'
import Department from '@/view/controlsystem/department'
import PersonlInfo from '@/view/controlsystem/personlInfo'
import Controlsearch from '@/view/controlsystem/controlsearch'
import Gerenxinxi from '@/view/controlsystem/gerenxinxi'
import Managecustomers from '@/view/controlsystem/managecustomers'
import Manageupgrade from '@/view/controlsystem/manageupgrade'
import Infoaudit from '@/view/controlsystem/infoaudit'
import Customerinfo from '@/view/controlsystem/customerinfo'
import Data from '@/view/data/data'
Vue.use(Router)
export default new Router({
	linkActiveClass:'v-link-active',
  routes: [
  	{
      path: '/bootPage',
      component:BootPage
    },{
      path: '/register',
      component: Register,
    },{
      path: '/login',
      component: Login
    },{
      	path: '/login/SetPassword_login',
      	component: Setpassword_login
    },{
      	path: '/login/restpassword',
      	component: Restpassword
    },{
      	name:'restsuccess',
      	path: '/login/restsuccess',
      	component: RestSuccess
    },{    
    	path:'/',
    	component:Home,
    	redirect: '/faxian',
    	children:[{
    		path:'/homeindex',
    		component:Homeindex
    	},{
    		path:'/faxian',
    		component:Faxian,
    		name:'faxian',
    	},{
    		path:'/friends',
    		component:Friends
    	},{
    		path:'/personal',
    		component:Personal
    	}]
    },{
		path:'/homepage',
		name:'homepage',
		component:Homepage
	},{
		path:'/detailpage',
		name:'detailpage',
		component:Detailpage
    },{
		path:'/detailvideo',
		name:'detailvideo',
		component:Detailvideo
    },{
		path:'/upload',
		name:"upload",
		component:Upload
	},{
		path:'/uploadvideo',
		name:"uploadvideo",
		component:Uploadvideo
	},{
		path:'/devicebinding',
		component:Devicebind
	},{
		path:'/contactservice',
		component:ContactService
	},{
		path:'/feedback',
		component:Feedback
	},{
		path:'/intercalate',
		component:Intercalate
	},{
		path:'/accountandsecurity',
		component:Accountandsecurity
	},{
		path:'/changepassword',
		component:Changepassword
	},{
		path:'/newmessage',
		component:Newmessage
	},{
		path:'/aboutus',
		component:AboutUs
	},{
		path:'/disclaimer',
		component:Disclaimer
	},{
		path:'/editprofile',
		name:'editprofile',
		component:EditProfile
	},{
		path:'/mymessage',
		component:Mymessage
	},{
		path:'/msgcontaire',
		name:'msgcontaire',
		component:Msgcontaire
	},{
		name:'mycontrolsystem',
		path:'/mycontrolsystem',
		component:Mycontrolsystem
	},{
		name:'sysmsg',
		path:'/sysmsg',
		component:Sysmsg
	},{
		path:'/controlsystem_my',
		name:'controlsystem_my',
		component:controlsystem_My
	},{	
		name:'adduser',
		path:'/adduser',
		component:Adduser
	},{
		path:'/consumer',
		name:'consumer',
		component:Consumer
	},{
		path:'/consumerguzhang',
		name:'consumerguzhang',
		component:Consumerguzhang
	},{
		path:'/workshop',
		component:Workshop
	},{
		path:'/department',
		component:Department
	},{
		path:'/personlInfo',
		name:'personlInfo',
		component:PersonlInfo
	},{
		path:'/controlsearch',
		component:Controlsearch
	},{
		name:'gerenxinxi',
		path:'/gerenxinxi',
		component:Gerenxinxi
	},{
		path:'/managecustomers',
		component:Managecustomers
	},{
		name:'manageupgrade',
		path:'/manageupgrade',
		component:Manageupgrade
	},{
		name:'infoaudit',
		path:'/infoaudit',
		component:Infoaudit
	},{
		path:'/customerinfo',
		name:'customerinfo',
		component:Customerinfo
	},{
		path:'/data',
		component:Data
	},{
		path:'/breakdown',
		name:'breakdown',
		component:Breakdown
	},{
		path:'/violationinquiry',
		name:'violationinquiry',
		component:Violationinquiry
	},{
		path:'/chosecar',
		name:'chosecar',
		component:Chosecar
	},{
		path:'/fillinfo',
		name:'fillinfo',
		component:Fillinfo
	},{
		path:'/detailsviolation',
		name:'detailsviolation',
		component:Detailsviolation
	},{
		path:'/devicelist',
		component:Devicelist
	},{
		path:'/friends/chat',
		name:'chat',
		component:Chat
	},{
		path:'/nonetwork',
		component:Nonetwork
	},{
		path:'/nologin',
		component:Nologin
	}
  ]
})
