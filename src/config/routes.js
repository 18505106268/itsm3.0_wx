export default [
  {
    path: '/'
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  // 首页
  {
    name: 'home',
    path: '/home',
    component: () => import('../views/home/home.vue')
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
