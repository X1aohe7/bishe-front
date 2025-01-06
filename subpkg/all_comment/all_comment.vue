<template>
  <view>
    
    <view class="evaluate">
      <view class="title">
        <view class="left">
          <uni-icons type="chatbubble-filled" size="30" color="#808080"></uni-icons>
          <text>客户评价</text>  
        </view>
        
        <text class="total">共{{total}}条</text>
      </view>
      <view  class="judge">
        <view class="content"  v-for="(c,i) in comment" :key="i" >
          <view class="customer">
            <view class="left">
              <image class="img" src="../../static/care/head.jpg"></image>
                  <view class="name">
                    <text>{{c.userName}}</text>
                    <view class="star" >
                  
              <uni-icons type="star-filled" color="yellow" v-for="(s,i2) in parseInt(c.star)" :key="i2"></uni-icons>
                     
                    </view>
                    
                  </view>
            </view>
              
              <view class="date">{{c.time.split("T")[0]}}</view>
            </view>
            <view class="text">
              {{c.comment}}
            </view>
          </view>
          
        </view>
      
    </view>
    
  </view>
</template>

<script>
  export default{
    onLoad(option){
      this.id=option.id
      this.getAllComment();
    },
    data(){
      return{
        id:0,
        comment:[],
        total:0
      }
    },
    methods:{
      async getAllComment(){
        uni.showLoading({
          title:"数据加载中..."
        })
        const res= await uni.request({
          method:'GET',
          url:"/comment/get",
          data:{
            "nid":this.id
          }
        });
        uni.hideLoading();
        console.log(res)
        this.comment=res[1].data
        this.total=res[1].data.length
      }
    }
    
    
  }
  
</script>

<style lang="scss">
  .evaluate{
    background-color: #fff;
    margin: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 20px;
      padding-top: 5px;
      font-size: 20px;
      font-weight: 600;
      text{
        margin-left: 5px;
      }
      .left{
        display: flex;
        align-items: center;
      }
      .total{
        margin-right: 7px;
        font-size: 15px;
        font-weight: 400;
        color: #c0c0c0
      }
    }
    .judge{
    .content{
      
      // display: flex;
      // flex-direction: column;
      padding: 5px 10px;
      .customer{
        display: flex;
        // align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        image{
          width: 40px;
          height: 40px;
          border-radius: 20px;
          
        }
        .name{
          // display: flex;
          // flex-direction: column;
          margin-left: 5px;
          .star{
            margin-top: 5px;
            // display: flex;
          }
        }
      }
        
        .date{
          // margin-left: 130px;
          color: #c5c5c5;
          white-space: nowrap;
          float:right;
        }
      }
      .text{
        padding: 5px 10px;
        font-size: 13px;
      }
    }
    }
  }
</style>