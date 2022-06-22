<template>
  <v-app>
    <v-app-bar
      v-if="$vuetify.breakpoint.smAndDown"
      height="70"
      app
      class="app-bar !tw-bg-primary"
    >
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
    <v-card class="tw-rounded-sm"> </v-card>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import checkAdminMixinjs from '~/mixins/checkAdminMixinjs'
export default {
  name: 'DefaultLayout',
  mixins:[checkAdminMixinjs],
  // middleware: 'checkUserType',
  data() {
    return {
      app_bar_text: '',
    }
  },
  methods: {
    logout() {
      // this.$auth.logout()
      this.$store.dispatch(`${this.user.user_type}/logout`).then(() => {
        window.location.reload()
      })
    },
  },
  computed:{
    user(){
      return this.$auth.user
    }
  },
  watch: {
    '$route.name': {
      handler() {
        if (this.$route.name === 'index') {
          this.app_bar_text = 'الرئيسية'
        } else if (this.$route.name === 'lectures-table') {
          this.app_bar_text = 'جدول المحاضرات'
        } else if (this.$route.name === 'generate-qr') {
          this.app_bar_text = 'إنشاء QR CODE'
        } else if (this.$route.name === 'attendance-table') {
          this.app_bar_text = 'جدول الحضور'
        }else if (this.$route.name === 'manual-attendance') {
          this.app_bar_text = 'التحضير اليدوي'
        }
      },
    },
  },
  mounted() {},
  created() {
    console.log('process.env ', process.env.S3_BUCKET)

    if (process.client) {
    }
    if (this.$route.name === 'index') {
      this.app_bar_text = 'الرئيسية'
    } else if (this.$route.name === 'lectures-table') {
      this.app_bar_text = 'جدول المحاضرات'
    } else if (this.$route.name === 'manual-attendance') {
      this.app_bar_text = 'التحضير اليدوي'
    }
  },
  beforeCreate() {
    this.$vuetify.rtl = true

  },
}
</script>
<style lang="scss">
body {
  direction: rtl;
}
.v-main {
  max-width: 100%;

  // padding: 0 100px !important;
  // margin: 0 auto;
}
.app-bar {
  max-height: 80px;
  // background: rgb(111 139 215) !important;
  .v-toolbar__content {
    display: flex;
    justify-content: space-between;
  }
  .v-toolbar__content {
    font-size: 27px;
    display: flex;
    align-items: center;
    height: 100% !important;
    color: #fff;
  }
}
.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 56px;
  height: 32px;
  object-fit: contain;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #e5e5e5;
  transition: background-color ease 0.3s;
  direction: ltr;
}
.toggle:before {
  content: '';
  display: block;
  position: absolute;
  z-index: 2;
  width: 22px;
  height: 22px;
  object-fit: contain;
  left: 5px;
  top: 5px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
  background-color: #bababa;
}
.toggle:checked {
}
.toggle:checked:before {
  left: 30px;
}
.v-application--wrap {
  overflow: hidden;
}
</style>
