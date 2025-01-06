<template>
	<view class="login">
		<view class="login-title">乐天伦养老服务平台</view>
				<view class="login-content">
					<view class="login-username">
						<i class="el-icon-user"></i>
						<input type="text" placeholder="请输入账号" v-model="username">
					</view>
					<view class="login-password">
						<i class="el-icon-key"></i>
						<input type="password" name="" id="" placeholder="请输入密码" v-model="password">
					</view>
				</view>
				<view class="button"><button @click="onsubmit">登录</button></view>
				<!-- <view class="login-botton">
					<view class="login-password" >找回密码</view>
					<span>|</span>
					<view class="login-zhuce" @click="Registration">注册账号</view>
				</view> -->
				<!-- 其他的登录方式 -->
				<view class="login-other">
					<view class="login-top">
						账号：admin 密码：123456
					</view>
				
				</view>
	</view>
</template>

<script>
  import {
  	mapMutations,mapState
  } from 'vuex';
	export default {
    onLoad() {
      if(uni.getStorageSync('hasLogin')==true){
        uni.switchTab({
        	url:"/pages/home/home"
        })
      }
    },
    computed: {
    	...mapState(['hasLogin'])
    },
		data() {
			return {
				username:'',
				password:'',
			}
		},
		methods: {
      ...mapMutations(['login']),
		  async onsubmit(){
				var obj={
					username:this.username,
					password:this.password
				}
				const res= await uni.request({
				  method:'POST',
				  url:"/user/login",
				  data:obj
				});
				console.log(res[1]);
				// uni.setStorage("username",res[1].data.name);
				// uni.setStorage("userId",res[1].data.uid);
				uni.setStorageSync('username', res[1].data.name);
				uni.setStorageSync('userId', res[1].data.userId);

				if(res[1].statusCode=="200"){
					// console.log(123)
          this.login()
					uni.switchTab({
						url:"/pages/home/home"
					})
				}else{
          uni.showToast({
            title: '"用户名或密码不正确"',
            icon: 'none',
            duration: 2000
          })
        }
			}
		}
	}
</script>

<style lang="less">
.login {
	 // background-image: linear-gradient(120deg, #05ee28, #6a3dad);
	 background-color: #fff;
	width: 100%;
	background-position: center;
	background-size: cover;
	// background-color: #464646;
	margin:0px;
	background-size:100% 100%;
	background-attachment:fixed;
	height: 1535rpx;
	opacity: 0.8;
	.login-title {
		padding-top: 150rpx;
		display: flex;
		justify-content: flex-start;
		margin-left: 50rpx;
		font-weight: 700;
		font-size: 40rpx;
		color: #11cd6e;
		letter-spacing: 5rpx;
		margin-bottom: 50rpx;
	}
	.login-content{
		.login-username{
			display: flex;
			align-items: center;
		    margin: 0 50rpx;
			border-bottom: 1rpx solid gainsboro;
			input{
				padding: 10rpx;
				height: 60rpx;
				width: 80%;
			}
			i {
				color: #11c53e;
				padding-right: 20rpx;
				font-size: 50rpx;
			}
		}
		.login-password{
			display: flex;
			align-items: center;
		    margin: 0 50rpx;
			border-bottom: 1rpx solid gainsboro;
			margin-top: 50rpx;
			input{
				padding: 10rpx;
				height: 60rpx;
				width: 80%;
			}
			i {
				color: #11c53e;
				padding-right: 20rpx;
				font-size: 50rpx;
			}
		}
	}
	.button{
		margin-top: 120rpx;
		
		button{
			background-color:#11c53e;
			width: 90%;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
		}
	}
	.login-botton{
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
		.login-password{
			padding: 0 15rpx;
			color: #11c53e;
		}
		.login-zhuce{
			padding: 0 15rpx;
			color: #11c53e;
		}
	}
	.login-other{
		position: absolute;
		bottom: 100rpx;
	    left: 37%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.login-top{
			text-align:center;
		}
		.login-icon{
			display: flex;
			justify-content: space-between;
			margin-top: 50rpx;
			image{
				width: 80rpx;
			}
		}
	}
	
}
</style>
