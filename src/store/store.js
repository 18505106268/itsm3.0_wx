import Vue from 'vue'
import Vuex from 'vuex'
// import vuexRouterInterceptor from '../config/vuexRouterInterceptor'

// 用户

const isDev = process.env.NODE_ENV === 'development'
Vue.use(Vuex)

const store = new Vuex.Store({
  // strict 开发环境设置为true将无法从外部修改Store数据
  strict: isDev,
  plugins: [
    // (store) => {
    // 监听store某个数据变化后的回调
    // store.watch((state) => state.test.num, (newNum) => {
    //   console.log('newNum ==>', newNum)
    // })

    // 订阅：拿到所有mutation的变化，每次每一个mutation被调用都会提供回调函数
    // store.subscribe((mutation, state) => {
    //   console.log('mutation.type === >', mutation.type)
    //   console.log('mutation.payload === >', mutation.payload)
    // })

    // 订阅：拿到所有action的变化，每次每一个action被调用都会提供回调函数
    // store.subscribeAction((action, state) => {
    //   console.log('action.type === >', action.type)
    //   console.log('action.payload === >', action.payload)
    // })
    // },
    // 路由全局加载
    // vuexRouterInterceptor()
  ],
  modules: {
    // 用户
    // user: {
    //   namespaced: true,
    //   state: userState,
    //   mutations: userMutation,
    //   getters: userGetter,
    //   actions: userAction
    // }
  }
})

export default store
