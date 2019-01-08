const state = {
  // 当前页面状态
  direction: ''
}

// getters
const getters = {
  direction: state => state.direction
}

// actions
const actions = {
  setDirection: ({ state, commit }, direction) => {
    return commit('SET_DIRECTION', direction)
  }
}

// mutations
const mutations = {
  'SET_DIRECTION': (state, { direction }) => {
    state.direction = direction
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
