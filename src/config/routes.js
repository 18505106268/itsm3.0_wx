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
  }
]
