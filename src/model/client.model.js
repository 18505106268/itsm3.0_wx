// 全局 api
import URL from '../util/parameters'

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
        // if (resp.data.loginTimeOut) return bus.$emit('goLogin')
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
  }
}
