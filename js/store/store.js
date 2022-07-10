import { todoStore } from './todo.store.js'
import { userStore } from './user.store.js'

export const store = Vuex.createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  modules: {
    todoStore,
    userStore,
  },
})
