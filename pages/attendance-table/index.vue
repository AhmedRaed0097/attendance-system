<template>
  <div>
    <v-card
      class="lecture-card"
      v-for="(lecture, index) in attendanceData"
      :key="index"
    >
      <v-row class="attendance-row-data">
        <v-col cols="2">
          <div class="lecture-no">
            <span>{{ lecture.id }}</span>
          </div>
        </v-col>
        <v-col cols="4" class="pl-0 pr-0">
          <div class="lecture-name">
            <span>{{ lecture.subject_name }}</span>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="lecture-PERIOD">
            <p class="mb-0">{{ lecture.day }}</p>
            <span>{{ lecture.from }} - {{ lecture.to }}</span>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="lecture-PERIOD">
            <img  width="100%" src="~/assets/images/home/Checkmark.svg" alt="" />
            <!-- <img v-else width="100%" src="~/assets/images/home/cross.svg" alt="" /> -->
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lectures: [
        {
          id: '1',
          lecture_name: 'Security',
          from_to: '8 - 10',
        },
        {
          id: '2',
          lecture_name: 'OS',
          from_to: '10 - 12',
        },
        {
          id: '3',
          lecture_name: 'AI',
          from_to: '12 - 2',
        },
      ],
    }
  },
  fetch() {
    this.$store.dispatch('students/getAttendanceTable', {
      student_id: 3,
    })
  },
  computed: {
    attendanceData() {
      return this.$store.state.students.attendance_table_data
    },
    loading() {
      return this.$store.state.students.loading
    },
  },
}
</script>

<style lang="scss">
.attendance-row-data {
  .col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.lecture-card {
  margin: 47px 20px;
  height: 80px;
  width: 90vw;
  display: flex;
  align-items: center;
  border-radius: 13px !important;
  padding: 5px;
  .row .col {
    text-align: center;
  }
}
</style>

