<template>
	<view>
		<view class="two" v-for="(item,index) in addressArr" :key="index">
			<view class="two1">
				<text>地址: {{item.name}}</text>
				<text>联系方式:{{item.phone}}</text>
			</view>
			

		</view>
		
		<!-- <view class="two">
			<view class="two1">
				<text>地址: XXXXXX</text>
			</view>
		</view> -->
		
		<!-- <view class="two">
			<view class="two1">
				<text>地址: XXXXXX</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressArr:[]
			}
		},
		methods: {
			async init(){
				const res= await uni.request({
				  method:'GET',
				  url:"/address/get",
				  data:{uid:uni.getStorageSync("userId")}
				})
				console.log(res);
				this.addressArr=res[1].data;
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
	height: 135rpx;
	border-bottom: 1px #ccc solid;
	display: flex;
	/* align-items: center; */
	flex-direction: column;
}

.two1 text{
	display: block;
	margin-top: 12rpx;
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
