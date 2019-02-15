import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import store from './store'
import VueRouter from 'vue-router'
import parameters from './util/parameters'

import router from './config/router'
import bus from './util/bus'
import App from './App.vue'

import { Lazyload, Dialog } from 'vant'

import './assets/styles/global.scss'

Vue.config.productionTip = false

Vue.use(Lazyload)
Vue.use(Dialog)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta'
})

Object.defineProperty(Vue.prototype, 'imgPath', { value: parameters.imgPath })

const FastClick = require('fastclick')
FastClick.attach(document.body)

store.registerModule('interlude', {
  state: {
    direction: ''
  },
  mutations: {
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', { direction: 'forward' })
    } else {
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', { direction: '' })
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', { direction: 'forward' })
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  // console.log('跳转前 beforeResolve')
  next()
})

router.afterEach((to, from) => {
  // console.log('跳转后 afterEach')
})

// 全局登录拦截监听
bus.$on('goLogin', () => {
  router.push('/login')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
