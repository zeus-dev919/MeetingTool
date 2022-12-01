const state = () => ({
  project: null,
  meeting: null,
  // token: null
})

const getters = {
  getProject: state => state.project,
  getMeeting: state => state.meeting,
}

const actions = {        
  setProject: ({ commit }, newValue) => {
    commit('SET_PROJECT', newValue)
  },
  setMeeting: ({ commit }, newValue) => {
    commit('SET_MEETING', newValue)
  },
}

const mutations = {
  SET_PROJECT: (state, newValue) => {
    state.project = newValue
  },
  SET_MEETING: (state, newValue) => {
    state.meeting = newValue
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}