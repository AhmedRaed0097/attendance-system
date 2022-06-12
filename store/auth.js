export const state = () => ({})

export const mutations = {}

export const actions = {
  async login({commit},payload){
    try {
      let response = await this.$auth.loginWith('local', { data: {...payload , device_name: 'test'}})
      console.log('response ', response)
    } catch (err) {
      console.log('err ', err)
    }
  },
  
  async register({ commit }, payload) {
    const response = await this.$axios.$post('/register', payload)
    return response
  },
  async logout ({ commit }) {
  return await this.$axios.$get('/logout')

  },
}
