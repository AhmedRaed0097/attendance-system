<template>
  <Loading v-if="adminLoading" />
  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة تخصص جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل تخصص
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف تخصص
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.major.length > 0)
          "
        >
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.major"
              :rules="majorRules"
              label="إسم التخصص"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.levels"
              :rules="levelRules"
              label="المستويات"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="majorsList"
              item-text="major"
              label="إختر التخصص"
              outlined
              validate-on-blur
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
                @click="addMajor"
                >إضافة</v-btn
              >
              <div
                class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3"
                v-if="methodType === 'edit' && form.major"
              >
                <v-btn
                  :loading="loading"
                  width="140"
                  height="45"
                  rounded
                  class="!tw-py-6 !tw-bg-primary"
                  dark
                  @click="updateMajor"
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
                @click="deleteMajor"
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
  created() {
    if (this.methodType !== 'add' && this.majors.length === 0) {
      this.$store.dispatch('admin/getMajors')
    }
    if (this.methodType !== 'add' && this.majors.length > 0) {
      this.fillMajors()
    }
  },
  watch: {
    majors() {
      this.fillMajors()
    },
  },
  data: () => ({
    valid: false,
    loading: false,
    table: null,
    firstname: '',
    lastname: '',
    majorsList: [],
    tableHtmlTitle: '',
    form: {
      major: '',
      levels: '',
    },
    majorRules: [
      (v) => !!v || 'هذا الحثل مطلوب',
      (v) => v.length > 4 || 'يجب ان لا يقل اسم التخصص عن 5 احرف',
    ],
    levelRules: [
      (v) => !!v || 'هذا الحثل مطلوب',
      (v) => /^[1-9]$/.test(v) || 'يجب ان تكون المستويات ارقام',
      (v) => /^[1-9]$|^10$/.test(v) || 'يجب ان تكون المستويات اقل من 10',
    ],
  }),
  methods: {
    async addMajor() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.loading = true

        await this.$store.dispatch('admin/addMajor', formData).then(() => {
          this.loading = false
          this.form = {
            major: '',
            levels: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateMajor() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.$store.dispatch('admin/updateMajor', formData).then(() => {
          this.loading = false
          this.form = {
            major: '',
            levels: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    async deleteMajor() {
      if (this.$refs.form.validate()) {
        z
        await this.$store
          .dispatch('admin/deleteMajor', this.form.id)
          .then(() => {
            this.loading = false
          })
        this.form.id = ''
      }
    },
    fillMajors() {
      if (this.majors.length > 0) {
        this.majorsList = []
        this.majors.forEach((major) => {
          this.majorsList.push({ ...major })
        })
      } else {
        this.majorsList = []
      }
    },
    resetForm() {
      this.form = {
        major: '',
        levels: '',
      }
    },
  },
  computed: {
    majors() {
      return this.$store.state.admin.majors
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
}
</script>
