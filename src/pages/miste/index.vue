<template>
	<div ref="main"> 
		<all-header>
			<font slot="city" @click="pickCityHandler">
				<van-icon name="location-o"></van-icon> 
			</font>
			<font slot="tl">
				{{nowAddress.address}}
			</font>
			<!-- <font slot="admin"></font> -->
		</all-header>  
		<div class="content p-b50" v-show="!cityShow" >
			<!-- 栏目组件 -->
			<icon-list></icon-list>
			<!-- 滑动图片组件 -->
			<swiper-img></swiper-img>
			<!--今日推荐-->
			<div class="todayHot" ref='hotList'>
				<h4 class="all-title">
					今日推荐
				</h4>
				<today-hot :datalist = 'dataList' ></today-hot>
				<loading v-if="isShow"></loading>
			</div>
		</div>
		<!--选择城市组件 -->
		<transition name="van-slide-up" mode="in-out" >
			<city-list v-if='cityShow' @closeShow="closeAll"></city-list>
		</transition>
	</div>
</template>

<script>
	//头部分类列表组件
	import iconList from '@/components/miste/iconList'
	//滑动图片组件
	import swiperImg from '@/components/miste/swiperImg'
	//今日推荐
	import todayHot from '@/components/miste/todayHot'
	//请求接口
	import {todayHotData} from '@/api/api'
	//请求数据加载中组件
	import loading from '@/components/global/loading'
	//存储工具
	import localSession from '@/utils/localSession'
	// 引入头部组件
	import allHeader from '@/components/global/header.vue'
	//城市列表选择
	import cityList from '@/pages/city/index' 
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				//今日推荐数据
				dataList:[],
				//加载数据遮罩
				isShow:false,
				offset:0,
				//防止重复获取
				noRepeat:false,
				//获取geohash
				pickGeohash:localSession.getSession('pickAddress') ? localSession.getSession('pickAddress').geohash : '31.22967,121.4762',
				numnew:2,
				//选择城市隐藏显示
				cityShow:false,
			}
		},
		components:{
			allHeader,
			iconList,
			swiperImg,
			todayHot,
			loading,
			cityList
		},
		computed:{
			...mapState(['pickCity','pickAddress']),
			nowCity:function(){
				if(localSession.getSession('pickCity')){ 
					return localSession.getSession('pickCity')
				}else{
					return false
				}
			},
			nowAddress:function(){
				if(localSession.getSession('pickAddress')){
					return localSession.getSession('pickAddress')
				}else {
					return false
				}
			}
		},
		//方法
		methods:{
			//选择城市弹出
			pickCityHandler(){
				this.cityShow = !this.cityShow
			},
			//今日推荐请求数据函数
			async todayHotDataList(){
				let res = await todayHotData(this.pickGeohash,this.offset)
				if(res){
					this.dataList = res
				}
			} ,
			//滚动加载数据函数
			scrollGetData(){
				//获取div总高度
				//this.$refs是vue中获取dom的方式
				let allHeight = this.$refs.hotList.offsetHeight || this.$refs.hotList.clientHeight;
				//获取目前可视高度
				let nowHeight = document.documentElement.clientHeight;
				//获取滚动距离
				let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
				//判断如果滚动距离 + 可视高度 > 总高度说明滚动条到底了。需要加载新数据了
				if(nowHeight + scrollHeight > allHeight){
					this.isShow = true
					this.getMoreData()
				}else{
					this.isShow = false
				}
			},
			//加载更多数据
			async getMoreData(){ 
				if(this.noRepeat){
					return
				}
				this.isShow = true
				this.noRepeat = true
				this.offset += 20
				let res = await todayHotData(this.pickGeohash,this.offset)
				this.isShow = false
				if(res){
					this.dataList = [...this.dataList,...res]
				}
				this.noRepeat = false
			},
			//关闭
			closeAll(data){
				this.cityShow = data
			}
			
		},
		created() {
			if(!this.pickAddress.geohash){
				this.cityShow = true
			}else{
				this.cityShow = false
			}
		},
		mounted(){
			//由于经纬度必须选择了传值，所以目前先用死的。
			this.todayHotDataList() 
			window.addEventListener('scroll',this.scrollGetData)
			
		}, 
		watch:{
			cityShow(newValue,oldValue){
				if(newValue){
					this.$refs.main.style.overflow = 'hidden'
				}else{
					this.$refs.main.style.overflow = 'auto'
				}
			}
		},
		//离开页面时销毁这个事件
		destroyed(){
			window.removeEventListener('scroll',this.scrollGetData)
		}
		
	}
</script>

<style>
</style>
