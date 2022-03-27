<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة المادة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل المادة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف المادة
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-if="
                methodType === 'delete' ||
                (methodType === 'edit' && form.subject_name.length === 0)
              "
              v-model="form"
              :items="subjectsList"
              item-text="subject_name"
              :rules="requiredRules"
              outlined
              label="اسم المادة"
              return-object
            ></v-autocomplete>
            <v-text-field
              v-else
              v-model="form.subject_name"
              :rules="nameRules"
              label="إسم اللمادة"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'add'"
                @click="addSubject"
                >إضافة</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'edit'"
                @click="updateSubject"
                >تعديل</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'delete'"
                @click="deleteSubject"
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
    if (this.methodType !== 'add' && this.subjects.length === 0) {
      this.$store.dispatch('admin/getSubjects')
    }
    if (this.subjects.length > 0) {
      this.fillSubjects()
    }
  },
  data: () => ({
    valid: false,
    subjectsList: [],
    firstname: '',
    lastname: '',
    form: {
      subject_name: '',
    },
    requiredRules: [(v) => !!v || 'اسم المادة مطلوب'],
    nameRules: [
      (v) => !!v || 'إسم المادة مطلوب',
      (v) => v.length >= 2 || 'يجب ان لايقل إسم المادة عن حرفين',
    ],
  }),
  methods: {
    addSubject() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('subject_name', this.form.subject_name)
        this.$store.dispatch('admin/addSubject', formData).then(() => {
          this.form = {
            subject_name: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateSubject() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        for (const key in this.form) {
          filterdItem = this.subjects.filter(
            (subject) => subject.id === this.form.id
          )
          formData.append(key, this.form[key])
        }
        if (filterdItem.length > 0) {
          for (const key in filterdItem) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.$store.dispatch('admin/updateSubject', formData).then(() => {
            this.form = {
              subject_name: '',
            }
            this.$refs.form.resetValidation()
          })
        }
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
    deleteSubject() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/deleteSubject', this.form.id).then(() => {
          this.form = {
            subject_name: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
  },
  watch: {
    subjects() {
      this.fillSubjects()
    },
  },
  computed: {
    subjects() {
      return this.$store.state.admin.subjects
    },
  },
}
</script>
