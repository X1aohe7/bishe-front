import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		// userInfo: {},
	},
	mutations: {
		login(state) {

			state.hasLogin = true;
			// state.userInfo = provider;
			// uni.setStorage({//缓存用户登陆状态
			//     key: 'userInfo',  
			//     data: provider  
			// }) 
      uni.setStorageSync('hasLogin', true);
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			// state.userInfo = {};
      uni.setStorageSync('hasLogin', false);
			uni.removeStorage({  
          key:'userName'
      });
			uni.removeStorage({
			    key:'userId',
			})
		}
	},
	actions: {
	
	}
})

export default store
