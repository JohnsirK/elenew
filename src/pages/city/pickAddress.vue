<template>
	<div class="main">
		<all-header>
			<font slot='tl'>
				{{pickCity.name}}
			</font>
		</all-header>
		<div class="content p-b50">
			<van-search v-model="searchValue" placeholder="输入学校、商务楼、地址..." shape="round" show-action>
			<div slot="action" @click="onSearch">搜索</div>
			</van-search>
			<ul class="searchList" v-if="searchListData.length > 0">
				<li v-for="(item,index) in searchListData" :key="index" @click="addHis(item)">
					<router-link :to="{path:'/miste',query:{'geohash':item.geohash}}">
						<h5>
							{{item.name}}
						</h5>
						<h6>
							{{item.address}}
						</h6>
					</router-link>
				</li>
			</ul>
			<dl class="hisList" v-else>
				<dt>
					搜索历史
				</dt>
				<dd v-for="(item,index) in getHisList" :key="index" @click="addHis(item)">
					<router-link :to="{path:'/miste',query:{'geohash':item.geohash}}">
						<h5>
							{{item.name}}
						</h5>
						<h6>
							{{item.address}}
						</h6>
					</router-link>
				</dd>
				<p @click="removeAll">
					清空全部
				</p>
			</dl>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {mapState,mapMutations} from 'vuex'
	import {searchAddress} from '@/api/api'
	import localSession from '@/utils/localSession'
	export default{
		data(){
			return{
				//搜索框
				searchValue:'',
				//搜索结果
				searchListData:[],
				//历史记录
				hisListData:[]
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['pickCity','pickAddress']),
			getHisList(){
				if(localSession.getSession('hisList')){
					this.hisListData = localSession.getSession('hisList')
				}else{
					this.hisListData = []
				}
				return this.hisListData
			}
		},
		methods:{
			...mapMutations(['nowPickAddress']),
			onSearch:function(){
				this.getSearch()
			},
			//获取接口
			async getSearch(){
				let res = await searchAddress(this.$route.params.id,this.searchValue)
				if(res){ 
					this.searchListData = res
				}
			},
			//添加到历史记录中
			addHis(item){
				let arr = []
				if(localSession.getSession('hisList')){
					arr = localSession.getSession('hisList')
					for(let i = 0;i<arr.length;i++){
						if(arr[i].geohash === item.geohash){
							var isok = true
						}
					}
					if(!isok){
						arr.unshift(item)
					}
				}else{
					arr.unshift(item)
				}
				localSession.setSession('hisList',arr)
				this.nowPickAddress(item)
			},
			removeAll(){
				localSession.removeSession('hisList')
				this.hisListData.splice(0,this.hisListData.length)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.van-search {
		box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
		background: #dedddd !important
	}
	.hisList {
		dt{
			margin:.1rem 0;
			padding:0 .1rem;
		}
		dd{
			background: #fff;
			padding:.2rem;
			box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
			h5{
				color:#333;
				font-size:.28rem;
			}
			h6{
				color:#999;
				font-size:.24rem;
			}
		}
		p{
			text-align: center;
			margin:.1rem 0;
		}
	}
	.searchList {
		li{
			background: #fff;
			padding:.2rem;
			box-shadow: 0 2px 5px rgba(196, 196, 196, 0.1);
			h5{
				color:#333;
				font-size:.28rem;
			}
			h6{
				color:#999;
				font-size:.24rem;
			}
		}
	}
</style>
