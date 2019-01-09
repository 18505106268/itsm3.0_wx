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
  },
  {
    name: '验证并重置密码',
    props: true,
    path: '/check/:loginName',
    component: () => import('../views/check/check.vue')
  }
]
