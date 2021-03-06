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
  // 忘记密码
  {
    name: 'find',
    path: '/find',
    component: () => import('../views/find/find.vue')
  },
  // 忘记密码 > 验证并重置密码
  {
    name: 'check',
    props: true,
    path: '/check/:loginName',
    component: () => import('../views/check/check.vue')
  },
  // 我的 > 解除绑定
  {
    name: 'relieve',
    path: '/info/relieve',
    component: () => import('../views/info/relieve/relieve.vue')
  },
  // 底部导航页
  {
    name: 'tab',
    path: '/tab',
    component: () => import('../views/tab/tab.vue'),
    children: [
      // 底部导航页 > 首页
      {
        name: 'home',
        path: 'home',
        component: () => import('../views/home/home.vue')
      },
      // 底部导航页 > 我的 > 解除绑定
      {
        name: 'relieve',
        path: 'info/relieve',
        component: () => import('../views/info/relieve/relieve.vue')
      }
    ]
  },
  // 表单列表
  {
    name: 'menuList',
    props: true,
    path: '/menuList/:id',
    component: () => import('../views/menuList/menuList.vue')
  },
  // 新增
  {
    name: 'add',
    props: true,
    path: '/add/:ids',
    component: () => import('../views/add/add.vue')
  },
  // 查看
  {
    name: 'see',
    props: true,
    path: '/see/:ids',
    component: () => import('../views/see/see.vue')
  },
  // 待办，已办，抄送
  {
    name: 'agenda',
    props: true,
    path: '/agenda/:ids',
    component: () => import('../views/agenda/agenda.vue')
  },
  // 详情，查看
  {
    name: 'agenda',
    props: true,
    path: '/progressDetail/:ids',
    component: () => import('../views/progressDetail/progressDetail.vue')
  },
  // 固定表模块：服务请求
  {
    name: 'request',
    path: '/request',
    component: () => import('../views/request/request.vue')
  },
  // 服务台列表 > 新建服务请求
  {
    name: 'addRequest',
    props: true,
    path: '/addRequest/:id',
    component: () => import('../views/request/addRequest/addRequest.vue')
  }
]
