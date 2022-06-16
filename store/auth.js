export const state = () => ({})

export const mutations = {}

export const actions = {
  async login({commit},payload){

      return await this.$auth.loginWith('local', { data: {...payload , device_name: 'test'}})

  },

  async register({ commit }, payload) {
    const response = await this.$axios.$post('/register', payload)
    return response
  },
  async logout ({ commit }) {
  return await this.$axios.$get('/logout')

  },
}
