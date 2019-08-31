//axios 的封装以及拦截器处理

//先导入axios 和 Vuex
import axios from 'axios'
//引入store,因为拦截器需要用到遮罩
import store from '@/store/index'

//引入qs,qs的作用是在axios post方式给后端发送数据的时候把数据序列化从而方便后端使用;
//qs的方式就是表单传输的样式;
//大概格式为name=xxx&age=xxx;
//是否需要qs去序列化参数取决于后端需要什么样的数据
//如果需要qs则如下引入
// import qs from 'qs'

//允许axios请求携带cookie等凭证
axios.defaults.withCredentials = true

//定义接口地址
const server = axios.create({
	//接口地址
	baseURL:process.env.API_ROOT,
	//相应时长
	timeout:30000,
	//请求头
	headers:{
		'Accept': 'application/json',
		'content-type':'application/json',
	}
})

//定义axios拦截器
//请求数据之前做的操作
//例如让遮罩先显示
server.interceptors.request.use(config => {
	config.withCredentials = true
	//请求数据之前遮罩显示
	//commit 用于分发mutations 里面的方法
	//dispatch 用于分发actions 里面的方法
	store.commit("isLoadingStart")
	return config
},err => {
	console.log('数据请求发生错误，请重试')
	//返回axios Promise错误对象
	return Promise.reject(err)
})

//定义axios拦截器
//响应到数据的操作
//例如让遮罩消失
server.interceptors.response.use(res => {
	//有数据响应之后
	//关闭遮罩
	store.commit("isLoadingEnd")
	//这里本身是返回res的。由于大多数接口数据都在res.data里面，所以直接访问res.data属性
	return res.data
},err => {
	//响应数据错误之后
	store.commit('isLoadingEnd')
	console.log('数据请求发生错误，请重试')
	//返回axios Promise错误对象
	return Promise.reject(err)
})

//导入server,方便其他页面能使用
export default server

//根据项目封装axios备用；
//axios中get请求的参数为params来传参
//而post请求的参数为data来传参,切记

//get请求
export function get(url,param){
	//返回一个新的Promise对象，resolve和reject分别为异步操作执行成功后和异步操作执行失败之后的函数
	return new Promise((resolve,reject) => {
		//执行get 请求
		axios.get(url,{
			params:param
		}).then(res => {
			//成功请求之后执行then方法再此返回数据。
			resolve(res.data)
		}).catch(err => {
			//请求失败执行catch方法
			reject(err)
		})
	})
}

//post请求
export function post(url,data){
	//同上
	return new Promise((resolve,reject) => {
		axios.post(url,{
			//如果此处需要qs序列格式化可以写成下面的方式
			//data:qs.stringify(data)
			data:data
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}

//delete请求
//delete请求同post请求一样，采用相同的参数data传参
export function del(url,data){
	return new Promise((resolve,reject) => {
		axios.delete(url,{
			data:data
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}