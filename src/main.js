/* -------入口文件 --------*/
/* eslint-disable */
// 引入Vue
import Vue from 'vue'
//引入App组件，所有组件的父组件
import App from './App.vue'
//
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.css'
// 引入store
import store from './store'
// 引入路由器
import router from './router'


Vue.prototype.$axios = axios
Vue.use(VueAxios, axios);
Vue.use(VueRouter)
//关闭生产提示
Vue.config.productionTip = false

//创建Vue实例对象---vm
const vm = new Vue({
  // el: '#app',
  //将App组件放入容器中
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')