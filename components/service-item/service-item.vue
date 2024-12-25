<template>
  
    <view class="service-item" @click="gotoServe">
      <text style="margin: 0 10rpx;">{{serve.text}}</text>
      <image :src="serve.imgSrc" style="height: 60rpx;
    width: 60rpx;margin: 0 auto;margin: 0 auto;"></image>
    </view>
  
</template>

<script>
  export default {
    name:"service-item",
    props:['serve'],
    methods:{
      gotoServe(){
        this.$emit('click')
      }
    }
    }
  
</script>

<style lang="scss">
.service-item{
        // margin: 10rpx 20rpx;
        // color: white;
        margin: 10rpx;
        background-color: rgba(17, 107, 155, 0.41);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // align-items: center;
        height: 200rpx;
        width: 200rpx;
        font-weight: 600;
      }
</style>