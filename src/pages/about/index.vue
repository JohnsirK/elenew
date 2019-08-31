<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				用户中心
			</font>
			<font slot="admin">
				
			</font>
		</all-header>
		<div class="content p-b50">
			<div class="userImg">
				<div class="imgName">
					<div class="img">
						<img :src="imgUrl + userinfo.avatar" alt="">
					</div>
					<div class="name">
						{{userinfo.username}}
					</div>
					<div class="txt">
						<font>
							<van-icon name="phone-o"></van-icon>
							{{userinfo.mobile ? userinfo.mobile : '暂未设置手机号' }}
						</font>
						 | 
						 <font style="position: relative;">
							 <van-icon name="records"></van-icon>
							 修改头像
							 <input type="file" class="changeTxt" @change="changeImg($event)" accept="image/jpeg,image/png,image/jpg">
						 </font>
					</div>
				</div>
				<div class="listNav">
					<ul>
						<li>
							<router-link to="/balance">
								<b>0.00</b>元
								<font>我的余额</font>
							</router-link>
						</li>
						<li>
							<router-link to="/benefit">
								<b>3</b>个
								<font>我的优惠</font>
							</router-link>
						</li>
						<li>
							<router-link to="/point">
								<b>0</b>分
								<font>我的积分</font>
							</router-link>
						</li>
					</ul>
				</div>
				
				 
			</div>
			<div class="userList">
				<ul>
					<li>
						<router-link to='/service'>
							<em>
								<van-icon name="more-o"></van-icon>
							</em>
							服务中心
							<font>
								<van-icon name="arrow"></van-icon>
							</font>
						</router-link>
					</li>
					<li>
						<router-link to='/forget'>
							<em>
								<van-icon name="edit"></van-icon>
							</em>
							修改密码
							<font>
								<van-icon name="arrow"></van-icon>
							</font>
						</router-link>
					</li>
					<li>
						<router-link to='/service'>
							<em>
								<van-icon name="debit-pay"></van-icon>
							</em>
							饿了么会员卡
							<font>
								<van-icon name="arrow"></van-icon>
							</font>
						</router-link>
					</li>
					<li>
						<a>
							<em>
								<van-icon name="bulb-o"></van-icon>
							</em>
							下载饿了么App
							<font>
								<van-icon name="arrow"></van-icon>
							</font>
						</a>
					</li>
				</ul>
			</div>
			<p class="exitBtn" @click="exit">
				<van-icon name="delete"></van-icon>
				退出登录
			</p>
		</div>
		
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex' 
	import allHeader from '@/components/global/header'
	import {signout,changeUserImg,againUserinfo} from '@/api/api'
	export default{
		data(){
			return {
				imgUrl:'https://elm.cangdu.org/img/',
				nowUserinfo:{}
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods:{ 
			...mapActions(['saveUserinfo']),
			async exit(){
				const res = await signout()
				if(res.status == 1){
					this.saveUserinfo({})
					this.$toast('退出成功,请重新登录')
					this.$router.push('/admin')
				}
			},
			//上传头像
			async changeImg(e){
				if(this.userinfo){
					const file = e.target.files[0]
					//创建form对象
					const param = new FormData()
					//通过append像form对象添加数据
					param.append('file',file,file.name)
					//FormData私有类对象,可以get判断值是否穿进去
					console.log(param.get('file'))
					console.log((param.get('file').size / 1024).toFixed(2) + 'kb')
					if(param.get('file').size >= 100000){
						this.$toast('图片太大,请重新选择!')	
					}else{
						this.$toast.loading({
							mask:true,
							message:'上传中,请稍后'
						}) 
						const res = await changeUserImg(this.userinfo.id,param)
						if(res.status == 1){
							this.getInfo()
							this.$toast('上传成功!')	 
						}
					}
				}
			},
			//获取用户信息
			async getInfo(){ 
				const res = await againUserinfo() 
				this.nowUserinfo = res
				this.saveUserinfo(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
.header{
	z-index: 0 !important;
}
	.userImg{
		background: #fff;
		margin-bottom: .2rem;
		box-shadow: 0 2px 10px rgba(195,195,195,.2);
		.changeTxt {
			border:none;
			position: absolute;
			overflow: hidden;
			width:2rem;
			opacity: 0;
		}
		 .imgName{
			 margin-top:-1px;
			  display: flex;
			  color:#fff;
			 align-items: center;
			 flex-direction: column;
			  background:url('../..//assets/images/23.png') no-repeat;
			  background-size:100% 100%;
			  padding:.5rem 0;
			   color:#fff;
			   width:100%; ; 
		 }
		 .img {
			 width:1.2rem;
			 min-height:1.2rem;
			 border:4px solid #fdeeee;
			 border-radius: 50%;
			 overflow: hidden;
			 box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		 } 
		 .name{
			 font-size:16px;
			 font-weight: bold;
			 margin:.2rem 0 .1rem 0;
		 }
		 .txt {
			 font-size:12px;
			 display: flex;
			 align-items: center;
			 font{
				 margin:0 5px;
				 display: flex;
				 align-items: center;
			 }
			 i{
				 font-size:16px;
			 }
		 }
		 .listNav ul{
			 display: flex;
			 padding-bottom: .1rem;
			 li{
				 flex: 1;
				 text-align: center;
				 font-size:14px;
				 
				 a{
					 color:#999;
				 }
				 font{
					 display: block;
					 font-size:14px;
					 color:#666;
				 }
				 b{
					 font-size:24px;
					 margi-right:3px;
				 }
			 }
			 li:nth-child(1) b{
				 color:#f90
			 }
			 li:nth-child(2) b{
				 color:#ff5f3e
			 }
			 li:nth-child(3) b{
				color:#6ac20b 
			 }
		 }
	} 
	.content {
		padding-top:45px;
	}
	.userList{
		background: #fff;
		box-shadow: 0 2px 10px rgba(195,195,195,.2);
		ul{
			li{
				padding: .2rem;
				
				border-bottom: 1px solid #fdeeee;
				a{
					display:flex;
					align-items: center;
					font-size:14px;
					color:#333;
				}
				em{
					color:#666;
					display:flex;
					align-items: center;
					margin-right:5px;
					font-size:16px;
				}
				font{
					margin-left:auto;
					display:flex;
					align-items: center;
					font-size:14px;
					color:#999
				}
			}
		}
	}
	.exitBtn {
		margin:.2rem;
		background: #d0c9c8;
		color:#fff;
		padding:.16rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius:30px;
	}
</style>
