import Vue from 'vue'
import Router from 'vue-router'
const mainPage = () => import('@/views/mainPage')
const NotFoundComponent = () => import('@/views/NotFoundComponent')
const message = () => import('@/views/message')
const friend = () => import('@/views/friend')
const blog = () => import('@/views/blog')
const activity = () => import('@/views/activity')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: mainPage,
      children: [
        { path: '', name: 'message', component: message },
        { path: '/message', name: 'message', component: message },
        { path: '/friend', name: 'friend', component: friend },
        { path: '/blog', name: 'blog', component: blog },
        { path: '/activity', name: 'activity', component: activity }
      ]
    },
    {
      path: '*', component: NotFoundComponent
    }
  ]
})
