<template>
	<view>
	  <view class="two">
		  <view class="sectionBox">
			<view class="sectionType">选择地址：</view>
			<picker mode="region" @change="regionChange" :value="region">
				<view class="picker">
					当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
				</view>
			</picker>
		</view>
		<text class="btn" @click="sureClick">确认</text>
	  </view>	
		
     
	 <view class="two two1">
		 <text>服务人员:</text>
		 <text>胡阿姨</text>
	 </view>
	 
	 <view class="two two1">
		 <text>服务开始时间:</text>
		 <text>{{formattedDateTime}}</text>
	 </view>
	 
	 <view class="two" style="display: flex; justify-content: flex-end;">
		 <text>小计: ￥199</text>
	 </view>
	 
	 <view class="two">
		 <text>备注:</text>
		 <textarea  placeholder="有什么想对服务人员说的"/>
	 </view>
	 
	 
	 <view class="two two1">
		 <text>￥199</text>
		 <text class="btn">确认支付</text>
	 </view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				index: 0, //默认索引
				objectIndex: 0, //默认索引
				multiIndex: [0, 0],
				// 省市区选择器
				region: ['请选择', '请选择', '请选择'],
				formattedDateTime:""
			}
		},
		
		created() {
			// 创建一个 Date 对象，它将包含当前日期和时间  
			      const currentDateTime = new Date();  
			        
			      // 获取年、月、日、时、分、秒  
			      const year = currentDateTime.getFullYear();  
			      const month = currentDateTime.getMonth() + 1; // 月份是从 0 开始的，所以需要加 1  
			      const day = currentDateTime.getDate();  
			      const hours = currentDateTime.getHours();  
			      const minutes = currentDateTime.getMinutes();  
			      const seconds = currentDateTime.getSeconds();  
			        
			      // 使用 padStart 在数字不满10的情况下在其后面添加0  
			      const formattedDay = day.toString().padStart(2, '0');  
			      const formattedMinutes = minutes.toString().padStart(2, '0');  
			      const formattedSeconds = seconds.toString().padStart(2, '0');  
			        
			      // 将年、月、日、时、分、秒拼接成字符串格式，例如 "2023-07-19 14:30:00"  
			      this.formattedDateTime = `${year}-${formattedDay}-${month} ${hours}:${formattedMinutes}:${formattedSeconds}`;  
			        
			      // 打印或显示当前日期和时间  
			      // console.log(formattedDateTime);  
			      // 在页面上显示当前日期和时间（可根据需要修改显示方式）  
			      // this.$u.alert(formattedDateTime);  
			  
			

		},
		methods: {
			// 省市区选择器
			regionChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region = e.detail.value;
			},
			
			async  sureClick(){
				var obj={
					name:this.region.join(","),
					linkman:"",
					phone:"123456",
					uid:uni.getStorageSync("userId")
				}
				const res= await uni.request({
				  method:'POST',
				  url:"/address/add",
				  data:obj
				});
				console.log(res)
				uni.showToast({
					title: res[1].data,//标题 必填
					icon: 'none',//图标
				});
			}
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