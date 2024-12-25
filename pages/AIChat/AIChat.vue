<template>
  <view>
    <view class="container">
      <scroll-view class="message-container" scroll-y ref="scrollView">
        <view v-for="(message, index) in messages" :key="index" class="message" :class="{ 'received': message.sender === 'bot', 'sent': message.sender === 'user' }">
          {{ message.text }}
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
   data() {
       return {
         messages: [],
         newMessage: ''
       };
     },
     methods: {
       async sendMessage() {
         if (!this.newMessage.trim()) return;
         this.messages.push({ text: this.newMessage, sender: 'user' });
         
         const postData={"user_input":this.newMessage}
         this.newMessage = '';
         // const res=await fetch({
         //   url: 'http://localhost:5000/chat/',
         //   method:'POST',
         //   headers: {
         //       'Content-Type': 'application/json'
         //     },
         //     body: JSON.stringify(postdata)
         // })
         const res=await uni.request({
           url: 'http://localhost:5000/chat',
           method: 'POST',
           data: postData,
           // success: (res) => {
           //   console.log(res.data); // 输出返回的数据
           //   // 在成功发送消息后，将 AI 的回复消息显示在界面上
           //   this.messages.push({ text: res.data, sender: 'bot' });
           //  }
        })
        console.log(res)
          const AI=res[1].data.response
         
         
         // 模拟 AI 回复消息
         // setTimeout(() => {
         //   this.messages.push({ text: AI, sender: 'bot' });
         //   // 滚动到底部
         //   this.$nextTick(() => {
         //     this.$refs.scrollView && this.$refs.scrollView.scrollIntoView('.message:last-child');
         //   });
         // }, 500);
           this.messages.push({ text: AI, sender: 'bot' });
           // 滚动到底部
           // this.$nextTick(() => {
           //   this.$refs.scrollView && this.$refs.scrollView.scrollIntoView('.message:last-child');
           // });
           // 等待页面更新后滚动到底部
             // setTimeout(() => {
             //   this.scrollToBottom();
             // }, 100);
       },
       // sendMessage() {
       //   if (!this.newMessage.trim()) return;
       //   this.messages.push({ text: this.newMessage, sender: 'user' });
         
       //   const postData = { "user_input": this.newMessage };
       //   this.newMessage = '';
         
       //   uni.request({
       //     url: 'http://localhost:5000/chat',
       //     method: 'POST',
       //     data: postData,
       //     success: (res) => {
       //       console.log(res);
       //       const AI = res.data.response;
       //       this.messages.push({ text: AI, sender: 'bot' });
       
       //       // 滚动到底部
       //       setTimeout(() => {
       //         this.scrollToBottom();
       //       }, 100);
       //     },
       //     fail: (err) => {
       //       console.error('Failed to send message:', err);
       //     }
       //   });
       // },
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
