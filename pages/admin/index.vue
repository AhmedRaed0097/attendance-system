<template>
  <div class="home-wrapper">
    <div class="tw-min-h-[100vh] tw-pt-5 tw-flex tw-flex-col tw-gap-16 md:tw-gap-32">
      <div class="tw-w-[75%] tw-my0 tw-mx-auto title-container">
        <h3
          class="!tw-text-center tw-text-xl md:tw-text-3xl lg:tw-text-4xl !tw-py-5"
        >
          نظام تحضير الطلاب باستخدام تقنية ال
          <span class="tw-text-primary"> (QR Code) </span>
        </h3>
      </div>
      <div class="image-container">
        <img
          width="100%"
          src="~/assets/images/admin/home-page.jpg"
          alt="home-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'adminLayout',
}
</script>

<style lang="scss">
.home-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
</style>
