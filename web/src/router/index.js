import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home.vue'
import About from 'views/About.vue'
import Main from 'views/Main.vue'
import Article from 'views/Article.vue'
import Hero from 'views/Hero.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        children: [
            {path: '/', component: Home},
            //props表示页面组件接收参数   所有在路径传的参数都可以成为Article组件参数
            {path: '/articles/:id', component: Article, props: true}
        ]
    },
    {
        path: '/heros/:id', 
        component: Hero, 
        props: true
    }
]

const router = new VueRouter({
    routes
})

export default router

