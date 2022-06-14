<template>
  <div class="tw-h-full">
    <div v-if="showQr" class="qr-wrapper">
      <qrcode-vue :size="qr_size" :value="value"></qrcode-vue>
      <center>
        <v-btn
          rounded
          :loading="loading"
          class="!tw-py-6 !tw-bg-primary"
          dark
          @click="deleteQrCode"
          >تراجع</v-btn
        >
      </center>
    </div>
    <v-row v-else class="generate-qr-wrapper">
      <v-col cols="12" class="tw-mt-8 tw-mb-16">
        <h3 class="!tw-text-center !tw-text-4xl">إنشاء QR CODE</h3>
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="lecture"
          :items="lecturerLectures"
          label="إختر المادة"
          outlined
          item-text="subject_title"
          item-value="lecture_id"
          class="lectures-select"
          return-object
        >
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="week"
          :items="weeks"
          hide-selected
          label="إختر الإسبوع"
          outlined
        >
          <!-- <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong
                >". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template> -->
        </v-select>
      </v-col>
      <v-col cols="12">
        <center>
          <v-btn
            rounded
            :loading="loading"
            class="!tw-py-6 !tw-bg-primary"
            dark
            @click="generateQrCode"
            >إنشاء QR code</v-btn
          >
        </center>
      </v-col>
    </v-row>
    <Alert
      :alert-visible="showAlert"
      :alert-data="alertData"
      @closeModal="isAlertClosed"
    />
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
// import Alert from "~/componentsAlert.vue";

export default {
  fetch() {
    this.$store.dispatch('lecturers/getAllLectures', 1)
  },
  data: () => ({
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lecture: null,
    week: null,
    search: null,
    showQr: false,
    loading: false,
    showAlert: false,
    alertData: {},
    value: {},
    qr_size: window.innerWidth - 200,
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
    'window.innerWidth'(val){
      console.log('aa ',val);
    }
  },
  methods: {
    async generateQrCode() {
      if (this.lecture !== null && this.week !== null) {
        this.loading = true
        await this.$store
          .dispatch('lecturers/generateQrCode', {
            lecture_id: this.lecture.lecture_id,
            week_no: this.week,
          })
          .then((response) => {
            this.setAlertData(response)
          })
          .catch((e) => {
            this.setAlertData(e.response.data)
          })
        this.loading = false

        this.value = JSON.stringify({
          lecture_id: this.lecture.lecture_id,
          week_no: this.week,
        })
        console.log('value ', this.value)
        this.showQr = true
      }
    },
    async deleteQrCode() {
      await this.$store
        .dispatch('lecturers/removeBatchFromAttendance', {
          lecture_id: this.lecture.lecture_id,
          week_no: this.week,
        })
        .then((response) => {
          this.setAlertData(response)
        })
        .catch((e) => {
          this.setAlertData(e.response.data)
        })
      this.showQr = false
    },
    setAlertData(data) {
      this.alertData = data
      this.showAlert = true
    },
    isAlertClosed(payload) {
      if (payload.value) {
        this.showAlert = false
      }
    },
  },
}
</script>

<style>
.qr-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.generate-qr-wrapper {
  padding: 20px;
}
</style>
