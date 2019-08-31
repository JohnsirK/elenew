<template>
	<div class="main">
		<!-- 顶部 -->
		<top-info :datalist = "shopDetailData" v-cloak></top-info>
		<!-- 内容 --> 
		<div class="shop">
			<van-tabs v-model="active" animated>
				<van-tab title="商品">
					<div class="shopList">
						<!-- 左边滚动 -->
						<div class="menu-wrapper" ref="menu"> 
							<ul>
								<li v-for="(item,index) in getShopNum" :key="index" :class="{'cur':currentIndex === index}" @click="selectIndex(index)">
									{{item.name}}
									<font v-if="item.mynum">
										{{item.mynum}}
									</font>
								</li>
							</ul>
						</div>
						<!-- 右边滚动 -->
						<div class="food-wrapper" ref="food">
							<div>
								<dl class="dlList" v-for="(item,index) in getShopNum" :key="index">
									<dt>
										{{item.name}}
									</dt>
									<dd v-for="(i,index) in item.foods" :key="index">
										<router-link :to="{name:'shopDetail',params:{info:i}}">
											<span>
												<img :src="imgUrl + i.image_path" :alt="i.name" v-lazy="imgUrl + i.image_path">
											</span>
											<div class="txt">
												<h3>
													{{i.name}}
												</h3>
												<h5>
													{{i.description}}
												</h5>
												<h6>
													{{i.tips}}
												</h6>
												<p>
													￥<b>{{i.specfoods[0]? i.specfoods[0].price : 9.9}}</b>
												</p>
											</div>
											<div class="numDiv" >
												<div v-if="i.mynum">
													<button @click.stop.prevent = "jianNum(i)">
														-
													</button>
													<font>
														{{i.mynum}}
													</font>
												</div>
												<button @click.stop.prevent="addNum(i)">
													+
												</button>
											</div>
										</router-link>
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="评价">
					<div class="tabShopInfo box" style="margin-top:0">
						<div class="score">
							<font>
								{{allScore}}
							</font>
							<h5>
								综合评价
							</h5>
							<h6>
								高于周边商家
							</h6>
						</div>
						<div class="allScore">
							<div class="rateDiv">
								服务态度：<div><van-rate readonly v-model="shopScoresArr.service_score" allow-half void-icon="star" void-color="#eee" size="16"></van-rate></div><em>{{serverScore}}</em>
							</div>
							<div class="rateDiv">
								菜品评价：<div><van-rate readonly v-model="shopScoresArr.food_score" allow-half void-icon="star" void-color="#eee" size="16"></van-rate></div><em>{{foodScore}}</em>
							</div>
							<div class="rateDiv">
								送达时间：{{shopScoresArr.deliver_time}}分钟
							</div>
						</div>
					</div>
					<div class="pingjia">
						<p>
							<span :class="{'color1':item.unsatisfied,'cur':cur === index}" v-for="(item,index) in shopTagsArr" :key="index" @click="changeCur(index,item)">
								{{item.name}}({{item.count}})
							</span>
						</p>
						<div class="ratingsDiv" ref="rating">
							<ul>
								<li v-for="(item,index) in retingsArr" :key="index">
									<span class="userImg">
										<img :src="imgPath(item.avatar)" :alt="item.username">
									</span>
									<div class="txt">
										<h4>
											{{item.username}}
											<em>
												{{item.rated_at}}
											</em>
										</h4>
										<h5>
											<div><van-rate readonly v-model="item.rating_star" allow-half void-icon="star" void-color="#eee" size="16"></van-rate></div> 
											<b>
												{{item.time_spent_desc?item.time_spent_desc : '默认评价'}}
											</b>
										</h5>
										<div class="imgList">
											<em v-for="(i,index) in item.item_ratings" :key="index">
												<img :src="userImgPath(i.image_hash)">
											</em>
										</div>
										<div class="itags">
											<font v-for="(i,index) in item.item_ratings" :key="index">
												{{i.food_name}}
											</font>
										
										</div>
									</div>
								</li>
								<div class="noMore">
									暂无更多
								</div>
							</ul>
							
						</div>
					</div>
				</van-tab>
				<van-tab title="商家详情">
					<shop-info :dataJson = 'shopDetailData'></shop-info>
				</van-tab>
			</van-tabs>
		</div>
		 <transition name="van-slide-up">
			 <router-view></router-view>
		 </transition>
		 <div class="shopCart" v-show="isShopShow">
			 <span @click="myfood.length > 0 ? isCartShow = !isCartShow : ''">
				 <van-icon name="shopping-cart" :info="myFoodNum > 0 ? myFoodNum : ''"></van-icon>
			 </span>
			 <div class="shopPrice">
				 {{myFoodPriceNum > 1? '￥'+  myFoodPriceNum : '请选择菜品'}} 
				 <p>
					 配送费：￥5
				 </p>
			 </div>
			 <button>
				 <font v-if="!submitFood" style="background: #8a827d;">
					 ￥{{shopDetailData.float_minimum_order_amount}}起送
				 </font> 
				 <font v-if="submitFood == 1" @click="goSubmit">
					 加入购物车
				 </font>
				 <font v-if="submitFood == 2" style="background: #8a827d;">
					 还差 ￥{{shopDetailData.float_minimum_order_amount - myFoodPriceNum}}
				 </font>
			 </button>
		 </div>
		 <!-- 购物车 -->
		 <transition name="van-slide-up">
			  <div class="sCart" v-show="isCartShow">
					<h4>
						购物车
						<font @click="allClear">
							<van-icon name="delete"></van-icon>
							清空
						</font>
					</h4>
					<div class="sCartUl">
						<ul>
							<li v-for="(item,index) in myfood" :key="index">
								<font> 
									{{item.name}}
								</font>
								<span>
									<em>
										￥{{item.price}}
									</em>
									 
									<i @click.stop.prevent = "jianNum(item)">
										-
									</i>
									<b>
										{{item.quantity}}
									</b>
									<i @click.stop.prevent="addNum(item)">
										+
									</i>
								</span>
							</li> 
						</ul>
					</div>
					
			  </div>
		 </transition>
		 <van-overlay z-index="99" :show="isCartShow" @click="isCartShow = false"></van-overlay>
	</div>
