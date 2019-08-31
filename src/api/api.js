//请求接口文件
//导入server
import server from './request.js'
import qs from 'qs'
//接口格式如下
//注意method没有s
// export const getData = (arg1,arg2) => {
// 	return server({
// 		url:'url',
// 		method:'get/post/delete',
// 		params/data:{
// 			arg1,
// 			arg2
// 		}
// 	})
// }

//食品分类列表
export const iconListData = () => {
	return server({
		url:'/v2/index_entry',
		method:'get'
	})
}
//首页热门推荐
export const todayHotData = (latitude,longitude,offset) => {
	return server({
		url:'/shopping/restaurants',
		method:'get',
		params:{
			latitude,
			longitude,
			offset
		}
	})
}

//城市接口
export const cityData = (type) => {
	return server({
		url:'/v1/cities',
		method:'get',
		params:{
			type
		}
	})
}

//搜索地址
export const searchAddress = (id,keyword,type) => {
	return server({
		url:'/v1/pois',
		method:'get',
		params:{
			city_id:id,
			keyword:keyword,
			type
		}
	})
}

//获取商铺列表
export const restaurants = (latitude,longitude,offset,limit,restaurant_category_id,order_by,restaurant_category_ids) => {
	return server({
		url:'/shopping/restaurants',
		method:'get',
		params:{
			latitude,
			longitude,
			offset,
			limit,
			restaurant_category_id,
			order_by,
			restaurant_category_ids,
		}
	})
}

//店铺分类列表
export const category = (latitude,longitude) => {
	return server({
		url:'/shopping/v2/restaurant/category',
		method:'get',
		params:{
			latitude,
			longitude
		}
	})
}

//获取验证码
export const captchas = () => {
	return server({
		url:'v1/captchas',
		method:'post',
	})
}

//登录
export const login = (username,password,captcha_code) => {
	return server({
		url:'v2/login',
		method:'post',
		data:{
			username,
			password,
			captcha_code
		}
	})
}

//餐馆详情
export const shopDetail = (shopid) => {
	return server({
		url:'shopping/restaurant/' + shopid,
		method:'get',
	})
}

//餐馆食品列表
export const shopMenu = (id) => {
	return server({
		url:'/shopping/v2/menu',
		method:'get',
		params:{
			restaurant_id:id
		}
	})
}

//获取评价信息
export const rating = (restaurant_id,tag_name) => {
	return server({
		url:'/ugc/v2/restaurants/' + restaurant_id + '/ratings',
		method:'get',
		params:{
			tag_name:String(tag_name)
		}
	})
}

//获取店铺评价分数
export const shopScores = (restaurant_id) => {
	return server({
		url:'/ugc/v2/restaurants/' + restaurant_id + '/ratings/scores',
		method:'get'
	})
}

//获取店铺评价分类
export const shopTags = (restaurant_id) => {
	return server({
		url:'/ugc/v2/restaurants/' + restaurant_id + '/ratings/tags'
	})
}

//加入购物车
export const checkout = (restaurant_id,geohash,entities) => {
	return server({
		url:'v1/carts/checkout',
		method:'post',
		data:{
			restaurant_id,
			geohash,
			entities
		}
	})
}

//获取备注信息
export const remarks = (cart_id) => {
	return server({
		url:`/v1/carts/${cart_id}/remarks`,
		method:'get',
	})
}

//获取收货地址列表
export const addresses = (user_id) => {
	return server({
		url:`/v1/users/${user_id}/addresses`,
		method:'get'
	})
}

//增加收货地址
export const addAddress = (user_id,address,address_detail,geohash,name,phone,tag,sex,phone_bk,tag_type) => {
	return server({
		url:`/v1/users/${user_id}/addresses`,
		method:'post',
		data:qs.stringify({
			geohash,
			name,
			sex,
			phone,
			address,
			address_detail,
			tag,
			tag_type,
			phone_bk
		})
	})
}
 

//下单
export const orders = (user_id,cart_id,address_id,restaurant_id,geohash,entities) => {
	return server({
		url:`/v1/users/${user_id}/carts/${cart_id}/orders`,
		method:'post',
		data:{
			address_id,
			restaurant_id,
			geohash,
			entities
		}
	})
}

//搜索餐馆
export const searchShop = (geohash,keyword) => {
	return server({
		url:'/v4/restaurants',
		method:'get',
		params:{
			geohash,
			keyword
		}
	})
}

//订单列表
export const ordersList = (user_id,limit,offset) => {
	return server({
		url:`/bos/v2/users/${user_id}/orders`,
		method:'get',
		params:{
			limit,
			offset
		}
	})
}

//订单详情
export const snapshot = (user_id,order_id) => {
	return server({
		url:`/bos/v1/users/${user_id}/orders/${order_id}/snapshot`,
		method:'get'
	})
}

//可用红包
export const hongbaos = (user_id,limit,offset) => {
	return server({
		url:`/promotion/v2/users/${user_id}/hongbaos`,
		method:'get',
		params:{
			limit,
			offset
		}
	})
}

//过期红包
export const expired_hongbaos = (user_id,limit,offset) => {
	return server({
		url:`/promotion/v2/users/${user_id}/expired_hongbaos`,
		method:'get',
		params:{
			limit,
			offset
		}
	})
}

//兑换红包
export const exchange = (user_id,exchange_code,captcha_code) => {
	return server({
		url:`/v1/users/${user_id}/hongbao/exchange`,
		method:'post',
		data:{
			exchange_code,
			captcha_code
		}
	})
}

//服务中心
export const explain = () => {
	return server({
		url:'/v3/profile/explain',
		method:'get'
	})
}

//修改密码
export const changepassword = (username,oldpassWord,newpassword,confirmpassword,captcha_code) => {
	return server({
		url:'/v2/changepassword',
		method:'post',
		data:{
			username,
			oldpassWord,
			newpassword,
			confirmpassword,
			captcha_code
		}
	})
}

//退出登录
export const signout = () => {
	return server({
		url:'/v2/signout',
		method:'get'
	})
}

//更改用户头像
export const changeUserImg = (id,param) => {
	return server({
		url:`/eus/v1/users/${id}/avatar`,
		method:'post',
		data:param
	})
}

//获取用户信息
export const againUserinfo = () => {
	return server({
		url:'/v1/user',
		method:'get'
	})
}