<template>
	<view class="two">
		<!-- <text class="title">个人信息</text> -->
		<view>
			 <text>姓名：小明</text>
		</view>
		
		<view>
			 <text>身高：185</text>
		</view>
		
		<view>
			 <text>体重：100</text>
		</view>
		
		<view>
			 <text>疾病备注：无</text>
		</view>
		
		<view>
			 <!-- <text>姓名：xxxxxx</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.two{
	width: 90%;
	margin: 0 auto;
}

.two .title{
	display: inline-block;
	width: 100%;
	height: 100rpx;
	font-size: 38rpx;
	font-weight: 600;
	text-align: center;
}


.two view{
	height: 100rpx;
}
</style>
