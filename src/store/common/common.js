import { SET_TITLE } from '../types/common'

// state
const state = {
  // 页面顶部Title
  title: localStorage.getItem('title') || ''
}

// getters
const getters = {
  title: state => state.title
}

// actions
const actions = {
  setTitle: ({ state, commit }, title) => {
    return commit(SET_TITLE, title)
  }
}

// mutations
const mutations = {
  [SET_TITLE]: (state, title) => {
    localStorage.setItem('title', title)
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
