export const state = () => ({})

export const mutations = {}

export const actions = {
  async register({ commit }, payload) {
    return await this.$axios.$post('/register', payload)
  },
  async logout ({ commit }) {
  return await this.$axios.$post('/logout')

  },
}
