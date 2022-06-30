<template>
  <Loading v-if="adminLoading" />
  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة جدول جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل جدول
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف جدول
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.title.length > 0)
          "
        >
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.major"
              :items="majors"
              item-text="major"
              item-value="major"
              outlined
              validate-on-blur
              label="التخصص"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.level"
              :items="selectedMajorLevels"
              item-text="text"
              item-value="value"
              outlined
              validate-on-blur
              label="المستوى"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.batch_type"
              :items="batch_types"
              outlined
              validate-on-blur
              label="نوع القبول"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <center>
              <p
                class="mt-4 pointer"
                v-if="tableHtmlTitle"
                v-html="tableHtmlTitle"
              ></p>
              <v-btn text class="mt-4" v-else @click="showTableTitle"
                >عرض عنوان الجدول</v-btn
              >
            </center>
          </v-col>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                :loading="loading"
                v-if="methodType === 'add'"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                @click="addTable"
                >إضافة</v-btn
              >
              <v-btn
                :loading="loading"
                v-else
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                @click="updateTable"
                >تعديل</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="tablesList"
              item-text="title"
              outlined
              validate-on-blur
              return-object
              label="إختيار جدول"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <div v-if="methodType === 'delete'" class="add-btn-wrapper">
              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-error"
                dark
                @click="deleteTable"
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
    if (this.methodType !== 'add' && this.tables.length === 0) {
      this.$store.dispatch('admin/getTables')
    }
    if (this.tables.length > 0) {
      this.fillTables()
    }
    this.$store.dispatch('admin/getMajors').then(() => {
      this.fillMajors()
    })
  },
  watch: {
    tables() {
      this.fillTables()
    },
    majors() {
      this.fillMajors()
    },
    'form.major'(val) {
      const selectedMajor = this.majorsList.filter(
        (majorData) => majorData.major === this.form.major
      )
      if (selectedMajor.length > 0) {
        this.selectedMajorLevels = []
        for (let index = 0; index < selectedMajor[0].levels; index++) {
          this.selectedMajorLevels[index] = this.levels[index]
        }
      }
      this.tableHtmlTitle = null
    },
    'form.level'(val) {
      this.tableHtmlTitle = null
    },
    'form.batch_type'(val) {
      this.tableHtmlTitle = null
    },
  },
  data: () => ({
    valid: false,
    loading: false,
    table: null,
    firstname: '',
    lastname: '',
    tablesList: [],
    selectedMajorLevels: [],
    tableHtmlTitle: '',
    form: {
      title: '',
      major: '',
      level: '',
      batch_type: '',
    },
    majorsList: [],
    batch_types: ['عام', 'موازي'],
    levels: [
      {
        text: 'الأول',
        value: 1,
      },
      {
        text: 'الثاني',
        value: 2,
      },
      {
        text: 'الثالث',
        value: 3,
      },
      {
        text: 'الرابع',
        value: 4,
      },
      {
        text: 'الخامس',
        value: 5,
      },
      {
        text: 'السادس',
        value: 6,
      },
      {
        text: 'السابع',
        value: 7,
      },
      {
        text: 'الثامن',
        value: 8,
      },
      {
        text: 'التاسع',
        value: 9,
      },
      {
        text: 'العاشر',
        value: 10,
      },
    ],
    nameRules: [
      (v) => !!v || 'إسم الطالب مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    items: ['foo', 'bar', 'fizz', 'buzz'],
    items: ['foo', 'bar', 'fizz', 'buzz'],
    values: ['foo', 'bar'],
    value: null,
  }),
  methods: {
    showTableTitle() {
      if (this.form.major && this.form.level && this.form.batch_type) {
        this.form.title =
          ' جدول المحاضرات لتخصص' +
          ' ' +
          this.form.major +
          ' للمستوى الـ' +
          ' ' +
          this.form.level.text +
          ' ' +
          'نوع القبول ' +
          this.form.batch_type

        this.tableHtmlTitle = `<p>  جدول المحاضرات لتخصص <strong> ${this.form.major}</strong>  للمستوى الـ <strong> ${this.form.level.text}</strong>  نوع القبول <strong> ${this.form.batch_type}</strong> </p>`
      }
    },
    addTable() {
      if (this.$refs.form.validate()) {
        if (this.form.major && this.form.level && this.form.batch_type) {
          this.form.title =
            ' جدول المحاضرات لتخصص' +
            ' ' +
            this.form.major +
            ' للمستوى الـ' +
            ' ' +
            this.form.level.text +
            ' ' +
            'نوع القبول ' +
            this.form.batch_type
        }
        const formData = new FormData()
        formData.append('level', this.form.level.value)
        for (const key in this.form) {
          if (key !== 'id' && key !== 'level')
            formData.append(key, this.form[key])
        }
        this.loading = true

        this.$store.dispatch('admin/addTable', formData).then(() => {
          this.loading = false

          if (this.response.status_code === 200) {
            this.form = {
              title: '',
              major: '',
              level: '',
              batch_type: '',
            }
          }
        })
      }
    },
    async updateTable() {
      if (this.$refs.form.validate()) {
        if (this.form.major && this.form.level && this.form.batch_type) {
          this.form.title =
            ' جدول المحاضرات لتخصص' +
            ' ' +
            this.form.major +
            ' للمستوى الـ' +
            ' ' +
            this.form.level.text +
            ' ' +
            'نوع القبول ' +
            this.form.batch_type
        }
        const formData = new FormData()
        formData.append('level', this.form.level.value)

        for (const key in this.form) {
          if (key !== 'level') {
            formData.append(key, this.form[key])
          }
        }
        this.loading = true

        await this.$store.dispatch('admin/updateTable', formData).then(() => {
          this.loading = true
        })

        this.form = {
          title: '',
          major: '',
          level: '',
          batch_type: '',
        }
      }
    },
    async deleteTable() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$store
          .dispatch('admin/deleteLecturer', this.form.id)
          .then(() => {
            this.loading = false
          })
        this.form = {
          title: '',
          major: '',
          level: '',
          batch_type: '',
        }
      }
    },
    fillTables() {
      if (this.tables.length > 0) {
        this.tables.forEach((table) => {
          this.tablesList.push({ ...table })
        })
      } else {
        this.tablesList = []
      }
    },
    fillMajors() {
      if (this.majors.length > 0) {
        this.majors.forEach((table) => {
          this.majorsList.push({ ...table })
        })
      } else {
        this.majorsList = []
      }
    },
  },
  computed: {
    tables() {
      return this.$store.state.admin.tables
    },
    majors() {
      return this.$store.state.admin.majors
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
