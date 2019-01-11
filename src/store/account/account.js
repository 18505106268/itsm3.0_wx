import {
  SET_SERVE_CODE,
  SET_COMPANY_ID,
  SET_OPEN_ID,
  SET_LOCATION,
  SET_NICKNAME,
  SET_HEAD_IMG_URL,
  SET_LOGIN_NAME
} from '../types/account'
// state
const state = {
  // 服务端验证码
  serveCode: localStorage.getItem('serveCode') || '',
  // 找回密码企业ID
  companyId: localStorage.getItem('companyId') || '',
  // 用户openId
  openId: localStorage.getItem('openId') || '',
  // 用户当前经纬度
  location: localStorage.getItem('location') || '',
  // 用户昵称
  nickname: localStorage.getItem('nickname') || '',
  // 用户头像
  headImgUrl: localStorage.getItem('headImgUrl') || '',
  // 登录名
  loginName: localStorage.getItem('loginName') || ''
}

// getters
const getters = {
  serveCode: state => state.serveCode,
  companyId: state => state.companyId,
  openId: state => state.openId,
  location: state => state.location,
  nickname: state => state.nickname,
  headImgUrl: state => state.headImgUrl,
  loginName: state => state.loginName
}

// actions
const actions = {
  setServeCode: ({ state, commit }, serveCode) => {
    return commit(SET_SERVE_CODE, serveCode)
  },
  setCompanyId: ({ state, commit }, companyId) => {
    return commit(SET_COMPANY_ID, companyId)
  },
  setOpenId: ({ state, commit }, openId) => {
    return commit(SET_OPEN_ID, openId)
  },
  setLocation: ({ state, commit }, location) => {
    return commit(SET_LOCATION, location)
  },
  setNickname: ({ state, commit }, nickname) => {
    return commit(SET_NICKNAME, nickname)
  },
  setHeadImgUrl: ({ state, commit }, headImgUrl) => {
    return commit(SET_HEAD_IMG_URL, headImgUrl)
  },
  setLoginName: ({ state, commit }, loginName) => {
    return commit(SET_LOGIN_NAME, loginName)
  }
}

// mutations
const mutations = {
  [SET_SERVE_CODE]: (state, serveCode) => {
    localStorage.setItem('serveCode', serveCode)
    state.serveCode = serveCode
  },
  [SET_COMPANY_ID]: (state, companyId) => {
    localStorage.setItem('companyId', companyId)
    state.companyId = companyId
  },
  [SET_OPEN_ID]: (state, openId) => {
    localStorage.setItem('openId', openId)
    state.openId = openId
  },
  [SET_LOCATION]: (state, location) => {
    localStorage.setItem('location', location)
    state.location = location
  },
  [SET_NICKNAME]: (state, nickname) => {
    localStorage.setItem('nickname', nickname)
    state.nickname = nickname
  },
  [SET_HEAD_IMG_URL]: (state, headImgUrl) => {
    localStorage.setItem('headImgUrl', headImgUrl)
    state.headImgUrl = headImgUrl
  },
  [SET_LOGIN_NAME]: (state, loginName) => {
    localStorage.setItem('loginName', loginName)
    state.loginName = loginName
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
