<template>
	<div class="shopDetail">
		<all-header>
			<font slot="tl">
				{{info.name}}
			</font>
			<font slot="admin">
				
			</font>
		</all-header>
		<div class="content p-b50" style="background: #f6f6f6;">
			<div class="box">
				<span class="center">
					<img :src="imgUrl + info.image_path" alt="" style="width:100%">
				</span> 
				<h5>
					{{info.description}}
				</h5>
			</div>
			<div class="box">
				<h4>
					名称：{{info.name}}
				</h4>
				<h6 style="display: flex;">
					评分:
					<van-rate v-model="info.rating" allow-half void-icon="star" void-color="#eee"> </van-rate>
					{{info.rating}}
				</h6>
				<h6>
					{{info.tips}} <font>售价 ￥{{info.satisfy_rate}}起</font>
				</h6>
			</div>
		</div>
		
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	export default{
		data(){
			return {
				info:this.$route.params.info,
				imgUrl:'https://elm.cangdu.org/img/'
			}
		},
		components:{
			allHeader
		},
		methods:{
			 
		},
		mounted() { 
			 
		},
		created(){
			
		},
		computed:{ 
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/global.scss';
	
	.shopDetail {
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		overflow-y: auto;
		background: #fff;
		z-index: 999;
		.box {
			h5{
				color:$font-666;
			}
			h4{
				font-size:$font-16;
				margin-bottom:.1rem;
			}
			h6{
				line-height:$lh24;
				color:$font-666
			}
		}
	}
</style>
