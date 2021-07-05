import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'assets/base.css'
import 'assets/iconfont/iconfont.css' //字体图标

//轮播图是用 vue-awesome-swiper做的
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'   //导入轮播图样式
Vue.use(VueAwesomeSwiper)   

//全局组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import http from 'network/request'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
