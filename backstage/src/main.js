import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import './plugins/element.js'
import router from './router'
import http from 'network/request'

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.mixin({   //全局混入 这里的作用是给element-ui自带的ajax请求携带token
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
