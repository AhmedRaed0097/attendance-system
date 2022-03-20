<template>
  <div v-if="showQr" class="qr-wrapper">
    <qrcode-vue :size="qr_size" :value="value"></qrcode-vue>
  </div>
  <v-row v-else class="generate-qr-wrapper">
    <v-col cols="12">
      <v-combobox
        v-model="lecture"
        :items="lecturerLectures"
        label="أختر المادة"
        outlined
        item-text="subject_name"
        item-value="lecture_id"
      >
      </v-combobox>
    </v-col>
    <v-col cols="12">
      <v-combobox
        v-model="week"
        :items="weeks"
        hide-selected
        label="إختر الإسبوع"
        outlined
        placeholder="إختر الأسبوع"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong
                >". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </v-col>
    <v-col cols="12">
      <center>
        <v-btn @click="generateQrCode">Create QR Code</v-btn>
      </center>
    </v-col>
  </v-row>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  fetch() {
    this.$store.dispatch('lecturers/getAllLectures', 1)
  },
  data: () => ({
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lecture: '',
    week: null,
    search: null,
    showQr: false,
    value: {},
    qr_size: 300,
  }),
  components: {
    QrcodeVue,
  },
  computed: {
    lecturerLectures() {
      return this.$store.state.lecturers.all_lectures
    },
  },
  watch: {
    lecture(val) {
      if (val.last_week !== null) {
        this.weeks = this.weeks.filter((v) => v > val.last_week)

        // this.weeks.splice(0 ,val.last_week )
      }
    },
  },
  methods: {
    generateQrCode() {
      if (this.lecture && this.week) {
        this.value = {
          lecture_id: this.lecture.lecture_id,
          week_no: this.week,
        }
        this.showQr = true
      }
    },
  },
}
</script>


<style>
.qr-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}
.generate-qr-wrapper {
  padding: 20px;
  margin-top: 50%;
}
</style>