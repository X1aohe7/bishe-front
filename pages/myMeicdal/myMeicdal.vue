<template>
	<view>
		<view style="text-align: right; padding-right: 20rpx;">
		  <button class="mini-btn" type="default" size="mini" @click="addClick">新增</button>
		</view>
		<view class="two" v-for="(item,index) in addressArr" :key="index">
			<view class="two1">
				<view>
					<text>药品名称: {{item.name}}</text>
				    <text>单次数量:{{item.num}}</text>
				</view>
				
				<view>
					<text>用药次数:{{item.everyday}}</text>
					<text>用药时长:{{item.duration}}</text>
				</view>
				
			<view>
				
				<text>提醒时间:</text>
        <text v-for="(time, idx) in item.reminderTime" :key="idx">
          {{ time }}
        </text>
			</view>	
			</view>
      <view class="two2">
        <button class="mini-btn" style="margin-top: 20rpx;" type="warn" size="mini" @click="deleteClick(item)">删除</button>
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
				  url:"/medicine/list",
				  data:{uid:uni.getStorageSync("userId")}
				})
				console.log(res);
				this.addressArr=res[1].data;
			},
			
			async deleteClick(item){
				console.log(item);

				const res= await uni.request({
				  method:'POST',
				  url:"/medicine/remove?id="+item.medicineId,
				});
        uni.showToast({
          icon:'success',
          title:'删除成功！'
        })
				this.init()
			},
			addClick(){
				uni.navigateTo({
					url:"/pages/create/create"
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
  display:flex;

}

.two1{
	width: 100%;
	height: 190rpx;
	
	display: flex;
	/* align-items: center; */
	flex-direction: column;
  flex: 3;
}
.two1 view{
	display: flex;
}

.two1 text{
	display: block;
	margin-top: 12rpx;
	margin-left: 12px;
}
.two2{
	/* width: 100%; */
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



.button{
			background-color:#11c53e;
			width: 90%;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
		}
</style>
