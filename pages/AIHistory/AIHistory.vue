<template>
  <view>
     <!-- 添加新对话按钮 -->
    <button @click="gotoChatDetail(null)" >添加新对话</button>
    <uni-section title="对话历史" type="line">
      <uni-list>
<!--        <uni-list-item showArrow title="列表文字" /> -->
        <uni-list-item 
        style="height: 50px;"
         showArrow
         :key="conversation.conversationId"
         v-for="(conversation, index) in conversations"
          :title="conversation.title"
          :rightText="conversation.createdTime" 
          @tap="gotoChatDetail(conversation.conversationId)"/>
      </uni-list>
    </uni-section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      conversations: [],
    };
  },
  methods: {
    getChatHistory() {
      uni.request({
        url:'/aichat/getChatHistory',
        method:'GET',
        data:{
          userId:uni.getStorageSync("userId")
        }
      }).then(res=>{
        console.log(res);
        this.conversations=res[1].data
      }).catch(err=>{
        console.log(err);
        uni.showToast({
            title: "获取失败，请稍后重试",
            icon: 'none',
            duration: 2000
        });
      })
    },
    gotoChatDetail(id){
      // console.log(777)
      uni.navigateTo({
        url:'/pages/AIChat/AIChat?data='+id
        
      })
    }
    
  },
  onShow() {
    this.getChatHistory();
  }
};
</script>

<style>
/* 根据需要添加样式 */

</style>