</template>

<script>
	import topInfo from '@/components/shop/topinfo'
	//引入better-scroll插件
	import BScroll from 'better-scroll'
	import {shopDetail,shopMenu,rating,shopScores,shopTags,checkout} from '@/api/api' 
	import localSession from '@/utils/localSession'
	import {mapActions,mapState,mapMutations} from 'vuex'
	import shopInfo from '@/pages/shop/shopInfo'
	export default{
		data(){
			return {
				//购物车组件是否显示
				isShopShow:true,
				active:0,
				//餐馆详情
				shopDetailData:[],
				//餐馆菜单数据
				shopMenuData:[], 
				isShow:false,
				imgUrl:'https://elm.cangdu.org/img/',
				//数组高度
				listHeight:[],
				scrollY:0,
				value:2.5,
				//店铺评价分类
				shopTagsArr:[],
				//店铺评价分数
				shopScoresArr:[],
				//获取评价信息
				retingsArr:[],
				cur:0,
				//当前购物车数据
				myfood:localSession.getSession('myfood') || [],
				//购物车是否显示
				isCartShow:false,
				//当前商品总价
				totalPrice:0,
				//购物车商品列表
				cartFoodList:[]
			}
		},
		components:{
			topInfo, 
			shopInfo
		},
		computed:{ 
			...mapState(['newCart']),
			newShopCart(){
				return {...this.newCart[this.$route.query.id]}
			},
			currentIndex(){ 
				for(let i = 0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i]; 
					let height2 = this.listHeight[i+1]
					if(this.scrollY >= height1 && this.scrollY < height2){
						return i
					}
				}
				return 0
			},
			//综合评价
			allScore(){
				return parseFloat(this.shopScoresArr.overall_score).toFixed(1)
			},
			//菜品评价
			foodScore(){
				return parseFloat(this.shopScoresArr.food_score).toFixed(1)
			},
			//服务评价
			serverScore(){
				return parseFloat(this.shopScoresArr.service_score).toFixed(1)
			},
			//购物车商品数量计算
			myFoodNum(){
				let num = 0;
				for(let i = 0;i<this.myfood.length;i++){
					num += this.myfood[i].quantity
				}
				return num
			},
			//商品价格
			myFoodPriceNum(){
				let num = 0;
				this.myfood.forEach((key,index) => {
					num += key.price * key.quantity
				})
				return num
			},
			//计算当前金额有没有满起送价
			submitFood(){
				if(this.myfood){
					if(this.myFoodPriceNum >= this.shopDetailData.float_minimum_order_amount){
						return 1
					}else{
						return 2
					}
				}else{
					return false
				}
			},
			//商品与购物车数量结合
			getShopNum(){ 
				this.shopMenuData.map(item => {
					let thisnum = 0
					 item.foods.map(i => {
						 let isadd = true
						 this.myfood.map(h => { 
							 if(i.item_id == h.id){ 
								 i.mynum = h.quantity
								 thisnum += h.quantity
								 isadd = false
							 }
						 })
						 if(isadd){
							 i.mynum = 0
						 }
					 })
					 item.mynum = thisnum
				})
				return this.shopMenuData
			},
			//当前商店购物信息
		},
		methods:{ 
			...mapActions(['saveNowFoodCar','saveShop']),
			...mapMutations(['newAdd','getcartSuccess']),
			//滚动初始化
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menu,{
					//容许better-scroll 上的点击事件
					click:true
				});
				this.foodScroll = new BScroll(this.$refs.food,{
					//让better-scroll监听scroll事件
					probeType:3
				});
				this.foodScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y)) 
				})
			},
			//初始化评价滚动
			_initRating(){
				this.ratingScroll = new BScroll(this.$refs.rating,{
					click:true
				}) 
			},
			//加载餐馆详情数据
			async getShopDetail(){
				let res = await shopDetail(this.$route.query.id) 
				if(res){  
					this.shopDetailData = res
					 this.saveShop(this.shopDetailData)
					  
				}
			},
			//加载餐馆菜单数据
			async getShopMenu(){
				let res = await shopMenu(this.$route.query.id)
				if(res){ 
					this.shopMenuData = res
					console.log(this.shopMenuData)
					//因为$refs一开始是获取不到的。所以必须通过$nextTick获取，$nextTick的作用是当dom发生改变的时候执行的
					this.$nextTick(function(){
						this.dlHeight()
					})
				}
			}, 
			
			//获取高度
			dlHeight(){
				let foodList = this.$refs.food.getElementsByTagName('dl') 
				let height = 0; 
				this.listHeight.push(height)
				for(let i = 0;i<foodList.length;i++){
					height += foodList[i].clientHeight;
					this.listHeight.push(height)
				} 
			},
			//添加数量
			addNum(i){ 
				//添加购物车 -> 可以添加到sessionStorage -> 查询sessionStorage里面有没有该购物车数据
				// -> 如果有 ->则num + 1,如果没有，则新创建。
				let that = this
				if(localSession.getSession('myfood')){ 
					let getFood = localSession.getSession('myfood')
					//是否需要新添加
					let isadd = true
					for(let j = 0;j<getFood.length;j++){
						if(getFood[j].id == i.item_id || getFood[j].id == i.id){
							getFood[j].quantity += 1
							isadd = false
						}
					}
					if(isadd){
						getFood.push({
							'attrs':[],
							'extra':{},
							'id':i.specfoods[0].item_id,
							'name':i.name,
							'packing_fee':i.specfoods[0].packing_fee,
							'price':i.specfoods[0].price,
							'quantity':1,
							'sku_id':i.specfoods[0].sku_id,
							'specs':[""],
							'stock':i.specfoods[0].stock
						})
					}
					that.myfood = getFood
					that.saveNowFoodCar(getFood) 
				}else{
					let nowfood = [
						 {
							'attrs':[],
							'extra':{},
							'id':i.specfoods[0].item_id,
							'name':i.name,
							'packing_fee':i.specfoods[0].packing_fee,
							'price':i.specfoods[0].price,
							'quantity':1,
							'sku_id':i.specfoods[0].sku_id,
							'specs':[""],
							'stock':i.specfoods[0].stock
						}
					]
					this.myfood = nowfood
					this.saveNowFoodCar(nowfood)
				} 
			},
			//减少数量
			jianNum(i){ 
				this.myfood.map((item,index) => { 
					if(item.id == i.item_id || item.id == i.id){
						item.quantity == 1 ? this.myfood.splice(index,1) : (item.quantity = item.quantity - 1)
					}
				})
				this.saveNowFoodCar(this.myfood)
			},
			//滑动到响应距离
			selectIndex(index){
				let foodList = this.$refs.food.getElementsByTagName('dl')
				let el = foodList[index]
				this.foodScroll.scrollToElement(el,300)
			},
			//获取店铺评价分类
			async getShopTags(){ 
				let res = await shopTags(this.$route.query.id)
				if(res){
					this.shopTagsArr = res
				}
			},
			//获取店铺评价分数
			async getShopScores(){
				let res = await shopScores(this.$route.query.id)
				if(res){
					this.shopScoresArr = res  
				}
			},
			//获取评价信息
			async getRating(){
				let res = await rating(this.$route.query.id)
				if(res){
					this.retingsArr = res 
				}
			},
			//评价筛选
			async changeCur(index,item){
				this.cur = index 
				let res = await rating(this.$route.query.id,item.name)
				if(res){
					this.retingsArr = res
				} 
			},
			//评价 用户头像
			imgPath(e){
				let suf
				//如果用户没设置头像，则返回默认头像
				if(!e){
					return 'http://elm.cangdu.org/img/default.jpg'
				}
				if(e.indexOf('jpeg') !== -1){
					suf = '.jpeg'
				}else{
					suf = '.png'
				}
				let url = '/' + e.substr(0,1) + '/' + e.substr(1,2) + '/' + e.substr(3) + suf
				return 'https://fuss10.elemecdn.com/' + url
			},
			//用户评论 晒图
			userImgPath(e){
				return 'https://fuss10.elemecdn.com/' + e + '.jpeg'
			},
			//去结算
			async goSubmit(){
				let arr = [
					this.shopDetailData.longitude,
					this.shopDetailData.latitude
				]
				let toArr = arr.join(',')
				let res = await checkout(this.shopDetailData.id,toArr,[this.myfood]) 
				if(res){
					this.getcartSuccess(res)
				}
				this.$router.push({name:'confirmOrder',query:{'geohash':toArr,'id':this.shopDetailData.id}})
			},
			//清空购物车
			allClear(){
				//删除购物车里面的数据
				this.myfood = []
				//清空vuex的数据以及localSession的值
				this.saveNowFoodCar(this.myfood)
				localSession.removeSession('myfood')
				this.isCartShow = false
			}
		},
		//将beforemount编译好的html内容替换el属性指向dom对象，方法结束后，Dom结构生成，页面展示出来，
		mounted() {
			this.$nextTick(function(){ 
				this._initScroll()
			})
		}, 
		created() {
			this.getShopDetail()
			this.getShopMenu()
			this.getShopTags()
			this.getRating()
			this.getShopScores() 
		},
		watch:{
			active(val){
				if(val == 1){
					this.$nextTick(function(){
						this._initRating()
					})
				} 
				if(val == 2){ 
					this.isShopShow = false
				}else{
					this.isShopShow = true
				}
			}
		}
	}
