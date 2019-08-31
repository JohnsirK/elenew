import localSession from '@/utils/localSession'
//定义state,相当于vuex里的变量
const state = {
	//数据请求遮罩
	isDataLoading:true,
	//当前选择城市
	pickCity:localSession.getSession('pickCity') ? localSession.getSession('pickCity') : {},
	//当前选择地址信息
	pickAddress:localSession.getSession('pickAddress') ? localSession.getSession('pickAddress') : {},
	//用户账号密码
	userinfo:localSession.getSession('newUserInfo') ? localSession.getSession('newUserInfo') : {},
	//用户购物车数据
	myFoodCar:localSession.getSession('myfood') ? localSession.getSession('myfood') : [],
	//当前选择的店铺
	nowShop:localSession.getSession('myshop') ? localSession.getSession('myshop'): {},
	newCart:{},
	//购物车下单成功之后数据
	cartSuccess:{}
}

//导出state,采用es6方式
export default state