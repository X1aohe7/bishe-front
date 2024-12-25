<template>
	<view>
		<view class="two" v-for="(item,index) in orderArr" @click="detail(index)">
			<view class="two1">
				<text>订单编号: {{item.id}}</text>
			</view>
			
			<view class="two2">
				<image src="../../static/my/d1e8b86b9edb14f097eb55cb4b28cc6.png"></image>
				<view>
					<text>姓名:{{item.nurName}}</text>
					<text>日期:{{item.time}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="two">
			<view class="two1">
				<text>订单编号: XXXXXX</text>
			</view>
			
			<view class="two2">
				<image src="../../static/my/d1e8b86b9edb14f097eb55cb4b28cc6.png"></image>
				<view>
					<text>姓名:xxxxxx</text>
					<text>日期:xxxxxx</text>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="two">
			<view class="two1">
				<text>订单编号: XXXXXX</text>
			</view>
			
			<view class="two2">
				<image src="../../static/my/d1e8b86b9edb14f097eb55cb4b28cc6.png"></image>
				<view>
					<text>姓名:xxxxxx</text>
					<text>日期:xxxxxx</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderArr:[]
			}
		},
		methods: {
			async init(){
				const res= await uni.request({
				  method:'GET',
				  url:"/order/list",
				  data:{uid:uni.getStorageSync("userId")}
				})
				console.log(res);
				this.orderArr=res[1].data;
			},
			
			detail(index){
				uni.navigateTo({
					url:"/pages/myOrderDetail/myOrderDetail?data="+JSON.stringify(this.orderArr[index])
				})
			}
		},
		
		onLoad(){
			this.init()
		}
		
		
	}
</script>

<style>
.two{
	width: 90%;
	margin: 0 auto;
	background: white;
	padding: 20rpx;
	margin-top: 25rpx;
	border-radius: 21rpx;
}

.two1{
	width: 100%;
	height: 100rpx;
	border-bottom: 1px #ccc solid;
	display: flex;
	align-items: center;
}
.two2{
	width: 100%;
	display: flex;
	align-items: center;
	margin-top: 20rpx;
}

.two2 image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}
.two2 view{
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
}
</style>
