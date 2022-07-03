<template>
  <Loading v-if="adminLoading" />
  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة طالب جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل طالب
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف طالب
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.name.length > 0)
          "
        >
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              label="إسم الطالب"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              type="email"
              label="البريد الإلكتروني"
              required
              outlined
              validate-on-blur
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
              validate-on-blur
              label="الدفعة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.state"
              :items="items"
              :rules="stateRules"
              item-text="text"
              item-value="value"
              outlined
              validate-on-blur
              label="الحالة"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="studentsList"
              :rules="requiredRules"
              item-text="name"
              outlined
              validate-on-blur
              label="إختر الطالب"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                :loading="loading"
                width="140"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'add'"
                @click="addStudent"
                >إضافة</v-btn
              >
              <div
                class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3"
                v-if="methodType === 'edit' && form.name"
              >
                <v-btn
                  :loading="loading"
                  width="140"
                  height="45"
                  rounded
                  class="!tw-py-6 !tw-bg-primary"
                  dark
                  @click="updateStudent"
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
  mounted() {
    if (this.methodType !== 'add') {
      this.$store.dispatch('admin/getStudents')
    }
    this.$store.dispatch('admin/getTables')
  },
  data: () => ({
    valid: false,
    loading: false,
    firstname: '',
    batchsList: [],
    studentsList: [],
    lastname: '',
    form: {
      name: '',
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
        this.loading = true
        this.$store.dispatch('admin/addStudent', formData).then(() => {
          this.loading = false
          this.form = {
            name: '',
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
          this.loading = true

          this.$store.dispatch('admin/updateStudent', formData).then(() => {
            this.loading = false

            this.form = {
              name: '',
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
        this.loading = true

        this.$store.dispatch('admin/deleteStudent', this.form.id).then(() => {
          this.loading = false
          if (this.response.status_code === 200) {
            this.form = {
              name: '',
              master_table_id: '',
              state: '',
              email: '',
            }
            this.$refs.form.resetValidation()
          }
        })
      }
    },
    resetForm() {
      this.form = {
        name: '',
        master_table_id: '',
        state: '',
        email: '',
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
    response() {
      return this.$store.state.admin.response
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>

<style lang="scss"></style>
