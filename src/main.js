import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// element框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 日期
import moment from 'moment'
moment.locale('zh-cn')

import store from "./store";

import Axios from 'axios'
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

//全局过滤器（日期）
Vue.filter('date', function (t) {
   return moment(t).format("YYYY-MM-DD h:mm:ss a")
})


//引入reset
import '@/assets/css/reset.css'

//全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  const token = localStorage.getItem('token');
  if (to.meta.Authorition) {
    if (token) {
       next()
    } else {
      router.push({name:'Login'})
     }
  } else {
    next()
  }
  
})

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
