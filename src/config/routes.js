export default [
  {
    path: '/',
    meta: {
      index: 0
    }
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  // 忘记密码
  {
    name: 'find',
    path: '/find',
    component: () => import('../views/find/find.vue')
  },
  // 验证并重置密码
  {
    name: 'check',
    props: true,
    path: '/check/:loginName',
    component: () => import('../views/check/check.vue')
  }
]
