import localSession from '@/utils/localSession'
//定义getters,相当于vuex中的计算属性
const getters = {
	//在此定义函数
	getPickAddress(state){
		if(localSession.getSession('pickAddress')){
			state.pickAddress = localSession.getSession('pickAddress')
		}else{
			state.pickAddress = ''
		} 
		return state.pickAddress
	}
}

//导出getters,采用es6方式
export default getters