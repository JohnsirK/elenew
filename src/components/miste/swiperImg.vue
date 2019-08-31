<template>
	<div class="swiper-container" id="swiperImg">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<img src="@/assets/images/12.jpg" alt="">
			</div>
			<div class="swiper-slide">
				<img src="@/assets/images/34.jpg" alt="">
			</div>
			<div class="swiper-slide">
				<img src="@/assets/images/56.jpg" alt="">
			</div>
			<div class="swiper-slide">
				<img src="@/assets/images/78.jpg" alt="">
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div> 
	</div> 
</template>

<script>
	import Swiper from 'swiper'
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			swiperIcon(){
				new Swiper('#swiperImg',{
					loop:true,
					//如果需要分页器
					pagination: {
						el: '.swiper-pagination',
				    },
					observer:true,//修改swiper自己或子元素时，自动初始化swiper 
					observeParents:true//修改swiper的父元素时，自动初始化swiper 
				})
			}
		},
		mounted(){
			this.swiperIcon()
		}
	}
</script>

<style lang="scss" scoped>
	#swiperImg{
		margin:.2rem 0 0 0;
	}
	.swiper-slide img{
		height:200px;
		width:100%;
	}
</style>
