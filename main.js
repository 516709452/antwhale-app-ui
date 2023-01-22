
// #ifndef VUE3
import Vue from 'vue'

import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(plugins)

App.mpType = 'app'

const app = new Vue({ ...App })
app.$mount()
// #endif
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 创建引入阿里云播放文件
// function loadScriptString(src) {
// 	var script = document.createElement('script') //创建一个script标签
// 	script.charset = 'utf-8'
// 	script.type = 'text/javascript'
// 	script.src = src
// 	document.getElementsByTagName('head')[0].appendChild(script)
// 	console.log("阿里云播放器js脚本加载完毕")
// }

// function loadLinkString(src) {
// 	var link = document.createElement('link') //创建一个link标签
// 	link.rel = 'stylesheet'
// 	link.href = src
// 	document.getElementsByTagName('head')[0].appendChild(link)
// 	console.log("阿里云播放器css样式加载完毕")
// }
// // 使用阿里云播放器
// loadLinkString('https://g.alicdn.com/de/prismplayer/2.13.2/skins/default/aliplayer-min.css')
// loadScriptString('https://g.alicdn.com/de/prismplayer/2.13.2/aliplayer-min.js')

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
// #endif