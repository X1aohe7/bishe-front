<template>
	<view class="container">
			<view>
				
				<view class="uni-title uni-common-pl">药品名称</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input type="text" v-model="name" class="uni-input">
					</view>
				</view>
				
				<view class="uni-title uni-common-pl">单次用量</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input type="text" v-model="num" class="uni-input">
					</view>
				</view>
				
				<!-- <view class="uni-title uni-common-pl">用药次数</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input type="text" v-model="everyday" class="uni-input">
					</view>
				</view> -->
				
		
				<!-- <view class="uni-title uni-common-pl">提醒时间</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
								<view class="uni-input">{{time}}</view>
							</picker>
						</view>
					</view>
				</view> -->
		
				<view class="uni-title uni-common-pl">提醒时间</view>
				    <view class="uni-list">
				      <view class="uni-list-cell" v-for="(item, index) in timeList" :key="index">
				        <view class="uni-list-cell-left">当前选择</view>
				        <view class="uni-list-cell-db">
				          <picker mode="time" :value="item" start="00:00" end="23:59" @change="bindTimeChange($event, index)">
				            <view class="uni-input">{{ item || "请选择时间" }}</view>
				          </picker>
				        </view>
				        <button class="mini-btn" type="warn" size="mini" @click="removeTime(index)">删除</button>
				      </view>
				    </view>
				    <button class="mini-btn" type="primary" size="mini" @click="addPicker">新增时间</button>
				
				<view class="uni-title uni-common-pl">用药天数</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input type="text" v-model="duration" class="uni-input">
					</view>
				</view>
				<button class="btn" type="primary" @click="saveClick">保存</button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
				title: 'picker',
				
				index: 0,
				// date: currentDate,
				time: '12:00',
				name:"",
				num:"",
				everyday:"",
				duration:"",
        timeList: ['12:00'] ,// 存储选中的时间
        createdTime:null
			}
		},
		methods: {
      getCurrentTime(){
        const currentDateTime = new Date();
          
        // 获取年、月、日、时、分、秒  
        const year = currentDateTime.getFullYear();  
        const month = currentDateTime.getMonth() + 1; // 月份是从 0 开始的，所以需要加 1  
        const day = currentDateTime.getDate();  
        const hours = currentDateTime.getHours();  
        const minutes = currentDateTime.getMinutes();  
        const seconds = currentDateTime.getSeconds();  
          
        // 使用 padStart 在数字不满10的情况下在其后面添加0  
        const formattedDay = day.toString().padStart(2, '0');  
        const formattedMinutes = minutes.toString().padStart(2, '0');  
        const formattedSeconds = seconds.toString().padStart(2, '0');  
          
        // 将年、月、日、时、分、秒拼接成字符串格式，例如 "2023-07-19 14:30:00"  
        this.createdTime = `${year}-${month}-${formattedDay} ${hours}:${formattedMinutes}:${formattedSeconds}`;  
      },
       bindTimeChange(e, index) {
         this.timeList[index] = e.detail.value;
         this.$forceUpdate(); // 确保数据变化被 Vue 监听到
         console.log(this.timeList)
       },
      
					
					
					
					
	async saveClick(){
    this.getCurrentTime()
			var obj={
				name:this.name,
				num:this.num,
				everyday:this.timeList.length,
				duration:this.duration,
				userId:uni.getStorageSync("userId"),
				reminderTime:this.timeList,
        createdTime:this.createdTime
			}
			const res= await uni.request({
			  method:'POST',
			  url:"/medicine/add",
			  data:obj
			});
			console.log(res);
			uni.navigateTo({
				url:"/pages/myMeicdal/myMeicdal"
			})
		},
        // 新增 picker（最多 3 个）
        addPicker() {
          if (this.timeList.length < 3) {
            this.timeList.push("12:00"); // 初始为空，等待用户选择
          } else {
            uni.showToast({
              title: "最多只能添加 3 个时间",
              icon: "none"
            });
          }
        },
        // 删除某个 picker
        removeTime(index) {
          if (this.timeList.length > 1) {
            this.timeList.splice(index, 1);
          } else {
            uni.showToast({
              title: "最少要有一个时间",
              icon: "none"
            });
          }
          
        }
    
					
			
		},
		mounted() {
		  
		},
		
	}
</script>

<style>
    
.container{
		width: 95%;
		margin: 0 auto;
	}
uni-page-body {
    background-color: #f5f5f5!important;
    min-height: 100%!important;
    height: auto!important;
}

.uni-list {
    background-color: #FFFFFF;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
}




.uni-list-cell {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}


.uni-list-cell-left {
    white-space: nowrap;
    font-size: 14px;
    padding: 0 15px;
}
.uni-list-cell-db, .uni-list-cell-right {
    flex: 1;
}
uni-picker {
    position: relative;
    display: block;
    cursor: pointer;
}
.uni-input {
    height: 25px;
    padding: 7px 12px;
    line-height: 25px;
    font-size: 14px;
    background: #fff;
    flex: 1;
}
.uni-common-pl {
    padding-left: 15px;
}
.uni-title {
    font-size: 15px;
    font-weight: 500;
    padding: 10px 0;
    line-height: 1.5;
}
.btn{
	width: 60%;
	margin: 0 auto;
	margin-top: 60rpx;
}
</style>
