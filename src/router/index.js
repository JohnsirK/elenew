import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//vue组件按需加载，es6方式导入
//首页页面
const index = () => import ('@/pages/index/index')
//外卖首页
const miste = () => import ('@/pages/miste/index')
//搜索栏目
const search = () => import ('@/pages/search/index')
//订单栏目
const order = () => import ('@/pages/order/index')
//用户中心
const about = () => import ('@/pages/about/index')
//食品分类列表页面
const food = () => import ('@/pages/food/index')
//店铺点餐页面
const shop = () => import ('@/pages/shop/index')
//选择城市页面
const city = () => import ('@/pages/city/index')
//选择地址页面
const pickad = () => import ('@/pages/city/pickAddress')
//登录
const admin = () => import ('@/pages/admin/index')
//商铺详情页
const shopDetail = () => import ('@/pages/shop/shopDetail')
//确认订单
const confirmOrder = () => import ('@/pages/confirmOrder/index')
//新增地址
const addAddress = () => import ('@/pages/confirmOrder/addAddress')
//订单详情
const orderInfo = () => import ('@/pages/order/orderInfo')
//我的余额
const balance = () => import ('@/pages/balance/balance')
//我的余额详情
const balanceDetail = () => import ('@/pages/balance/balanceDetail')
//我的红包
const benefit = () => import ('@/pages/benefit/benefit')
//红包说明
const hbinfo = () => import ('@/pages/benefit/hbinfo')
//代金券说明
const djqinfo = () => import ('@/pages/benefit/djqinfo')
//红包兑换
const changehb = () => import ('@/pages/benefit/change')
//我的积分
const point = () => import ('@/pages/points/point')
//积分说明
const pointInfo = () => import ('@/pages/points/pointInfo')
//服务中心
const service = () => import ('@/pages/service/service')
//服务中心详情
const serviceInfo = () => import ('@/pages/service/serviceInfo')
//修改密码
const forget = () => import ('@/pages/forget/forget')

export default new Router({
  routes: [
    {
		path: '/',
		name: 'index',
		component: index,
		redirect:'miste',
		children:[
			{
				path:'miste',
				name:'miste',
				component:miste
			},{
				path:'search/:geohash',
				name:'search',
				component:search
			},{
				path:'order',
				name:'order',
				component:order,
				children:[
					{
						path:'orderInfo',
						name:'orderInfo',
						component:orderInfo
					}
				]
			},{
				path:'about',
				name:'about',
				component:about
			}
		],
    },{
		path:'/food',
		name:'food',
		component:food
	},{
		path:'/shop',
		name:'shop',
		component:shop,
		children:[
			{
				path:'shopDetail',
				name:'shopDetail',
				component:shopDetail
			}
		]
	},{
		path:'/city',
		name:'city',
		component:city
	},{
		path:'/pickad/:id',
		name:'pickad',
		component:pickad
	},{
		path:'/admin',
		name:'admin',
		component:admin
	},{
		path:'/confirmOrder',
		name:'confirmOrder',
		component:confirmOrder,
		children:[
			{
				path:'addAddress',
				name:'addAddress',
				component:addAddress
			}
		]
	},{
		path:'/balance',
		name:'balance',
		component:balance,
		children:[
			{
				path:'balanceDetail',
				name:'balanceDetail',
				component:balanceDetail
			}
		]
	},{
		path:'/benefit',
		name:'benefit',
		component:benefit,
		children:[
			{
				path:'hbinfo',
				name:'hbinfo',
				component:hbinfo
			},{
				path:'djqinfo',
				name:'djqinfo',
				component:djqinfo
			},{
				path:'changehb',
				name:'changehb',
				component:changehb
			}
		]
	}, {
		path:'/point',
		name:'point',
		component:point,
		children:[
			{
				path:'pointInfo',
				name:'pointInfo',
				component:pointInfo
			}
		]
	},{
		path:'/service',
		name:'service',
		component:service,
		children:[
			{
				path:'serviceInfo',
				name:'serviceInfo',
				component:serviceInfo
			}
		]
	},{
		path:'/forget',
		name:'forget',
		component:forget
	}
  ]
})
