<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				修改密码
			</font>
		</all-header>
		<div class="content2">
			<div class="changediv">
				<p>
					<input type="text" v-model="username" readonly>
				</p>
				<p>
					<input type="password" v-model="pwd" placeholder="请输入旧密码">
				</p>
				<p>
					<input type="password" v-model="newPwd" placeholder="请输入新密码">
				</p>
				<p>
					<input type="password" v-model="pwdAgain" placeholder="请再次输入新密码">
				</p>
				<p class="yzm">
					<input  v-model="yzm" type="text" placeholder="请输入验证码">
					<span>
						<em>
							<img :src="yzmImg" alt="">
						</em>
						<font @click="getyzm">
							看不清?
							<br>
							换一张
						</font>
					</span>
				</p>
				<p>
					<button @click="confirm">
						确定修改
					</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {mapState,mapActions} from 'vuex'
	import {captchas,changepassword,signout} from '@/api/api'
	export default{
		data(){
			return {
				pwd:'',
				newPwd:'',
				pwdAgain:'',
				yzm:'',
				yzmImg:''
			}
		},
		computed:{
			...mapState(['userinfo']),
			username(){
				return this.userinfo.username
			}
		},
		components:{
			allHeader
		},
		methods:{
			...mapActions(['saveUserinfo']),
			async getyzm(){
				
				const res = await captchas()
				this.yzmImg = res.code
			},
			async confirm(){
				
				if(!this.pwd){
					this.$toast('旧密码不能为空!')
				}else if(!this.newPwd){
					this.$toast('新密码不能为空!')
				}else if(!this.pwdAgain){
					if(this.newPwd === this.pwdAgain){
						this.$toast('两次密码不一致')
						return
					}
				}else if(!this.yzm){
					this.$toast('验证码不能为空!')
				}else {
					this.$toast.loading({
						mask:true,
						message:'修改中,请稍后'
					})
					const res = await changepassword(this.username,this.pwd,this.newPwd,this.pwdAgain,this.yzm) 
					if(res.status == 0){
						this.$toast.clear()
						this.$toast(res.message)
					}else{
						this.$toast.clear()
						this.$toast('密码修改成功!')
						this.outadmin()
					}
					
					
				}
			},
			//退出登录
			async outadmin(){
				const res = await signout()
				if(res.status == 1){
					this.saveUserinfo({})
					this.$toast('请重新登录')
					this.$router.push('/admin')
				}
			}
		},
		//将beforeMount编译好的html内容替换el属性指向dom对象。方法结束后，DOM结构完成。页面显示出来
		mounted() {
			this.getyzm()
		}
	}
</script>

<style lang="scss">
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
</style>
