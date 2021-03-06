<template>
  <Loading v-if="adminLoading" />

  <div v-else class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 class="add-member-title" v-if="dataType === 'employees'">
          إستيراد بيانات الطلاب
        </h2>
        <h2 class="add-member-title" v-else-if="dataType === 'students'">
          إستيراد بيانات الطلاب
        </h2>
        <h2 class="add-member-title" v-else-if="dataType === 'lecturers'">
          إستيراد بيانات المحاضرين
        </h2>
        <h2 class="add-member-title" v-else-if="dataType === 'majors'">
          إستيراد بيانات التخصصات
        </h2>
        <h2 class="add-member-title" v-else-if="dataType === 'subjects'">
          إستيراد بيانات المواد
        </h2>
        <h2 class="add-member-title" v-else-if="dataType === 'periods'">
          إستيراد بيانات الفترات
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-file-input
              v-model="form.file"
              :rules="requiredRules"
              outlined
              validate-on-blur
              label="إختر الملف"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6"
            v-if="
              dataType === 'students' ||
              dataType === 'lecturers' ||
              dataType === 'employees'
            "
          >
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
          <v-col cols="12" md="6" v-if="dataType === 'students'">
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
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <div class="add-btn-wrapper">
              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                @click="importData"
                >إستيراد</v-btn
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
    dataType: {
      type: String,
      default: () => '',
    },
  },
  mounted() {
    this.$store.dispatch('admin/getTables')
  },
  watch: {
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
  data: () => ({
    valid: false,
    batchsList: [],
    loading: false,
    form: {
      file: null,
      state: '',
      master_table_id: '',
    },
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
  }),
  computed: {
    batchs() {
      return this.$store.state.admin.tables
    },
    adminLoading() {
      return this.$store.state.admin.loading
    },
  },
  methods: {
    async importData() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        this.loading = true
        if (this.dataType === 'students') {
          formData.append('file', this.form.file)
          formData.append('master_table_id', this.form.master_table_id)
          formData.append('state', this.form.state)
          await this.$store.dispatch('admin/importStudents', formData)
        } else if (
          this.dataType === 'lecturers' ||
          this.dataType === 'employees'
        ) {
          formData.append('file', this.form.file)
          formData.append('state', this.form.state)
          if (this.dataType === 'lecturers') {
            await this.$store.dispatch('admin/importLecturers', formData)
          } else {
            await this.$store.dispatch('admin/importEmployees', formData)
          }
        } else if (this.dataType === 'majors') {
          formData.append('file', this.form.file)
          await this.$store.dispatch('admin/importMajors', formData)
        } else if (this.dataType === 'subjects') {
          formData.append('file', this.form.file)
          await this.$store.dispatch('admin/importSubjects', formData)
        } else if (this.dataType === 'periods') {
          formData.append('file', this.form.file)
          await this.$store.dispatch('admin/importPeriods', formData)
        }
        this.loading = false

        this.form = {
          file: null,
          state: '',
          master_table_id: '',
        }
      }
    },
  },
}
</script>
