<template>
  <div class="tw-h-full">
    <Alert
      :alert-visible="showAlert"
      :alert-data="alertData"
      @closeModal="isAlertClosed"
    />
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
        </v-select>
      </v-col>
      <v-col cols="12">
        <center>
          <v-btn
            :loading="loading"
            rounded
            class="!tw-py-6 !tw-bg-primary"
            dark
            @click="generateQrCode"
            >إنشاء QR code</v-btn
          >
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
// import Alert from "~/componentsAlert.vue";

export default {
  mounted() {
    this.$store.dispatch('lecturer/getLecturerLectures', 1)
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
    qr_size: null,
  }),
  components: {
    QrcodeVue,
  },
  created() {
    if (window.innerWidth > 900) {
      this.qr_size = window.innerWidth / 2
    } else {
      this.qr_size = window.innerWidth - window.innerWidth * 0.20
    }
    window.addEventListener('resize', this.onResize)
  },
  computed: {
    lecturerLectures() {
      return this.$store.state.lecturer.lecturerLectures
    },
  },
  watch: {
    lecture(val) {
      if (val.last_week !== null) {
        this.weeks = this.weeks.filter((v) => v > val.last_week)
      }
    },
  },
  methods: {
    async generateQrCode() {
      if (this.lecture !== null && this.week !== null) {
        this.loading = true
        await this.$store
          .dispatch('lecturer/generateQrCode', {
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
        this.showQr = true
      }
    },
    async deleteQrCode() {
      await this.$store
        .dispatch('lecturer/removeBatchFromAttendance', {
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
    onResize(e) {
      if (window.innerWidth > 900) {
        this.qr_size = window.innerWidth / 2
      } else {
      this.qr_size = window.innerWidth - window.innerWidth * 0.20
      }
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
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
