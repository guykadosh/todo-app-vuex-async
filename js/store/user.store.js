import { userService } from '../services/user.service.js'

export const userStore = {
  state: {
    user: userService.getLoggedinUser(),
  },
  getters: {
    user({ user }) {
      return user
    },
  },
  mutations: {
    updateUser(state, { user }) {
      const activty = { txt: 'Updated perferences', at: Date.now() }
      user.activities.push(activty)
      userService.save(user)
      state.user = user
    },
    addActivity(state, { activty }) {
      state.user.activities.push(activty)
    },
  },
  actions: {
    addActivity({ commit }, payload) {
      userService.addActivity(payload.activty)
      commit(payload)
    },
  },
}
