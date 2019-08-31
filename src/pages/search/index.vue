<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				搜索
			</font>
		</all-header>
		<div class="content p-b50">
			<van-search @input="checkInput" v-model="searchValue" placeholder="请输入商家或者美食名称" shape="round" show-action>
				<div slot="action" @click="onSearch">搜索</div>
			</van-search>
			<!-- 搜索结果 -->
			<div v-if="searchEndList.length > 0">
				<h2 class="title">
					商家
				</h2>
				<ul class="searchList">
					<li v-for="(item,index) in searchEndList" :key="index">
						<router-link :to="{path:'/shop',id:item.id}">
							<span>
								<img :src="imgUrl + item.image_path" alt="">
							</span>
							<div class="txt">
								<h4>
									{{item.name}}
								</h4>
								<h6>{{item.category}}</h6>
								<h5>
									<font>月售 {{item.recent_order_num}} 单</font>
									 <font>{{item.float_delivery_fee}}元起送</font>
									 /
									 <font>距离 {{item.distance}}</font>
								</h5>
								<p v-for="(i,index) in item.activities" :key="index">
									<i :style="{'background':i.icon_color}" style="color:#fff;">{{i.icon_name}}</i>
									<font>{{i.name}}</font>
									<em>{{i.description}}</em>
								</p> 
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="his" v-else>
				<dl>
					<dt>
						搜索历史
					</dt>
					<dd v-for="(item,index) in searchHisList" :key="index" @click="hisClick(item)">
						{{item}}
						<van-icon name="cross" class="remove" @click="removeThis(index)"></van-icon>
					</dd>
					
				</dl>
				<p class="allClear" @click="allClear">
					清除历史记录
				</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header.vue'
	import {searchShop} from '@/api/api'
	import {mapState} from 'vuex'
	import localSession from '@/utils/localSession'
	export default {
		data(){
			return {
				imgUrl:'https://elm.cangdu.org/',
				searchValue:'',
				searchEndList:[],
				searchHisList:[]
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['pickAddress'])
		},
		methods:{
		 async onSearch(){
			 this.$toast.loading({
			 	mask:true,
			 	message:'搜索中,请稍后'
			 })
				let res = await searchShop(this.pickAddress.geohash,this.searchValue)
				if(res){
					this.$toast.clear()
					this.$toast('搜索失败，请稍后再试！') 
					this.searchEndList = res
				}
				
				let hislist =  localSession.getSession('hislist') 
				if(hislist){
					let noRepeat = false
					this.searchHisList = hislist
					this.searchHisList.forEach(item => {
						if(item == this.searchValue){
							noRepeat = true
						}
					})
					if(!noRepeat){
						this.searchHisList.push(this.searchValue)
						localSession.setSession('hislist',this.searchHisList)
					}
				}else{
					this.searchHisList.push(this.searchValue) 
				}
				localSession.setSession('hislist',this.searchHisList)
				this.searchValue = ''
			},
			//点击历史记录继续搜索
			hisClick(item,index){
				console.log(item,index)
			},
			//移除该历史记录
			removeThis(index){
				this.searchHisList.splice(index,1)
				localSession.setSession('hislist',this.searchHisList)
			},
			//清除所有历史记录
			allClear(){
				this.searchHisList = []
				localSession.setSession('hislist',this.searchHisList)
			},
			checkInput(){ 
			}
		},
		mounted() {
			if(localSession.getSession('hislist')){
				this.searchHisList = localSession.getSession('hislist')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.van-search {
		box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
		background: #dedddd !important;
	}
	.his {
		dl{
			background: #fff;
			box-shadow: 0 2px 10px rgba(195,195,195,.2);
		}
		dt{
			background: #ececec;
			padding:.1rem .2rem;
		}
		dd{
			padding:.1rem .2rem;
			border-bottom:1px dashed #e3e3e3;
			font-size:14px;
			color:#666;
			display: flex;
			align-items: center;
			i{
				margin-left:auto;
				color:#999;
			}
		}
		dd:last-child{
			border-bottom:none;
		}
		p.allClear{
			text-align: center;
			padding:.1rem 0;
			color:#999;
			font-size:14px;
		}
	}
	.title {
		padding:.1rem .2rem;
		font-size:16px;
	}
	.searchList {
		background: #fff;
		padding:.2rem;
		li {
			border-bottom: 1px solid #f1efef;
			padding-bottom: .2rem;
		}
		li,a{
			display: flex;
			width:100%;
			.txt {
				width:calc(100% - 1.3rem);
				h4{
					color:#333;
					font-size:14px;
				}
				h6 {
					color:#6b6866
				}
				h5{
					color:#999;
					font-size:12px;
					border-bottom: 1px dashed #dedede;
					margin-bottom: .1rem;
					padding-bottom: .1rem;
				}
				p{
					font-size:14px;
					color:#656565; 
					em{
						color:#fb8536
					}
				}
			}
			span{
				width:1.2rem;
				margin-right:.1rem; 
			}
		}
	}
</style>
