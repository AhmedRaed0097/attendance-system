<template>
  <div class="container">
    <div class="lds-dual-ring" />
  </div>
</template>

<script>
export default {

}
</script>

<style>
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
  border: 6px solid rgb(2 65 237);
  border-color: rgb(2 65 237) transparent rgb(2 65 237) transparent;
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
