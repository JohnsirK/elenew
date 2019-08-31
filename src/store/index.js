//导入vue和vuex,注意，此处vue和vuex首字母必须大写
import Vue from 'vue'
import Vuex from 'vuex'

//把vuex挂载到vue里
Vue.use(Vuex)

//导入state,getters,mutations,actions文件,采用es6方式
//由于index和其余文件是同目录，所以采用 './'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

//导出vuex,为了在main.js里面全局注册之后所有页面一起使用
//此处必须使用Vuex.Store 注意大小写
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})