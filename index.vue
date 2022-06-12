<template>
  <div class="scan-qr-wrapper">
    <!-- <qrcode-stream @init="onInit" :camera="camera"></qrcode-stream> -->
    <StreamBarcodeReader
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
    <p>{{ error }}</p> 
  </div>
</template>

<script>
// import { QrcodeStream } from 'vue-qrcode-reader'
import { StreamBarcodeReader } from 'vue-barcode-reader'
export default {
  components: {
    // QrcodeStream
    StreamBarcodeReader,
  },
  data() {
    return {
      error: '',
      camera: 'auto',
    }
  },
  methods: {
    // async onInit(promise) {
    //   console.log('init')
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
    //     console.log('done')
    //     // hide loading indicator
    //   }
    // },
    onDecode(text) {
      console.log(`Decode text from QR code is ${text}`)
    },
    onLoaded() {
      console.log(`Ready to start scanning barcodes`)
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
