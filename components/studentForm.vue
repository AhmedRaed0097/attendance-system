<template>
  <div class="add-student-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة طالب جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل طالب
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف طالب
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.student_name.length > 0)
          "
        >
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.student_name"
              :rules="nameRules"
              label="إسم الطالب"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              required
              outlined
            ></v-text-field>
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
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.state"
              :items="items"
              :rules="stateRules"
              item-text="text"
              item-value="value"
              outlined
              label="الحالة"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="studentsList"
              :rules="requiredRules"
              item-text="student_name"
              outlined
              label="اسم الطالب"
              return-object
            ></v-autocomplete>
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
                @click="addStudent"
                >إضافة</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'edit'"
                @click="updateStudent"
                >تعديل</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'delete'"
                @click="deleteStudent"
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
  fetch() {
    if (this.methodType !== 'add') {
      this.$store.dispatch('admin/getStudents')
    }
    this.$store.dispatch('admin/getTables')
  },
  data: () => ({
    valid: false,
    firstname: '',
    batchsList: [],
    studentsList: [],
    lastname: '',
    form: {
      student_name: '',
      master_table_id: '',
      state: '',
      email: '',
    },
    nameRules: [
      (v) => !!v || 'إسم الطالب مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    requiredRules: [(v) => !!v || 'هذا الحقل مطلوب'],
    stateRules: [(v) => v.toString().length > 0 || 'الحالة مطلوب'],
    items: [
      {
        text: 'مفعل',
        value: 1,
      },
      {
        text: 'غير مفعل',
        value: 0,
      },
    ],
    values: ['foo', 'bar'],
    value: null,
  }),
  methods: {
    addStudent() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.$store.dispatch('admin/addStudent', formData).then(() => {
          this.form = {
            student_name: '',
            master_table_id: '',
            state: '',
            email: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateStudent() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        // for (const key in this.form) {
        filterdItem = this.students.filter(
          (student) => student.id === this.form.id
        )
        // formData.append(key, this.form[key])
        // }
        if (filterdItem.length > 0) {
          for (const key in filterdItem[0]) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.$store.dispatch('admin/updateStudent', formData).then(() => {
            this.form = {
              student_name: '',
              master_table_id: '',
              state: '',
              email: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    deleteStudent() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/deleteStudent', this.form.id).then(() => {
          this.form = {
            student_name: '',
            master_table_id: '',
            state: '',
            email: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
  },
  watch: {
    students(val) {
      if (val.length > 0) {
        this.studentList = []
        this.students.forEach((student) => {
          this.studentsList.push({ ...student })
        })
      } else {
        this.studentsList = []
      }
    },
    batchs(val) {
      if (val.length > 0) {
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
  computed: {
    batchs() {
      return this.$store.state.admin.tables
    },
    students() {
      return this.$store.state.admin.students
    },
  },
}
</script>

<style lang="scss">
.add-student-wrapper {
  height: 100%;
  display: flex;
  align-items: center;

  .v-card {
    height: 500px;
    width: 900px;
    padding: 10px 30px;
    .v-card__title .add-student-title {
      width: 100% !important;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
.add-btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
