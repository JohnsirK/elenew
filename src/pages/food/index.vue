<template>
	<div class="main" >
		<all-header>
			<font slot="tl">
				{{this.$route.query.title}}
			</font>
		</all-header>
		<div class="content p-b50" ref="allheight">
			<van-sticky :offset-top="46" >
				<van-dropdown-menu  overlay style="box-shadow: 0 2px 5px rgba(196, 196, 196, 0.4);">
					<van-dropdown-item :title="value1" ref="pickguize">
						<van-tree-select :items="categoryData" :main-active-index="mainActiveIndex" :active-id="activeId" @click-nav="onClickNav" @click-item="onClickItem" info="30">
							
						</van-tree-select>
					</van-dropdown-item>
					<van-dropdown-item @change="onOrder" v-model="order_by" :options="option2"/>  
				</van-dropdown-menu>
			</van-sticky>
			
			<div class="todayHot">
				<list-data :datalist = 'dataList'></list-data>
				<loading v-if="isShow"></loading>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	//列表组件
	import listData from '@/components/miste/todayHot'
	//接口
	import {restaurants,category} from '@/api/api'
	//loading
	import loading from '@/components/global/loading'
	export default {
		data(){
			return {
				dataList:[],
				latitude:this.$route.query.geohash.split(',')[0],
				longitude:this.$route.query.geohash.split(',')[1],
				offset:0,
				limit:20,
				restaurant_category_id:this.$route.query.restaurant_category_id,
				order_by:4,
				value1:'分类', 
				option2: [
					{ text: '起送价最低', value: 1 },
					{ text: '配送最快', value: 2 },
					{ text: '评分最高', value: 3 },
					{ text: '智能排序', value: 4 },
					{ text: '距离最近', value: 5 },
					{ text: '销量最高', value: 6 }
				], 
				categoryData:[],
				//左侧高亮元素的index
				mainActiveIndex:0,
				//被选中元素的id
				activeId:null,
				//防止重复获取
				noRepeat:false,
				//loading加载
				isShow:false
			}
		},
		components:{
			allHeader,
			listData,
			loading
		},
		methods:{
			//获取数据
			 async getData(latitude,longitude,offset,limit,restaurant_category_id,order_by,restaurant_category_ids){
				 this.offset = 0
				 let res = await restaurants(latitude,longitude,offset,limit,restaurant_category_id,order_by,restaurant_category_ids)
				 if(res){ 
					 this.dataList = res 
					 this.$toast.clear()
				 } 
			 },
			 async getCategory(){
				 let res = await category(this.latitude,this.longitude)
				 if(res){
					this.categoryData = JSON.parse(JSON.stringify(res).replace(/name/gi,'text').replace(/sub_categories/gi,'children')) 
				 }
			 },
			 onClickNav(index){
				 this.mainActiveIndex = index 
			 },
			 onClickItem(data){ 
				 this.activeId = data.id
				 this.value1 = data.text
				 this.offset = 0
				 this.$toast.loading({
					 mask:true,
					 message:'数据加载中...',
					 duration:0
				 })
				 this.getData(this.latitude,this.longitude,this.offset,this.limit,this.restaurant_category_id,this.order_by,[this.activeId]) 
				 this.$refs.pickguize.toggle()
			 },
			 //加载更多
			 async getMoreData(){
				 if(this.noRepeat){
					 return
				 }
				 this.isShow = true
				 this.noRepeat = true
				 this.offset += 20
				 let res = await restaurants(this.latitude,this.longitude,this.offset,this.limit,this.restaurant_category_id,this.order_by,[this.activeId])
				 this.isShow = false
				 if(res){
					 this.dataList = [...this.dataList,...res]
				 }
				 this.noRepeat = false
			 },
			 //滚动加载
			 scrollGetData(){
				 //获取总高度
				 let all = this.$refs.allheight.offsetHeight || this.$refs.allheight.clientHeight
				 //获取可视高度
				 let now = document.documentElement.clientHeight
				 //滚动距离
				 let scroll = document.body.scrollTop || document.documentElement.scrollTop
				 
				 if(now + scroll > (all - 30)){ 
					 this.isShow = true
					 this.getMoreData()
				 } 
			 },
			 //改变order_by
			 onOrder(){
				 console.log(this.order_by)
				 this.offset = 0
				 this.$toast.loading({
					 mask:true,
					 message:'数据加载中...',
					 duration:0
				 })
				 this.getData(this.latitude,this.longitude,this.offset,this.limit,this.restaurant_category_id,this.order_by,[this.activeId])
			 }
		},
		computed:{ 
		},
		mounted(){
			this.getData(this.latitude,this.longitude,this.offset,this.limit,this.restaurant_category_id,this.order_by)
			this.getCategory()
			window.addEventListener('scroll',this.scrollGetData)
		},
		destroyed(){
			window.removeEventListener('scroll',this.scrollGetData)
		}
	}
</script>

<style lang="scss">
	.main {
		height:100%;
	}
	.content {
		min-height:calc(100% - 96px);
		padding-top:46px; 
		 .van-dropdown-menu__title--down::after{
			 top:10px !important;
		 }
		 .van-dropdown-menu__title::after{
			 top:6px;
		 }
		 .van-tree-select__nav{
			 background: #f1f1f1
		 }
		 .van-tree-select__item {
			 font-weight: normal
		 }
	}
</style>
