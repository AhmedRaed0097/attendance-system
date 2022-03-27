<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة محاضرة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل محاضرة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف محاضرة
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.subject_id)
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
              label="الفترة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.lecturer_id"
              :items="lecturersList"
              :rules="requiredRules"
              item-text="lecturer_name"
              item-value="id"
              outlined
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
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'add'"
                @click="addLecture"
                >إضافة</v-btn
              >
              <v-btn
                v-else
                width="140"
                height="45"
                class="font-weight-bold"
                @click="editLecturer"
                >تعديل</v-btn
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
  fetch() {
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
    firstname: '',
    lastname: '',
    subjectsList: [],
    batchsList: [],
    periodsList: [],
    lecturersList: [],
    lecturesList: [],

    form: {
      subject_id: null,
      period_id: null,
      lecturer_id: null,
      master_table_id: null,
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
        this.$store.dispatch('admin/addLecture', formData).then(() => {
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
    editLecturer() {
      //
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
        this.subjectsList = []
      }
    },
    fillLectures() {
      if (this.lectures.length > 0) {
        this.lecturesList = []
        this.lectures.forEach((lecture) => {
          this.lecturesList.push({ ...lecture })
        })
      } else {
        this.subjectsList = []
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
  },
}
</script>
