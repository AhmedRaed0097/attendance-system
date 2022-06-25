<template>
  <register-login-form />
</template>

<script>
export default {
   layout: 'authLayout',

created() {
  window.addEventListener('beforeunload', this.handler)
},
methods: {
  // try to solve production error duplicate name space 'auth'
  handler: function handler() {
     this.$router.push('/')

  }
}
}
</script>

<style>

</style>
