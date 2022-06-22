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
      color="#2a3588"
      height="70"
      app
      class="app-bar"
    >
      <div>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <img width="25" src="~/assets/images/admin/burger.svg" alt="burger" />
        </v-app-bar-nav-icon>

        <span class="!tw-text-base sm:!tw-text-xl tw-text-first">
          {{ app_bar_text }}
        </span>
      </div>
      <nav-drawer @drawerClosed="onDrawerClosed" :drawer="drawer" />
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
    app_bar_text: '',
  }),

  watch: {
    '$route.name': {
      handler() {
        this.setAppBarText()
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
    setAppBarText() {
      const routeName = this.$route.name.split('-')[1]
      console.log('aa ', routeName)
      this.drawer = !this.drawer
      if (routeName === undefined) {
        this.app_bar_text = 'الرئيسية'
      } else if (routeName === 'import') {
        this.app_bar_text = 'إستيراد البيانات'
      } else if (routeName === 'majors') {
        this.app_bar_text = 'التخصصات'
      } else if (routeName === 'students') {
        this.app_bar_text = 'الطلاب'
      } else if (routeName === 'lecturers') {
        this.app_bar_text = 'المحاضرين'
      } else if (routeName === 'subjects') {
        this.app_bar_text = 'المواد'
      } else if (routeName === 'lectures') {
        this.app_bar_text = 'المحاضرات'
      } else if (routeName === 'tables') {
        this.app_bar_text = 'الجداول'
      }
    },
  },
  created() {
    this.setAppBarText()
  },
}
</script>
<style lang="scss">
.v-form {
  width: 90%;
  margin: 0 auto;
}
</style>
