<template>
	<view>
		<view class="two" v-for="(item,index) in addressArr" :key="index">
			<view class="two1" @click="chooseAddress(item)">
        <text>姓名: {{item.name}}</text>
				<text>地址: {{item.position}}{{item.detail != null ? item.detail : ''}}</text>
				<text>联系方式:{{item.phone}}</text>
			</view>
			<view class="icons">
        <uni-icons type="compose" size="30" @click="editAddress(item.addressId)"></uni-icons>
        <uni-icons type="trash" size="30" @click="deleteAddress(item.addressId)"></uni-icons>
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
    <!-- 新增地址部分 -->
    <view class="addbtn" @click="toAddUserAddress">
      <i class="fa fa-plus-circle"></i>
      <p>新增地址</p>
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
      chooseAddress(item){
        uni.setStorageSync("deliveryAddress",item);
        uni.navigateBack();
      },
      editAddress(id){
        uni.navigateTo({
          url:`/subpkg/editUserAddress/editUserAddress?addressId=${this.id}`
        })
      },
      toAddUserAddress(){
        uni.navigateTo({
          url:"/subpkg/addUserAddress/addUserAddress"
        })
      },
      deleteAddress(id){
        console.log(id)
        uni.showModal({
          title: '确认删除',
          content: '确定要删除这个地址吗？',
          showCancel: true, // 显示取消按钮
          cancelText: '取消', // 取消按钮文字
          confirmText: '删除', // 确认按钮文字
          success: (res) => {
              if (res.confirm) {
                  // 用户点击了确认
                  uni.request({
                      method: 'DELETE',
                      url: "/address/delete",
                      data: { addressId: id },
                      header: {
                              'Content-Type': 'application/x-www-form-urlencoded' // 确保参数格式正确
                          }
                  }).then(res => {
                      if (res[1].statusCode === 200) {
                          uni.showToast({
                              title: "删除成功",
                              icon: 'none',
                              duration: 2000
                          });
                          // 刷新地址列表
                          this.init();
                      } else {
                          uni.showToast({
                              title: "删除失败，请稍后重试",
                              icon: 'none',
                              duration: 2000
                          });
                      }
                  }).catch(err => {
                      uni.showToast({
                          title: "删除失败，请稍后重试",
                          icon: 'none',
                          duration: 2000
                      });
                  });
              } else {
                  // 用户取消删除
                  console.log('用户取消删除');
              }
          }
      });
      },
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
		},
    onShow(){
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
  display: flex;
  justify-content:space-between;
}

.two1{
	width: 100%;
	/* height: 170rpx; */
  height: auto;
	border-bottom: 1px #ccc solid;
	display: flex;
	/* align-items: center; */
	flex-direction: column;
}

.two1 text{
	display: block;
	margin-top: 12rpx;
}
.two .icons{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
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
.addbtn {
  width: 100%;
  height: 14vw;
  border-top: solid 1px #DDD;
  border-bottom: solid 1px #DDD;
  background-color: #fff;
  margin-top: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5vw;
  color: #0097FF;
  user-select: none;
  cursor: pointer;
}
.addbtn p {
  margin-left: 2vw;
}
</style>
