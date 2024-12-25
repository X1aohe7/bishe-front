<template>
	<view class="container">
		<view class="two" @click="gotoDetail(item.id)" v-for="(item,i) in healthInformationList" :key="i" >
			<view style="width: 70%;">
				<!-- <text class="title">{{item.title}}</text> -->
				<text class="pp">{{item.profile}}</text>
			</view>
      
			<view class="img">
				<image src="../../static/1.png"></image>
				<view>{{item.time}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
    mounted() {
      this.getHealthInformation();
    },
		data() {
			return {
				healthInformationList:[],
        currentPage:1,
        pageSize:10,
        total:0
			}
		},
		methods: {
      
			gotoDetail(id){
        uni.navigateTo({
          url: `/pages/healthInformationDetail/healthInformationDetail?id=${id}`
        })
      },
      async getHealthInformation(){
        uni.showLoading({
          title:"数据加载中..."
        })
        const res= await uni.request({
          method:'GET',
          url:"/healthInformation/getByPage",
          data:{
            currentPage:this.currentPage,
            pageSize:this.pageSize
              }
        });
        console.log(res);
        uni.hideLoading();
        this.healthInformationList.push(...res[1].data.list);
        this.total=res[1].data.total
         this.showResult=true
        // console.log(this.healthInformationList)
      },
      onReachBottom() {
        if((this.currentPage+1)*this.pageSize>=this.total) return uni.$showMsg('数据加载完毕')
        if(!this.showResult) return
        // 让页码自增加一
        this.currentPage++
        this.getHealthInformation()
      },
      onPullDownRefresh() {
        // 重置关键数据
        this.currentPage=1;
        // this.pageNum=10,
        this.total=0,
        this.showResult=false,
        this.healthInformationList=[]
        
        // 重新发起数据请求
        this.getHealthInformation(()=>uni.stopPullDownRefresh())
      },
		}
	}
</script>

<style>
.container{
	width: 100%;
}
.two{
	width: 100vw;
	/* margin: 0 auto; */
	display: flex;
	/* align-items: center; */
  justify-content: space-around;
	background: white;
	border-bottom: 1px #ccc solid;
	margin-top: 10rpx;
	padding: 20rpx;
}
.two view{
	/* width: 60%; */
}
.title{
	font-size: 38rpx;
	font-weight: 600;
	display: block;
}
.pp{
	/* width: 98%; */
	/* display: inline-block; */
	/* margin-top: 20rpx; */
	/* text-indent: 1em; */
font-size: 38rpx;
	font-weight: 600;
	display: block;  
}
.two image{
	width: 300rpx;
	height: 200rpx;
}
.container .two .img{
   margin-right: 15px;
}
</style>
