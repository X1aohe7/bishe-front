<template>
  <view >
    <view class="bg"></view>
    <view class="title">
      <view class="title-card">
        <!-- 卡片左边图片 -->
        <image src="../../static/care/head.jpg"></image>
        <!-- 右边文字部分 -->
        <view class="title-card-text">
          <!-- 第一行 -->
          <view class="line1">
            <view class="left">
              <text style="padding: 5px; font-size: 20px; white-space: nowrap;">{{item.nurseName}}</text>
              <view>服务价格：<text style="color: red;font-weight: 700;">￥{{item.price}}</text></view>
            </view>
            
            <!-- <view class="star" > -->
              <view class="collect">
                <image @click="collect" style="width:60rpx; height: 60rpx;" v-if="isShow" src="../../static/collect.png"></image>
                <image @click="collect1" style="width:60rpx; height: 60rpx;" v-else src="../../static/collect1.png"></image>
                <text @click="collect" v-if="isShow">收藏</text>
                <text @click="collect1" v-else>已收藏</text>
              </view>
            <!-- </view> -->
            
          </view>
          
          <!-- 第二行 -->
          <view class="line2">
            <view class="stats">
              <text>{{item.age}}</text>
              <text class="stats-bottom">年龄</text>
            </view>
            <view class="stats">
              <text>{{item.employmentTime}}年</text>
              <text class="stats-bottom">经验</text>
            </view>
            <view class="stats">
              <text>{{item.province}}</text>
              <text class="stats-bottom">籍贯</text>
            </view>
          </view>
          
          <!-- 第三行 -->
         <!-- <view class="line3" > -->
            <!-- <view>{{skill}}</view> -->
            <!-- <view class="block"v-for="skill in item.skillList" :key="skill.sid">{{skill.skillName}}</view> -->
            <!-- <text class="block">不照顾宠物</text>
            <text class="block">照顾老人</text>
            <text class="block">自理老人</text> -->
          <!-- </view> -->
          
        </view>
      </view>
    </view>
   <view class="introduction">
      <view class="title">
        <uni-icons type="paperplane" size="30" color="#808080"></uni-icons>
        <text>简介</text>
      </view>
      <view class="content">
        {{item.introduction}}
      </view>
    </view>
    
    
    <view class="evaluate">
      <view class="title">
        <uni-icons type="chatbubble-filled" size="30" color="#808080"></uni-icons>
        <text>客户评价</text>
      </view>
      <view v-if="comment.length>0"  class="judge">
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
          <button style="display: block; margin: 10px auto; width: 40%;" size="mini" @click="gotoAllComment">查看全部评价</button>
        </view>
        <view v-else class="none">
          暂无评价
        </view>
        
      
    </view>
    <!-- <view class="collect" style="margin:30rpx 20rpx;" @click="collect">
		<image style="width:60rpx; height: 60rpx;" v-if="isShow" src="../../static/collect.png"></image>
		<image style="width:60rpx; height: 60rpx;" v-else src="../../static/collect1.png"></image>
		<text v-if="isShow">收藏</text>
		<text v-else>已收藏</text>
	</view> -->
    <view class="button">
      <button class="choose" @click="serviceClick">呼叫服务</button>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      console.log(options);
      this.id=options.id
      this.getNurseById()
      this.getNurseCommentById()
      // console.log(this.comment.length);
	  
	  this.getCollect()
    },
    data() {
      return {
        id:-1,
        item:{},
        comment:[],
		isShow:true,
		arr:[]
      };
    },
    methods:{
      async getNurseById(){
        const res=await uni.request({
          method:'GET',
          url:"/nursing/getNurseById",
          data:{"id":this.id}
        })
        console.log(res);
        this.item=res[1].data
      },
      async getNurseCommentById(){
        // const res=await uni.request({
        //   method:'GET',
        //   url:"/nursing/getNurseCommentById",
        //   data:{"id":this.id}
        // })
        const res=await uni.request({
          method:'GET',
          url:"/comment/getProfile",
          data:{"nid":this.id}
        })
        console.log(res[1].data);
        this.comment=res[1].data
        console.log(this.comment.length!=0);
      },
	async collect(){
		 var obj={
			 uid:uni.getStorageSync("userId"),
			 nid:this.id
		 }
		 
		 console.log(uni.getStorageSync("userId"));
		 this.isShow=false;
		  const res=await uni.request({
		    method:'POST',
		    url:"/collect/add",
		    data:obj
		  })
		  console.log(res)
	  },
	  
	  async collect1(){
	  	 var obj={
	  		 uid:uni.getStorageSync("userId"),
	  		 nid:this.id
	  	 }
	  	 
	  	 console.log(uni.getStorageSync("userId"));
	  	  const res=await uni.request({
	  	    method:'POST',
	  	    url:"/collect/remove",
	  	    data:obj
	  	  })
		  
		  this.isShow=true;
		  console.log(res)
	    },
	  
	 async getCollect(){
		  const res=await uni.request({
		    method:'GET',
		    url:"/collect/get",
		    data:{"uid":uni.getStorageSync("userId")}
		  })
		   console.log(res,666);
		   // arr=
		   for(let item of res[1].data){
			   if(this.id==item.nursingId){
				   this.isShow=false;
			   }
		   }
	  },
	  
	  serviceClick(){
		  console.log(this.item)
		  uni.navigateTo({
		  	url:"/pages/order/order?data="+ JSON.stringify(this.item) 
		  })
	  },
    gotoAllComment(id){
      uni.navigateTo({
        // url:"/subpkg/all_comment/all_comment"
        url:`/subpkg/all_comment/all_comment?id=${this.id}`
      })
    }
    }
  }
