<template>
  <div class="snackbar">
    <v-snackbar
      v-model="showAlert"
      :timeout="4000"
      top
      class="alert"
      :class="{
        'alert-error':
          alertData.status_code !== 200 || alertData.status_code !== 201 || alertData.status_code !== 2010,
      }"
    >
      <img
        v-if="alertData.status_code === 200 || alertData.status_code === 201"
        src="~/assets/images/notifications/success-icon.svg"
        alt="success-icon"
      />
      <img
      width="35"
        v-else-if="alertData.status_code === 2010 || alertData.status_code === 409"
        src="~/assets/images/notifications/warning-icon.svg"
        alt="success-icon"
      />
      <img
        v-else
        src="~/assets/images/notifications/error-icon.svg"
        alt="error-icon"
      />

      <h3 v-if="alertData.status_code === 2010  || alertData.status_code === 409">
        تنبيه
        <br />
        <span>
          {{ alertData.message }}
        </span>
      </h3>
      <h3 v-else>
        {{ alertData.status_code === 200 ? 'نجاح' : 'خطأ' }}
        <br />
        <span>
          {{ alertData.message }}
        </span>
      </h3>
      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="showAlert = false">
          إغلاق
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    alertVisible: {
      type: Boolean,
      default: false,
    },
    alertData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      showAlert: false,
    }
  },
  watch: {
    alertVisible() {
      if (this.alertVisible === true) {
        this.showAlert = true
      }
    },
    showAlert() {
      if (this.showAlert === false) {
        this.$emit('closeModal', { value: true })
      }
    },
  },
}
</script>
