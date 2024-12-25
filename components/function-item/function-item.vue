<template>
  
    <li class="function-item" @click="gotoFunc">
      <image :src="func.imgSrc"></image>
      <text>{{func.text}}</text>
    </li>
  
</template>

<script>
  export default {
    name:"function-item",
    props:['func'],
    methods:{
      
      gotoFunc(){
        this.$emit('click')
        // console.log(id);
        // switch(id){
        //   case 1:
        //   console.log(666);
        //   uni.redirectTo({
            
        //   })
        //   break;
        //   case 2:
        //   case 3:
        }
      }
    }
    
  
</script>

<style lang="scss">
.function-item{
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image{
        width: 60rpx;
        height: 60rpx;
        border: 1px solid rgba(17, 107, 155, 1);
        border-radius: 60rpx;
        padding: 10rpx;
        background-color: rgba(151, 203, 231, 0.8);
      }
    }
</style>