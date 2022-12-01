// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  SET_ERROR_STATUS: 'SET_ERROR_STATUS',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  access_token: null,
  refresh_token: null,
  username: null,
  password: null,
  errorStatus: null
})

export const mutations = {

  [AUTH_MUTATIONS.SET_USER] (state, username) {
    state.username = username
  },

  [AUTH_MUTATIONS.SET_ERROR_STATUS] (state, errorStatus) {
    console.log(' with error status ' + errorStatus)
    state.errorStatus = errorStatus
  },

  [AUTH_MUTATIONS.SET_PAYLOAD] (state, access_token, refresh_token = null) {
    state.access_token = access_token

    // refresh token is optional, only set it if present
    if (refresh_token) {
      state.refresh_token = refresh_token
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.username = null
    state.access_token = null
    state.refresh_token = null
  },
}

export const actions = {
  async login ({ commit, dispatch, getters}, { username, password }) {
    // commit(AUTH_MUTATIONS.SET_ERROR_STATUS, null)
    // const response = await this.$axios.post(process.env.baseApiUrl + '/login',
    //   { username, password }
    // )
    // .then(response => response.data)
    // .catch((error) => {
    //   console.log(error)
    //   if (error.response) {
    //     commit(AUTH_MUTATIONS.SET_ERROR_STATUS, error.response.status)
    //   }
    // })

    // if(getters.errorStatus != null) 
    // return
    
    // commit(AUTH_MUTATIONS.SET_USER, username)
    // commit(AUTH_MUTATIONS.SET_PAYLOAD, response.access_token)
    this.$router.push('/audio')
  },

  // async register ({ commit }, { username, password }) {
  //   // make an API call to register the user
  //   const { data: { data: { user, payload } } } = await this.$axios.post(
  //     '/api/auth/register', 
  //     { username, password }
  //   )

  //   // commit the user and tokens to the state
  //   commit(AUTH_MUTATIONS.SET_USER, user)
  //   commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  // },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh ({ commit, state }) {
    const { refresh_token } = state

    // make an API call using the refresh token to generate a new access token
    const { data: { data: { payload } } } = await this.$axios.post(process.env.baseApiUrl + '/login',
      { refresh_token }
    )

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user
  logout ({ commit, state }) {
    this.$router.push('/login')
    commit(AUTH_MUTATIONS.LOGOUT)
  },
}

export const getters = {
  isAuthenticated: state => state.access_token && state.access_token !== '',
  getToken: state => state.access_token,
  errorStatus: state => state.errorStatus,
  getUsername: state => state.username
}