<template>
  <view>
    <view v-if="showResult">
      <view v-if="NList.length!==0">
        <view class="people-list" v-for="(item,i) in NList" :key="i" >
          <my-item :item="item" @click="showDetail(item)"></my-item>
        </view>
      </view>
      
     <view v-else style="width: 100%; text-align: center;">
       <text style="margin: 20rpx; color: #aaa;">搜索不到结果</text>
     </view>
  </view>
    
    
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          pageSize:10,
          pageNum:0,
          query:'',
        },
        total:0,
        NList:[],
        showResult:false
      };
    },
    onLoad(options) {
      // console.log(options);
      // console.log(this.NList);
      this.queryObj.query=options.query
      this.getNurseByCondition()
    },
    methods:{
      async getNurseByCondition(){
       uni.showLoading({
         title:"数据加载中..."
       })
        this.showResult=false
        const res= await uni.request({
          method:'GET',
          url:"/nursing/search",
          data:this.queryObj
        })
        uni.hideLoading()
        // console.log(res[1]);
        this.NList=res[1].data.list
        this.total=res[1].data.length
        this.showResult=true
      },
      showDetail(item){
        
        uni.navigateTo({
          url:'/subpkg/nurse_detail/nurse_detail?id='+item.nid
        })
      }
    },
    onReachBottom() {
      if((this.queryObj.pageNum+1)*this.queryObj.pageSize>=this.total) return uni.$showMsg('数据加载完毕')
      if(!this.showResult) return
      // 让页码自增加一
      this.queryObj.pageNum++
      this.getNurseByCondition()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pageNum=0,
      this.total=0,
      this.showResult=false,
      this.NList=[]
      
      // 重新发起数据请求
      this.getNurseByCondition(()=>uni.stopPullDownRefresh())
    },
    
    // onBackPress() {
    //   this.NList=[]
    // }
  }
</script>

<style lang="scss">

</style>
