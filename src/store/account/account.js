// state
const state = {
  // 服务端验证码
  serveCode: localStorage.getItem('serveCode') || '',
  // 找回密码企业ID
  companyId: localStorage.getItem('companyId') || ''
}

// getters
const getters = {
  serveCode: state => state.serveCode,
  companyId: state => state.companyId
}

// actions
const actions = {
  setServeCode: ({ state, commit }, serveCode) => {
    return commit('SET_SERVE_CODE', serveCode)
  },
  setCompanyId: ({ state, commit }, companyId) => {
    return commit('SET_COMPANY_ID', companyId)
  }
}

// mutations
const mutations = {
  'SET_SERVE_CODE': (state, serveCode) => {
    localStorage.setItem('serveCode', serveCode)
    state.serveCode = serveCode
  },
  'SET_COMPANY_ID': (state, companyId) => {
    localStorage.setItem('companyId', companyId)
    state.companyId = companyId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
