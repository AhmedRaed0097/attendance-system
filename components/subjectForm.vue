<template>
  <Loading v-if="adminLoading" />

  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة المادة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل المادة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
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
              validate-on-blur
              label="إختر المادة"
              return-object
            ></v-autocomplete>
            <v-text-field
              v-else
              v-model="form.subject_name"
              :rules="nameRules"
              label="إسم اللمادة"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>

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
                @click="addSubject"
                >إضافة</v-btn
              >

              <div
                class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3"
                v-if="methodType === 'edit' && form.subject_name"
              >
                <v-btn
                  :loading="loading"
                  width="140"
                  height="45"
                  rounded
                  class="!tw-py-6 !tw-bg-primary"
                  dark
                  @click="updateSubject"
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
  mounted() {
    if (this.methodType !== 'add' && this.subjects.length === 0) {
      this.$store.dispatch('admin/getSubjects')
    }
    if (this.subjects.length > 0) {
      this.fillSubjects()
    }
  },
  data: () => ({
    valid: false,
    loading: false,
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
        this.loading = true
        this.$store.dispatch('admin/addSubject', formData).then(() => {
          this.loading = false
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
          this.loading = true
          this.$store.dispatch('admin/updateSubject', formData).then(() => {
            this.loading = false

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
        this.loading = true

        this.$store.dispatch('admin/deleteSubject', this.form.id).then(() => {
          if (this.response.status_code === 200) {
            this.loading = false
            this.form = {
              subject_name: '',
            }
            this.$refs.form.resetValidation()
          }
        })
      }
    },
    resetForm() {
      this.form = {
        subject_name: '',
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
    response() {
      return this.$store.state.admin.response
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>
