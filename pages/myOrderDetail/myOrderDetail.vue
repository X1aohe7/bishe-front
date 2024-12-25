<template>
	<view>
	  <view class="two">
		  <view class="sectionBox">
			<view class="sectionType">地址：{{obj.address}}</view>
			<!-- <picker mode="region" @change="regionChange" :value="region">
				<view class="picker">
					当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
				</view>
			</picker> -->
		</view>
		<!-- <text class="btn" @click="sureClick">确认</text> -->
	  </view>	
		
     
	 <view class="two two1">
		 <text>服务人员:</text>
		 <text>{{obj.nurName}}</text>
	 </view>
	 
	 <view class="two two1">
		 <text>下单	时间:</text>
		 <text>{{obj.time}}</text>
	 </view>
	 
	 <view class="two" style="display: flex; justify-content: flex-end;">
		 <text>合计: ￥199</text>
	 </view>
	 
	 <view class="two">
		 <text>编号:{{obj.id}}</text>
		 <!-- <textarea v-model="remark"  placeholder="有什么想对服务人员说的"/> -->
	 </view>
	 
	 <view class="two">
	 		 <text>评价:</text>
	 		 <!-- <textarea v-model="obj.remark"  placeholder="输入评价内容"/> -->
       <text>{{obj.remark}}</text>
	 </view>
	 <!-- <view class="two" style="display: flex;">
	 		 <text>几颗星:</text>
	 		 <input type="text" v-model="star" style="margin-left: 12rpx;" />
	 </view> -->
	 
	 
	 <view class="two" style="display: flex; justify-content: flex-end;">
		 <!-- <text>￥199</text> -->
		 <!-- <text class="btn" @click="payClick">评价</text> -->
	 </view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				obj:{},
			}
		},
		onLoad(options) {
			console.log(JSON.parse(options.data));
			this.obj=JSON.parse(options.data)
		},
		
		created() {
			
			  
			

		},
		methods: {
			
		}
	}
</script>
 
<style scoped>
	.sectionBox {
		margin-bottom: 40rpx;
	}
 
	.sectionType {
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	
	
	
	.two{
		width: 90%;
		
		margin: 0 auto;
		padding: 20rpx;
		background: white;
		margin-top: 20rpx;
	}
	
	
	
	
	.two1{
		display: flex;
		justify-content: space-between;
	}
	
	.btn{
		display: inline-block;
		width: 180rpx;
		height: 69rpx;
		background: red;
		color: white;
		text-align: center;
		line-height: 69rpx;
		border-radius: 12rpx;
	}
</style>