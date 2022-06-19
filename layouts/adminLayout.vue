<template>
  <v-app class="adminLayout">
    <v-alert
      :value="showAlert"
      border="right"
      :type="response.status_code === 200 || response.status_code === 201 ? 'success' : 'warning'"
      transition="slide-y-transition"
      class="admin-alert"
      >{{ response.message }}</v-alert
    >
      <nav-drawer @drawerClosed="onDrawerClosed" :drawer="drawer" />
      <v-btn
        icon
        :class="
          $vuetify.breakpoint.mdAndDown && drawer
            ? 'active-burger-menu'
            : 'unactive-burger-menu'
        "
        class="mt-8 !tw-z-20 lg:!tw-z-auto"
        text
        @click="drawer = !drawer"
      >
        <img
          v-if="$vuetify.breakpoint.mdAndDown && drawer"
          width="30"
          height="30"
          src="../assets/images/admin/close.svg"
          alt="close"
        />
        <img
          v-if="$vuetify.breakpoint.mdAndDown && !drawer"
          width="30"
          height="30"
          src="../assets/images/admin/burger.svg"
          alt="burger"
        />
      </v-btn>
    <v-row >

      <v-col cols="12">
        <v-main>
          <Nuxt />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import navDrawer from '~/components/navDrawer.vue'
export default {
  components: { navDrawer },
  data: () => ({
    drawer: null,
  }),
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
