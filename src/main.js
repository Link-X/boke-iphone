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

// import 'vant/lib/vant-css/base.css'
// import 'vant/lib/vant-css/button.css'
Vue.config.productionTip = false

Vue.use(vant)
// .use(Col)
// .use(Button)
// .use(Field)
// .use(Icon)
// .use(NavBar)
// .use(Tabbar)
// .use(TabbarItem)
// .use(CellSwipe)

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
  template: '<App/>'
})
