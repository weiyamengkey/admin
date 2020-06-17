import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from 'moment'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入面包屑组件
import myBrand from '@/components/brand_com'

Vue.config.productionTip = false;

import Axios from 'axios'
moment.locale('zh-cn')

//Vue全局面包屑组件
Vue.component(myBrand.name, myBrand)

//创建一个日期的全局过滤器
//Vue.filter('过滤器名',函数)
Vue.filter('date', function (t) {
   return moment(t).format("YYYY-MM-DD h:mm:ss a")
})

Vue.filter('levelFn', function (num) {
  let result = ''
  switch (num) {
    case '0' : result = '一级'; break;
    case '1' : result = '二级'; break;
    case '2': result = '三级'; break;
    default : result='没有级别'
  }
  
  return result;
})


//引入reset   @===src
import '@/assets/css/reset.css'

//全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  //some是数组的遍历方法，只要任意一个数组元素是true,就返回true
  if (to.matched.some(item => item.meta.Authorition)) {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  //记录我从哪个路由跳转到登录组件的
      })
    } else {
      next()
    }

  } else {
    next()
  }
})



//   if (to.meta.Authorition) {
//     if (!token) {
//       // next()
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//      }
//   } else {
//     next()
//   }
  
// })


Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
