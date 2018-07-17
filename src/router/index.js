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
import Friendslist from '@/view/home_shouye/friendslist'
import Rankings from '@/view/home_shouye/rankings'
import Personaldata from '@/view/home_shouye/personaldata'
import Listrankings from '@/view/home_shouye/listrankings'
import Carlovescore from '@/view/home_shouye/carlovescore'
import Powersystem from '@/view/home_shouye/powersystem'
import Idlingsystem from '@/view/home_shouye/idlingsystem'
import Faxian from '@/view/home_faxian/faxian'
import Search from '@/components/common/search'
import Detailpage from '@/view/home_faxian/detailpage'
import Phonebook from '@/view/home_faxian/phonebook'
import Homepage from '@/view/home/homepage'
import Fensi from '@/view/home_faxian/fensi'
import Upload from '@/view/home_faxian/upload'
import Personal from '@/view/my/personal'
import Devicebind from '@/view/my/Devicebinding'
import ContactService from '@/view/my/contactservice'
import Feedback from '@/view/my/feedback'
import Intercalate from '@/view/my/intercalate'
import Accountandsecurity from '@/view/my/accountandsecurity'
import Changepassword from '@/view/my/changepassword'
import Newmessage from '@/view/my/newmessage'
import SystemMessage from '@/view/my/systemmessage'
import EditProfile from '@/view/my/editprofile'
import ManageAddress from '@/view/my/manageaddress'
import Editaddress from '@/view/my/editaddress'
import Mymessage from '@/view/my/mymessage'
import Devicelist from '@/view/my/devicelist'
import Mycontrolsystem from '@/view/controlsystem/mycontrolsystem'
import controlsystem_My from '@/view/controlsystem/controlsystem_my'
import Adduser from '@/view/controlsystem/adduser'
import Consumer from '@/view/controlsystem/consumer'
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
  		path: '/',
        redirect:'/home' 
    },{
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
    	path:'/home',
    	component:Home,
    	children:[{
    		path:'/homeindex',
    		component:Homeindex
    	},{
    		path:'/',
    		component:Faxian
    	},{
    		path:'/friends',
    		component:Friends
    	},{
    		path:'/nologin',
    		component:Nologin
    	},{
    		path:'/personal',
    		component:Personal
    	},{
    		path:'/nonetwork',
    		component:Nonetwork
    	},{
    		path:'/search',
    		component:Search
    	},{
    		path:'/phonebook',
    		component:Phonebook
    	}]
    },{
		path:'/homepage',
		component:Homepage
	},{
		path:'/detailpage',
		name:'detailpage',
		component:Detailpage
    },{
		path:'/fensi',
		component:Fensi
	},{
		path:'/upload',
		name:"upload",
		component:Upload
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
		path:'/systemmessage',
		component:SystemMessage
	},{
		path:'/editprofile',
		name:'editprofile',
		component:EditProfile
	},{
		path:'/manageaddress',
		component:ManageAddress
	},{
		path:'/editaddress',
		component:Editaddress
	},{
		path:'/mymessage',
		component:Mymessage
	},{
		name:'mycontrolsystem',
		path:'/mycontrolsystem',
		component:Mycontrolsystem
	},{
		path:'/controlsystem_my',
		component:controlsystem_My
	},{	
		name:'adduser',
		path:'/adduser',
		component:Adduser
	},{
		path:'/consumer',
		component:Consumer
	},{
		path:'/workshop',
		component:Workshop
	},{
		path:'/department',
		component:Department
	},{
		path:'/personlInfo',
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
		path:'/friendslist',
		name:'friendslist',
		component:Friendslist
	},{
		path:'/personaldata',
		name:'personaldata',
		component:Personaldata
	},{
		path:'/listrankings',
		name:'listrankings',
		component:Listrankings
	},{
		path:'/rankings',
		name:'rankings',
		component:Rankings
	},{
		path:'/carlovescore',
		name:'carlovescore',
		component:Carlovescore
	},{
		path:'/powersystem',
		name:'powersystem',
		component:Powersystem
	},{
		path:'/idlingsystem',
		name:'idlingsystem',
		component:Idlingsystem
	},{
		path:'/devicelist',
		component:Devicelist
	},{
		path:'/friends/chat',
		component:Chat
	}
  ]
})
