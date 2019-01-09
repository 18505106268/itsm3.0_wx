import Vue from 'vue'
import Vuex from 'vuex'

// 底层状态
import common from './common/common'
// 账户相关
import account from './account/account'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  // strict 开发环境设置为true将无法从外部修改Store数据
  strict: debug,
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
    // }
  ],
  modules: {
    common: common,
    account: account
  }
})

export default store
