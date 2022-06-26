<template>
  <div class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 class="add-member-title">التقارير</h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="8">
            <v-autocomplete
              v-model="form"
              :items="lecturesList"
              :rules="requiredRules"
              item-text="lecture_title"
              outlined
              validate-on-blur
              label="المحاضرة"
              return-object
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-combobox
              v-model="week"
              :items="weeks"
              :rules="requiredRules"
              validate-on-blur
              hide-selected
              label="الإسبوع"
              outlined
              placeholder="إختر الأسبوع"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> لا توجد بيانات . </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                rounded
                class="!tw-py-6 tw-ml-2 !tw-bg-admin-primary"
                dark
                @click="downloadReport"
                >عرض</v-btn
              >
              <v-btn
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                @click="downloadReport"
                >تنزيل</v-btn
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
  mounted() {
    if (this.lectures.length === 0) {
      this.$store.dispatch('admin/getLectures')
    } else {
      this.fillLectures()
    }
  },
  data: () => ({
    valid: false,
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    week: null,
    lecturesList: [],
    form: {},
    requiredRules: [(v) => !!v || 'الحقل مطلوب'],
  }),
  methods: {
    downloadReport() {},
    fillLectures() {
      if (this.lectures.length > 0) {
        this.lecturesList = []
        this.lectures.forEach((lecture) => {
          this.lecturesList.push({ ...lecture })
        })
      } else {
        this.lecturesList = []
      }
    },
  },
  watch: {
    'form.lecturer_id'(val) {
      if (val && val.last_week) {
        this.weeks = []
        for (let i = 0; i < val.last_week; i++) {
          this.weeks.push(i + 1)
        }
      } else {
        this.week = null
        this.weeks = []
      }
    },
  },
  computed: {
    lectures() {
      return this.$store.state.admin.lectures
    },
  },
}
</script>
