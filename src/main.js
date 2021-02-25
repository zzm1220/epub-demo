/*
 * @Author: zhimin
 * @Date: 2021-02-20 16:29:19
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-23 14:03:50
 * @FilePath: \books\demo\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/global.scss'
import './assets/styles/font.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
