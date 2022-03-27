<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة فترة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل فترة
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
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
              label="اليوم"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.from"
              :items="start_period"
              outlined
              label="بداية الفترة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              :disabled="form.from ? false : true"
              v-model="form.to"
              :items="end_period"
              outlined
              label="نهاية الفترة"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="periodList"
              item-text="title"
              outlined
              label="إخر الفترة"
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
                @click="addPeriod"
                >إضافة</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'edit'"
                @click="updatePeriod"
                >تعديل</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
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
    periods(val) {
      if (val.length > 0) {
        this.periodList = []
        this.periods.forEach((period) => {
          const periodtitle =
            period.day + ' ' + ' من ' + period.from + ' إلى ' + period.to
          this.periodList.push({ title: periodtitle, ...period })
        })
      } else {
        this.subjectList = []
      }
    },
  },
  fetch() {
    if (this.methodType !== 'add') {
      this.$store.dispatch('admin/getPeriods')
    }
  },
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    periodList: [],
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
        this.$store.dispatch('admin/addPeriod', formData).then(() => {
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
        console.log('filterdItem ',filterdItem.length);
        if (filterdItem.length > 0) {
          formData.append('id', this.form.id)
          for (const key in filterdItem[0]) {
            console.log(key , filterdItem[0][key]);
            if (filterdItem[0][key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.$store.dispatch('admin/updatePeriod', formData).then(() => {
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
        this.$store.dispatch('admin/deletePeriod', this.form.id).then(() => {
          this.form = {
            day: '',
            from: '',
            to: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
  },
  computed: {
    periods() {
      return this.$store.state.admin.periods
    },
  },
}
</script>
