<template>
	<div class="hbchange">
		<all-header>
			<font slot="tl">红包兑换</font>
		</all-header>
		<div class="content2">
			<div class="changediv">
				<p>
					<input v-model="changeNum" type="text" placeholder="请输入红包兑换码">
				</p>
				<p class="yzm">
					<input  v-model="yzm" type="text" placeholder="请输入验证码">
					<span>
						<em>
							<img :src="yzmImg" alt="">
						</em>
						<font>
							看不清?
							<br>
							换一张
						</font>
					</span>
					
				</p>
				<p>
					<button @click="getchange">
						兑换
					</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {exchange,captchas} from '@/api/api'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				yzm:'',
				changeNum:'',
				yzmImg:''
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods:{
			async getyzm(){
				let res = await captchas() 
				this.yzmImg = res.code
			},
			async getchange(){
				if(!this.changeNum){
					this.$toast('红包兑换码不能为空!')
					return 
				}else{
					this.$toast.loading({
						mask:true,
						message:'登录中,请稍后'
					})
					let res = await exchange(this.userinfo.id,this.changeNum,this.yzm)
					if(res.status == 0){ 
						this.$toast.clear()
						this.$toast(res.message)
					}else{
						this.$toast.clear()
						this.$toast('兑换成功！')
					}
				}
				
				
				
			}
		},
		mounted() {
			this.getyzm()
		}
	}
</script>

<style lang="scss">
	.hbchange{
		height:100%;
		width:100%;
		position: fixed;
		top:0;
		left:0;
		
		z-index: 2;
		.content2{
			background: #fff !important;
		}
		.changediv {
			padding:.5rem .2rem;
			p{
				width:100%;
				margin-bottom: .2rem;
				position: relative;
				input{
					padding:.1rem;
					border:1px solid #dcdcdc;
					width:100%;
					box-sizing: border-box;
					font-size:14px;
					border-radius: 3px;
				}
				button{
					background: #f60;
					border:none;
					width:100%;
					color:#fff;
					font-size:16px;
					padding:.1rem 0;
					border-radius: 3px;
				}
			}
			p.yzm{
				display: flex;
				align-items: center;
				input {
					width:60%;
					
				}
				span{
					margin-left:auto;
					display: flex;
				}
				font{
					font-size:12px;
					
				}
				em{
					margin:0 5px;
				}
			}
		
		}
	}
</style>
