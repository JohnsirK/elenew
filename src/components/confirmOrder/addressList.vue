<template>
	<div class="addList">
		<ul v-if="this.addressData">
			<li :class="{'cur':cur == index}" v-for="(item,index) in addressData" @click="pick(item,index)">
				<h3>
					<font>{{item.name}}</font>
					<em>
						{{item.phone}}
					</em>
				</h3>
				<p>
					{{item.address + item.address_detail}}
				</p>
				<van-icon name="certificate" class="picon" :class="{'bk':pkicon == index}"></van-icon>
			</li>
			
		</ul>
		<p v-else class="noData">
			暂无地址，请单击下方添加地址信息!
		</p>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {addresses} from '@/api/api'
	export default{
		data(){
			return {
				addressData:[],
				cur:null,
				pkicon:null,
				
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods:{
			async getAddress(){
				let res = await addresses(this.userinfo.id)
				this.addressData = res
			},
			pick(item,index){ 
				this.cur = index
				this.pkicon = index
				//向父组件传值 
				this.$emit('selectAddress',item)
			}
		},
		mounted(){
			this.getAddress()
		}
	}
</script>

<style lang="scss" scoped>
	.addList {
		ul{
			 
		}
		li{
			position: relative;
			padding:.2rem; 
			h3{
				font{
					font-size:14px;
					color:#323233;
					margin-right:.2rem;
				}
				em{
					font-size:12px;
					color:#656565
				}
				b{
					background: #e4e1de;
					color:#d41313;
					font-size:12px;
					padding:.02rem .08rem;
					margin-left:auto;
				} 
			}
			p{
				font-size:12px;
				color:#7d7e80
			}
			.picon {
				position: absolute;
				right:.2rem;
				top:40%;
				font-size:20px;
				display: none;
			}
			.bk {
				display: block !important
			}
		}
		li.cur{
			background: #e0dbdb;
		}
		p.noData{
			text-align: center;
			color:#999;
			font-size:12px;
			padding:.4rem;
		}
	}
</style>
