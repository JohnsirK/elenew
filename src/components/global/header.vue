<template>
	<van-nav-bar class="header" fixed> 
		<font class="hLeft" slot="left">
			<slot name="city">
				<van-icon @click="goBack" size="0.48rem" name="arrow-left"></van-icon>
			</slot>
		</font>
		<font slot="title">
			<slot name="tl">
				标题
			</slot>
		</font>
		<font slot="right">
			<router-link to="/admin" v-if="!userinfo.username">
				<slot name="admin">
					登录
				</slot>
			</router-link>
			<router-link to="/admin" v-else>
				<slot name="admin">
					<van-icon size="0.48rem" name="friends-o"></van-icon>
				</slot>
			</router-link>
		</font>
	</van-nav-bar>
</template>

<script>
	import {mapState} from 'vuex'
	import localSession from '@/utils/localSession'
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			//返回上一步
			goBack(){
				this.$router.go(-1)
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		mounted(){
			 
		}
	}
</script>

<style lang="scss">
	// 导入scss
	@import '@/assets/css/global.scss';
	.header {
		background: -webkit-gradient(linear, left top, right bottom, from(#fd4a15), to(#e28355));
		color:#fff;
		 box-shadow: 0 2px 10px rgba(195,195,195,.2);
		i{
			color:#fff !important;
		}
		.van-nav-bar__title {
			color:#fff
		}
		a{
			color:#fff;
		}
	}
</style>
