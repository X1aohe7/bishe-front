<template>
	<view>
		<view class="two" v-for="(item,index) in addressArr" :key="index">
			<view class="two1">
				<view>
					<text> {{item.name}}</text>
				    
				</view>
				
				<view>
					<text>一次{{item.num}}颗/袋,一天{{item.everyday}}次,提醒时间:{{item.reminderTime}}</text>
					<text></text>
					<text></text>
				</view>
				
			<view>
				<text>用药时长:{{item.duration}}天</text>
			</view>	
			</view>
		</view>
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
				var id={
					id:item.id
				}
				const res= await uni.request({
				  method:'POST',
				  url:"/medicine/remove?id="+item.id,
				});
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
}

.two1{
	width: 100%;
	height: 190rpx;
	border-bottom: 1px #ccc solid;
	display: flex;
	/* align-items: center; */
	flex-direction: column;
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



.button{
			background-color:#11c53e;
			width: 90%;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
		}
</style>
