//定义异步方法,在此对象里面定义的方法都是异步的,可以调用mutations里的方法.使用dispatch分发
const actions = {
	//保存用户个人信息
	saveUserinfo({commit},data){
		commit('newUserInfo',data)
	},
	//保存购物车数据
	saveNowFoodCar({commit},data){
		commit('nowFoodCar',data)
	},
	//保存选择店铺数据
	saveShop({commit},data){
		commit('nowPickShop',data)
	}
}

//导出actions,采用es6方式
export default actions