<template>
  <Loading v-if="loading" />
  <div v-else>
    <Alert
      :alert-visible="showAlert"
      :alert-data="alertData"
      @closeModal="isAlertClosed"
    />
    <v-container>
      <v-form ref="form" lazy-validation>
        <v-row v-if="manualAteendanceData.attendance_data">
          <v-col cols="12" class="manual-att-header-col">
            <h3 class="mb-4">
              تاريخ التحضير :
              {{
                manualAteendanceData.attendance_data.attendance_date.split(
                  'T'
                )[0]
              }}
            </h3>
            <p>
              اسم المادة :
              {{ manualAteendanceData.attendance_data.subject_name }}
            </p>
            <p>
              التخصص :
              {{ manualAteendanceData.attendance_data.major }}
            </p>
            <p>
              المستوى :
              {{ manualAteendanceData.attendance_data.level }}
            </p>
            <p>
              نوع القبول :
              {{ manualAteendanceData.attendance_data.batch_type }}
            </p>
            <p>
              رقم الاسبوع : {{ manualAteendanceData.attendance_data.week_no }}
            </p>
          </v-col>

          <v-row dense class="!tw-contents">
            <v-col cols="6" md="5">
              <v-combobox
                v-model="lecture"
                :items="lecturerLectures"
                :rules="requiredRules"
                validate-on-blur
                label="أختر المادة"
                outlined
                item-text="subject_name"
                item-value="lecture_id"
              >
              </v-combobox>
            </v-col>
            <v-col cols="6" md="5">
              <v-combobox
                v-model="week"
                :items="weeks"
                :rules="requiredRules"
                validate-on-blur
                hide-selected
                label="إختر الإسبوع"
                outlined
                placeholder="إختر الأسبوع"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title> لا توجد بيانات . </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="2" class="!tw-flex">
              <v-btn
                width="100"
                height="45"
                rounded
                :loading="loading"
                class="!tw-mx-auto lg:!tw-mx-0 !tw-mt-1.5 !tw-bg-primary"
                dark
                @click="getStudentsForManualAttendance"
                >جلب</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="!tw-px-6">
                  <v-data-table
                    :headers="headers"
                    :items="manualAteendanceData.students_data"
                    item-key="student_id"
                    :search="search"
                    :custom-filter="filterStudents"
                    class="
                      elevation-1
                      tw-border-2 tw-border-primary
                      !tw-rounded-lg
                    "
                    hide-default-footer
                  >
                    <template v-slot:top>
                      <v-text-field
                        v-model="search"
                        clearable
                        label="بحث (اسم الطالب)"
                        class="mx-4"
                      ></v-text-field>
                    </template>
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            لاتوجد بيانات .
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:no-results>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            لاتوجد بيانات مطابقة لما تم البحث عنه"<strong>{{
                              search
                            }}</strong
                            >" .
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:[`item.student_id`]="{ item }">
                      <p>{{ item.id }}</p>
                    </template>
                    <template v-slot:[`item.stuednt_name`]="{ item }">
                      <p>{{ item.stuednt_name }}</p>
                    </template>
                    <template v-slot:[`item.state`]="{ item }">
                      <v-chip
                        v-if="item.state === true || item.state"
                        small
                        color="#dfdfdf"
                        text-color="#22c55e"
                        @click="changeAttendanceState(item.id)"
                      >
                        حاضر
                      </v-chip>
                      <v-chip
                        v-else
                        small
                        color="#dfdfdf"
                        text-color="#ff5555"
                        @click="changeAttendanceState(item.id)"
                      >
                        غائب
                      </v-chip>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-row>
        <v-row
          v-if="!manualAteendanceData.attendance_data"
          class="generate-qr-wrapper"
        >
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="12"
            class="tw-mt-8 tw-mb-16"
          >
            <h3 class="!tw-text-center !tw-text-4xl">التحضير اليدوي</h3>
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="lecture"
              :items="lecturerLectures"
              :rules="requiredRules"
              validate-on-blur
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
              :rules="requiredRules"
              validate-on-blur
              hide-selected
              label="إختر الإسبوع"
              outlined
              placeholder="إختر الأسبوع"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      لاتوجد بيانات مطابقة لما تم البحث عنه"<strong>{{
                        search
                      }}</strong
                      >" .
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <center>
              <v-btn
                width="100"
                height="45"
                rounded
                :loading="loading"
                class="!tw-mx-auto lg:!tw-mx-0 !tw-mt-1.5 !tw-bg-primary"
                dark
                @click="getStudentsForManualAttendance"
                >جلب</v-btn
              >
            </center>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('lecturer/getLecturerLectures', this.user.id)
  },
  data: () => ({
    showAlert: false,
    alertData: {},
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lecture: '',
    week: null,
    search: '',
    search: null,
    headers: [
      { text: 'الرقم', align: 'center', value: 'student_id', sortable: false },

      {
        text: 'إسم الطلب',
        align: 'center',
        value: 'name',
        sortable: false,
      },

      { text: 'الحالة', align: 'center', value: 'state', sortable: false },
    ],
    requiredRules: [(v) => !!v || 'الحقل مطلوب'],
  }),
  watch: {
    lecture(val) {
      if (val && val.last_week) {
        this.weeks = []
        for (let i = 0; i < val.last_week; i++) {
          this.weeks.push(i + 1)
        }
      } else {
        this.week = null
        this.weeks = []
      }
    },
  },
  computed: {
    lecturerLectures() {
      return this.$store.state.lecturer.lecturerLectures
    },
    manualAteendanceData() {
      return this.$store.state.lecturer.manual_attendance_data
    },
    loading() {
      return this.$store.state.lecturer.loading
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    getStudentsForManualAttendance() {
      if ((this.week && this.lecture) || this.$refs.form.validate()) {
        this.$store
          .dispatch('lecturer/getStudentsFroManualAttendance', {
            lecture_id: this.lecture.lecture_id,
            week_no: this.week,
          })
          .then((response) => {
            this.setAlertData(response)
          })
          .catch((error) => {
            this.setAlertData(error.response.data)
          })
      } else {
      }
    },
    changeAttendanceState(studentId) {
      this.$store
        .dispatch('lecturer/changeAttendanceState', {
          lecture_id: this.lecture.lecture_id,
          student_id: studentId,
          week_no: this.week,
        })
        .then(async (response) => {
          await this.$store.dispatch('lecturer/getStudentsFroManualAttendance', {
            lecture_id: this.lecture.lecture_id,
            week_no: this.week,
          })
            this.setAlertData(response)
        })
        .catch((error) => {
          this.setAlertData(error.response.data)
        })
    },
    filterStudents(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().indexOf(search) !== -1
      )
    },
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
.generate-qr-wrapper {
  padding: 20px;
  // width: 500px;
  // margin: 50% auto;
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
  .col {
    padding: 7px;
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
