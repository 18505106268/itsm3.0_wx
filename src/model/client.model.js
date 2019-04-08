// 全局 api
import URL from '../util/parameters'
import bus from '../util/bus'

const qs = require('qs')
const axios = require('axios')

const $http = axios.create({
  baseURL: URL.axiosPath,
  timeout: 30000,
  responseType: 'json',
  withCredentials: true, // 允许携带cookie
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 序列化
$http.interceptors.request.use(
  config => {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 回调处理
const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      if (resp.data) {
        if (resp.data.loginTimeOut) return bus.$emit('goLogin')
        resolve(resp.data)
      }
    })
      .catch(err => {
        reject(err)
      })
  })
}

// api
export default {
  /*
  * 账户相关
  * */
  // 判断用户是否存在
  loginNameExist (data) {
    return handleRequest($http.post('/admin/loginName-exist', data))
  },
  // 登录
  login (data) {
    return handleRequest($http.post('/admin/login', data))
  },
  // 获取短信验证码
  sendVerifyCode (data) {
    return handleRequest($http.post('/admin/send-verify-code', data))
  },
  // 重置密码
  resetPassword (data) {
    return handleRequest($http.post('/admin/reset-password', data))
  },
  // 获取用户待办，处理，抄送
  getLeftMenu (data) {
    return handleRequest($http.post('admin/getLeftMenu', data))
  },
  // 获取用户数据和JSSDK
  getConfigData (data) {
    return handleRequest($http.post('wechat/getConfigData', data))
  },
  // 解除绑定
  unbind (data) {
    return handleRequest($http.post('/admin/unbind', data))
  },
  // 获取待办,已办，抄送列表
  undoOrDone (data) {
    return handleRequest($http.post('my-work/undoOrDone', data))
  },
  /*
  * 应用相关
  * */
  // 获取应用列表
  getApplicationList (data) {
    return handleRequest($http.post('selectMobile/getApplicationList', data))
  },
  // 获取应用下表单列表
  getFromListByApp (data) {
    return handleRequest($http.post('approve-index/getFormListByApp', data))
  },
  // 获取组织架构
  getAppointUserList (data) {
    return handleRequest($http.post('selectMobile/getAppointUserList', data))
  },
  // 获取相关服务请求列表
  getServers (data) {
    return handleRequest($http.post('servers-desk/serversChoose-table', data))
  },
  // 获取服务请求列表
  getServersDesk (data) {
    return handleRequest($http.post('servers-desk/serversDesk-table', data))
  },
  /*
  * 流程相关
  * */
  // 验证有没有流程
  checkProcessLimitMenu (data) {
    return handleRequest($http.post('/processUtilNew/checkProcessLimitMenu', data))
  },
  // 获取动态表单
  getFieldsInNode (data) {
    return handleRequest($http.post('/processUtilNew/getFieldsInNode', data))
  },
  // 动态提交表单
  dynamicSubmit (data) {
    return handleRequest($http.post(data.api, data.json))
  },
  // 获取数据源
  getDataListProcess (data) {
    return handleRequest($http.post('selectMobile/getDataListProcess', data))
  },
  // 提交下一节点人员选择
  processAssignTask (data) {
    return handleRequest($http.post('/processUtilNew/process_assignTask', data))
  },
  // 获取流转信息
  processCirculation (data) {
    return handleRequest($http.post('processUtilNew/process_circulation', data))
  },
  // 根据对应应用列表
  getCreateList (data) {
    return handleRequest($http.post('processUtilNew/getCreateList', data))
  },
  // 获取级联组件下一级数据
  getCascadeList (data) {
    return handleRequest($http.post(data.api, data.json))
  },
  /*
  * 服务请求
  * */
  // 获取类型
  getServersTypeList (data) {
    return handleRequest($http.post('selectRequest/getServersTypeList', data))
  },
  // 获取优先级
  getServersLevelList (data) {
    return handleRequest($http.post('selectRequest/getServersLevelList', data))
  },
  // 获取客户名称
  getCustList (data) {
    return handleRequest($http.post('selectRequest/getCustList', data))
  },
  // 保存服务请求
  saveServersDesk (data) {
    return handleRequest($http.post('servers-desk/saveServersDesk', data))
  },
  // 更新服务请求
  updateServers (data) {
    return handleRequest($http.post('servers-desk/updateServersDesk', data))
  },
  // 查询单个服务请求数据
  getServersDeskInfoByDeskId (data) {
    return handleRequest($http.post('servers-desk/getServersDeskInfoByDeskId', data))
  },
  // 保存当前选中服务请求
  saveRequestIndex (data) {
    return handleRequest($http.post('servers-desk/saveRequestIndex', data))
  },
  // 开始处理
  startDeal (data) {
    return handleRequest($http.post('servers-solution/start-deal', data))
  },
  // 处理结束
  finishDeal (data) {
    return handleRequest($http.post('servers-solution/finish-deal', data))
  },
  // 获取处理记录
  getSolutionList (data) {
    return handleRequest($http.post('servers-solution/getSolutionList', data))
  },
  // 获取问题类型
  getProblemTypeList (data) {
    return handleRequest($http.post('problemType/getProblemTypeList', data))
  }
}
