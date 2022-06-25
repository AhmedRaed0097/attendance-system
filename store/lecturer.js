export const state = () => ({
  lecturer: [],
  lecturerLectures: [],
  manual_attendance_data: [],
  daily_lectures: [],
  students_attendance_table: [],
  loading: false,
})

export const mutations = {
  SETLECTURESTABLE(state, payload) {
    state.lecturerLectures = payload
  },
  SETATTENDANCETABLE(state, payload) {
    state.attendance_table_data = payload
  },
  SETMANUALATTENDANCEDATA(state, payload) {
    state.manual_attendance_data = payload
  },
  SETLOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async login({ commit }, payload) {

    // return await this.$auth.loginWith('student', { data: {...payload , device_name: 'test'}})


    const response = await this.$axios.$post('/lecturer/login', payload)
    return response

  },
  async getStudentsFroManualAttendance({ commit }, payload) {
    commit('SETLOADING', true)

    const response = await this.$axios.$get(
      `/students-list-manual-attendance/${payload.lecture_id}/${payload.week_no}`
    )
    commit('SETLOADING', false)
    commit('SETMANUALATTENDANCEDATA', response.data)
    return response
  },
  async getLecturerLectures({ commit }, payload) {
    commit('SETLOADING', true)
    const response = await this.$axios
      .$get(`lecturer/${payload}/lectures`)
    commit('SETLOADING', false)
    commit('SETLECTURESTABLE', response.data)
    commit('SETLOADING', false)
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
  async changeAttendanceState({ commit, dispatch }, payload) {
    commit('SETLOADING', true)
    const response = await this.$axios
      .$post(
        `student-attend/${payload.student_id}/${payload.lecture_id}/${payload.week_no}`,
        {
          params: {
            student_id: payload.student_id,
            lecture_id: payload.lecture_id ? payload.lecture_id : null,
          },
        }
      )
    commit('SETLOADING', false)
    return response
  },
  async generateQrCode({ commit }, payload) {
    commit('SETLOADING', true)
    return await this.$axios.$post(
      `generate-qr/${payload.lecture_id}/${payload.week_no}`
    )
  },
  async removeBatchFromAttendance({ commit }, payload) {
    commit('SETLOADING', true)

    const response = await this.$axios.$post(
      `remove-batch/${payload.lecture_id}/${payload.week_no}`
    )
    commit('SETLOADING', false)
    return response
  },
}
