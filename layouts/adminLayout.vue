<template>
  <v-app class="adminLayout">
    <v-alert
      :value="showAlert"
      border="right"
      :type="
        response.status_code === 200 || response.status_code === 201
          ? 'success'
          : 'warning'
      "
      transition="slide-y-transition"
      class="admin-alert"
      >{{ response.message }}</v-alert
    >
    <nav-drawer @drawerClosed="onDrawerClosed" />

    <v-row>
      <v-col cols="12">
        <v-main>
          <Nuxt />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import checkAdminMixinjs from '~/mixins/checkAdminMixinjs'

import navDrawer from '~/components/navDrawer.vue'
export default {
  components: { navDrawer },
  mixins: [checkAdminMixinjs],
  // middleware: 'checkUserType',
  data: () => ({
    drawer: null,
  }),

  watch: {
    '$route.name': {
      handler() {
        this.drawer = !this.drawer
      },
    },
  },
  beforeCreate() {
    this.$vuetify.rtl = true
  },
  computed: {
    showAlert() {
      return this.$store.state.admin.show_alert
    },
    response() {
      return this.$store.state.admin.response
    },
  },
  methods: {
    onDrawerClosed() {
      this.drawer = false
    },
  },
}
</script>
<style lang="scss">
.v-form {
  width: 90%;
  margin: 0 auto;
}
</style>
