<template>
	<div class="iconList">
		<div class="swiper-container" id="iconTopList">
			<div class="swiper-wrapper">
				<div  class="swiper-slide" v-for="(item,index) in iListData" :key="index">
					<ul>
						<li v-for="(li,index) in item" :key="index">
							<router-link :to='{name:"food",query:{geohash:pickAddress.geohash,title:li.title,restaurant_category_id:getId(li.link)}}'>
								<span>
									<img :src="imgUrl + li.image_url" :alt="li.title">
								</span>
								<p> 
									{{li.title}}
								</p>
							</router-link>
						</li>
					</ul>
				</div>
				<loading v-if="iListData.length <= 0"></loading>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div> 
		</div> 
	</div>
</template>

<script>
	//引入swiper
	import Swiper from 'swiper'
	//导入请求api
	import {iconListData} from '@/api/api.js'
	import {mapState} from 'vuex'
	//引入数据加载组件
	import loading from '@/components/global/loading'
	export default{
		data(){
			return {
				current:0,
				//定义食品分类数组
				iListData:[],
				// 图片地址
				imgUrl:'https://fuss10.elemecdn.com'
			}
		},
		methods:{
			//获取食品分类数据
			getIconListData:function(){
				iconListData().then(res => { 
					//由于轮播图必须数据获取成功之后重新加载数据
					//所以此处需要用到this.$nextTick 它的作用是dom发生改变之后重新调用
					this.$nextTick(function(){
						this.swiperIcon()
					})
					//由于swiper每页展示8个数据，所以获取到的数据需要分割
					let _data = res;
					//总数据一共有多少页，由于每页8条，所以用总数据/8就等于页数
					let page = parseInt(_data.length / 8)
					//定义一个总数组
					let dataArr = []
					//定义一个若干的arr数组
					let arr = []
					//循环页数
					for(let i = 0;i<page;i++){
						arr = []
						//在页数里面再循环每一条数据
						for(let j = 0;j<8;j++){
							arr.push(_data[i * 8 + j])
						}
						dataArr.push(arr)
					}
					arr = []
					//还有一种情况，如果获取到的数据不是8的倍数，循环剩下的数
					if(page * 8 < _data.length){
						for(let k = page * 8;k<_data.length;k++){
							arr.push(_data[page * 8 + k])
						}
						dataArr.push(arr)
					}
					this.iListData = dataArr  
				}).catch(err => {
					console.log(err)
				})
			},
			//轮播图标
			swiperIcon(){
				new Swiper('#iconTopList',{
					loop:true,
					//如果需要分页器
					pagination: {
						el: '.swiper-pagination',
				    },
					observer:true,//修改swiper自己或子元素时，自动初始化swiper 
					observeParents:true//修改swiper的父元素时，自动初始化swiper 
				})
			},
			//筛选restaurant_category_id
			getId(url){
				let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''))
				if(/restaurant_category_id/gi.test(urlData)){
					return JSON.parse(urlData).restaurant_category_id.id
				}else {
					return ''
				}
			}
		},
		//用编译好的html内容替换el属性指向dom对象，方法结束后，dom结构完成，页面能显示出来。
		//发起网络请求
		mounted(){
			//请求食品分类数据
			this.getIconListData()
		},
		components:{
			loading
		},
		computed:{
			 ...mapState(['pickAddress'])
		}
	}
</script>

<style lang="scss">
	//导入scss
	@import '@/assets/css/global.scss';
	.iconList {
		background: #fff;
		height:3.5rem;
		box-shadow: 0 2px 5px rgba(196,196,196,.1);
		.swiper-container {
			height:100%;
			width:100%; 
		}
		ul {
			overflow: hidden;
			padding:.2rem;
			li{
				float:left;
				width:25%;
				span,img{
					display: block;
				}
				img {
					width:50%;
					margin:0 auto;
				}
				p{
					text-align: center;
					font-size:$font-14;
					color:#999;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height:.48rem;
				}
			}
		}
		.swiper-pagination {
			bottom:3px
		}
	}
</style>
