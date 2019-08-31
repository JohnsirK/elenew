<template>
	<div class="cityList" ref='cityList' @touchmove.prevent>
		<div class="hotCity">
			<h4>
				热门城市
			</h4>
			<ul>
				<li v-for="(i,index) in hotCityListData" :key="index" @click="pickCity({name:i.name,id:i.id})">
					{{i.name}}
				</li>
			</ul>
		</div>
		<van-index-bar >
			<div v-for="(item,index) in changeData" :key="index">
				<van-index-anchor :index="index"></van-index-anchor>
				<van-cell v-for="(li,index) in item" :title="li.name" :key="index" @click="pickCity({name:li.name,id:li.id})"></van-cell>
			</div>
		</van-index-bar>
		<span class="close" @click="closeBtn">
			<van-icon name="close"></van-icon>
		</span>
	</div>
</template>

<script>
	import {cityData} from '@/api/api' 
	export default{
		data(){
			return {
				//全部城市数据
				cityListData:[],
				//热门城市数据
				hotCityListData:[]
			}
		},
		methods:{ 
			//全部城市
			async getCityData(){
				let res = await cityData('group')
				if(res){ 
					this.cityListData = res
				}
			},
			//热门城市
			async getHotCityData(){
				let res = await cityData('hot')
				if(res){
					this.hotCityListData = res 
				}
			},
			//跳转到选择地址
			pickCity(item){
				this.$router.push({path:'/pickad/' + item.id,})
				this.$store.commit('nowPickCity',item)
			},
			//关闭遮罩
			closeBtn(){
				this.$emit('closeShow',false)
			}
		},
		computed:{
			changeData(){
				//定义一个新对象
				let newList = {}
				//for循环从65到90结束，因为ascii指A字符就是65.z是90
				for(let i = 65;i<= 90;i++){
					var num = String.fromCharCode(i)
					//获取到的cityList城市数组按照citylist[a]到citylist[z]的顺序重排
					newList[num] = this.cityListData[num]
				}
				return newList
			}
		},
		created(){
			this.getCityData()
			this.getHotCityData()
		},
		watch:{ 
		}
	}
</script>

<style lang="scss">
	.cityList {
		position: absolute;
		top:0px;
		left:0;
		width:100%;
		height:100%;
		overflow-y: auto;
		background: #f5f3f3;
		z-index: 10;
		dt{
			background: #f3f0f0;
			padding:.1rem;
			font-size:.28rem;
			padding:0 .2rem;
			font-weight: bold
		}
		dd{
			margin:.1rem;
			font-size:.24rem;
			padding:.1rem .3rem;
		}
		.van-index-anchor {
			background: #f5f3f3;
			line-height:.4rem;
			font-weight: bold
		}
		.van-index-bar__sidebar{
			background: #f5f3f3;
			.van-index-bar__index{
				font-weight: normal;
				padding:.06rem .1rem;
			}
		}
		.hotCity { 
			margin-bottom: .1rem;
			background: #fff;
			box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
			h4 {
				background: #f5f3f3;
				padding:.06rem .3rem;
				font-weight: bold;
			}
			ul {
				overflow: hidden;
				padding:.1rem 0;
				li{
					width:25%;
					float:left;
					text-align: center;
					padding:.08rem 0;
					font-size:.28rem;
					color:#3190e8
				}
			}
			
		}
		.close {
			position: fixed;
			top:.02rem;
			right:.1rem;
			font-size:.4rem;
			z-index: 9999;
			color:#ef751c;
		}
	}
</style>
