<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 服务人员列表 -->
    <view class="people-list" v-for="(item,i) in NList" :key="i">
      <!-- <my-item :item="item" @click="showDetail(item)"></my-item> -->
	  <view @click="showDetail(item)">
	    <view class="people-item" >
	      <view class="item-img">
	        <image src="../../static/care/head.jpg"></image>
	      </view>
	      
	      <view class="item-text">
	        <view>【{{item.nurseName}}】{{item.introduction}}</view>
	        
	        <view style="font-size: 30rpx; color: #7E7B7B; ">{{item.age}}岁 | {{item.province}}人 | 从业{{item.employmentTime}}年</view>
	        <view class="item-skill">
	          <view v-for="(item2,i2) in item.skillList" :key="i2" style="margin: 10rpx 10rpx; background-color: #ccc;padding: 5rpx; font-size: 30rpx;">{{item2.skillName}}</view>
	        </view>
	        
	        
	        <view>有<text style="color: red;margin-top: 20rpx;">{{item.followed}}</text>人关注</view>
	      </view>
	      
	    </view>
	  </view>
    </view>
  </view>
</template>

<script>
  export default {
    
    data() {
      return {
        NList:[],
        queryObj:{
          pageSize:10,
          pageNum:0,
          query:'',
        },
        total:0,
      };
    },
    onLoad() {
      this.getNursing();
    },
    methods:{
      showDetail(item){
        uni.navigateTo({
          url:'/subpkg/nurse_detail/nurse_detail?id='+item.nid
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      },
      async getNursing(){
        uni.showLoading({
          title:"数据加载中..."
        })
        const res= await uni.request({
          method:'GET',
          url:"/nursing/search",
          data:this.queryObj
        })
        uni.hideLoading()
        console.log(res);
        this.NList=res[1].data.list
        this.total=res[1].data.total
        this.showResult=true
      }
    },
    onReachBottom() {
      if((this.queryObj.pageNum+1)*this.queryObj.pageSize>=this.total) return uni.$showMsg('数据加载完毕')
      if(!this.showResult) return
      // 让页码自增加一
      this.queryObj.pageNum++
      this.getNursing()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pageNum=0,
      this.total=0,
      this.showResult=false,
      this.NList=[]
      
      // 重新发起数据请求
      this.getNursing(()=>uni.stopPullDownRefresh())
    },
  }
</script>

<style lang="scss">
.search-box{
  border-bottom: 1px solid #ccc;
}
.people-list{
  width: 100%; 
}

.people-item{
    display: flex;
    border-bottom: 1px solid #ccc;
    .item-img{
      image{
        width: 200rpx;
        height: 280rpx; 
        margin:20rpx 20rpx;
      }
      
    }
    .item-text{
      margin:20rpx 30rpx;
      .item-skill{
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
