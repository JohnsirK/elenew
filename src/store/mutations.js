import localSession from '@/utils/localSession'

//定义方法,相当于vue中的方法,但是此对象里面定义的全是同步方法,采用commit('分发')
const mutations = {
	//数据加载开始的时候遮罩显示
	isLoadingStart(state){
		state.isDataLoading = true
	},
	//数据相应后遮罩消失
	isLoadingEnd(state){
		state.isDataLoading = false
	},
	//当前选择城市
	nowPickCity(state,data){
		localSession.setSession('pickCity',data)
		state.pickCity = data
	},
	//当前选择地址信息
	nowPickAddress(state,data){
		localSession.setSession('pickAddress',data)
		state.pickAddress = data
	},
	//保存用户信息
	newUserInfo(state,data){
		localSession.setSession('newUserInfo',data)
		state.userinfo = data
	},
	//保存购物车数据
	nowFoodCar(state,data){
		localSession.setSession('myfood',data)
		state.myFoodCar = data
	},
	//保存当前选择店铺
	nowPickShop(state,data){
		localSession.setSession('myshop',data)
		state.nowShop = data
	},
	 
	//购物车成功之后数据
	getcartSuccess(state,data){
		state.cartSuccess = data
	}
}

//导出mutations,采用es6方式
export default mutations