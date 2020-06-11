import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


import Home from "../views/Home.vue";

//路由懒加载的写法
const Login=()=>import('@/views/login/index.vue')
const userList=()=>import('@/views/userlist/index.vue')


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {//设置路由元数据
      Authorition:true
    },
    children: [
      { path: '', component: userList}
    ]
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
