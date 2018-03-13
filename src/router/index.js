import Vue from 'vue'
import Router from 'vue-router'
const mainPage = () => import('@/views/mainPage')
const NotFoundComponent = () => import('@/views/NotFoundComponent')
const message = () => import('@/views/message')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: mainPage,
      children: [
        { path: '', name: 'message', component: message },
        { path: '/message', name: 'message', component: message }
      ]
    },
    {
      path: '*', component: NotFoundComponent
    }
  ]
})
