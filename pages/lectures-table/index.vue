<template>
  <div class="!tw-w-[90vw]">
    <Loading v-if="loading"/>
    <!-- <v-card v-else class="lecture-card" v-for="(lecture , index) in lecturesData" :key="index"> -->
      <!-- <v-row>
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
      </v-row> -->
   <v-row  v-else>
    <v-col cols="12">
    <v-data-table
        :headers="headers"
        :items="lectures"
        item-key="lecture_no"
        class="elevation-1 !tw-mt-10 tw-border-2 tw-border-primary !tw-rounded-lg"
        hide-default-footer
      >


     <template v-slot:[`item.lecture_no`]="{ item }">
          <p>{{item.lecture_no}}</p>
    </template>
     <template v-slot:[`item.subject_name`]="{ item }">
          <p>{{item.subject_name}}</p>
    </template>
     <template v-slot:[`item.period`]="{ item }">
          <p>{{item.period}}</p>
    </template>
    </v-data-table>
    </v-col>
   </v-row>

   <!-- </v-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lectures: [
        {
          lecture_no: '1',
          subject_name: 'Security',
          period: '8 - 10',
        },
        {
          lecture_no: '2',
          subject_name: 'OS',
          period: '10 - 12',
        },
        {
          lecture_no: '3',
          subject_name: 'AI',
          period: '12 - 2',
        },
      ],
        headers: [
        { text: 'الرقم', align: 'center', value: 'lecture_no', sortable: false },
        { text: 'إسم المادة', align: 'center', value: 'subject_name', sortable: false },
        { text: 'الفترة', align: 'center', value: 'period' , sortable: false}
      ],
    }
  },
  fetch(){
    this.$store.dispatch('students/getLecturesTable',3)
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
  &:first-child{
    margin-top: 20px;
  }
  .row .col {
    text-align: center;
  }
}
</style>
