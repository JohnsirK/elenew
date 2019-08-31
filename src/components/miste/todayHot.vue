<template>
	<div class="todayHotList" >
		<ul>
			<li v-for="(item,index) in datalist" :key="index" >
				<router-link :to="{name:'shop',query:{id:item.id}}">
					<div class="imgleft">
						<img  :src="imgUrl + item.image_path" :alt="item.name" v-lazy="imgUrl + item.image_path">
					</div>
					<div class="txtright">
						<h5>
							<van-tag type="danger" mark >标签</van-tag>
							{{item.name}}
							<em>
								<font :style="'color:#' + i.icon_color" v-for="(i,index) in item.supports" :key="index">
									{{i.icon_name}}
								</font>
							</em>
						</h5>
						<div class="reta-txt">
							<div class="reta-icon">
								<van-rate gutter=".02rem" size=".26rem" readonly allow-half v-model="item.rating"></van-rate>
							</div>
							<font class="pingf">
								{{item.rating}}
							</font>
							<font class="yues">
								月售{{item.recent_order_num}}单
							</font>
							<span>
								<b v-if="item.delivery_mode">
									{{item.delivery_mode.text}}
								</b>
							</span>
						</div>
						<p>
							<font>
								￥{{item.float_minimum_order_amount}}起送 / 配送费约￥{{item.float_delivery_fee}}
							</font>
							<em>
								{{item.distance}} / <b>{{item.order_lead_time}}</b>
							</em>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
		<loading v-if="datalist <= 0"></loading>
	</div>
</template>

<script>
	import loading from '@/components/global/loading'
	export default{
		name:'todayHot',
		props:['datalist'],
		data(){
			return {
				//图片路径
				imgUrl:'http://cangdu.org:8001/img/',
				//加载数据数
				offset:0,
				//方式重复获取变量
				noRepeat:false
			}
		},
		components:{
			loading
		},
		methods:{
			
		},
		mounted(){  
		}
	}
</script>

<style lang="scss">
	.all-title{
		height:.8rem;
		line-height:.8rem;
		text-align: center;
		width:100%;
		position: relative;
		font-weight: normal;
		font-size:.32rem;
		color:#666;
	}
	.all-title:after{
		content:'';
		position: absolute;
		top:50%;
		height:1px;
		background: #e1e1e1;
		width:1rem;
		right:2rem;
	}
	.all-title::before {
		content:'';
		position: absolute;
		top:50%;
		height:1px;
		background: #e1e1e1;
		width:1rem;
		left:2rem;
	}
	.todayHotList {
		box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
		background: #fff;
		margin-bottom: .1rem;
	}
	.todayHotList ul{
		overflow:hidden;
		li{
			padding:.2rem; 
			border-bottom:1px solid #e7e7e7; 
			a{
				font-weight: normal;
				display: flex
			}
			.imgleft {
				width:1.2rem;
				margin-right:.1rem;
			}
			.txtright {
				width:calc(100% - 1.3rem);
				h5 {
					font-size:.28rem;
					display:flex;
					color:#333;
					font-weight: bold;
					em{
						margin-left:auto;
						font{
							font-size:.24rem;
							color:#999;
							text-align: center;
							margin-left:.02rem;
							font-weight: normal;
						}
					}
					span{
						margin-right:.1rem;
					}
				}
				.reta-txt { 
					display: flex; 
					align-items: center;
					line-height:.48rem;
					font{
						font-size:.24rem;
					}
					font.pingf {
						color:#eba210;
						margin:0 .2rem 0 .1rem;
					}
					font.yues{
						color:#666;
					}
					span{
						margin-left:auto;
						b{
							border-radius: .06rem;
							font-size:.24rem;
							color:#fff;
							font-weight: normal;
							padding:.04rem .1rem; 
							text-align: center;
							background: #f60;
							margin-right:.1rem;
						}
						b:last-child{
							margin-right:0;
						}
						b.noborder{
							border:1px solid #f60;
							color:#f60;
							background: none;
						}
					}
				}
				p{
					font-size:.24rem;
					display: flex;
					font{
						color:#666;
					}
					em{
						color:#999;
						margin-left:auto;
						b{
							font-weight: normal;
							color:#3190E8
						}
					}
				}
			}
		}
	}
</style>
