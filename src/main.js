import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'

import router from './config/router'
import store from './store/store'
import bus from './util/bus'
import App from './App.vue'

import './assets/styles/global.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta'
})

const FastClick = require('fastclick')
FastClick.attach(document.body)

// 全局登录拦截监听
bus.$on('goLogin', () => {
  router.push('/login')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
