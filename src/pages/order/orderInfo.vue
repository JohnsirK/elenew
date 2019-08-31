<template>
	<div class="orderInfo" @touchmove.prevent>
		<div class="info" v-if="dataInfo">
			<h4>
				商铺：{{dataInfo._doc.restaurant_name}}
				<font>
					
					{{dataInfo.deliver_time}}
				</font>
			</h4>
			<dl>
				<dt>
					订单详情
				</dt>
				<dd>
					订单号：{{dataInfo._doc.order_time}}
				</dd>
				<dd>
					下单时间：{{dataInfo._doc.formatted_created_at}}
				</dd>
				<dd>
					支付方式：{{dataInfo.pay_method}}
				</dd>
				<dd>
					手机号：{{dataInfo.phone}}
				</dd>
				<dd>
					收餐地址：{{dataInfo.addressDetail}}
				</dd>
				<dd>
					订单总费用：￥{{dataInfo._doc.total_amount}}
				</dd>
			</dl>
			
		</div>
	</div>
</template>

<script>
	import {snapshot} from '@/api/api'
	import {mapState} from 'vuex'
	
	export default {
		data(){
			return {
				dataInfo:{}
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods:{
			async getData(){
				let res = await snapshot(this.userinfo.id,this.$route.query.id) 
				this.dataInfo = res
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	.orderInfo{
		position:fixed;
		top:46px;
		background: #efefef;
		width:100%;
		bottom:0px;
		overflow-y: auto;
		z-index: 2;
		h4{
			font-size:16px;
			color:#333;
			background: #e8e8e8;
			padding:.2rem;
			display: flex;
			align-items: center;
			font{
				font-size:12px;
				margin-left:auto;
				color:#999;
			}
		}
		dl{
			background: #fff;
			box-shadow: 0 2px 10px rgba(195,195,195,.2);
			padding:.2rem;
			dt{
				border-bottom: 1px solid #efefef;
				padding-bottom:.1rem;
				margin-bottom: .1rem;
			}
			dd{
				font-size:14px;
				color:#666;
				margin-bottom: .1rem;
			}
			dd.money{
				font-size:20px;
			}
		}
	}
</style>
