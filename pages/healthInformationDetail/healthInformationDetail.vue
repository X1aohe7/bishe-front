<template>
  <view>
    <view style="font-size: 24px; font-weight: bold; margin: 5px;">{{title}}</view>
    <view style="display: flex; align-items: center;">
      <view style="margin: 10px ; ">
        <view>乐天伦官方</view>
        <view style="color: #ababab; font-size: 12px;">{{time}}</view>
      </view>
      <view>
        <uni-icons type="pyq" size="20"></uni-icons>
      </view>
    </view>
    <view style="margin: 5px;">
      {{content}}
    </view>
    
    
  </view>
  
</template>

<script>
  export default{
    onLoad(options) {
      // console.log(options)
      const id = options.id;
      // 处理 id 参数
      this.getHealthInformationDetail(id);
    },
    data(){
      return {
        title:"",
        content:"",
        time:""
      }
    },
    methods:{
      async getHealthInformationDetail(id){
        uni.showLoading({
          title:"数据加载中..."
        })
        const res= await uni.request({
          method:'GET',
          url:"/healthInformation/get",
          data:{
            id:id
          }
        });
        uni.hideLoading();
       // console.log(res)
       this.content=res[1].data.detail,
       this.time=res[1].data.time,
       this.title=res[1].data.profile
      }
    }
  }
  
</script>

<style>
</style>