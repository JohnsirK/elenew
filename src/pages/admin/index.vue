<template>
	<div class="main">
		<all-height>
			<font slot="tl">
				用户登录
			</font>
			<font slot="admin">
				
			</font>
		</all-height>
		<div class="content2">
			<div class="imglogo">
				<img src="@/assets/images/llogin.png" alt="">
			</div>
			<div class="admin-input">
				<p>
					<van-icon name="manager"></van-icon>
					<input type="text" placeholder="请输入账号" v-model="username">
				</p>
				<p>
					<van-icon name="lock"></van-icon>
					<input type="password" placeholder="请输入密码" v-model="password">
				</p> 
				<p>
					<van-icon name="setting"></van-icon>
					<input class="w50" type="text" v-model="captchas" placeholder="请输入验证码">
					<em>
						<img :src="imgUrl" alt="">
					</em>
					<span @click="getCaptchas">
						看不清？
						<br>
						换一张
					</span>
				</p>
				<button @click="btnLogin">
					登录
				</button>
				<button >
					忘记密码
				</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import allHeight from '@/components/global/header'
	import {captchas,login} from '@/api/api'
	import {mapActions} from 'vuex'
	export default {
		data(){
			return {
				username:'',
				password:'',
				captchas:'',
				imgUrl:''
			}
		},
		components:{
			allHeight
		},
		methods:{
			...mapActions(['saveUserinfo']),
			async getCaptchas(){
				let res = await captchas()
				if(res){ 
					this.imgUrl = res.code
				}
			},
			async btnLogin(){
				this.$toast.loading({
					mask:true,
					message:'登录中,请稍后'
				})
				if(!this.username && !this.password && !this.captchas){
					this.$toast('用户名不能为空!')
					return 
				}else if(!this.username){
					this.$toast('用户名不能为空！')
				}else if(!this.password){
					this.$toast('密码不能为空！')
				}else if(!this.captchas){
					this.$toast('验证码不能为空！')
				}else{
					let res = await login(this.username,this.password,this.captchas)
					if(res.status == 0){ 
						this.$toast.clear()
						this.$toast(res.message)
					}else{
						this.$toast('登录成功')
						this.$router.go(-1)
						this.saveUserinfo(res)
					}
					
				}
				
				
				// if(res){
				// 	
				// }
			}
		},
		//用beforeMount编译好的html内容替换el属性指向的dom对象。方法结束后，dom结构完成，页面展现出来
		mounted(){
			this.getCaptchas()
		}
	}
</script>

<style lang="scss">
	.imglogo {
		text-align: center;
		img {
			width:2.2rem;
			margin-top:1.6rem;
			margin-bottom:0.2rem;
		}
	}
	.admin-input {
		padding:0 .2rem;
		p{
			margin:.2rem 0;
			position: relative; 
			display: flex;
			input {
				border:1px solid #dcdcdc;
				background: #fff;
				box-sizing: border-box;
				padding:10px 10px;
				border-radius: 5px;
				width:100%;
				padding-left:1rem;
				font-size:14px;
			}
			i{
				position:absolute;
				top:.2rem;
				left:.2rem;
				font-size:24px;
				border-right:1px solid #dcdcdc;
				padding-right:5px;
				color:#f60; 
			}
		}
		button{
			background: #f60;
			width:100%;
			margin-bottom:.2rem;
			border:none;
			color:#fff;
			border-radius: 5px;
			padding:.1rem 0;
		}
		.w50 {
			width:60%;
			margin-right:5px;
		}
		em{
			display: flex;
			align-items: center;
		}
		span{
			font-size:12px;
			margin-left:auto;
			display: flex;
			align-items: center;
		}
	}
</style>
