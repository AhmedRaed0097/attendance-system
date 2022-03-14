<template>
  <div class="home-wrapper">
    <v-row>
      <v-col cols="12">
        <div class="home-image"></div>
      </v-col>
      <v-row v-if="type === 'student'" class="btns-row">
        <v-col cols="6">
            <v-btn to="/lectures-table" class="home-btn"
            >جدول المحاضرات اليومي</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn to="/attendance-table" class="home-btn">جدول الحضور</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="home-btn">قريباً</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="home-btn">قريباً</v-btn>
        </v-col>
        <v-col cols="6" class="center-btn-col">
          <img @click="goTo('scan-qr')" src="~/assets/images/home/Compact Camera_50px.svg" alt="" />
        </v-col>
      </v-row>
      <v-row v-else class="btns-row">
        <v-col cols="6">
          <v-btn to="/lectures-table" class="home-btn"
            >جدول المحاضرات اليومي</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn to="/manual-attendance" class="home-btn">التحضير اليدوي</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="home-btn">قريباً</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="home-btn">قريباً</v-btn>
        </v-col>
        <v-col cols="6" class="center-btn-col">
          <img @click="goTo('generate-qr')" src="../assets/images/home/Plus.svg" alt="" />

        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // type: 'lecturer',
       type: 'student',
    }
  },
  methods: {
    goTo(route){
      this.$router.push(`/${route}`)
    }
  },
}
</script>

<style lang="scss">
.row {
  width: 100vw;
}
.header-img {
  width: 100vw;
}
.btns-row {
  position: relative;
  .col {
    padding: 0 !important;
  }
  .home-btn {
    width: 100%;
    height: 80px !important;
    padding: 0 !important;
  }
}
.center-btn-col {
  width: 50px;
  position: absolute;
  margin: auto;
  top: 52px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  img {
    width: 100%;
    cursor: pointer;
  }
}
.home-image {
  width: 100vw;
  height: 50vh;
  background-image: url('../assets/images/image1.jpg');
  background-size: cover;
  // clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
}
</style>
