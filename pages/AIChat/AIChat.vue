<template>
  <view>
    <view class="container">
      <scroll-view class="message-container" scroll-y ref="scrollView">
        <view v-for="(message, index) in messages" :key="index" class="message" :class="{ 'received': message.role === 'assistant', 'sent': message.role === 'user' }">
          {{ message.content }}
        </view>
      </scroll-view>
      <view class="input-box-container">
        <input class="input-box" type="text" v-model="newMessage" placeholder="输入消息..." />
        <button class="send-button" @tap="sendMessage">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
    	// console.log(JSON.parse(options.data),666);
      if(options.data && options.data != "null"){
        this.conversationId=options.data
      }
      
      // console.log(this.conversationId)
      this.getChatDetail();
    },
   data() {
       return {
         conversationId:null,
         messages: [],
         newMessage: ''
       };
     },
     methods: {
       getChatDetail(){
         
         if(this.conversationId === null){
           return;
         }else{
           uni.request({
             url:'/aichat/getChatDetail',
             data:{
               conversationId:this.conversationId
             }
           }).then(res=>{
             console.log(res);
             this.messages=res[1].data;
           }).catch(err=>{
             console.log(err)
             uni.showToast({
                 title: "获取失败，请稍后重试",
                 icon: 'none',
                 duration: 2000
             });
           })
         }
       },
       
       sendMessage() {
         if (!this.newMessage.trim()) return;
         
         this.messages.push({ content: this.newMessage, role: 'user' });
         this.scrollToBottom();
        const postData = { 
          userInput: this.newMessage, 
          userId: uni.getStorageSync("userId"), 
          // conversationId: this.conversationId
        };
        if(this.conversationId!=null){
          postData.conversationId=this.conversationId
        }
         this.newMessage = '';
         
         uni.request({
           url: '/aichat/getAnswer',
           method: 'POST',
           header: {
               'content-type': 'application/x-www-form-urlencoded'
             },
           data: postData
        
           
        }).then(res=>{
          if(this.conversationId === null){
            this.conversationId=res[1].data.conversationId
          }
          console.log(res)
          const AI=res[1].data.content
          this.messages.push({ content: AI, sender: 'assistant' });
          this.scrollToBottom();
        }).catch(err=>{
          console.log(err);
          uni.showToast({
              title: "获取失败，请稍后重试",
              icon: 'none',
              duration: 2000
          });
        })

         // 模拟 AI 回复消息
         // setTimeout(() => {
         //   this.messages.push({ text: AI, sender: 'bot' });
         //   // 滚动到底部
         //   this.$nextTick(() => {
         //     this.$refs.scrollView && this.$refs.scrollView.scrollIntoView('.message:last-child');
         //   });
         // }, 500);
           
           // 滚动到底部
           this.$nextTick(() => {
             this.$refs.scrollView && this.$refs.scrollView.scrollIntoView('.message:last-child');
           });
           // 等待页面更新后滚动到底部
             setTimeout(() => {
               this.scrollToBottom();
             }, 100);
       },
       
       scrollToBottom() {
         uni.pageScrollTo({
           scrollTop: 9999, // 滚动到一个足够大的值，确保页面能滚动到底部
           duration: 300 // 滚动动画持续时间
         });
       }
     }
  }
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.message-container {
  flex: 1;
  padding: 10px;
  margin-bottom: 60px;
  overflow-y: scroll; /* 显示滚动条 */
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 10px;
  max-width: 70%;
}

.sent {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}

.received {
  align-self: flex-start;
  background-color: #f0f0f0;
}

.input-box-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  position: fixed; /* 固定在底部 */
  bottom: 0;
  width: 100%;
  margin-bottom: 5px;
}

.input-box {
  flex: 1; /* 占据剩余空间 */
  height: 50px;
  padding: 0 10px;
  border-radius: 20px;
  background-color: #ffffff;
  border: 2px solid #007bff;
  outline: none;
}

.send-button {
  height: 50px;
  margin-left: 5px;
  margin-right: 7px;
  padding: 5 10px;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  outline: none;
}
</style>
