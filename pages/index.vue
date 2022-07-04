<template>
  <div class="home-wrapper">
    <v-row>
      <v-col cols="12" class="tw-mb-10">
        <div class="home-image-contaienr">
          <div class="home-image"></div>
          <svg
            v-if="$vuetify.breakpoint.smAndDown"
            class="svg-clip"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              id="wave-path"
              fill="#fff"
              fill-opacity="2"
              d="M0,128L48,149.3C96,171,192,213,288,208C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,165.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <div class="avatar tw-w-20 sm:tw-w-24 md:tw-w-28">
            <img
              src="../assets/images/home/user.jpg"
              alt="user-avatar"
              class="avatar tw-border-2 tw-border-solid tw-border-gray-400 tw-rounded-full tw-mt-1"
            />
          </div>
        </div>
        <div
          v-if="user"
          class="user-data tw-text-center tw-mb-2 tw-mt-0 sm:tw-mt-2"
        >
          <h3 class="tw-text-xl tw-mt-4 sm:tw-mt-4 tw-mb-1">{{ user.name }}</h3>
          <p v-if="user.user_type === 'student'" class="tw-text-xs !tw-mb-1">
            علوم الحاسوب
          </p>
          <br v-else />
          <p v-if="user.user_type === 'student'" class="tw-text-xs !tw-mb-0">
            المستوى الرابع
          </p>
          <!-- <br v-else> -->
        </div>
      </v-col>
      <v-row v-if="isStudent === true" class="btns-row">
        <v-col cols="6">
          <btn-component @clicked="goTo('lectures-table')">
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/list-icon.png"
                alt="list-icon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> جدول محاضرات اليوم </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component @clicked="goTo('attendance-table')">
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/list-icon.png"
                alt="list-icon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> جدول الحضور </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component>
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/coming-soon.png"
                alt="coming-soon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> قريباً </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component>
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/coming-soon.png"
                alt="coming-soon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> قريباً </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6" class="center-btn-col">
          <img
            @click="goTo('scan-qr')"
            src="~/assets/images/home/Compact Camera_50px.svg"
            alt=""
            class="tw-cursor-pointer"
          />
        </v-col>
      </v-row>
      <v-row v-else class="btns-row">
        <v-col cols="6">
          <btn-component @clicked="goTo('lectures-table')">
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/list-icon.png"
                alt="list-icon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> جدول محاضرات اليوم </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component @clicked="goTo('manual-attendance')">
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/list-icon.png"
                alt="list-icon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> التحضير اليدوي </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component>
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/coming-soon.png"
                alt="coming-soon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> قريباً </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6">
          <btn-component>
            <template #icon>
              <img
                width="28"
                src="../assets/images/home/coming-soon.png"
                alt="coming-soon"
              />
            </template>
            <template #btn-title>
              <span class="tw-text-xs"> قريباً </span>
            </template>
          </btn-component>
        </v-col>
        <v-col cols="6" class="center-btn-col">
          <img
            @click="goTo('generate-qr')"
            src="../assets/images/home/Plus.svg"
            alt="plus icon"
            class="tw-cursor-pointer"
          />
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'student',
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    isStudent() {
      return this.user.user_type === 'student'
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(`/${route}`)
    },
  },
}
</script>

<style lang="scss">
.row {
}
.header-img {
}
.btns-row {
  position: relative;
  background: #f3f3f3f5;
  .col-6 {
    height: 6rem;
  }
  .home-btn {
    width: 100%;
    height: 80px !important;
    padding: 20px !important;
  }
}
.center-btn-col {
  width: 17%;
  position: absolute;
  margin: auto;
  top: 58px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: center;
  img {
    width: 50px;
    cursor: pointer;
  }
}
.home-image {
  width: 100vw;
  height: 43vh;
  background-image: url('../assets/images/image1.jpg');
  background-size: cover;
  margin-top: -2px;
}
.switch-col {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.home-image-contaienr {
  position: relative;
  .svg-clip {
    position: absolute;
    bottom: -1px;
  }
  .avatar {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
