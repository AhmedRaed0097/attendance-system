export const state = () => ({
  tables:[],
  loading: false,

})

export const mutations = {
  SETTABLES(state,payload){
    state.tables = payload
  },
  SETLOADING(state, payload) {
    state.loading = payload
}
}

export const actions = {
  async addTable({ commit}, payload) {
      commit('SETLOADING', true)
      return await this.$axios.$post('add-table',payload).then(() => {
          commit('SETLOADING', false)

      }).catch((error) => {
          commit('SETLOADING', false)
          console.log('Error ', error);
      })
  },
  async getTables({ commit}, payload) {
      commit('SETLOADING', true)
      return await this.$axios.$get('get-tables',payload).then((response) => {
          commit('SETLOADING', false)
          commit('SETTABLES', response.data)


      }).catch((error) => {
          commit('SETLOADING', false)
          console.log('Error ', error);
      })
  },
  async updateTable({ commit ,dispatch}, payload) {
      commit('SETLOADING', true)
      return await this.$axios.$post('update-table',payload).then(() => {
          commit('SETLOADING', false)
        dispatch('getTables')


      }).catch((error) => {
          commit('SETLOADING', false)
          console.log('Error ', error);
      })
  },
  async deleteTable({ commit,dispatch}, payload) {
      commit('SETLOADING', true)
      return await this.$axios.$delete(`delete-table/${payload}`).then((response) => {
        dispatch('getTables')
        commit('SETLOADING', false)


      }).catch((error) => {
          commit('SETLOADING', false)
          console.log('Error ', error);
      })
  }
}
