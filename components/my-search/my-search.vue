<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <!-- 使用uni-ui提供的图表组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder" style="color: #aaa;">搜索您要找的人或服务</text>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      // 背景颜色
      // bgcolor:{
      //   type:String,
      //   default:'#C00000'
      // },
      // 圆角尺寸
      radius:{
        type:Number,
        default:18 //px
      }
    },
    name:"my-search",
    data() {
      return {
        
      };
      
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container{
    height: 50px;
    // background-color: #c00000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .my-search-box{
      height: 36px;
      background-color: #ffffff;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .placeholder{
        font-size: 15px;
        margin-left: 5px;
      }
    }
    
  }

</style>