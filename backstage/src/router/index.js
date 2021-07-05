import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from 'views/Main.vue'
import Login from 'views/Login.vue'

import CategoryCreate from 'views/CategoryCreate.vue'
import CategoryList from 'views/CategoryList.vue'
import ItemCreate from 'views/ItemCreate.vue'
import ItemList from 'views/ItemList.vue'
import HeroCreate from 'views/HeroCreate.vue'
import HeroList from 'views/HeroList.vue'
import ArticleCreate from 'views/ArticleCreate.vue'
import ArticleList from 'views/ArticleList.vue'
import AdCreate from 'views/AdCreate.vue'
import AdList from 'views/AdList.vue'
import AdminUserCreate from 'views/AdminUserCreate.vue'
import AdminUserList from 'views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/login', component:Login, meta: { isPublic: true }},
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CategoryCreate
      },
      {
        path: '/categories/edit/:id',
        component: CategoryCreate
      },
      {
        path: '/categories/list',
        component: CategoryList
      },


      {
        path: '/items/create',
        component: ItemCreate
      },
      {
        path: '/items/edit/:id',
        component: ItemCreate
      },
      {
        path: '/items/list',
        component: ItemList
      },


      {
        path: '/heroes/create',
        component: HeroCreate
      },
      {
        path: '/heroes/edit/:id',
        component: HeroCreate
      },
      {
        path: '/heroes/list',
        component: HeroList
      },


      {
        path: '/articles/create',
        component: ArticleCreate
      },
      {
        path: '/articles/edit/:id',
        component: ArticleCreate
      },
      {
        path: '/articles/list',
        component: ArticleList
      },


      {
        path: '/ads/create',
        component: AdCreate
      },
      {
        path: '/ads/edit/:id',
        component: AdCreate
      },
      {
        path: '/ads/list',
        component: AdList
      },
      
      {
        path: '/admin_users/create',
        component: AdminUserCreate
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserCreate
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

//导航守卫
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
