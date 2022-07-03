<template>
  <Loading v-if="adminLoading" />
  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة محاضر جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل محاضر
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف محاضر
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row v-if="methodType !== 'add' && form.name.length === 0">
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="lecturerList"
              :rules="requiredRules"
              item-text="name"
              outlined
              validate-on-blur
              label="إختر المحاضر"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              label="إسم "
              required
              outlined
              validate-on-blur
            ></v-text-field>
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
                @click="addLecturer"
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
                  @click="updateLecturer"
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
                @click="deleteLecturer"
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
      this.$store.dispatch('admin/getLecturers')
    }
  },
  data: () => ({
    valid: false,
    loading: false,
    firstname: '',
    lecturerList: [],
    lastname: '',
    form: {
      name: '',
      state: '',
      email: '',
    },
    nameRules: [
      (v) => !!v || 'إسم المحاضر مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    requiredRules: [(v) => !!v || 'الحالة مطلوب'],
    stateRules: [(v) => v.toString().length > 0 || 'الحالة مطلوب'],
    email: '',
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
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
    addLecturer() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.loading = true

        this.$store.dispatch('admin/addLecturer', formData).then(() => {
          this.loading = false

          this.form = {
            name: '',
            state: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateLecturer() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        for (const key in this.form) {
          filterdItem = this.lecturers.filter(
            (lecturer) => lecturer.id === this.form.id
          )
          formData.append(key, this.form[key])
        }
        if (filterdItem.length > 0) {
          for (const key in filterdItem) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
            this.loading = true
          }
          this.$store.dispatch('admin/updateLecturer', formData).then(() => {
            this.loading = false

            this.form = {
              name: '',
              state: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    deleteLecturer() {
      if (this.$refs.form.validate()) {
        this.loading = true

        this.$store.dispatch('admin/deleteLecturer', this.form.id).then(() => {
          this.loading = false

          this.form = {
            name: '',
            state: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    resetForm() {
      this.form = {
        name: '',
        state: '',
        email: '',
      }
    },
  },
  watch: {
    lecturers(val) {
      if (val.length > 0) {
        this.lecturerList = []
        this.lecturers.forEach((lecture) => {
          this.lecturerList.push({ ...lecture })
        })
      } else {
        this.lecturerList = []
      }
    },
  },
  computed: {
    lecturers() {
      return this.$store.state.admin.lecturers
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>
