import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {},
  // mutations are functions that effect the state
  mutations: {},
  // actions are functions that are called throughout the application that call mutations.
  actions: {},

  modules: {
    User: UserModule
  }
})
