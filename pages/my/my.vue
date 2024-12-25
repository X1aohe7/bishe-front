<template>
  <view>
    <view class="my" style="background-image: url('../../static/my/d1e8b86b9edb14f097eb55cb4b28cc6.png'); background-size: cover;">
      <image src="../../static/care/head.jpg"></image>
      <view class="my-text">
        <text>{{name}}</text>
        <!-- <text>点击编辑个人信息</text> -->
      </view>
    </view>
	
	
<!-- 	<view class="two">
		  <view class="two1" @click="messageClick">
			  <image src="../../static/3.png"></image>
			  <text>个人信息</text>
		  </view>
		  <view class="arrow">></view>
	  </view> -->
	  
	  <view class="two" @click="myOrderClick">
	  	  <view class="two1">
	  		  <image src="../../static/4.png"></image>
	  		  <text>我的订单</text>
	  	  </view>
	  	  <view class="arrow">></view>
	    </view>
		
		<view class="two" @click="myCollectClick">
			  <view class="two1">
				  <image src="../../static/5.png"></image>
				  <text>我的关注</text>
			  </view>
			  <view class="arrow">></view>
		  </view>
		  
		  <view class="two" @click="myAddressClick">
		  	  <view class="two1">
		  		  <image src="../../static/6.png"></image>
		  		  <text>我的地址</text>
		  	  </view>
		  	  <view class="arrow">></view>
		    </view>
			
			
		<view class="two" @click="myMeicdal">
			  <view class="two1">
				  <image src="../../static/med.png"></image>
				  <text>药物列表</text>
			  </view>
			  <view class="arrow">></view>
		  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
         name:uni.getStorageSync("username")
      };
    },
	methods:{
		messageClick(){
			uni.navigateTo({
				url:"/pages/myIntro/myIntro"
			})
		},
		
		myOrderClick(){
			uni.navigateTo({
				url:"/pages/myOrder/myOrder"
			})
		},
		
		myCollectClick(){
			uni.navigateTo({
				url:"/pages/myCollect/myCollect"
			})
		},
		
		myAddressClick(){
			uni.navigateTo({
				url:"/pages/myAddress/myAddress"
			})
		},
		
		myMeicdal(){
			uni.navigateTo({
				url:"/pages/myMeicdal/myMeicdal"
			})
		}
	}
  }
</script>

<style lang="scss">
  .my{
    display: flex;
	align-items: center;
	height: 200rpx;
	padding-left: 20rpx;
    image{
      width: 150rpx;
      height: 150rpx;
      // padding: 20rpx 30rpx;
      border-radius: 50%;
      
    }
    .my-text{
      display: flex;
      flex-direction: column;
      color: white;
      justify-content: space-around;
	  margin-left: 13rpx;
    }
  }
  .two{
	  width: 90%;
	  
	  height: 100rpx;
	  margin: 0 auto;
	  display: flex;
	  // flex-direction: column;
	  justify-content: space-between;
	  align-items: center;
	  border-bottom:1px #ccc solid;
  }
  
  .two image{
	  width: 60rpx;
	  height: 60rpx;
  }
  
  .two text{
	  margin-left: 20rpx;
  }
  
  .two .arrow{
	  font-size: 38rpx;
  }
  .two1{
	  display: flex;
	  align-items: center;
  }
</style>
