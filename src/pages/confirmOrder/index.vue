<template>
	<div class="main">
		<all-header>
			<font slot="tl">
				{{changeTitle}}
			</font>
		</all-header>
		<div class="content p-b50">
			<!-- 新增地址视图 -->
			<transition name="van-slide-left" mode="out-in">
				<router-view></router-view>
			</transition>
			<div class="address" @click="addressShow = true">
				<div class="noAddress" v-if="JSON.stringify(addressSelcet) == '{}'">
					<van-icon name="location-o"></van-icon>
					<font>请选择一个收货地址</font>
					<van-icon name="arrow" class="fl"></van-icon>
				</div>
				<div class="haveAddress" v-else>
					<van-icon name="location-o" class="iconinfo"></van-icon>
					<div class="textinfo" v-if="addressSelcet">
						<h3>
							<font>{{addressSelcet.name}} - {{addressSelcet.sex = 1 ? '先生' : '女士'}}</font>
							<em>{{addressSelcet.phone}}</em>
							<b>{{addressSelcet.tag_type | tagTxt}}</b>
						</h3>
						<p>
							{{addressSelcet.address}}
							{{addressSelcet.address_detail}}
						</p> 
					</div>
				</div>
			</div>
			<div class="orderList wbg mt20">
				<dl>
					<dt>
						<span>
							<img :src="imgUrl + nowShop.image_path" alt="">
						</span>
						{{nowShop.name}}
					</dt>
					<dd v-for="(item,index) in myFoodCar" :key="index">
						<font>{{item.name}}</font>
						<em>
							x {{item.quantity}}
							<font>
								￥{{item.price || 0}}
							</font>
						</em>
						
					</dd> 
				</dl>
				<h4>
					配送费:￥{{nowShop.float_delivery_fee}}
				</h4>
				<h4>
					订单:￥{{allMoney}}
				</h4>
				<h3>
					待支付：￥{{allMoney + parseInt(nowShop.float_delivery_fee)}}
				</h3>
			</div>
			<div class="sdTime wbg mt20">
				<h5>
					送达时间
				</h5>
				<p>
					尽快送达 | 预计20分钟后送达
					<span>蜂鸟专送</span>
				</p>
			</div>
			<div class="pickPay wbg mt20" @click="pickPayFs">
				支付方式
				<span>
					{{payEnd}}
					<van-icon name="arrow" class="fl"></van-icon>
				</span>
			</div>
			<div class="pickPay wbg mt20" @click="pickBz">
				订单备注
				<span>
					{{markMessage ? markMessage : markToString}}
					<van-icon name="arrow" class="fl"></van-icon>
				</span>
			</div>
		</div>
		<!-- 支付方式 -->
		<transition name="van-slide-up">
		   <ul class="payUl" v-if="isShow">
		   	<li v-for="(item,index) in payPick" :key="index" @click="selectPay(item)">
		   		{{item.name}}
		   	</li>
		   </ul>
		</transition>
		<van-overlay :show="isShow" @click="isShow = false"></van-overlay>
		<!-- 确认下单 -->
		<div class="againOrder">
			<span>
				待支付 ￥{{allMoney + parseInt(nowShop.float_delivery_fee)}}
			</span>
			<button @click="confirmOrder">
				确认下单
			</button>
		</div>
		<!-- 备注-->
		<transition name="van-slide-up">
			<div class="beizhu" v-if="bzShow">
				<h4>
					快速备注
				</h4>
				<van-checkbox-group v-model="bzEnd">
					<van-checkbox v-for="(item,index) in afterMarks" :key="index" :name="item">
						{{item}}
					</van-checkbox>
				</van-checkbox-group>
				<h4>
					其他备注
				</h4>
				<van-cell-group>
					<van-field v-model="markMessage" label="其他备注" type="textarea" placeholder="如您有其他备注,请留言" rows="1" autosize></van-field >
				</van-cell-group>
				<van-button type="info" class="w100" @click="bzShow = false">确认</van-button>
			</div> 
		</transition>
		<van-overlay :show="bzShow" @click="bzShow = false"></van-overlay>
		<!-- 地址选择 -->
		<transition name="van-slide-up">
			<div class="addressList" v-if="addressShow">
				<h4>
					选择地址
				</h4>
				<keep-alive>
					<address-list @selectAddress = "getDataAddress"></address-list>
				</keep-alive>
				<router-link to="/confirmOrder/addAddress" class="add">
					新增地址
				</router-link>
			</div>
		</transition>
		<van-overlay :show="addressShow" @click="addressShow = false"></van-overlay>
		
	</div>
