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
    }
}

export const actions = {
    async login({ commit }, formData) {
        await this.$auth
            .loginWith('local', {
                data: formData
            }).then((response) => {

            }).catch((error) => {

            })
    },
    attendance({ commit }, payload) {

    },
    async getLecturesTable({ commit }, payload) {
        commit('SETLOADING', true)
        return await this.$axios.$get(`getLecturesForStudent/${payload}`).then((response) => {
            commit('SETLOADING', false)
            commit('SETLECTURESTABLE', response.data)

        }).catch((error) => {
            commit('SETLOADING', false)
            console.log('Error ', error);
        })
    },
    async getAttendanceTable({ commit }, payload) {
        commit('SETLOADING', true)
        return await this.$axios.$get('attendance-table',{
            params:{
                student_id:payload.student_id,
                lecture_id:payload.lecture_id?payload.lecture_id:null
            }
        }).then((response) => {
            commit('SETLOADING', false)
            commit('SETATTENDANCETABLE', response.data)

        }).catch((error) => {
            commit('SETLOADING', false)
            console.log('Error ', error);
        })
    }
}
