<template>
  <Loading v-if="adminLoading" />

  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة محاضرة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل محاضرة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف محاضرة
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.subject_id.toString().length > 0)
          "
        >
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.subject_id"
              :items="subjectsList"
              :rules="requiredRules"
              item-text="subject_name"
              item-value="id"
              outlined
              validate-on-blur
              label="المادة"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.period_id"
              :items="periodsList"
              :rules="requiredRules"
              item-text="title"
              item-value="id"
              outlined
              validate-on-blur
              label="الفترة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.lecturer_id"
              :items="lecturersList"
              :rules="requiredRules"
              item-text="name"
              item-value="id"
              outlined
              validate-on-blur
              label="المحاضر"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.master_table_id"
              :items="batchsList"
              :rules="requiredRules"
              item-text="title"
              item-value="id"
              outlined
              validate-on-blur
              label="الدفعة"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="lecturesList"
              :rules="requiredRules"
              item-text="lecture_title"
              outlined
              validate-on-blur
              label="المحاضرة"
              return-object
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'add'"
                @click="addLecture"
                >إضافة</v-btn
              >

              <div
                class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3"
                v-if="methodType === 'edit' && form.subject_id"
              >
                <v-btn
                  :loading="loading"
                  width="140"
                  rounded
                  class="!tw-py-6 !tw-bg-primary"
                  dark
                  @click="updateLecture"
                  >تعديل</v-btn
                >

                <v-btn
                  :loading="loading"
                  width="140"
                  height="45"
                  rounded
                  class="!tw-py-6 !tw-bg-admin-primary"
                  dark
                  @click="resetForm"
                  >رجوع</v-btn
                >
              </div>

              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-error"
                dark
                v-if="methodType === 'delete'"
                @click="deleteLecture"
                >حذف</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    methodType: {
      type: String,
      default: () => 'add',
    },
  },
  mounted() {
    if (this.methodType !== 'add') {
      if (this.lectures.length === 0) {
        this.$store.dispatch('admin/getLectures')
      } else {
        this.fillLectures()
      }
    }
    if (this.subjects.length === 0) {
      this.$store.dispatch('admin/getSubjects')
    } else {
      this.fillSubjects()
    }
    if (this.batchs.length === 0) {
      this.$store.dispatch('admin/getTables')
    } else {
      this.fillBatches()
    }
    if (this.periods.length === 0) {
      this.$store.dispatch('admin/getPeriods')
    } else {
      this.fillPeriods()
    }
    if (this.lecturers.length === 0) {
      this.$store.dispatch('admin/getLecturers')
    } else {
      this.fillLecturers()
    }
  },
  data: () => ({
    valid: false,
    loading: false,
    firstname: '',
    lastname: '',
    subjectsList: [],
    batchsList: [],
    periodsList: [],
    lecturersList: [],
    lecturesList: [],

    form: {
      subject_id: '',
      period_id: '',
      lecturer_id: '',
      master_table_id: '',
    },
    requiredRules: [(v) => !!v || 'الحقل مطلوب'],
  }),
  methods: {
    addLecture() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.loading = true

        this.$store.dispatch('admin/addLecture', formData).then(() => {
          this.loading = false

          this.form = {
            subject_id: '',
            peeriod_id: '',
            lecturer_id: '',
            master_table_id: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateLecture() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        for (const key in this.form) {
          filterdItem = this.lectures.filter(
            (lecture) => lecture.id === this.form.id
          )
          formData.append(key, this.form[key])
        }
        if (filterdItem.length > 0) {
          for (const key in filterdItem) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.loading = true

          this.$store.dispatch('admin/updateLecture', formData).then(() => {
            this.loading = false

            this.form = {
              subject_id: '',
              period_id: '',
              lecturer_id: '',
              master_table_id: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    deleteLecture() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('admin/deleteLecture', this.form.id).then(() => {
          this.loading = false
          this.form = {
            subject_id: '',
            peeriod_id: '',
            lecturer_id: '',
            master_table_id: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    fillSubjects() {
      if (this.subjects.length > 0) {
        this.subjectsList = []
        this.subjects.forEach((subject) => {
          this.subjectsList.push({ ...subject })
        })
      } else {
        this.subjectsList = []
      }
    },
    fillPeriods() {
      if (this.periods.length > 0) {
        this.periodsList = []
        this.periods.forEach((period) => {
          let periodTitle = `يوم ${period.day} من ${period.from} إلى ${period.to}`
          this.periodsList.push({ ...period, title: periodTitle })
        })
      } else {
        this.periodsList = []
      }
    },
    fillLecturers() {
      if (this.lecturers.length > 0) {
        this.lecturersList = []
        this.lecturers.forEach((lecturer) => {
          this.lecturersList.push({ ...lecturer })
        })
      } else {
        this.lecturersList = []
      }
    },
    fillLectures() {
      if (this.lectures.length > 0) {
        this.lecturesList = []
        this.lectures.forEach((lecture) => {
          this.lecturesList.push({ ...lecture })
        })
      } else {
        this.lecturesList = []
      }
    },
    fillBatches() {
      if (this.batchs.length > 0) {
        this.batchsList = []
        let levelText = ''
        this.batchs.forEach((batch) => {
          if (batch.level === 1) {
            levelText = 'الأول'
          } else if (batch.level === 2) {
            levelText = 'الثاني'
          } else if (batch.level === 3) {
            levelText = 'الثالث'
          } else if (batch.level === 4) {
            levelText = 'الرابع'
          }
          let batchTitle = `التخصص ${batch.major} المستوى ${levelText} نوع القبول ${batch.batch_type}`
          this.batchsList.push({ ...batch, title: batchTitle })
        })
      } else {
        this.batchsList = []
      }
    },
    resetForm() {
      this.form = {
        subject_id: '',
        period_id: '',
        lecturer_id: '',
        master_table_id: '',
      }
    },
  },
  watch: {
    subjects() {
      this.fillSubjects()
    },
    periods() {
      this.fillPeriods()
    },
    lecturers() {
      this.fillLecturers()
    },
    lectures() {
      this.fillLectures()
    },
    batchs() {
      this.fillBatches()
    },
  },
  computed: {
    batchs() {
      return this.$store.state.admin.tables
    },
    periods() {
      return this.$store.state.admin.periods
    },
    lecturers() {
      return this.$store.state.admin.lecturers
    },
    subjects() {
      return this.$store.state.admin.subjects
    },
    lectures() {
      return this.$store.state.admin.lectures
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>
