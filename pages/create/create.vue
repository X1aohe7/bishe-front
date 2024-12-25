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
				
				<view class="uni-title uni-common-pl">用药次数</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input type="text" v-model="everyday" class="uni-input">
					</view>
				</view>
				<!-- <view class="uni-title uni-common-pl">地区选择器</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view> -->
		
				<view class="uni-title uni-common-pl">提醒时间</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
								<view class="uni-input">{{time}}</view>
							</picker>
						</view>
					</view>
				</view>
		
				<!-- <view class="uni-title uni-common-pl">日期选择器</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view> -->
				
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
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				time: '12:01',
				name:"",
				num:"",
				everyday:"",
				duration:""
			}
		},
		methods: {
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.detail.value)
			            this.index = e.detail.value
			        },
			        bindDateChange: function(e) {
			            this.date = e.detail.value
			        },
			        bindTimeChange: function(e) {
			            this.time = e.detail.value
			        },
			        getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        },
					
					
					
					
	async saveClick(){
			var obj={
				name:this.name,
				num:this.num,
				everyday:this.everyday,
				duration:this.duration,
				uid:uni.getStorageSync("userId"),
				time:this.time
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
		}
					
			
		},
		
		computed:{
			startDate() {
			            return this.getDate('start');
			        },
			        endDate() {
			            return this.getDate('end');
			        }
		}
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
