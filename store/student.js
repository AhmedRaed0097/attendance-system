export const state = () => ({
  student: {},
  lectures_table_data: {},
  attendance_table_data: {},
  loading: false,
})

export const mutations = {
  SETLECTURESTABLE(state, payload) {
    state.lectures_table_data = payload
  },
  SETATTENDANCETABLE(state, payload) {
    state.attendance_table_data = payload
  },
  SETLOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async login({ commit }, payload) {
    return await this.$auth.loginWith('laravelJWT', { data: payload})
  },
  async logout({ commit }) {
    const response = await this.$axios.$post('/student/logout')
    return response
  },

  async scanQr({ commit }, payload) {
    return await this.$axios.$post(
      `studentScanAttendance/${payload.student_id}/${payload.lecture_id}/${payload.week_no}`
    )
  },
  async getLecturesTable({ commit }, payload) {
    commit('SETLOADING', true)
    const response = await this.$axios.$get(`getLecturesForStudent/${payload}`)
    commit('SETLOADING', false)
    commit('SETLECTURESTABLE', response.data)
    return response
  },
  async getAttendanceTable({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios
      .$get('attendance-table', {
        params: {
          student_id: payload.student_id,
          lecture_id: payload.lecture_id ? payload.lecture_id : null,
        },
      })
      .then((response) => {
        commit('SETLOADING', false)
        commit('SETATTENDANCETABLE', response.data)
      })
      .catch((error) => {
        commit('SETLOADING', false)
        
      })
  },
}
