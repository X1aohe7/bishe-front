<template>
  <view @click="showDetail()">
    <view class="people-item" >
      <view class="item-img">
        <image src="../../static/care/head.jpg"></image>
      </view>
      
      <view class="item-text">
        <view>【{{item.nurseName}}】{{item.introduction}}</view>
        
        <view style="font-size: 30rpx; color: #7E7B7B; ">{{item.age}}岁 | {{item.province}}人 | 从业{{item.employmentTime}}年</view>
        <view class="item-skill">
          <view v-for="(item2,i2) in item.skillList" :key="i2" style="margin: 10rpx 10rpx; background-color: #ccc;padding: 5rpx; font-size: 30rpx;">{{item2.skillName}}</view>
        </view>
        
        
        <view>有<text style="color: red;margin-top: 20rpx;">{{item.followed}}</text>人关注</view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    name:"my-item",
    data() {
      return {
        
      };
    },
    methods:{
      showDetail(){
        this.$emit('click')
      }
    }
    
  }
</script>

<style lang="scss">
.people-item{
    display: flex;
    border-bottom: 1px solid #ccc;
    .item-img{
      image{
        width: 200rpx;
        height: 280rpx; 
        margin:20rpx 20rpx;
      }
      
    }
    .item-text{
      margin:20rpx 30rpx;
      .item-skill{
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>