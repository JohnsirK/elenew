<template>
	<div class="main" >
		<transition name="van-slide-left" mode="out-in">
			<router-view></router-view>
		</transition> 
		<!--头部-->
		<!--底部-->
		<all-footer></all-footer>
		
	</div>
</template>

<script>
	
	//引入底部组件
	import allFooter from '@/components/global/footer' 
	
	export default{
		data(){
			return {
				
			}
		},
		//注册组件
		components:{
			allFooter ,
			
		},
		methods:{
			
		},
		//
		computed:{
		
		},
		
	}
</script>

<style lang="scss">
	//导入scss样式表,es6模式
	//vue 中导入外部样式表需要用到 @import，注意后面;必须加。不然会报错
	@import '@/assets/css/global.scss';
	
	.main {
		height:100%;
	}
	.content {
		min-height:calc(100% - 96px);
		padding-top:46px;
		padding-bottom:50px;
	}
	.content2{
		min-height: calc(100% - 46px);
		padding-top:46px;
		background: #efefef;
	}
	.fcfff {
		color:#fff;
	}
</style>
