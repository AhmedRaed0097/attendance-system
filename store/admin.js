export const state = () => ({
  tables: [],
  lecturers: [],
  students: [],
  subjects: [],
  periods: [],
  lectures: [],
  loading: false,
})

export const mutations = {
  SETTABLES(state, payload) {
    state.tables = payload
  },
  SETLECTURERS(state, payload) {
    state.lecturers = payload
  },
  SETSTUDENTS(state, payload) {
    state.students = payload
  },
  SETSUBJECTS(state, payload) {
    state.subjects = payload
  },
  SETPERIODS(state, payload) {
    state.periods = payload
  },
  SETLECTURES(state, payload) {
    state.lectures = payload
  },
  SETLOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  // ===============  Table  ====================
  async addTable({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-table', payload)
      .then(() => {
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getTables({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-tables', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETTABLES', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updateTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-table', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getTables')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deleteTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-table/${payload}`)
      .then((response) => {
        dispatch('getTables')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  // ===============  //Table  ====================

  // ===============  Lecturer  ====================

  async addLecturer({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-lecturer', payload)
      .then(() => {
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getLecturers({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-lecturers', payload)
      .then((response) => {
        commit('SETLECTURERS',response.data )
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updateLecturer({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-lecturer', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getLecturers')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deleteLecturer({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-lecturer/${payload}`)
      .then(() => {
        dispatch('getLecturers')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  // ===============  //Lecturer  ====================


  // ===============  Student  ====================


  async addStudent({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-student', payload)
      .then(() => {
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getStudents({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-students', payload)
      .then((response) => {
        commit('SETSTUDENTS',response.data )
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updateStudent({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-student', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getStudents')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deleteStudent({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-student/${payload}`)
      .then(() => {
        dispatch('getStudents')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },

  // ===============  //Student  ====================

  // ===============  Subject  ====================

  async addSubject({ commit,dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-subject', payload)
      .then(() => {
        dispatch('getSubjects')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getSubjects({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-subjects', payload)
      .then((response) => {
        commit('SETSUBJECTS',response.data )
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updateSubject({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-subject', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getSubjects')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deleteSubject({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-subject/${payload}`)
      .then(() => {
        dispatch('getSubjects')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },



  // ===============  //Subject  ====================

  // ===============  Period  ====================

  async addPeriod({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-period', payload)
      .then(() => {
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getPeriods({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-periods', payload)
      .then((response) => {
        commit('SETPERIODS',response.data )
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updatePeriod({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-period', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getPeriods')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deletePeriod({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-period/${payload}`)
      .then(() => {
        dispatch('getPeriods')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },

  // ===============  //Period  ====================


  // ===============  Lecture  ====================

  async addLecture({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-lecture', payload)
      .then(() => {
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async getLectures({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-lectures', payload)
      .then((response) => {
        commit('SETLECTURES',response.data )
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async updateLecture({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-lecture', payload)
      .then(() => {
        commit('SETLOADING', false)
        dispatch('getLectures')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },
  async deleteLecture({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-lecture/${payload}`)
      .then(() => {
        dispatch('getLectures')
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        console.log('Error ', error)
      })
  },

  // ===============  //Lecture  ====================




}
