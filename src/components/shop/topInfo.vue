<template>
	<div class="topinfo" v-cloak>
		<div class="imgText">
			<span>
				<img :src="imgUrl + datalist.image_path" :alt="datalist.name" v-lazy="imgUrl + datalist.image_path">
			</span>
			<div class="textinfo">
				<h3>
					<font>
						品牌
					</font>
					{{datalist.name}}
				</h3>
				<h5>
					{{datalist.delivery_mode?datalist.delivery_mode.text : ''}} / {{datalist.float_minimum_order_amount}}分钟送达 / 配送费约￥{{datalist.float_delivery_fee}}
				</h5>
				<h6>
					<font v-for="(item,index) in datalist.activities" :key="index">
						{{item.description}}
					</font>
				</h6>
			</div>
		</div>
		<van-notice-bar  :text="(datalist.promotion_info ? datalist.promotion_info : '')  + '，本店主营:' + (datalist.category ? datalist.category : '' ) + '，地址是:' + (datalist.address ? datalist.address : '')" left-icon="volume-o" background="rgba(0,0,0,.6)" color="#fff" />
		<div class="bgImg">
			<img :src="imgUrl + datalist.image_path" >
		</div>
	</div>
</template>

<script>
	export default {
		name:'shopTopInfo',
		props:['datalist'],
		data(){
			return{
				imgUrl:'https://elm.cangdu.org/img/'
			}
		},
		mounted() {
			 
		}
	}
</script>

<style lang="scss">
	.topinfo{
		height:2.4rem;
		position:relative; 
		z-index: 10;
		overflow: hidden;
		.imgText{
			height:calc(100% - 30px);
			padding:.2rem;
			box-sizing:border-box;
			display: flex;
			background: rgba(0,0,0,.3);
			color:#fff;
			align-items:center;
			h3{
				font-size:16px;
				font-weight: bold;
				font{
					font-size:14px;
					background: red;
					text-align: center;
					display: inline-block;
					padding:0 5px;
				}
			}
			h5{
				font-size:12px;
				margin:.1rem 0;
			}
			span{
				width:1.2rem;
				height:1.2rem;
				display: flex;
				justify-content: cetner;
				align-items: center;
				margin-right:.2rem;
				img{
					width:100%;
				}
			}
		}
		.van-notice-bar{
			height:30px;
		}
		.bgImg{
			position: absolute;
			top:0;
			left:0;
			height:2.4rem;
			width:100%;
			display: flex;
			z-index: -1;
			filter:blur(10px);
			img{
				width:100%;
				height: 100%;
				display: block
			}
		}
	}
</style>
