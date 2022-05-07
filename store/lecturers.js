export const state = () => ({
    lecturer: [],
    all_lectures: [],
    manual_attendance_data: [],
    daily_lectures: [],
    students_attendance_table: [],
    loading: false,
})

export const mutations = {
    SETLECTURESTABLE(state, payload) {
        state.all_lectures = payload
    },
    SETATTENDANCETABLE(state, payload) {
        state.attendance_table_data = payload
    },
    SETMANUALATTENDANCEDATA(state, payload) {
        state.manual_attendance_data = payload
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
    async getStudentsFroManualAttendance({ commit }, payload) {
        commit('SETLOADING', true)

        return await this.$axios.$get(`/students-list-manual-attendance/${payload.lecture_id}/${payload.week_no}`).then((response) => {
            commit('SETLOADING', false)
            commit('SETMANUALATTENDANCEDATA', response.data)

        }).catch((error)=>{
            commit('SETLOADING', false)
            console.log('Error' , Error);

        })

    },
    async getAllLectures({ commit }, payload) {
        commit('SETLOADING', true)
        return await this.$axios.$get(`lecturer/${payload}/lectures`).then((response) => {
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
    },
    async changeAttendanceState({ commit,dispatch }, payload) {
        commit('SETLOADING', true)
        return await this.$axios.$post(`student-attend/${payload.student_id}/${payload.lecture_id}/${payload.week_no}`,{
            params:{
                student_id:payload.student_id,
                lecture_id:payload.lecture_id?payload.lecture_id:null
            }
        }).then(() => {
            commit('SETLOADING', false)
            dispatch('getStudentsFroManualAttendance', {lecture_id : payload.lecture_id , week_no:payload.week_no})
            
        }).catch((error) => {
            commit('SETLOADING', false)
            console.log('Error ', error);
        })
    },
    async generateQrCode({ commit }, payload) {
        commit('SETLOADING', true)
                console.log('payload ',payload);
        return await this.$axios.$post(`generate-qr/${payload.lecture_id}/${payload.week_no}`)

    },
    async removeBatchFromAttendance({ commit }, payload) {
        commit('SETLOADING', true)

        return await this.$axios.$post(`remove-batch/${payload.lecture_id}/${payload.week_no}`).then((_)=>{
            commit('SETLOADING', false)
        })

    },
}