</script>

<style lang="scss">
	.shopCart {
		height:50px;
		background: #959595;
		width:100%;
		position: fixed;
		z-index: 999;
		bottom:0;
		display: flex;
		left:0;
		.shopPrice{
			font-size:20px;
			color:#fff;
			p{
				font-size:12px;
				color:#d8d8d8;
			}
		}
		span{
			background: #57ade0;
			border:5px solid #959595;
			width:52px;
			height:52px;
			display: flex;
			margin-top:-10px;
			border-radius: 52px;
			justify-content: center;
			align-items: center;
			margin-left:.2rem;
			i{
				font-size:32px;
				color:#fff;
			}
		}
		button{
			margin-left:auto;
			background: #f60;
			height:100%;
			border:none;
			color:#fff;
			padding:0;
			width:2rem;
			font{
				display: block;
				width:100%;
				height:100%;
				line-height:50px;
			}
		}
	}
	.shop {
		height:calc(100% - 2.4rem);
		.van-tabs {
			height:100%;
			.van-tabs__content {
				height:calc(100% - 44px);
			}
			.van-tab{
				background: #eee
			}
			.van-tab--active {
				background: #fff;
			}
		}
		.shopList,.van-tab__pane {
			height:100%;
		}
		.shopList {
			display: flex;
			.menu-wrapper{
				width:100px;
				ul{ 
					li{
						line-height:36px;
						text-align: center;
						border-left:3px solid #efefef;
						overflow: hidden;
						font-size:14px;
						position: relative;
						font{
							position: absolute;
							right:0;
							top:0;
							background: red;
							color:#fff;
							font-size:12px;
							display: inline-block;
							width:16px;
							height:16px;
							text-align: center;
							line-height:16px;
							border-radius: 50%;
						}
					}
					li.cur {
						background: #fff;
						border-left:3px solid #f60
					}
				}
				
			}
			.food-wrapper { 
				width:calc(100% - 100px);
				background: #fff;
				dl{
					
					dt{
						color:#afaaaa;
						text-align: center;
						padding:.1rem 0;
						position: relative;
						font-size:14px;
						border-bottom:1px solid #e2e2e2;
					}
					dt::after{
						content:'';
						height:1px;
						width:50px;
						position: absolute;
						right:20%;
						top:50%;
						background: #e2e2e2;
					}
					 dt:before{
						 content:'';
						 height:1px;
						 width:50px;
						 position: absolute;
						 left:20%;
						 top:50%;
						 background: #e2e2e2;
					 }
					 dd{
						 border-bottom:1px solid #e2e2e2;
						 padding:.2rem;
						 display: flex;
						 a{
							 display: flex;
							 width:100%;
							 position:relative;
						 }
						 span{
							 width:1.6rem;
							 display: flex;
							 align-items: center;
						 }
						 .numDiv {
							 position: absolute;
							 right:0;
							 bottom:.06rem;
							 display: flex;
							 align-items: center;
							 height:.48rem;
							 button{
								 background: #f60;
								 width:.4rem;
								 height:.4rem;
								 border:none;
								 padding:0;
								 text-align: center;
								 line-height:.4rem;
								 color:#fff;
								 border-radius:.4rem;
								 margin-left:5px;
							 }
							 font{
								 color:#666;
								 text-align: center;
							 }
						 }
						 .txt {
							 width:calc(100% - 1.6rem);
							 margin-left:.1rem;
						 }
						 h3{
							 color:#333;
							 font-size:16px;
							 overflow: hidden;
							 text-overflow:ellipsis;
							 white-space:nowrap;
						 }
						 h5{
							 color:#666;
							 font-size:14px;
							 overflow: hidden;
							 text-overflow:ellipsis;
							 white-space:nowrap;
							 margin:2px 0;
							 div{
								 margin-right:5px;
							 }
						 }
						 h6{
							 color:#999;
						 }
						 p{
							 color:#f60;
							 font-size:12px;
							 b{
								 font-size:22px;
								 font-weight: normal
							 }
						 }
					 }
				}
			}
		}
		dl:last-child,.menu-wrapper ul{
			padding-bottom:50px;
		}
	}
	.tabShopInfo {
		display: flex;
		.score {
			width:2rem;
			text-align: center;
			border-right:1px solid #ececec;
			font{
				font-size:24px;
				color:#f60
			}
			h5{
				color:#666;
			}
			h6{
				color:#999
			}
		}
		.allScore {
			width:calc(100% - 2.3rem);
			margin-left:.2rem;
			display: flex; 
			justify-content: center;
			flex-direction: column;
			.rateDiv{
				font-size:14px;
				color:#666;
				display: flex;  
				em{
					color:#f60;
					margin-left:.1rem;
				}
			}
		}
	}
	.pingjia {
		margin-top:.2rem;
		background: #fff;
		padding:.2rem;
		box-shadow: 0 2px 10px rgba(195,195,195,.2);
		p{
			span{
				background:#cfe5fb;
				padding:5px;
				font-size:14px;
				margin-right:.1rem;
				margin-bottom: .1rem;
				display: inline-block;
			}
			span.cur{
				background: #57ade0 !important;
				color:#fff;
			}
			span.color1{
				background: #ccc
			}
		}
		dl{
			margin:.1rem 0;
			dt{
				font-size:14px;
				color:#333;
				background: #efeeee;
				padding:.1rem;
			}
		}
		.ratingsDiv{
			overflow: hidden;
			height:4.3rem;
			ul{
				overflow: hidden;
				li{
					display: flex;
					margin-bottom: .2rem;
					border-bottom: 1px solid #e8e2e2;
					padding-bottom: .1rem;
					.userImg{
						width:1rem;
					}
					.txt {
						width:calc(100% - 1.2rem);
						margin-left:.2rem;
						h4{
							color:#333;
							font-size:14px;
							display: flex;
							em{
								color:#999;
								font-size:12px;
								margin-left:auto;
							}
						}
						h5{
							display: flex;
							margin:5px 0;
							b{
								margin-left:5px;
								font-weight: normal;
								color:#999;
							}
						}
						.imgList {
							display: flex;
							img {
								width:1.2rem;
								margin-right:.2rem;
							}
							img.last-child{
								margin-right: 0
							}
						}
						.itags{
							margin:.1rem 0;
							font{
								border:1px solid #dcdcdc;
								padding:.08rem .1rem;
								text-align: center;
								font-size:12px;
								color:#999;
								margin-right:.1rem; 
								width:1.6rem;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space:nowrap;
								display: inline-block;
							}
						}
					}
				}
				li:last-child{
					margin-bottom: 0;
				}
				.noMore {
					text-align: center;
					font-size:14px;
					color:#999;
				}
			}
		}
	}
	.sCart {
		position:absolute;
		bottom:50px;
		left:0;
		z-index: 100;
		width:100%;
		max-height:70%;
		min-height:20%;
		overflow:hidden;
		background: #fff;
		box-shadow: 0 2px 10px rgba(195,195,195,0.6);
		h4{
			padding:0 .2rem;
			font-size:16px;
			display: flex;
			height:40px;
			align-items: center;
			background: #eceff1;
			font{
				margin-left:auto;
				font-size:12px;
				color:#999;
				display: flex;
				align-items: center;
				i{
					font-size:18px;
					margin-right:1px;
				}
			}
		}
		.sCartUl{
			max-height:300px;
			overflow-y:scroll;
			ul{  
				padding:0 .2rem;
				li{
					display: flex;
					align-items: center;
					border-bottom:1px solid #e3e1e1;
					padding:.16rem 0;
					span{
						margin-left:auto;
						display: flex;
						align-items: center;
						em{
							font-weight: bold;
							font-size:14px;
							color:#f60;
							margin-right:.2rem;
						}
						i{
							background: #f60;
							color:#fff;
							width:16px;
							padding:0 3px; 
							border-radius: 50%;
							display: inline-block;
							text-align: center;
							
						}
						b{
							margin:0 .06rem;
							font-size:14px;
							
						}
					}
				}
			}
		}
		
	}
</style>
