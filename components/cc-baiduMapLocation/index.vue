<template>
	<view class="content">

		<!-- 百度地图组件  @ready： 处理数据刷新 -->
		<baidu-map class="bm-view" :center="centerPoint" :zoom=10 @ready="handler">
			<!-- 百度地图定位点 -->
			<bm-marker :position="locPoint" :dragging="true" @click="infoWindowOpen">

				<!-- 百度地图遮罩物 -->
				<bm-info-window style="border: none !important; border-radius: 4px !important;" :show="show"
					@close="infoWindowClose" @open="infoWindowOpen">
					{{locName}}
				</bm-info-window>

			</bm-marker>
		</baidu-map>



		<view style="height: 20px;"></view>
	</view>
</template>

<script>
	import Vue from 'vue'
	// 引入百度地图
	import BaiduMap from 'vue-baidu-map'
	// 引入百度地图定位瞄点
	import {
		BmlMarkerClusterer,
	} from 'vue-baidu-map'

	Vue.use(BaiduMap, {
		// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
		ak: 'dEctYrTTeVr76ANfzG7XwYZGPj'
	});
	export default {
		components: {

			BmlMarkerClusterer,

		},
		data() {

			return {

				centerPoint: {
					lng: 113.282202,
					lat: 23.13771
				},
				locPoint: {

				},
				locName: "我的位置",
				show: false
			}
		},

		methods: {
			handler({
				BMap,
				map
			}) {
				console.log(BMap, map)

				this.getLocation();


			},
			getLocation() {
				let _this = this
				console.log('获取定位');
				uni.getLocation({
					type: 'gcj02',
					isHighAccuracy: true,
					success: function(res) {

						_this.locPoint = {
							'lng': res.longitude,
							'lat': res.latitude
						};

						var point = new BMap.Point(res.longitude, res.latitude);
						var gc = new BMap.Geocoder();
						gc.getLocation(point, function(rs) {

							// 获取地址组成
							let addressDict = rs.addressComponents;
							// 拼接地址
							_this.locName = addressDict.province + addressDict.city + addressDict
								.district + addressDict.street + addressDict.streetNumber;

							// 弹框显示信息
							uni.showModal({
								title: '定位坐标转地址',
								content: "地址信息 = " + JSON.stringify(rs)
							})
						});
					},
					fail: function(res) {
						console.log(res);
					},
				});
			},
			infoWindowClose() {
				this.show = false
			},
			infoWindowOpen() {
				this.show = true
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		margin-top: 80rpx;
		align-items: center;
		justify-content: center;
	}

	.bm-view {
		margin-left: 0%;
		width: 100%;
		margin-top: 10px;
		color: #999999;
		height: 90vw;
	}
</style>