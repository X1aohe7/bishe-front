<template>
  <view>
    <view class="search-box">
      <uni-search-bar  @input="input" :radius="100" cancel-button="none" @confirm="search"></uni-search-bar>
    </view>
    <!-- 搜索推荐列表 -->
    <!-- <view class="sugg-list" v-if="searchResult.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResult" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view> -->
    <!-- 历史记录 -->
    <view class="history-box" ><!-- v-else在补充完上面列表后补上 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean" ></uni-icons>
      </view>
     <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="tagSearch(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:"",
        searchResult:[],
        historyList:[],
      };
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    methods:{
      tagSearch(i){
        // console.log(i);
        uni.navigateTo({
          url:'/subpkg/search_list/search_list?query=' + i
        })
      },
      // input输入事件处理函数
      input(e){
        
        clearTimeout(this.timer)
        
        this.timer=setTimeout(()=>{
          this.kw=e
          // this.getSearchList()
        },0)
      },
      
      // async getSearchList(){
      //   // 判断搜索关键词是否为空
      //   if(this.kw.length===0){
      //     this.searchResult=[]
      //     return
      //   }
      //   const {data:res}= await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
      //   if(res.meta.status!==200) return uni.$showMsg()
      //   this.searchResult=res.message
      //   this.saveSearchHistory()
      // },
      // gotoDetail(item){
      //   uni.navigateTo({
      //      url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
      //   })
      // },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set=new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList=Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      // gotoGoodsList(kw){
      //   uni.navigateTo({
      //     url: '/subpkg/goods_list/goods_list?query=' + kw
      //   })
      // },
      search(){
        uni.navigateTo({
          url:'/subpkg/search_list/search_list?query=' + this.kw
        })
        this.saveSearchHistory()
      }
    }
  }
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .sugg-list{
      padding: 0 5px;
    .sugg-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      .goods-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .history-box{
    padding: 0 5px;
    .history-title{
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center; 
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
  

</style>
