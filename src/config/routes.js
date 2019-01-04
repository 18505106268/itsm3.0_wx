export default [
  {
    path: '/',
    meta: {
      index: 0
    }
  },
  {
    name: '登录',
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    name: '忘记密码',
    path: '/find',
    component: () => import('../views/find/find.vue')
  }
]
