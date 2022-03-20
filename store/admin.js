export const state = () => ({

})

export const mutations = {

}

export const actions = {
  async addTable({ commit}, payload) {
      commit('SETLOADING', true)
      return await this.$axios.$post('addtable',payload).then(() => {
          commit('SETLOADING', false)

      }).catch((error) => {
          commit('SETLOADING', false)
          console.log('Error ', error);
      })
  }
}
