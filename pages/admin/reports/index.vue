<template>
  <div class="add-member-wrapper tw-w-full">
    <report-pdf v-if="showPdf" />
    <report-form v-else @clicked="showPdfLayout" />

  </div>
</template>

<script>
export default {
   layout: 'adminLayout',
   data(){
    return{
      showPdf:false
    }
   },
   methods:{
    showPdfLayout(){
      this.showPdf = true
    }
   }
}
</script>
