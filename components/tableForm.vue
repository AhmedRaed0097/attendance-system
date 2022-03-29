<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة جدول جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل جدول
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف جدول
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row v-if="methodType === 'add' || (methodType === 'edit' && table)">
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.major"
              :items="majors"
              item-text="major"
              item-value="major"
              outlined
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
              label="المستوى"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.batch_type"
              :items="batch_types"
              outlined
              label="نوع القبول"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <p
              class="mt-4 pointer"
              v-if="form.title"
              v-html="this.tableHtmlTitle"
            ></p>
            <v-btn text class="mt-4" v-else @click="showTableTitle"
              >عرض عنوان الجدول</v-btn
            >
          </v-col>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'add'"
                @click="addTable"
                >إضافة</v-btn
              >
              <v-btn
                v-else
                width="140"
                height="45"
                class="font-weight-bold"
                @click="updateTable"
                >تعديل</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form.id"
              :items="tablesList"
              item-text="title"
              item-value="id"
              outlined
              label="إختيار جدول"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <div v-if="methodType === 'delete'" class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
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
  fetch() {
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
      const selectedMajor = this.majorsList.filter((majorData) => majorData.major === this.form.major )
      if(selectedMajor.length > 0){
        this.selectedMajorLevels=[]
        for (let index = 0; index < selectedMajor[0].levels; index++) {
          this.selectedMajorLevels[index] = this.levels[index]

        }
      }
    },
  },
  data: () => ({
    valid: false,
    table: null,
    firstname: '',
    lastname: '',
    tablesList: [],
    selectedMajorLevels:[],
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
        this.$store.dispatch('admin/addTable', formData).then(() => {
          this.form = {}
        })
      }
    },
    updateTable() {
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
        this.$store.dispatch('admin/updateTable', formData)
        this.form = {}
      }
    },
    deleteTable() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/deleteLecturer', this.form.id)
        this.form.id = ''
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
  },
}
</script>
