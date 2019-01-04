import model from '../../../model/client.model'

// 错误处理
const handleError = (err) => {
  console.error('userAction.js  ==== >', err)
  // ...逻辑
}

export default {
  // 判断用户是否存在
  loginNameExist ({ state, commit, rootState }, data) {
    return new Promise((resolve, reject) => {
      model.loginNameExist(data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          // 异常处理
          handleError(err)
          reject(err)
        })
    })
  },
  // 登录
  login ({ state, commit, rootState }, data) {
    return new Promise((resolve, reject) => {
      model.login(data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          // 异常处理
          handleError(err)
          reject(err)
        })
    })
  }
}
