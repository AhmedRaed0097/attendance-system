<template>
  <Loading v-if="loading" />
  <div v-else>
    <v-row v-if="manualAteendanceData.attendance_data">
      <v-col cols="12" class="manual-att-header-col">
        <h3 class="mb-4">
          تاريخ التحضير :
          {{
            manualAteendanceData.attendance_data.attendance_date.split('T')[0]
          }}
        </h3>
        <p>
          اسم المادة : {{ manualAteendanceData.attendance_data.subject_name }}
        </p>
        <p>رقم الاسبوع : {{ manualAteendanceData.attendance_data.week_no }}</p>
      </v-col>

      <v-col
        cols="12"
        v-for="(student, i) in manualAteendanceData.students_data"
        :key="i"
      >
        <v-card class="student-data-card">
          <v-row class="card-row-data">
            <v-col cols="1" class="student-no">
              <span>{{ i + 1 }}</span>
            </v-col>
            <v-col cols="3">
              <div class="student-name">
                <span>{{ student.student_name }}</span>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="student-major">
                <span>{{ student.major }}</span>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="student-batch-type">
                <span>{{ student.batch_type }}</span>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="student-level">
                <span>{{ student.level }}</span>
              </div>
            </v-col>
            <v-col cols="1" class="student-state-col">

              <div @click="changeAttendanceState(student.id)" class="student-state" >
                <img
                  v-if="student.state === true"
                  width="100%"
                  src="~/assets/images/home/Checkmark.svg"
                  alt=""
                />
                <img
                  v-else
                  width="100%"
                  src="~/assets/images/home/cross.svg"
                  alt=""
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="generate-qr-wrapper">
      <v-col cols="12">
        <v-combobox
          v-model="lecture"
          :items="lecturerLectures"
          label="أختر المادة"
          outlined
          item-text="subject_name"
          item-value="lecture_id"
        >
        </v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="week"
          :items="weeks"
          hide-selected
          label="إختر الإسبوع"
          outlined
          placeholder="إختر الأسبوع"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong>{{ search }}</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="12">
        <center>
          <v-btn @click="getStudentsForManualAttendance">Get Students</v-btn>
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('lecturers/getAllLectures', 1)
  },
  data: () => ({
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lecture: '',
    week: null,
    search: null,
  }),
  watch: {
    lecture(val) {
      if (val.last_week !== null) {
        // this.weeks.splice(0 ,val.last_week )
        this.weeks = this.weeks.filter((v) => v <= val.last_week)
      }
    },
  },
  computed: {
    lecturerLectures() {
      return this.$store.state.lecturers.all_lectures
    },
    manualAteendanceData() {
      return this.$store.state.lecturers.manual_attendance_data
    },
    loading() {
      return this.$store.state.lecturers.loading
    },
  },
  methods: {
    getStudentsForManualAttendance() {
      this.$store.dispatch('lecturers/getStudentsFroManualAttendance', {
        lecture_id: this.lecture.lecture_id,
        week_no: this.week,
      })
    },
    changeAttendanceState(studentId){
      console.log('this.lecture.lecture_id ',this.lecture.lecture_id);
      console.log('week ',this.week);
      this.$store.dispatch('lecturers/changeAttendanceState',{lecture_id:this.lecture.lecture_id , student_id:studentId ,week_no : this.week})
    }
  },
}
</script>


<style lang="scss">
.generate-qr-wrapper {
  padding: 20px;
  // width: 500px;
  margin: 50% auto;
}

.manual-att-header-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.student-no span {
  text-align: center;
}
.student-data-card {
  margin-bottom: 10px;
  padding: 25px 10px;
}
.card-row-data {
  display: flex;
  align-items: center;
  .col{
    padding: 7px ;
  }
}

.student-state-col {
  padding: 3px !important;
  margin-right: -10px;
  .student-state {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
