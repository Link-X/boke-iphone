// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import lazyLoad from 'vue-lazyload'
import '@/utils/rem.js'
import './utils/global.css'
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
import VueSocketio from 'vue-socket.io'
Vue.config.productionTip = false

Vue.use(vant)
Vue.use(VueSocketio, 'http://127.0.0.1:5003')

Vue.use(lazyLoad, {
  preLoad: 1.3,
  loading: '/static/sys/loading.gif',
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App />'
})
