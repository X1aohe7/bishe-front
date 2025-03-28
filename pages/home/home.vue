<template>
  <view style="width: 100%; height: 100%; overflow-x: hidden;">
    <view class="background-img" style= "background:url('/static/06318b2605c7217cd2b3be77a370f56.jpg');background-size: cover;">
    <!-- 定位部分 -->
    <view class="location">
      <uni-icons type="location-filled" size="20" color="#fff"></uni-icons>
      <text>文化路</text>
      <uni-icons type="bottom" size="20" color="#fff"></uni-icons>
      
    </view>
    <!-- 搜索框部分 -->
    <!-- <view class="search">
      <view class="search-bar">
        <uni-icons type="search" size="20"></uni-icons>
        <text>搜索你要找的人或服务</text>
      </view>
    </view> -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图部分 -->
    <view class="swiper-list">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
        <swiper-item>
          <view class="swiper-item">
            <image src="../../static/u=574093698,2048249754&fm=253&fmt=auto&app=138&f=JPEG.webp"  mode="heightFix"></image>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            <image src="../../static/1690276244928.jpg" mode="heightFix"></image>
          </view>
        </swiper-item>
      </swiper>
      </view>
    </view>
    
    <ul class="function-list">
      <function-item v-for="(item,i) in func" :key="i" :func="item" @click="gotoFunc(item.id)"></function-item>
     
    </ul>
    
    <!-- <view class="news">
      <text style="font-size: 40rpx; font-weight: 600; color: red; ">商城头条</text>
      <text>商城新开业，门店即将试运营...</text>
      <text style="color: #ccc;">| 更多</text>
    </view> -->
    
    <view class="service">
      <view class="service-title">
        <view style="display: flex; justify-content: center;
        align-items: center;">
          <uni-icons type="fire-filled" size="30" color="red" style="margin-left: 10rpx;"></uni-icons>
        <text style="font-weight: 700;">热门服务</text>
        </view>
        
        <!-- <text style="margin-right: 20rpx;">查看全部 ></text> -->
      </view>
      <view class="service-list1">
        <service-item v-for="(item,i) in serve" :key="i" :serve="item" @click="gotoServe(item.text)"></service-item>
        
      </view>
      
      
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        func:[
          {
            id:1,
            text:'护理服务',
            imgSrc:"../../static/function/hulifuwu1.png"
          },
          {
            id:2,
            text:'健康资讯',
            imgSrc:"../../static/function/yinshi.png"
          },
          {
            id:3,
            text:'药物服用提醒',
            imgSrc:"../../static/function/yaoping.png"
          },
          {
            id:4,
            text:'AI聊天',
            imgSrc:"../../static/function/AI.png"
          }
          
        ],
        serve:[
          {
            id:1,
            text:'日间照料',
            imgSrc:"../../static/service/huli.png"
          },
          {
            id:2,
            text:'理发',
            imgSrc:"../../static/service/scissors.png"
          },
          {
            id:3,
            text:'健康检查',
            imgSrc:"../../static/service/health.png"
          },
          {
            id:4,
            text:'助浴',
            imgSrc:"../../static/service/xiyu.png"
          },
          {
            id:5,
            text:'陪伴谈话',
            imgSrc:"../../static/service//talk.png"
          },
        ]
      }
    },
    methods:{
      gotoSearch(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      },
      gotoFunc(id){
        if(id==1){
          uni.switchTab({
            url:'/pages/care/care'
          })
        }
        if(id==2){
			uni.navigateTo({
			  url:'/pages/healthInformation/healthInformation'
			})
		}
		
		
		if(id==3){
			// this.showModal()
			uni.navigateTo({
			  url:'/pages/remind/remind'
			})
		}
    if(id==4){
      uni.navigateTo({
        url:'/pages/AIHistory/AIHistory'
      })
    }
          // uni.switchTab({
          //   url:'/pages/care/care'
          // })
         
      },
      gotoServe(text){
        uni.navigateTo({
          url:'/subpkg/search_list/search_list?query='+text
        })
      },
	  
	  
	  showModal() {  
	        uni.showToast({
	        	   	title: "注意用药",//标题 必填
	        	   	icon: 'none',//图标
	        })  
	        setInterval(() => {  
	           uni.showToast({
	           	   	title: "该吃药了",//标题 必填
	           	   	icon: 'none',//图标
	           })
	        }, 3000); // 30秒后关闭弹框  
	      },
		  startLocation() {  
		        uni.getLocation({
		          geocode: true, // 返回城市信息
				  enableHighAccuracy: true,
				  // enableHighAccuracy: false,
		          success: function(res) {
		            console.log(res);
					this.getCityFromLocation(res.longitude,res.latitude);
					
		          },
				  
				  fail: function(res) {
				      console.log(res);
				    }
		        });
		      },
			  
    },
	
	
	onLoad(){
		// this.showModal()
		// this.startLocation();
	}
	
	
  
  }
</script>

<style lang="scss">
  .background-img{
    
  }
.location{
  width: 100%;
  // background-color: #116B9B;
  height: 80rpx;
  display: flex;
  align-items: center;
  padding-left: 10rpx;
  color: #fff;
  font-weight: 500;
  margin-top: 20rpx;
}

.search{
  width: 100%;
  height: 120rpx;
  // background-color: #116B9B;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-bar{
    background-color: #fff;
    width: 95%;
    height: 80rpx;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    padding-left: 20rpx;
    color: #ccc;
    
  }
}
swiper{
    width: 95%;
    margin: 0 auto;
    height: 250rpx;
    
    .swiper-item,
    image{
      background-color: #fff;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
  .swiper-list{
    // background-color: #116B9B;
    height: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .function-list{
    margin-top: 10rpx;
    height: 150rpx;
    background-color: rgba(27, 103, 186, 0.15);
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    }
  
  .news{
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20rpx;
    background-color: rgba(208, 240, 238, 0.61);
  }
 .service{
   width: 100%;
   margin-top: 10rpx;
 }
  .service-title{
      display: flex;
      width: 95%;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      margin: 0 auto;
      
    }
    .service-list1{
      display: flex;
      justify-content: space-around;
       flex-wrap: wrap;
      
      
    }

    
      </style>
      
 
  