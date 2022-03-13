<template>
  <div>
    <Loading v-if="loading"/>
    <v-card v-else class="lecture-card" v-for="(lecture , index) in lecturesData" :key="index">
      <v-row>
        <v-col cols="3">
          <div class="lecture-no">
            <span>{{lecture.lecture_id}}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="lecture-name">
            <span>{{lecture.subject_name}}</span>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="lecture-PERIOD">
            <span>{{lecture.from}} - {{lecture.to}}</span>
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
  fetch(){
    this.$store.dispatch('students/getLecturesTable',1)
  },
  computed:{
    lecturesData(){
      return this.$store.state.students.lectures_table_data
    },
    loading(){
      return this.$store.state.students.loading
    }
  }
}
</script>

<style lang="scss">
.lecture-card {
  margin: 47px 20px;
  height: 80px;
  width: 90vw;
  display: flex;
  align-items: center;
  border-radius:13px !important;
  padding: 5px;
  .row .col {
    text-align: center;
  }
}
</style>