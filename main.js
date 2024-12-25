
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
123
uni.addInterceptor('request', {
  invoke(args) {
    if (!args.url.startsWith('http')){
      args.url = 'http://47.113.220.124:8088' + args.url;
    }
    // args.url = 'http://47.113.220.124:8080' http://81.70.243.2:8088 + args.url;
    // args.url = 'http://localhost:8088' + args.url;
    return args;
  }
});

uni.$showMsg=function(title='数据请求失败！',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
uni.$show=function(title='数据加载中！',duration=1500){
  uni.showLoading({
    title:"数据加载中..."
  })
}

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif