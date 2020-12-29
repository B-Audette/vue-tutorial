export const UserModule = {
  namespaced: true,

  state: {
    user: null
  },
  // mutations are functions that effect the state
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  // actions are functions that are called throughout the application that call mutations.
  actions: {
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    }
  }
}
