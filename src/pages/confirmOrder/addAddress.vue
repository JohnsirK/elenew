<template>
	<div class="addAddress">
		<ul>
			<li>
				<van-field v-model="addressInfo.name" label="姓名:" placeholder="请输入收货人姓名" required></van-field>
			</li> 
			<li>
				<van-cell>
					<van-radio-group v-model="addressInfo.sex">
						<van-radio name="1">先生</van-radio>
						<van-radio name="2">女士</van-radio>
					</van-radio-group>
				</van-cell>
			</li>
			<li>
				<van-field v-model="addressInfo.phone" label="电话:" placeholder="请输入收货人电话" required type="tel"></van-field>
			</li>
			<li>
				<van-field v-model="addressInfo.phone_bk" label="固定电话:" placeholder="请输入固定电话" required type="tel"></van-field>
			</li>
			<li>
				<van-field v-model="addressInfo.address" label="地址:"  required readonly @click="areaShow = true" placeholder="选择省 / 市 / 区"></van-field>
			</li>
			<li>
				<van-field v-model="addressInfo.address_detail" label="详细地址:" placeholder="街道门牌、楼层房间号等信息" required></van-field>
			</li>
			<li>
				<van-field v-model="addressInfo.tag" label="标签:" placeholder="请输入标签,如:家 / 公司 / 学校" required></van-field>
			</li>
			<li>
				<van-cell>
					<van-radio-group v-model="addressInfo.tag_type">
						<van-radio name="2">家</van-radio>
						<van-radio name="3">学校</van-radio>
						<van-radio name="4">公司</van-radio>
					</van-radio-group>
				</van-cell>
			</li>
			<button @click="add">
				确定
			</button>
		</ul>
		
		<van-popup v-model="areaShow" position="bottom">
			<van-area :area-list="areaList" @confirm="onConfirm" />
		</van-popup>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import listJson from '@/utils/area'
	import {addAddress} from '@/api/api'
	export default{
		data(){
			return {
				addressInfo:{
					//收货人姓名
					name:'',
					//电话号码
					phone:null,
					//备注电话
					phone_bk:'',
					//性别		1:男 2:女
					sex:'1',
					//地址
					address:'',
					//地址详情
					address_detail:'',
					//标签
					tag:'',
					//标签类别		2:家	3:学校	4.公司
					tag_type:'2',
				},
				//地址选择
				areaShow:false,
				//省市区数据
				areaList:listJson,
			}
		},
		computed:{
			...mapState(['userinfo','pickAddress'])
		},
		methods:{
			onConfirm(val){ 
				this.addressInfo.address = val[0].name + ',' + val[1].name + ',' + val[2].name 
				this.areaShow = false
			},
			// 添加地址
			async add(){
				if(!this.userinfo){
					this.$toast('用户未登录，请返回登陆')
					this.$router.push('/admin')
					return 
				}else if(!this.addressInfo.name){
					this.$toast('姓名不能为空!')
					return 
				}else if(!this.addressInfo.phone){
					this.$toast('电话号码不能为空!')
					return 
				}else if(!this.addressInfo.phone_bk){
					this.$toast('固定电话不能为空!')
					return 
				}else if(!this.addressInfo.address){
					this.$toast('地址不能为空!')
					return 
				}else if(!this.addressInfo.address_detail){
					this.$toast('详细地址不能为空!')
					return 
				}else if(!this.addressInfo.tag){
					this.$toast('详细地址不能为空!')
					return 
				}else{
					this.$toast.loading({
						mask:true,
						message:'添加中,请稍后'
					})
					let res = await addAddress(
						//用户id
						this.userinfo.id,
						//地址
						this.addressInfo.address,
						//详细地址
						this.addressInfo.address_detail,
						//经纬度
						this.pickAddress.geohash,
						//名字
						this.addressInfo.name,
						//电话号码
						this.addressInfo.phone,
						//标签
						this.addressInfo.tag,
						//性别
						parseInt(this.addressInfo.sex),
						//备用电话，固话
						this.addressInfo.phone_bk,
						//标签类型
						parseInt(this.addressInfo.tag_type)
					)
					if(res){
						this.$toast.clear()
						if(res.status == 1){
							this.$toast(res.success)
							this.$router.go(-1)
						}else{
							this.$toast(res.message)
						}
					}else{
						this.$toast('发生错误，请稍后再试!')
					}
					console.log(res)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	ul,li{
		list-style: none
	}
	.addAddress{
		position: fixed;
		width:100%;
		height:calc(100% - 46px);
		background: #f5f5f5;
		z-index: 6;
		ul{
			background: #fff;
			padding:.2rem
		}
		button{
			background: #f90;
			color:#fff;
			padding:.1rem;
			border:none;
			width:100%;
			margin-top:.2rem
		}
	}
	.van-radio-group{
		display: flex;
		padding-left:90px;
		.van-radio {
			margin-right:.2rem;
		}
	}
</style>
