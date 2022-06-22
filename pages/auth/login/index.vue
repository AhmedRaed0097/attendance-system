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
  handler: function handler() {
     this.$router.push('/')

  }
}
}
</script>

<style>

</style>
