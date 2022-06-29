export const state = () => ({
  lectures: [],
  tables: [],
  lecturers: [],
  students: [],
  subjects: [],
  employees: [],
  periods: [],
  majors: [],
  reportData: [],
  LecturesReport: [],
  loading: false,
  show_alert: false,
  response: {
    message: '',
    status_code: null,
  },
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
  SETEMPLOYEES(state, payload) {
    state.employees = payload
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
  SETREPORTDATA(state, payload) {
    payload.students_attenance_data.forEach(studentAttend => {

      for (let i = 0; i < studentAttend.attend_states.length; i++) {
        // const state = studentAttend.attend_states[i] === 0 ?'غائب' : 'حاضر'
        studentAttend[`w_${i+1}`] = studentAttend.attend_states[i]
      }
    });
    state.reportData = payload
  },
  SETLECTURESREPORT(state, payload) {
    state.LecturesReport = payload
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
  },
}

export const actions = {
  // ===============  Table  ====================
  async addTable({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-table', payload)
      .then((response) => {
        dispatch('getTables')
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        commit('SETLOADING', false)
      })
      .catch((error) => {
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        commit('SETLOADING', false)
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
        }, 3000)
        commit('SETTABLES', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getTables')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getTables')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getLecturers')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        commit('SETLECTURERS', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getLecturers')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getLecturers')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getStudents')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getStudents')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getStudents')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async importStudents({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-students', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getStudents')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },

  async importEmployees({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-employees', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getEmployees')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },

  // ===============  //Student  ====================

  // ===============  Employee  ====================

  async addEmployee({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('add-employee', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getEmployees')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async getEmployees({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('employees/list', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETEMPLOYEES', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async updateEmployee({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('update-employee', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getEmployees')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async deleteEmployee({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$delete(`delete-employee/${payload}`)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getEmployees')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async importEmployees({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$post('import-employees/', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', response)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
        dispatch('getEmployees')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },

  // ===============  //Employee  ====================

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
        }, 3000)
        dispatch('getSubjects')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getSubjects')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getSubjects')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getSubjects')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getPeriods')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getPeriods')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getPeriods')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getPeriods')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getLectures')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getLectures')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getLectures')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getMajors')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
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
        }, 3000)
        dispatch('getMajors')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getMajors')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
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
        }, 3000)
        dispatch('getMajors')
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },

  // ===============  //Major  ====================

  // ===============  Report  ====================

  async getReportData({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get(`get-report/${payload.lecture_id}/${payload.week_no}`, payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETREPORTDATA', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },
  async getLecturesForReport({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('report/lectures', payload)
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETLECTURESREPORT', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        commit('SHOWALERT', error)
        setTimeout(() => {
          commit('HIDEALERT')
        }, 3000)
      })
  },

  // ===============  //Report  ====================
}
