<template>
  <div class="container">
    <div class="lds-dual-ring after:tw-border-primary after:tw-border-[5px] after:tw-border-solid after:tw-border-y-primary after:tw-border-x-transparent" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 740px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
