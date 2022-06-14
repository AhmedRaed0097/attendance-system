<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-8/12 tw-h-full tw-bg-white tw-mx-auto tw-my-0 tw-rounded-xl">
    <div class="icon">
      <slot name="icon" />
    </div>
    <span class="btn-title">
      <slot name="btn-title" />
    </span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

</style>
