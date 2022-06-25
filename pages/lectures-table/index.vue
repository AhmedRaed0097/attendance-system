<template>
  <div>
    <Loading v-if="loading" />

    <v-row v-else>
      <Alert
        :alert-visible="showAlert"
        :alert-data="alertData"
        @closeModal="isAlertClosed"
      />
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="12"
        class="tw-mt-12 tw-mb-8"
      >
        <h3 class="!tw-text-center !tw-text-4xl">جدول المحاضرات</h3>
      </v-col>
      <v-col v-if="lecturesData.length > 0" cols="12" class="!tw-px-6">
        <v-data-table
          :headers="headers"
          :items="lecturesData"
          item-key="lecture_no"
          class="
            elevation-1
            !tw-mt-10
            tw-border-2 tw-border-primary
            !tw-rounded-lg
          "
          hide-default-footer
        >
          <template v-slot:[`item.lecture_no`]="{ item }">
            <p>{{ item.lecture_id }}</p>
          </template>
          <template v-slot:[`item.subject_name`]="{ item }">
            <p>{{ item.subject_name }}</p>
          </template>
          <template v-slot:[`item.period`]="{ item }">
            
            <p class="!tw-mb-1 !tw-mt-1">
              {{ item.day }}
            </p>
            <p>
              {{ item.from }} -
              {{ item.to }}
            </p>
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
      showAlert: false,
      alertData: {},
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
        {
          text: 'الرقم',
          align: 'center',
          value: 'lecture_no',
          sortable: false,
        },
        {
          text: 'إسم المادة',
          align: 'center',
          value: 'subject_name',
          sortable: false,
        },
        { text: 'اليوم/الفترة', align: 'center', value: 'period', sortable: false },
      ],
    }
  },
  async fetch() {
    if (this.$auth.user.user_type === 'student') {
      await this.$store
        .dispatch('student/getLecturesTable', this.user.id)
        .then((response) => {
          this.setAlertData(response)
        })
        .catch((error) => {
          this.setAlertData(error.response.data)
        })
    } else if (this.user.user_type === 'lecturer') {
      await this.$store
        .dispatch('lecturer/getLecturerLectures', this.user.id)
        .then((response) => {
          console.log('here ',response);
          this.setAlertData(response)
        })
        .catch((error) => {
          this.setAlertData(error.response.data)
        })
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    lecturesData() {
      if (this.user.user_type === 'student') {
        return this.$store.state.student.lectures_table_data
      } else {
        return this.$store.state.lecturer.lecturerLectures
      }
    },
    loading() {
      return this.$store.state.student.loading
    },
  },
  methods: {
    setAlertData(data) {
      this.alertData = data
      this.showAlert = true
    },
    isAlertClosed(payload) {
      if (payload.value) {
        this.showAlert = false
      }
    },
  },
}
</script>

<style lang="scss">
.lecture-card {
  margin: 47px 20px;
  height: 80px;
  width: 90vw;
  display: flex;
  align-items: center;
  border-radius: 13px !important;
  padding: 5px;
  &:first-child {
    margin-top: 20px;
  }
  .row .col {
    text-align: center;
  }
}
</style>
