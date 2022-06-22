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
    <v-app-bar
      v-if="$vuetify.breakpoint.smAndDown"
      height="70"
      app
      class="app-bar !tw-bg-primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <img
            width="30"
            height="30"
            src="../assets/images/admin/burger.svg"
            alt="burger"
          />
      </v-app-bar-nav-icon>

      <nav-drawer @drawerClosed="onDrawerClosed" :drawer="drawer" />
      <span class="!tw-text-base sm:!tw-text-xl tw-text-first">
        {{ app_bar_text }}
      </span>
      <div class="tw-flex tw-gap-x-2.5 !tw-ml-[-10px]">
        <img
          width="25"
          v-if="$auth.loggedIn"
          @click="$auth.logout()"
          class="back-icon tw-mr-6 tw-cursor-pointer"
          src="../assets/images/auth/logout.svg"
          alt="logout"
        />
        <img
          width="25"
          v-if="$route.name !== 'index'"
          @click="$router.back()"
          src="../assets/images/home/back-icon.svg"
          alt=""
        />
      </div>
    </v-app-bar>
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
    app_bar_text:''
  }),

  watch: {
    '$route.name': {
      handler() {
        this.drawer = !this.drawer
        if (this.$route.name === 'index') {
          this.app_bar_text = 'الرئيسية'
        } else if (this.$route.name === 'lectures-table') {
          this.app_bar_text = 'جدول المحاضرات'
        } else if (this.$route.name === 'generate-qr') {
          this.app_bar_text = 'إنشاء QR CODE'
        } else if (this.$route.name === 'attendance-table') {
          this.app_bar_text = 'جدول الحضور'
        } else if (this.$route.name === 'manual-attendance') {
          this.app_bar_text = 'التحضير اليدوي'
        }
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
