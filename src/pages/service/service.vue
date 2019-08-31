<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				服务中心
			</font>
		</all-header>
		<div class="content2">
			<ul class="questionUl">
				<li v-for="(item,index) in dataTitle" :key="index">
					<router-link :to="{name:'serviceInfo',params:{title:item,info:dataInfo[index]}}">
						<van-icon name="info-o" class="iconqian"></van-icon>
						 {{item}}
						<span>
							<van-icon name="arrow"></van-icon>
						</span>
					</router-link>
				</li> 
			</ul>
		</div>
		<transition name="van-slide-left" mode="out-in" >
			<router-view/>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {explain} from '@/api/api'
	export default{
		data(){
			return {
				dataList:[],
				dataTitle:[],
				dataInfo:[]
			}
		},
		components:{
			allHeader
		},
		methods:{
			async getData(){
				const res = await explain() 
				this.dataList = res
				Object.keys(this.dataList).forEach(item => {
					let cf = false
					this.dataTitle.forEach(i => { 
						if(i == this.dataList[item]){
							cf = true
						}
					}) 
					if(item.indexOf("Caption") !== -1 && !cf){
						this.dataTitle.push(this.dataList[item])
					}else if(!cf){
						this.dataInfo.push(this.dataList[item])
					}
				})
			}
		},
		//用beforeMount编译好的html内容替换el属性指向的DoM对象。方法结束后，DOM结构完成，页面显示
		mounted(){
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	.questionUl{
		padding:.2rem;
		background: #fff;
		overflow: hidden;
		li{
			border-bottom: 1px solid #fdeeee;
			padding:.2rem 0;
			a{
				display: flex;
				align-items: center;
				padding:0 .2rem;
				color:#333;
				font-size:14px;
				span{
					margin-left:auto;
					color:#999;
				}
				.iconqian {
					margin-right:3px;
					color:#999;
					font-weight: bold;
				}
			}
		}
	}
</style>
