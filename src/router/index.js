import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }


import Home from "../views/Home.vue";

//路由懒加载的写法  @===src
const Login=()=>import('@/views/login/index.vue')
const UserList=()=>import('@/views/userlist/index.vue')
const RoleList=()=>import('@/views/rolelist/index.vue')
const RightList=()=>import('@/views/rightlist/index.vue')
const GoodsList=()=>import('@/views/goods/goodslist/index.vue')
const GoodsAdd=()=>import('@/views/goods/goodsadd/index.vue')


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
      Authorition: true
    },
    children: [
      { path: '', component: UserList},
      { path: '/rolelist', component: RoleList},
      { path: '/rightlist', component: RightList},
      { path: '/goodslist', component: GoodsList},
      { path: '/goodsadd', component: GoodsAdd},
      
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