</template>

<script>
	import allHeader from '@/components/global/header'
	import {mapState} from 'vuex'
	import {remarks,orders} from '@/api/api' 
	//地址列表
	import addressList from '@/components/confirmOrder/addressList'
	export default {
		data(){
			return {
				imgUrl:'https://elm.cangdu.org/img/',
				//支付方式
				payPick:[
					{name:'微信支付'},
					{name:'支付宝'},
					{name:'现金支付'}
				],
				//支付方式是否关闭
				isShow:false,
				payEnd:'微信支付',
				//备注
				bzShow:false,
				bzEnd:[],
				afterMarks:[],
				markMessage:'',
				//地址选择
				addressShow:false,
				//选择的地址
				addressSelcet:{},
				//标题
				changeTitle:'确认订单',
				//自定义订单数据
				entities:[]
			}
		},
		computed:{
			...mapState(['nowShop','myFoodCar','userinfo','cartSuccess']),
			allMoney(){
				let m = 0;
				for(let i = 0;i<this.myFoodCar.length;i++){
					m += (this.myFoodCar[i].price * this.myFoodCar[i].quantity)
				}
				return m
			},
			markToString(){
				let result = this.bzEnd.join(',')
				return result
			}
		},
		components:{
			allHeader,
			addressList
		},
		methods:{
			//支付方式
			pickPayFs(){
				this.isShow = true
			},
			selectPay(item){ 
				this.payEnd = item.name
				this.isShow = false
			},
			//备注
			//获取备注
			async getremarks(){
				let res = await remarks(1)
				if(res){
					this.afterMarks = this.flatten(res.remarks)
				}
			},
			pickBz(){
				this.bzShow = true
			},
			//数据扁平化
			//递归
			flatten(arr){
				let result = []
				for(let i = 0,len=arr.length;i<len;i++){
					if(Array.isArray(arr[i])){
						result = result.concat(this.flatten(arr[i]))
					}else{
						result.push(arr[i])
					}
				}
				return result
			},
			//获取子组件传过来的选择的地址
			getDataAddress(data){
				this.addressSelcet = data
				this.addressShow = false 
			},
			//确认下单
			async confirmOrder(){
				if(JSON.stringify(this.addressSelcet) == '{}'){
					this.$toast('请选择收货地址')
					return 
				}
				this.$toast.loading({
					mask:true,
					message:'下单中,请稍后'
				})
				let res = await orders(this.userinfo.id,this.cartSuccess.cart.id,this.addressSelcet.id,this.nowShop.id,this.addressSelcet.st_geohash,[this.myFoodCar])
				if(res.status == 1){
					this.$toast.clear()
					this.$toast(res.success)
					this.$router.push('/order')
				}else{
					this.$toast.clear()
					this.$toast(res.message)
				}
			}
		},
		created() {  
			this.getremarks()
		},
		watch:{
			$route(to,from){
				if(to.path == '/confirmOrder/addAddress'){
					this.changeTitle = '新增地址'
					this.addressShow = false
				}else{
					this.changeTitle = '确认订单'
				}
			}
		},
		//筛选
		filters:{
			tagTxt:function(value){
				switch(value){
					case 2:
						return '家'
						break
					case 3:
						return '学校'
						break 
					case 4:
						return '公司'
						break
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/css/global.scss';
	.address{
		padding:.3rem;
		box-shadow: 0 2px 10px rgba(195,195,195,.6);
		background: #fff url(../../assets/images/2342.png) repeat-x bottom center;
		background-size: 1rem .04rem;
		.noAddress{
			display: flex;
			align-items: center;
			color:#999;
			font{
				font-size:14px;
				margin:0 .2rem;
			}
			.fl{
				margin-left:auto;
			}
		}
		
	}
	.mt20{
		margin-top:$mt2
	}
	.sdTime {
		padding:.2rem;
		border-left:5px solid #f60;
		h5{
			font-size:14px;
		}
		p{
			color:#f60;
			font-size:14px;
			display: flex;
			align-items: center;
			span{
				margin-left:auto;
				padding:.08rem .1rem;
				background: #f60;
				color:#fff;
				font-size:12px;
				border-radius: 3px;
			}
		}
	}
	.pickPay {
		padding:.2rem;
		display: flex;
		align-items: center;
		span{
			display: flex;
			align-items: center;
			margin-left:auto;
			font-size:16px;
			color:#999;
			width:75%;
			justify-content: flex-end;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size:14px;
		}
	}
	.payUl{
		position: fixed;
		bottom:0;
		width:100%;
		left:0;
		background: #fff;
		padding:0 .2rem;
		box-sizing: border-box;
		z-index: 9;
		li{
			line-height:40px;
			border-bottom: 1px solid #f5f0f0;
			color:#666;
			font-size:14px;
		}
	}
	.orderList{
		background: #fff url(../../assets/images/2342.png) repeat-x top center;
		background-size: 1rem .04rem;
		padding:.2rem;
		dl{
			margin:.1rem 0;
			dt{
				display: flex;
				align-items: center;
				font-size:16px;
				color:#333;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				span{
					width:.8rem;
					height:.8rem;
					border-radius: .8rem;
					overflow: hidden;
					margin-right:.2rem;
				}
			}
			dd{
				display: flex;
				align-items: center;
				border-bottom: 1px dashed #e3e1e1;
				padding:.16rem 0;
				color:#666;
				font-size:14px;
				em{
					margin-left:auto;
					color:#999;
					display: flex;
					align-items: center;
					font{
						font-weight: bold;
						font-size:14px;
						color:#333;
					}
				}
			}
		}
		h4{
			text-align: right;
			color:#999;
			font-weight: normal;
			font-size:14px;
			margin-bottom: .1rem;
		}
		h3{
			text-align: right;
			color:red;
			font-size:20px;
		}
	}
	.againOrder {
		position: fixed;
		z-index: 5;
		bottom:0;
		left:0;
		width:100%;
		height:50px;
		line-height:50px;
		background: #959595;
		display: flex;
		color:#fff;
		align-items: center;
		span{
			margin:0 .2rem;
		}
		button{
			border:none;
			background: #f90;
			margin-left:auto;
			padding:0 .2rem;
		}
	}
	.beizhu {
		position:fixed;
		bottom:50px;
		left:0;
		width:100%;
		background: #fff;
		z-index: 4;
		padding:.2rem;
		box-sizing: border-box;
		h4{
			font-weight: bold;
			font-size:14px;
		}
		.van-checkbox{
			padding:8px 15px;
		}
		.w100 {
			width:100%;
		}
	}
	.haveAddress {
		display: flex;
		.iconinfo {
			font-size:30px;
			color:#f60;
			display: flex;
			align-items: center;
		}
		.textinfo{
			margin-left:.2rem;
			width:calc(100% - 0.86rem);
			h3{
				display: flex;
				align-items: center;
				font{
					font-size:14px;
					color:#323233;
					margin-right:.2rem;
				}
				em{
					font-size:12px;
					color:#656565
				}
				b{
					background: #e4e1de;
					color:#d41313;
					font-size:12px;
					padding:.02rem .08rem;
					margin-left:auto;
				} 
			}
			p{
				font-size:12px;
				color:#7d7e80
			}
		}
	}
	.addressList {
		background: #fff;
		padding:.2rem;
		position: fixed;
		top:20%;
		left:0;
		width:100%;
		height:calc(80% - 50px);
		box-sizing: border-box;
		z-index: 3;
		h4{
			color:#666;
		}
		a.add{
			position: absolute;
			bottom:.2rem;
			left:.2rem;
			width:calc(100% - .4rem);
			background: #f60;
			border:none;
			padding:.1rem;
			box-sizing: border-box;
			color:#fff;
			text-align: center;
		}
	}
</style>
