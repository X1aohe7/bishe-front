<template>
  <view>
    <view class="two">
    		  <view class="sectionBox">
            <p>联系人:<input v-model="name"  type="text" placeholder="请在此输入姓名"/></p>
            <p>联系电话:<input v-model="phone"  type="text" placeholder="请在此输入电话"/></p>
    			<view class="sectionType">选择地址：</view>
    			<picker mode="region" @change="regionChange" :value="region">
    				<view class="picker">
    					当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
    				</view>
    				
    			</picker>
    			<p>详细地址:<input v-model="detail"  type="text" placeholder="请在此输入地址"/></p>
    		</view>
    		<text class="btn" @click="sureClick">确认</text>
    	  </view>	
  </view>
</template>

<script>
  export default {
     data() {
      return {
        addressId:-1,
        name:"",
        phone:"",
        detail:"",
        // 省市区选择器
        region: ['请选择', '请选择', '请选择'],
      }
     },
     onLoad(option) {
       this.addressId=option.addressId
       uni.request({
         method:"GET",
         url:"/address/getByAddressId",
         data:{addressId:this.addressId}
       }).then(res=>{
         const data = res[1].data;
         
         // 将返回的数据赋值到页面的字段
         this.name = data.name || "";
         this.phone = data.phone || "";
         this.region = data.position ? data.position.split(",") : ["请选择", "请选择", "请选择"];
         this.detail = data.detail || "";
         console.log(res)
       }).catch(err=>{
         uni.showToast({
           icon:'error',
           title:"出现错误！"
         })
         uni.navigateBack()
       })
       
     },
     methods: {
       
      // 省市区选择器
      regionChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.region = e.detail.value;
      },
      
      async  sureClick(){
        if (this.name === "") {
                uni.showToast({
                    title: '联系人姓名不能为空！',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
            if (this.phone === "") {
                uni.showToast({
                    title: '联系人电话不能为空！',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
            if (this.detail === "") {
                uni.showToast({
                    title: '联系人详细地址不能为空！',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
            if (this.region.join(",") === "请选择,请选择,请选择") {
                uni.showToast({
                    title: '请选择完整的省市区地址！',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
          // console.log("通过校验")
        var obj={
          addressId:this.addressId,
          position:this.region.join(","),
          name:this.name,
          phone:this.phone,
          detail:this.detail,
          userId:uni.getStorageSync("userId")
        }
        const res= await uni.request({
          method:'PUT',
          url:"/address/update",
          data:obj
        });
        // console.log(res)
        if(res[1].statusCode==200){
          uni.showToast({
            title: res[1].data,//标题 必填
            icon: 'none',//图标
            duration:2000
          });
          // 延迟返回
          setTimeout(() => {
              uni.navigateBack();
          }, 2000); // 等待提示框显示时间后再返回
        }else{
          uni.showToast({
            title: "添加失败，请重试",//标题 必填
            icon: 'fail',//图标
          });
        }
        
      }
    },
  }
</script>

<style>
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
	  font-size: 4vw;
	
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
