<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				我的订单
			</font>
		</all-header>
		<div class="content p-b50">
			<ul class="ordersList">
				<li v-for="(item,index) in orderList" :key="index">
				<router-link :to="{path:'/order/orderInfo/',query:{id:item.id}}">
					<h3>
						{{ item.restaurant_name}}
						<span>订单状态：<font :style="{'color':'#' + item.status_bar.color}">{{item.status_bar.title}}</font></span>
					</h3>
					<div class="imgTxt">
						<span class="img">
							<img :src="imgUrl + item.restaurant_image_url" alt="">
						</span>
						<div class="txt">
							<h4>
								下单时间：{{item.formatted_created_at}}
							</h4>
							<h5>
								￥{{item.total_amount}}
							</h5>
						</div>
						<van-icon name="delete" class="icondel"></van-icon>
					</div>
					<p>
						<a href="">再来一单</a>
					</p>
					</router-link>
				</li>
			</ul>
			<transition name="van-slide-left" mode="out-in" >
				<router-view/>
			</transition>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {ordersList} from '@/api/api'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				imgUrl:'https://elm.cangdu.org/img/',
				orderList:[]
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['userinfo']),
		},
		methods:{
			async order(){
				this.$toast.loading({
					mask:true,
					message:'订单加载中,请稍后'
				})
				let res = await ordersList(this.userinfo.user_id,20,0)
				if(res){ 
					this.orderList = res
					this.$toast.clear()
				}
			}
		},
		mounted() {
			this.order()
		}
	}
</script>

<style lang="scss" scoped>
	ul.ordersList{
		overflow: hidden;
		li{
			margin-bottom: .2rem;
			box-shadow: 0 2px 10px rgba(195,195,195,.2);
			background: #fff;
			h3{
				font-size:14px;
				font-weight: bold;
				padding:.1rem .2rem;
				color:#545454;
				display: flex;
				align-items: center;
				span{
					margin-left:auto;
					font-weight: normal;
					font-size:12px;
				}
			}
			.imgTxt {
				border-top:1px solid #f5eded;
				border-bottom:1px solid #f5eded;
				padding:.2rem;
				display: flex;
				position: relative;
				span.img{
					width:1.2rem;
				}
				.icondel{
					position: absolute;
					right:.2rem;
					top:.2rem;
					color:#666;
					font-size:20px;
				}
				.txt{
					width:calc(100% - 1.3rem);
					margin-left:.1rem;
					h4{
						color:#666;
						font-size:14px
					}
					h5{
						color:#f60;
						font-size:18px;
					}
				}
				
			}
			p{
				padding:.1rem .2rem;
				display: flex;
				a{
					color:#ada8a8;
					margin-left:auto;
					display:inline-block;
					font-size:14px;
					border:1px solid #d2cece;
					padding:0 .1rem;
				}
				
			}
		}
	}
</style>
