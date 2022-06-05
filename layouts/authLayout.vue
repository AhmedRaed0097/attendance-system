<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
beforeCreate () {
    this.$vuetify.rtl = true
  },
}
</script>

<style>

</style>