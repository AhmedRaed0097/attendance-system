<template>
  <v-app>
    <v-app-bar height="70" app class="app-bar">
      <span>
        {{ app_bar_text }}
      </span>
      <img
        v-if="$route.name !== 'index'"
        @click="$router.back()"
        class="back-icon"
        src="../assets/images/home/back-icon.svg"
        alt=""
      />
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      app_bar_text: '',
    }
  },
  watch: {
    '$route.name': {
      handler() {
        if (this.$route.name === 'index') {
          this.app_bar_text = 'الرئيسية'
        } else if (this.$route.name === 'lectures-table') {
          this.app_bar_text = 'جدول المحاضرات'
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
    }
  },
}
</script>
<style lang="scss">
body {
  direction: rtl;
}
.v-main {
  max-width: 93%;
  margin: 0 auto;
}
.app-bar {
  max-height: 80px;
  background: rgb(111 139 215) !important;
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
.back-icon {
  margin-left: 0px;
}
</style>