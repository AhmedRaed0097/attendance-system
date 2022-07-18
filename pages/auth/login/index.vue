<template>
  <register-login-form />
</template>

<script>
import { uuid } from 'vue-uuid';
export default {
  layout: 'authLayout',

  created() {
    window.addEventListener('beforeunload', this.handler)
  },
  methods: {
    // try to solve production error duplicate name space 'auth'
    handler: function handler() {
      this.$router.push('/')
    },
  },
  mounted() {
    console.log('v1 ', window.navigator.userAgent)
    // console.log('v3 ', this.$uuid.v3())
    // console.log('v4 ', this.$uuid.v4())
  },
}
</script>

<style>
</style>
