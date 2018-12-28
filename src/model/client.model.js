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
  // 测试接口
  getTestApi (data) {
    return handleRequest($http.post('/admin/loginName-exist', data))
  }
}
