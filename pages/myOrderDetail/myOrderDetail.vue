<template>
	<view>
	  <view class="two">
		  <view class="sectionBox">
			<view class="sectionType">地址：{{address.position}}</view>
      <view class="sectionType">{{address.detail}}</view>
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
		 <text>服务	时间:</text>
		 <text>{{obj.time}}</text>
	 </view>
	 
	 <view class="two" style="display: flex; justify-content: flex-end;">
		 <text>合计: ￥{{obj.price}}</text>
	 </view>
	 
	 <view class="two">
		 <text>编号:{{obj.ordersId}}</text>
		 <!-- <textarea v-model="remark"  placeholder="有什么想对服务人员说的"/> -->
	 </view>
	 <view v-if="!isComment">
     <view class="two" >
     		
         		<uni-section title="星级评价" type="line" padding>
         			<uni-rate v-model="star" @change="onChange" />
         		</uni-section>
     </view>
     <view class="two">
     		 <text>评价:</text>
     		 <textarea v-model="comment"  placeholder="输入评价内容"/>
     </view>
     
     <view class="two" style="display: flex; justify-content: flex-end;">
     		 <!-- <text>￥199</text> -->
       <!-- <text class="btn" style="margin-right: 5px;" @click="backToHome">返回首页</text> -->
     		 <text class="btn" @click="commentClick">评价</text>
     </view>
   </view>
   <view v-else>

       <view class="two" >
           		<uni-section title="星级评价" type="line" padding>
           			<uni-rate v-model="star" :readonly="true"  />
           		</uni-section>
       </view>
       
       <view class="two">
     		 <text>评价:</text>
     		 <!-- <textarea v-model="obj.remark"  placeholder="输入评价内容"/> -->
         <text>{{comment}}</text>
      </view>
	 </view>

	</view>
</template>
 
<script>
	export default {
		data() {
			return {
        isComment:false,
				obj:{},
        address:"",
        comment:"",
        star:0
			}
		},
		onLoad(options) {
			console.log(JSON.parse(options.data),666);
			this.obj=JSON.parse(options.data)
      // console.log(this.obj.nursingId)
      this.getAddress(this.obj.addressId)
      this.getComment(this.obj.ordersId)
		},
		
		created() {
			
			  
			

		},
		methods: {
      onChange(e) {
        console.log('rate发生改变:' + JSON.stringify(e))
        // console.log(this.rateValue);
      },
      commentClick(){
        uni.request({
          method:'POST',
          url:"/comment/add",
          data:{
            ordersId:this.obj.ordersId,
            userId:uni.getStorageSync("userId"),
            nursingId:this.obj.nursingId,
            comment:this.comment,
            star:this.star
          }
        }).then(res=>{
          this.isComment=true
          uni.showToast({
            title:"评价成功！",
            icon:"success"
          })
        }).catch(err=>{
          uni.showToast({
            title:"评价失败，请稍后再试",
            icon:"fail"
          })
        })
      },
      getComment(id){
        uni.request({
          method:'GET',
          url:"/comment/getCommentByOrdersId",
          data:{ordersId: String(id)}
        }).then(res=>{
          console.log(res)
          // this.address=res[1].data
          if (res[1].statusCode === 200) {
              // 请求成功
              console.log(res);
              this.isComment=true
              // this.address = res[1].data;
              console.log(res[1].data)
              this.comment=res[1].data.comment
              this.star=res[1].data.star
          } else {
              // 请求失败，根据状态码处理
              this.isComment=false
          }
        }).catch(err=>{
          console.log(err,"err")
        })
      },
			getAddress(id){
        uni.request({
          method:'GET',
          url:"/address/getByAddressId",
          data:{addressId:id}
        }).then(res=>{
          console.log(res,"dizhi")
          this.address=res[1].data
        }).catch(err=>{
          uni.showToast({
            title:"地址获取错误！",
            icon:"fail"
          })
        })
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