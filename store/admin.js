export const state = () => ({
  tables: [],
  lecturers: [],
  students: [],
  subjects: [],
  periods: [],
  majors: [],
  lectures: [],
  loading: false,
  show_alert: false,
  response:{
    message: '',
    status_code: null
  }
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
  SETMAJORS(state, payload) {
    state.majors = payload
  },
  SETLOADING(state, payload) {
    state.loading = payload
  },

  SHOWALERT(state, payload) {
    state.show_alert = true
    state.response.message = payload.message
    state.response.status_code = payload.status_code
  },
  HIDEALERT(state) {
    state.show_alert = false

  }

}

export const actions = {
  // ===============  Table  ====================
  async addTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-table', payload)
      .then((response) => {
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getTables')

        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
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
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        commit('SETTABLES', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-table', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getTables')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-table/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getTables')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  // ===============  //Table  ====================

  // ===============  Lecturer  ====================

  async addLecturer({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-lecturer', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLecturers')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getLecturers({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-lecturers', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        commit('SETLECTURERS', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateLecturer({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-lecturer', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLecturers')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteLecturer({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-lecturer/${payload}`)
      .then((response) => {
        dispatch('getLecturers')
        commit('SETLOADING', false)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  async importLecturers({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-lecturers/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLecturers')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },


  // ===============  //Lecturer  ====================

  // ===============  Student  ====================

  async addStudent({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-student', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getStudents')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getStudents({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-students', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETSTUDENTS', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateStudent({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-student', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getStudents')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteStudent({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-student/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getStudents')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async importStudents({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-students/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getStudents')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  // ===============  //Student  ====================

  // ===============  Subject  ====================

  async addSubject({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-subject', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getSubjects')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getSubjects({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-subjects', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETSUBJECTS', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateSubject({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-subject', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getSubjects')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteSubject({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-subject/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getSubjects')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  async importSubjects({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-subjects/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getSubjects')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  // ===============  //Subject  ====================

  // ===============  Period  ====================

  async addPeriod({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-period', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getPeriods')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getPeriods({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-periods', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETPERIODS', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updatePeriod({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-period', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getPeriods')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deletePeriod({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-period/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getPeriods')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  async importPeriods({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-periods/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getPeriods')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  // ===============  //Period  ====================

  // ===============  Lecture  ====================

  async addLecture({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-lecture', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLectures')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getLectures({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-lectures', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETLECTURES', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateLecture({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-lecture', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLectures')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteLecture({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-lecture/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getLectures')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  // ===============  //Lecture  ====================

  // ===============  Major  ====================

  async addMajor({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-major', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getMajors')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async getMajors({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('get-majors', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETMAJORS', response.data)
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async updateMajor({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-major', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getMajors')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },
  async deleteMajor({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-major/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getMajors')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  async importMajors({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-majors/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        dispatch('getMajors')
      })
       .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000);
        console.log('Error ', error)
      })
  },

  // ===============  //Major  ====================
}
