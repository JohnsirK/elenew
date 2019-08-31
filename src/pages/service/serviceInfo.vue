<template>
	<div class="fixInfo" @touchmove.prevent>
		<all-header>
			<font slot="tl">{{this.$route.params.title}}</font>
		</all-header> 
		<div class="content2"> 
		<div class="txt">
			{{this.$route.params.info}}
		</div>
			
		</div>
		
	</div>
</template>

<script>
import allHeader from '@/components/global/header'
	export default{
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
.fixInfo{
	height:100%;
	width:100%;
	position: fixed;
	top:0;
	left:0;
	background: #fff !important;
	z-index: 5;
	.txt{
		padding:.2rem;
		color:#999;
		font-size:14px;
		margin-bottom: .3rem;
		background: #fff;
	}
}
</style>
