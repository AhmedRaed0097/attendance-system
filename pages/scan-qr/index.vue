<template>
  <div class="scan-qr-wrapper">
    <!-- <qrcode-stream @init="onInit" :camera="camera"></qrcode-stream> -->
    <div class="scan-from-camera">
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>
      <p>{{ error }}</p>
    </div>
    <!-- <div class="scan-from-image">
      <ImageBarcodeReader
        @decode="onImageDecode"
        @error="onError"
        ref="selectedImage"
      ></ImageBarcodeReader>
    </div> -->
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
      error: '',
      camera: 'auto',
    }
  },
  methods: {
    // async onInit(promise) {
    //   log('init')
    //   // show loading indicator

    //   try {
    //     const { capabilities } = await promise

    //     // successfully initialized
    //   } catch (error) {
    //     if (error.name === 'NotAllowedError') {
    //       this.error = 'user denied camera access permisson'
    //     } else if (error.name === 'NotFoundError') {
    //       this.error = 'no suitable camera device installed'
    //     } else if (error.name === 'NotSupportedError') {
    //       this.error = 'page is not served over HTTPS (or localhost)'
    //     } else if (error.name === 'NotReadableError') {
    //       this.error = 'maybe camera is already in use'
    //     } else if (error.name === 'OverconstrainedError') {
    //       this.error =
    //         'did you requested the front camera although there is none?'
    //     } else if (error.name === 'StreamApiNotSupportedError') {
    //       this.error = 'browser seems to be lacking features'
    //     }
    //   } finally {
    //     log('done')
    //     // hide loading indicator
    //   }
    // },
    onDecode(result) {
      alert('start')

      let payload = JSON.parse(result)
      payload.student_id = 3
      this.$store.dispatch('students/scanQr', payload).then((response) => {
        log('response ', response)
      })
      alert('end')

      log('result.lecture_id ', payload)
    },
    onLoaded() {
      log(`Ready to start scanning barcodes`)
    },
    onImageDecode(result) {
      let payload = JSON.parse(result)
      payload.student_id = 1
      this.$store.dispatch('students/scanQr', payload).then((response) => {
      })
    },
    onError(error) {
    },
  },
  mounted() {},
}
</script>

<style>
.scan-qr-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
