<template>
	<van-tabbar route>
		<van-tabbar-item :to="{path:'/miste',query:{geohash:pickAddress.geohash}}" icon='home-o'>
			主页
		</van-tabbar-item>
		<van-tabbar-item :to="'/search/' + pickAddress.geohash" icon='search'>
			搜索
		</van-tabbar-item>
		<van-tabbar-item to='/order' icon='orders-o'>
			订单
		</van-tabbar-item>
		<van-tabbar-item to='/about' icon='user-o'>
			我的
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import localSession from '@/utils/localSession'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				active:0
			}
		},
		computed:{ 
			...mapState(['pickAddress'])
		}
	}
</script>

<style>
</style>
