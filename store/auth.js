export const state = () => ({})

export const mutations = {}

export const actions = {
  async login({commit},payload){

      return await this.$auth.loginWith('local', { data: {...payload , device_name: 'test'}})


      // const response = await this.$axios.$post('/student/login', payload)
      // return response

  },

  async register({ commit }, payload) {
    const response = await this.$axios.$post('/register', payload)
    return response
  },
  async logout ({ commit }) {
  return await this.$axios.$get('/logout')

  },
  async setPassword({ commit }, payload) {
    // return await this.$auth.loginWith('student', { data: {...payload , device_name: 'test'}})

    const response = await this.$axios.$post('/set-password', payload)
    return response
  },
}
