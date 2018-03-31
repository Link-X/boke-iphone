import Vue from 'vue'
import Router from 'vue-router'
const mainPage = () => import('@/views/mainPage')
const NotFoundComponent = () => import('@/views/NotFoundComponent')
const message = () => import('@/views/message')
const friend = () => import('@/views/friend')
const blog = () => import('@/views/blog')
const myPage = () => import('@/views/myPage')
const addFriend = () => import('@/views/addFriend')
const singUp = () => import('@/views/singUp')
const roomlist = () => import('@/views/roomlist')
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
        { path: '/myPage', name: 'myPage', component: myPage },
        { path: '/addFriend', name: 'addFriend', component: addFriend },
        { path: '/roomlist', name: 'roomlist', component: roomlist }
      ]
    },
    { path: '/singUp', name: 'singUp', component: singUp },
    {
      path: '*', component: NotFoundComponent
    }
  ]
})
