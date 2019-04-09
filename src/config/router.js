import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// import bus from '../util/bus'
// 后期登录拦截使用,如果用户token过期需要登录调用
// bus.$emit('goLogin')

const router = new Router({
  routes,
  mode: 'hash',
  // base: '/base/' 默认增加一个路径，
  // 路由跳转全局样式配置
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  // 页面跳转时是否要滚动
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // 保持滚轮位置
      return savedPosition
    } else {
      return {
        x: 0, y: 0
      }
    }
  },
  parseQuery (query) {
    return query
    // 字符串转JSON OBJ
  },
  stringifyQuery (obj) {
    return obj
    // JSON OBJ转字符串
  },
  // 浏览器不支持history 自动套hash
  fallback: true
})

export default router
