<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				我的余额
			</font>
		</all-header>
		<div class="content2">
			<div class="yeMoney">
				<div class="neiDiv">
					<h4>
						当前余额
						<router-link to="/balance/balanceDetail">
							<van-icon name="question"></van-icon>余额说明
						</router-link>
					</h4>
					<p>
						<b>0.00</b>元
					</p>
					<button class="btn">提现</button>
				</div>
			</div>
			<div class="jilu">
				<h5>
					交易明细
				</h5>
				<div class="nojl">
					<img src="@/assets/images/jl.png" alt="">
					<span>
						暂无交易记录
					</span>
				</div>
			</div>
		</div>
		<transition name="van-slide-left" mode="out-in" >
			<router-view/>
		</transition>
	</div>
</template>

<script>
import allHeader from '@/components/global/header'
export default{
	name:'balance',
	data(){
		return {
			
		}
	},
	components:{
		allHeader
	}
}
</script>

<style lang="scss" scoped>
 
.yeMoney{
	background: -webkit-gradient(linear, left top, right bottom, from(#fd4a15), to(#e28355));
	padding:.2rem;
	.neiDiv {
		background: #fff;
		min-height:2rem;
		border-radius: 5px;
		box-shadow: 0 2px 10px rgba(195,195,195,.2);
		h4{
			padding:.1rem .2rem;
			font-size:14px;
			color:#333;
			display: flex;
			align-items: center;
			a{
				display: flex;
				align-items: center;
				color:#3190e8;
				font-size:12px;
				margin-left:auto;
				 i{
					 margin-right:3px;
				 }
			}
		}
		p{
			color:#999;
			font-size:14px;
			padding:0 .2rem .1rem .2rem;
			b{
				color:#333;
				font-weight: normal;
				font-size:26px;
			}
		}
		.btn{
			border:none;
			background: #e28355;
			width:calc(100% - .4rem);
			padding:.1rem;
			border-radius:5px;
			color:#fff;
			margin:0 .2rem .2rem .2rem;
		}
	}
}
.jilu {
		margin-top:.1rem;
		padding:0 .2rem;
		.nojl{
			display: flex;
			align-items: center;
			flex-direction: column;
			img{
				margin:.5rem 0;
			}
			span{
				color:#999;
				font-size:12px;
			}
		}
	}
	
</style>