</script>

<style lang="scss" >
page{
    background-color: #f5f5f5;
    // margin-bottom: 10px;
    // width: 100vw;
}
.bg{
    width: 100%;
    height: 200rpx;
    background-color: gray;
    position: absolute;
    top: 0;
    z-index: -1;
}
.title{
  z-index: 1;
  width: 100%;
  
  .title-card{
    width: 90%;
    padding: 10px,20px;
    display: flex;
    background-color: #fff;
    margin: 5px auto;
    
    image{
     width: 200rpx;
     height: 250rpx; 
     margin:20rpx 20rpx;
     }
     .title-card-text{
       width: 70%;
       margin-top: 10px;
       .line1{
         display: flex;
         
         // flex-direction: column;
         justify-content: space-around;
         // flex-wrap: nowrap;
         .left{
           display: flex;
           flex-direction: column;
           flex-wrap: nowrap;
          }
          .collect{
          	display: flex;
          	align-items: center;
            flex-direction: column;
              font-weight: 700;
              text{
                white-space: nowrap;
              }
              // color: lightgray;
          }
         // .star{
         //   display: flex;
         //   flex-direction: column;
         //   align-items: center;
         //   // justify-content: center;
         //   // margin-left: 200rpx;
         //   font-weight: 700;
         //   text{
         //     white-space: nowrap;
         //   }
         //   // color: lightgray;
           
         // }
       }
      .line2{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .stats{
          display: flex;
          flex-direction: column;
          align-items: center;
          .stats-bottom{
            font-size: 13px;
            color: gray;
          }
        }
      }
      .line3{
        margin-top: 5px;
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
        align-items: center;
        .block{
          background-color: gray;
          color: #fff;
          font-size: 30rpx;
          margin-right: 5px;
          padding:3px ;
        }
      }
     }
  }
}


.introduction{
  background-color: #fff;
  margin: 30rpx 20rpx;
  .title{
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-top: 5px;
    font-size: 20px;
    font-weight: 600;
    text{
      margin-left: 5px;
    }
  }
  .content{
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 500;
  }
}

.evaluate{
  background-color: #fff;
  margin: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  .title{
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-top: 5px;
    font-size: 20px;
    font-weight: 600;
    text{
      margin-left: 5px;
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
  .none{
    margin: 5px auto;
    color: #c5c5c5;
  }
  
}
.button{
  width: 90%;
  margin: 5px auto;
  margin-bottom: 10px;
  .choose{
    background-color: red;;
    color: white;
  }
}



// .collect text{
// 	margin-left: 10rpx;
// }
</style>
