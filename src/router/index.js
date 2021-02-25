/*
 * @Author: zhimin
 * @Date: 2021-02-20 16:29:19
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-23 10:14:23
 * @FilePath: \books\demo\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/epub'
  },
  {
    path: '/epub',
    name: 'EPub',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "epub" */ '../views/EPub.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
