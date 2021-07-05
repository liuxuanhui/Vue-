import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
    baseURL: "http://localhost:3000/backstage/api"
})

//请求拦截器  每次请求都会带上token
http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        //行业规范:类型+空格+token   Bearer是类型  Authorization译为授权
      config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

//响应拦截器  统一处理错误信息(不需要每个页面都做处理)
http.interceptors.response.use(res => {
    //请求成功什么都不做
    return res  
}, err => {
    //与后端协商  将错误信息写在message中 见router/index.js
    if(err.response.data.message) {
        Vue.prototype.$message({    //$message是element-ui提供
            type: 'error',
            message: err.response.data.message
        })
    }
    if(err.response.status === 401) {   //401状态码是需要重新登录的
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http