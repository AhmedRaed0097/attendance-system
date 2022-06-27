<template>
  <div class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة فترة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل فترة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف فترة
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.day.length > 0)
          "
        >
          <v-col cols="12" :md="6">
            <v-autocomplete
              v-model="form.day"
              :items="days"
              outlined
              validate-on-blur
              label="اليوم"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.from"
              :items="start_period"
              outlined
              validate-on-blur
              label="بداية الفترة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              :disabled="form.from ? false : true"
              v-model="form.to"
              :items="end_period"
              outlined
              validate-on-blur
              label="نهاية الفترة"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="periodsList"
              item-text="title"
              outlined
              validate-on-blur
              label="إخر الفترة"
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
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'add'"
                @click="addPeriod"
                >إضافة</v-btn
              >
              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'edit'"
                @click="updatePeriod"
                >تعديل</v-btn
              >
              <v-btn
                :loading="loading"
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-error"
                dark
                v-if="methodType === 'delete'"
                @click="deletePeriod"
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
  watch: {
    'form.from'(val) {
      const itemIndex = this.start_period.indexOf(val)
      this.end_period = this.start_period.slice(
        itemIndex + 1,
        this.start_period.length
      )
    },
    periods() {
      this.fillPeriods()
    },
  },
  mounted() {
    if (this.methodType !== 'add' && this.periods.length === 0) {
      this.$store.dispatch('admin/getPeriods')
    }
    if (this.periods.length > 0) {
      this.fillPeriods()
    }
  },
  data: () => ({
    valid: false,
    loading: false,

    firstname: '',
    lastname: '',
    periodsList: [],
    days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    end_period: [],
    start_period: [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
    form: {
      day: '',
      from: '',
      to: '',
    },
    dayRules: [(v) => !!v || 'اليوم مطلوب'],
    fromRules: [(v) => !!v || 'بداية الفترة مطلوب'],
    toRules: [(v) => !!v || 'نهاية الفترة مطلوب'],
  }),
  methods: {
    addPeriod() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.loading = true
        this.$store.dispatch('admin/addPeriod', formData).then(() => {
          this.loading = false
          this.form = {
            day: '',
            from: '',
            to: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updatePeriod() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        for (const key in this.form) {
          if (key !== 'title') {
            filterdItem = this.periods.filter(
              (period) => period.id === this.form.id
            )
          }
        }
        if (filterdItem.length > 0) {
          formData.append('id', this.form.id)
          for (const key in filterdItem[0]) {
            if (filterdItem[0][key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.loading = true

          this.$store.dispatch('admin/updatePeriod', formData).then(() => {
            this.loading = false
            this.form = {
              day: '',
              from: '',
              to: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    deletePeriod() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('admin/deletePeriod', this.form.id).then(() => {
          if (this.response.status_code === 200) {
            this.loading = false
            this.form = {
              day: '',
              from: '',
              to: '',
            }
            this.$refs.form.resetValidation()
          }
        })
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
  },
  computed: {
    periods() {
      return this.$store.state.admin.periods
    },
    response() {
      return this.$store.state.admin.response
    },
  },
}
</script>
