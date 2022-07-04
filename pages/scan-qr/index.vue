<template>
  <div class="scan-qr-wrapper">
    <Alert
      :alert-visible="showAlert"
      :alert-data="alertData"
      @closeModal="isAlertClosed"
    />
    <!-- <qrcode-stream @init="onInit" :camera="camera"></qrcode-stream> -->

    <div v-if="scanBySelectFile" class="scan-from-image">
      <ImageBarcodeReader
        @decode="onImageDecode"
        @error="onError"
        ref="selectedImage"
      ></ImageBarcodeReader>
    </div>

    <div v-else class="scan-from-camera">
      <StreamBarcodeReader
        @decode="onImageDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>
      <p>{{ error }}</p>
    </div>
    <v-btn @click="scanBySelectFile = !scanBySelectFile">
      <span v-if="scanBySelectFile">مسح بإختيار الملف</span>
      <span v-else>مسح بإستخدام الكاميرا</span>
    </v-btn>
  </div>
</template>

<script>
// import { QrcodeStream } from 'vue-qrcode-reader'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { ImageBarcodeReader } from 'vue-barcode-reader'
export default {
  components: {
    // QrcodeStream
    StreamBarcodeReader,
    ImageBarcodeReader,
  },
  data() {
    return {
      scanBySelectFile: true,
      error: '',
      camera: 'auto',
      showAlert: false,
      alertData: {},
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    async onInit(promise) {
      log('init')
      // show loading indicator

      try {
        const { capabilities } = await promise

        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'user denied camera access permisson'
          this.setAlertData({
            message: 'لايمكن الوصول إلى الكاميرا',
            status_code: 403,
          })
        } else if (error.name === 'NotFoundError') {
          this.error = 'no suitable camera device installed'
          this.setAlertData({
            message: 'لاتوجد كاميرا مرتبطة',
            status_code: 404,
          })
        } else if (error.name === 'NotSupportedError') {
          this.error = 'page is not served over HTTPS (or localhost)'
          this.setAlertData({
            message: 'الصفحة لا تستخدم البرتوكول https',
            status_code: 501,
          })
        } else if (error.name === 'NotReadableError') {
          this.error = 'maybe camera is already in use'
          this.setAlertData({
            message: 'الكاميرا مستخدمة بالفعل',
            status_code: 422,
          })
        } else if (error.name === 'OverconstrainedError') {
          this.setAlertData({
            message: 'حدث خطأ في الوصول إلى الكاميرا',
            status_code: 500,
          })

          this.error =
            'did you requested the front camera although there is none?'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.setAlertData({
            message: 'حدث خطأ في الوصول إلى الكاميرا',
            status_code: 500,
          })

          this.error = 'browser seems to be lacking features'
        }
      } finally {
        log('done')
        // hide loading indicator
      }
    },
    onDecode(result) {
      alert('start')

      let payload = JSON.parse(result)
      payload.student_id = this.user.id
      this.$store.dispatch('student/scanQr', payload).then((response) => {
        log('response ', response)
      })
      alert('end')

      log('result.lecture_id ', payload)
    },
    onLoaded() {
      log(`Ready to start scanning barcodes`)
    },
    async onImageDecode(result) {
      console.log('result ', result)
      let payload = JSON.parse(result)
      console.log('payload ', payload)

      payload.student_id = this.user.id

      await this.$store
        .dispatch('student/scanQr', payload)
        .then((response) => {
          this.setAlertData(response)
          setTimeout(() => {
            this.$router.back()
          }, 3000);
          let selectedImageFile = { ...this.$refs.selectedImage }
          // to clear input file after scan
          selectedImageFile.$vnode.elm.value = null
        })
        .catch((e) => {
          this.$router.back()
          this.setAlertData(e.response.data)
        })
    },
    onError(error) {},
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
  mounted() {},
}
</script>

<style>
.scan-qr-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
