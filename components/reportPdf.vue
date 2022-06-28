<template>
  <div class="pdf-wrapper">
    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="true"
       :preview-modal="false"
      :paginate-elements-by-height="1400"
      :filename="filename"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="100%"
      @progress="onProgress($event)"
      ref="basesPdf"
    >
      <section slot="pdf-content">
          <v-row>
            <v-col cols="12" class="mb-10">

              <h3 class="text-center mb-10">
                مساحة الدور المتكرر  م^2
              </h3>
              <br>
              <!-- <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>العنصر</th>
                      <th>الكمية</th>
                      <th>الوحدة</th>
                      <th>سعر الوحدة</th>
                      <th>التكلفة الإجمالية</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>خرسانة النظافة للقواعد</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                      <td>م^3</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                    </tr>
                    <tr>
                      <td>خرسانة المسلحة للقواعد</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                      <td>م^3</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                    </tr>
                    <tr>
                      <td>Lorem ipsum dolor sit amet.  </td>
                      <td>طن</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                      <td>Lorem ipsum dolor sit amet.</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table> -->
            <v-data-table
          :headers="headers"
          :items="lectures"
          item-key="lecture_no"
          class="
            elevation-1
            !tw-mt-10
            tw-border-2 tw-border-primary
            !tw-rounded-lg
          "
          hide-default-footer
        >
          <template v-slot:[`item.lecture_no`]="{ item }">
            <p>{{ item.lecture_no }}</p>
          </template>
          <template v-slot:[`item.subject_name`]="{ item }">
            <p>{{ item.subject_name }}</p>
          </template>
          <template v-slot:[`item.period`]="{ item }">

            <p class="!tw-mb-1 !tw-mt-1">
            {{item.period}}
            </p>
          </template>
        </v-data-table>
            </v-col>
          </v-row>
      </section>
    </vue-html2pdf>
    <v-overlay :value="showProgress">
      <div>
        <p>جارٍ التزيل...</p>
        <v-progress-linear :value="progressValue"></v-progress-linear>
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    generatePdf: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filename: '',
      showProgress: false,
      progressValue: 0,
         lectures: [
        {
          lecture_no: '1',
          subject_name: 'Security',
          period: '8 - 10',
        },
        {
          lecture_no: '2',
          subject_name: 'OS',
          period: '10 - 12',
        },
        {
          lecture_no: '3',
          subject_name: 'AI',
          period: '12 - 2',
        },
      ],
           headers: [
        {
          text: 'الرقم',
          align: 'center',
          value: 'lecture_no',
          sortable: false,
        },
        {
          text: 'إسم المادة',
          align: 'center',
          value: 'subject_name',
          sortable: false,
        },
        { text: 'اليوم/الفترة', align: 'center', value: 'period', sortable: false },
      ],
    }
  },
  watch: {
    generatePdf(val) {
      if (val === true) {
        this.generateReport()
      }
    },
  },
  computed: {
    reportData(){
      return this.$store.state.admin.reportData
    }
  },
  methods: {
    async generateReport() {
      await this.$refs.basesPdf.generatePdf()
      this.$emit('pdfGenerated')
    },
    onProgress(e) {
      if (e === 100) {
        this.progressValue = e
        setTimeout(() => {
          this.showProgress = false

        }, 500);
      } else {
        this.showProgress = true
        this.progressValue = e
      }
    },
  },
  mounted() {

  },
}
</script>

<style>
.pdf-wrapper{
  background: #080;
  width: 73vw;
}
</style>
