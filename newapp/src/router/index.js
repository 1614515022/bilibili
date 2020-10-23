import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import register from "@/views/register"
import login from "@/views/login"
import userinfo from "@/views/userinfo"
import edit from "@/views/edit"
import article from "@/views/article"
import search from "@/views/search"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive: true
    }
  },
  {
    path:"/register",
    component:register
  },
  {
    path:"/article/:id",
    component:article
  },
  {
    path:"/search",
    component:search
  },
  {
    path:"/login",
    component:login
  },
  {
    path:'/userinfo',
    component:userinfo,
    meta:{
      isLogin:true
    }
  },
  {
    path:"/edit",
    component:edit
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  if(!localStorage.getItem("id")&&!localStorage.getItem("token")&&to.meta.isLogin==true){
    router.push("/login")
    Vue.prototype.$msg.fail("请先登录")
    return
  }
  next()
})

export default router
