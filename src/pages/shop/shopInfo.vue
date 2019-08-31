<template>
	<div class="shopinfo">
		<div class="box" style="margin-top:0">
			<dl>
				<dt>
					商家名称: {{dataJson.name}}
				</dt>
				<dd>
					主营业务: {{dataJson.category}}
				</dd>
				<dd>
					营业时间: {{dataJson.opening_hours[0]}}
				</dd>
				<dd>
					店铺公告: {{dataJson.promotion_info}}
				</dd>
				<dd>
					店铺地址:{{dataJson.address}}
				</dd>
				<dd v-for="(i,ix) in dataJson.activities" :key="ix">
					<font :style="{'background':'#' + i.icon_color}">{{i.icon_name}}</font>
					{{i.description}}
				</dd>
			</dl>
		</div>
		<div class="box">
			<dl>
				<dt>
					活动与属性
				</dt>
				<dd v-for="(item,index) in dataJson.supports" :key="index">
					<font :style="{'background':'#' + item.icon_color}">{{item.icon_name}}</font>
					{{item.description}}
				</dd>
				
			</dl>
		</div>
		<div class="box">
			<dl>
				<dt>食品监督安全公示</dt>
				<dd>
					<span>
						<img src="" alt="">
					</span>
					<div class="txt">
						<p>
							监督检查结果：良好
						</p>
						<p>
							检查日期：2019-8-21 17:09:47
						</p>
					</div>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
	export default{
		name:'shopInfo',
		props:['dataJson'],
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopinfo {
		dl{
			padding-bottom: 0 !important;
			dt{
				border-bottom:1px solid #e3e1e1;
				padding-bottom:.1rem;
				color:#333;
				font-size:16px;
				margin-bottom: .2rem;
			}
			dd{ 
				color:#666;
				font-size:14px;
				display: flex;
				margin:5px 0;
				font{
					padding:0 .06rem;
					color:#fff;
					display: flex;
					margin-right:5px;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
