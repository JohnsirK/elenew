<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				我的优惠
			</font>
		</all-header>
		<div class="content">
			<van-tabs v-model="active" animated>
				<van-tab title="可用红包">
					<dl class="listDl">
						<dt>
							有<font>{{hongbaos.length}}</font>个红包即将到期
							<router-link to="/benefit/hbinfo">
								<van-icon name="question"></van-icon>
								红包说明
							</router-link>
						</dt>
						<dd v-for="(item,index) in hongbaos" :key="index">
							<div class="divmoney">
								<div class="lmoney">
									<p>
										￥<b>{{item.amount}}</b>
									</p>
									<span>
										{{item.description_map.sum_condition}}
									</span>
								</div>
								<div class="ctxt">
									<h4>
										{{item.name}}
									</h4>
									<h5>
										{{item.end_date}}到期
									</h5>
									<h5>
										{{item.description_map.phone}}
									</h5>
								</div>
								<font >
									{{item.description_map.validity_delta}}
								</font>
							</div>
							<h6 v-if="item.limit_map">
								{{item.limit_map.restaurant_flavor_ids}}
							</h6>
						</dd>
						
					</dl>
				</van-tab>
				<van-tab title="过期红包">
					<dl class="listDl gray">
						<dt>
							有<font>{{gqhongbaos.length}}</font>个红包已到期
						</dt>
						<dd v-for="(item,index) in gqhongbaos" :key="index">
							<div class="divmoney">
								<div class="lmoney">
									<p>
										￥<b>{{item.amount}}</b>
									</p>
									<span>
										{{item.description_map.sum_condition}}
									</span>
								</div>
								<div class="ctxt">
									<h4>
										{{item.name}}
									</h4>
									<h5>
										{{item.description_map.validity_periods}}
									</h5>
									<h5>
										{{item.description_map.phone}}
									</h5>
								</div>
								<font>
									已过期
								</font>
							</div>
							<h6 v-if="item.limit_map">
								{{item.limit_map.restaurant_flavor_ids}}
								{{item.limit_map.time_periods}}
							</h6>
							
						</dd>
					</dl>
				</van-tab>
				<van-tab title="商家代金券">
					<div class="djq">
						<h4>
							<router-link to="/benefit/djqinfo">
								<van-icon name="question"></van-icon>
								代金券说明
							</router-link>
						</h4>
						<div class="nodjq">
							<img src="@/assets/images/d1.png" alt="">
							<span>
								无法使用代金券
							</span>
							<font>
								非客户端或客户端版本过低
							</font>
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<transition name="van-slide-left" mode="out-in" >
			<router-view/>
		</transition>
		<div class="fix-dh">
			<router-link to="/benefit/changehb">
				红包兑换
			</router-link>
		</div>
	</div>
</template>

<script>
import allHeader from '@/components/global/header'
import {hongbaos,expired_hongbaos,exchange} from '@/api/api'
import {mapState} from 'vuex'
export default{
	data(){
		return {
			active:0,
			hongbaos:[],
			gqhongbaos:[]
		}
	},
	computed:{
		...mapState(['userinfo'])
	},
	components:{
		allHeader
	},
	methods:{
		//可用红包
		async hb(){
			let res = await hongbaos(this.userinfo.id,20,0)
			if(res){ 
				this.hongbaos = res
			}
		},
		//过期红包
		async gqhb(){
			let res = await expired_hongbaos(this.userinfo.id,20,0)
			if(res){ 
				this.gqhongbaos = res
			}
		},
		
	},
	mounted() {
		this.hb(),
		this.gqhb()
	}
}
</script>

<style lang="scss" scoped>
	.fix-dh {
		position:fixed;
		bottom:0;
		height:40px;
		background: #e6dede;
		left:0;
		width:100%;
		a{
			height:100%;
			color:#333;
			font-size:16px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.listDl{
		background: #f6f6f6;
		padding:.1rem .2rem;
		dt{
			display: flex;
			align-items: center;
			font-size:14px;
			padding:.1rem 0;
			font{
				color:red;
				margin:0 3px;
			}
			a{
				display: flex;
				align-items: center;
				margin-left:auto;
				color:#3190e8;
			}
		}
		dd{
			.divmoney{
				
				display: flex;
				
			}
			margin:.1rem 0 .2rem 0;
			box-shadow: 0 2px 10px rgba(195,195,195,.2);
			background: url('../../assets/images/1123222.png') top center repeat-x;
			background-size:.3rem .1rem;
			border-radius: 5px;
			overflow: hidden;
			padding:.3rem;
			.lmoney {
				p{
					color:#666;
					font-size:14px;
					b{
						color:red;
						font-size:24px;
						font-weight: normal
					}
				}
				span{
					color:#999;
					font-size:12px;
				}
			}
			.ctxt {
				margin-left:.1rem;
				border-left:1px solid #e7e7e7;
				padding:0 .2rem;
				h5{
					color:#999;
					font-size:14px;
				}
			}
			font{
				margin-left:auto;
				color:red;
			}
			h6{
				color:#999;
				font-size:14px;
				margin-top:.1rem;
			}
		}
		
	}
	.gray{
		dd{
			background: url('../../assets/images/23213.png') top center repeat-x;
			.lmoney{
				p{
					b{
						color:#999
					}
					
				}
			}
			.ctxt {
				h4{
					color:#999
				}
			}
			font{
				color:#999;
				font-size:14px;
			}
		}
	}
	.djq {
		padding:.1rem .2rem;
		background: #f6f6f6;
		h4{
			display: flex;
			align-items: center;
			a{
				display: flex;
				align-items: center;
				margin-left:auto;
				color:#3190e8;
				font-size:14px;
			}
		}
	}
	
	.nodjq {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding:.5rem 0;
		span{
			font-size:16px;
		}
		font{
			font-size:14px;
			color:#999
		}
	}
</style>
