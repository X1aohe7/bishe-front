<template>
	<view>
<!-- 	  <view class="two">
		  <view class="sectionBox">
			<view class="sectionType">选择地址：</view>
			<picker mode="region" @change="regionChange" :value="region">
				<view class="picker">
					当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
				</view>
				
			</picker>
			<p>详细地址:<input v-model="address"  type="text"/></p>
		</view>
		<text class="btn" @click="sureClick">确认</text>
	  </view>	 -->
		<div class="two" @click="gotoUserAddress">
        <h5>上门服务至：</h5>
        <div class="order-info-address">
          <p>{{deliveryAddress!=""?deliveryAddress.position+(deliveryAddress.detail != null ? deliveryAddress.detail : ''):'请选择地址'}}</p>
          <p>></p>
        </div>
        <p>{{deliveryAddress!=""?deliveryAddress.name:''}}{{deliveryAddress!=""?deliveryAddress.phone:''}}</p>
		</div>
    <view class="two two1">
     <uni-section title="选择服务方式" type="line">
     			<view class="uni-px-5 uni-pb-5">
     				<uni-data-checkbox v-model="serviceWay" :localdata="way"></uni-data-checkbox>
     			</view>
     		</uni-section>
    </view>
    <view class="two two1" v-if="serviceWay==1">
    <uni-section :title="'预约时间：'" type="line"></uni-section>
    		<view class="example-body">
    			<uni-datetime-picker type="datetime" value-format="yyyy-MM-dd HH:mm"  :start="formattedDateTime"
  :end="endTime" v-model="formattedDateTime" @change="changeLog" />
    		</view>
        
    </view>
	 <view class="two two1">
		 <text>服务人员:</text>
		 <text>{{obj.nurseName}}</text>
	 </view>
	 
	 <!-- <view class="two two1">
		 <text>服务开始时间:</text>
		 <text>{{formattedDateTime}}</text>
	 </view> -->
	 
	 <view class="two" style="display: flex; justify-content: flex-end;">
		 <text>小计: ￥{{obj.price}}</text>
	 </view>
	 
	 <view class="two">
		 <text>备注:</text>
		 <textarea v-model="remark"  placeholder="有什么想对服务人员说的"/>
	 </view>
	 
	 
	 <view class="two two1">
		 <text>￥{{obj.price}}</text>
		 <text class="btn" @click="payClick">确认支付</text>
	 </view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				index: 0, //默认索引
				objectIndex: 0, //默认索引
				multiIndex: [0, 0],
				// 省市区选择器
				region: ['请选择', '请选择', '请选择'],
				formattedDateTime:"",
				remark:"",
				obj:{},
				deliveryAddress:null,
        price:"",
        serviceWay:0,
        way: [{
        					text: '立即上门',
        					value: 0
        				}, {
        					text: '预约',
        					value: 1
        				}],
        endTime:""
			}
        
		},
		onLoad(options) {
			console.log( JSON.parse(options.data));
			this.obj=JSON.parse(options.data);
      this.deliveryAddress=uni.getStorageSync("deliveryAddress");
      console.log(this.deliveryAddress,666);
		},
    onShow() {
      this.deliveryAddress=uni.getStorageSync("deliveryAddress");
      console.log(this.deliveryAddress,666);
    },
		
		created() {
			// 创建一个 Date 对象，它将包含当前日期和时间  
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
			      this.formattedDateTime = `${year}-${month}-${formattedDay} ${hours}:${formattedMinutes}:${formattedSeconds}`;  
			        
			      // 打印或显示当前日期和时间  
			      // console.log(formattedDateTime);  
			      // 在页面上显示当前日期和时间（可根据需要修改显示方式）  
			      // this.$u.alert(formattedDateTime);  
            // const endDateTime = new Date();
              
            
            // 设置结束时间：当前时间 + 7 天
            const endDateTime = new Date(currentDateTime); // 创建当前时间的副本
            endDateTime.setDate(currentDateTime.getDate() + 7); // 增加 7 天
            
            // 格式化结束时间
            const endYear = endDateTime.getFullYear();
            const endMonth = (endDateTime.getMonth() + 1).toString().padStart(2, '0'); // 补零
            const endDay = endDateTime.getDate().toString().padStart(2, '0'); // 补零
            const endHours = endDateTime.getHours().toString().padStart(2, '0'); // 补零
            const endMinutes = endDateTime.getMinutes().toString().padStart(2, '0'); // 补零
            const endSeconds = endDateTime.getSeconds().toString().padStart(2, '0'); // 补零
            
            this.endTime = `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}:${endSeconds}`;
			

		},
		methods: {
      changeLog(){
        // console.log(this.formattedDateTime)
      },
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
        this.formattedDateTime = `${year}-${month}-${formattedDay} ${hours}:${formattedMinutes}:${formattedSeconds}`;  
      },
      gotoUserAddress(){
        uni.navigateTo({
          url:"/pages/userAddress/userAddress"
        })
      },
      
			// 省市区选择器
			regionChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region = e.detail.value;
			},
			
			// async  sureClick(){
			// 	var obj={
			// 		name:this.region.join(",")+this.address,
			// 		linkman:"",
			// 		phone:"123456",
			// 		uid:uni.getStorageSync("userId")
			// 	}
			// 	const res= await uni.request({
			// 	  method:'POST',
			// 	  url:"/address/add",
			// 	  data:obj
			// 	});
			// 	console.log(res)
			// 	uni.showToast({
			// 		title: res[1].data,//标题 必填
			// 		icon: 'none',//图标
			// 	});
			// },
			async payClick(){
							var obj={
								addressId:this.deliveryAddress.addressId,
								// time:this.formattedDateTime,
								// phone:"123456",
								userId:uni.getStorageSync("userId"),
								nursingId:this.obj.nursingId,
								nurName:this.obj.nurseName,
								remark:this.remark,
                price:this.obj.price
							}
              // console.log(this.serviceWay)
              if(this.serviceWay==0){
                this.getCurrentTime()
                obj.time=this.formattedDateTime
              }else{
                obj.time=this.formattedDateTime
              }
              console.log(obj)
              
							uni.request({
							  method:'POST',
							  url:"/orders/add",
							  data:obj
							}).then(res=>{
                console.log(res);
                const id=res[1].data.id
                obj.ordersId=id;
                if(res[1].data.message=="成功"){
                	uni.showToast({
                		title:"成功",
                		icon:"success",
                    duration: 1500, // 显示时间设置为1.5秒
                    mask: true // 遮罩防止用户操作
                    })
                	setTimeout(() => {
                		// console.log(this.deliveryAddress)
                		uni.redirectTo({
                		   // url:"/pages/evluate/evluate?nid="+obj.nursingId+"&address="+this.deliveryAddress.position+this.deliveryAddress.detail+"&nurseName="+obj.nurName+"&price="+obj.price+"&id="+id
                       url:"/pages/myOrderDetail/myOrderDetail?data="+JSON.stringify(obj)
                	   })
                	},1500)
                }
              }).catch(err=>{
                uni.showToast({
                	title:"后台出错，请稍后再试",
                	icon:"error",
                  mask: true // 遮罩防止用户操作
                  })
              })
							
            
              
							
							
						}
		}
	}
</script>
 
<style scoped>
	.sectionBox {
		margin-bottom: 40rpx;
	}
 
	.sectionType {
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	
	
	
	.two{
		width: 90%;
		
		margin: 0 auto;
		padding: 20rpx;
		background: white;
		margin-top: 20rpx;
	}

	.two h5{
	  font-size: 3vw;
	  font-weight: 300;
	}
	.two .order-info-address{
	  width: 100%;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-weight: 700;
	  user-select: none;
	  cursor: pointer;
	  margin: 1vw 0;
	}
	.two .order-info-address p{
	  //width: 90%;
	  font-size: 5vw;
	}
	
	
	.two .order-info-address i{
	  font-size: 6vw;
	}
	.two p{
	  font-size: 3vw;
	
	}
	
	
	
	.two1{
		display: flex;
		justify-content: space-between;
	}
	
	.btn{
		display: inline-block;
		width: 180rpx;
		height: 69rpx;
		background: red;
		color: white;
		text-align: center;
		line-height: 69rpx;
		border-radius: 12rpx;
	}
</style>