<template>
  <Loading v-if="adminLoading" />
  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 class="add-member-title">التقارير</h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="7">
            <v-autocomplete
              v-model="form"
              :items="lecturesList"
              :rules="[validateLecture]"
              item-text="lecture_title"
              outlined
              validate-on-blur
              return-object
              label="المحاضرة"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-combobox
              :disabled="!form.lecture_id"
              v-model="week"
              :items="weeks"
              :rules="[validateWeekNumber]"
              label="الإسبوع"
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
          <v-col cols="12" md="2">
            <v-checkbox
              :disabled="!form.lecture_id"
              v-model.number="week"
              label="كل الأسابيع"
              color="indigo"
              value="-1"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                :loading="loading"
                rounded
                class="!tw-py-6 tw-ml-2 !tw-bg-admin-primary"
                dark
                @click="showReport"
                >عرض</v-btn
              >
              <!-- <v-btn
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                @click="downloadReport"
                >تنزيل</v-btn
              > -->
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (!this.lecturesReport || this.lecturesReport.length === 0) {
      await this.$store.dispatch('admin/getLecturesForReport')
    } else {
      this.fillLectures()
    }
  },
  data: () => ({
    valid: false,
    allWeeks: false,
    loading: false,
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    week: null,
    lecturesList: [],
    form: {},
    lecturesRules: [(v) => v.lecture_id || 'الحقل مطلوب'],
    requiredRules: [(v) => !!v || 'الحقل مطلوب'],
  }),
  methods: {
    downloadReport() {},
    async showReport() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$store
          .dispatch('admin/getReportData', {
            lecture_id: this.form.lecture_id,
            week_no: this.week,
          })
          .then(() => {
            this.$emit('clicked')
            this.loading = false
            this.form = {}
          })
      }
    },
    fillLectures() {
      if (this.lecturesReport.length > 0) {
        this.lecturesList = []
        this.lecturesReport.forEach((lecture) => {
          this.lecturesList.push({ ...lecture })
        })
      } else {
        this.lecturesList = []
      }
    },
    validateWeekNumber(val) {
      if ((this.week && this.form.lecture_id) || !this.form.lecture_id) {
        return true
      } else {
        return 'الحقل مطلوب'
      }
    },
    validateLecture(val) {
      console.log('val ', val)
      if (!val.lecture_title) {
        return 'الحقل مطلوب'
      } else {
        return true
      }
    },
  },
  watch: {
    form(val) {
      console.log('xx ', val)
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
    lecturesReport() {
      this.fillLectures()
    },
  },
  computed: {
    lecturesReport() {
      return this.$store.state.admin.LecturesReport
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>
