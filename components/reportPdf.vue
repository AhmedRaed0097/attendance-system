<template>
  <div v-if="show" class="pdf-wrapper">
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
            <h3 class="text-center mb-10">مساحة الدور المتكرر م^2</h3>
            <br />
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
              :items="reportData.students_attenance_data"
              item-key="lecture_no"
              class="elevation-1 !tw-mt-10 tw-border-2 tw-border-primary !tw-rounded-lg"
              hide-default-footer
            >

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
      show: false,
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
          value: 'student_id',
          sortable: false,
        },
        {
          text: 'إسم الطالب',
          align: 'center',
          value: 'name',
          sortable: false,
        },
      ],
    }
  },
  watch: {
    generatePdf(val) {
      if (val === true) {
        this.generateReport()
      }
    },
    reportData() {
      this.fillHeaders()
    },
  },
  computed: {
    reportData() {
      return this.$store.state.admin.reportData
    },
  },
  methods: {
    async generateReport() {
      await this.$refs.basesPdf.generatePdf()
      this.$emit('pdfGenerated')
    },
    fillHeaders() {
      if (this.reportData) {
        const weeks_no = this.reportData.students_attenance_data[0].attend_states.length
        for (let i = 0; i < weeks_no; i++) {
          this.headers.push({
            text: `الأسبوع ${i + 1}`,
            align: 'center',
            value: `w_${i + 1}`,
            sortable: false,
          })
        }
        setTimeout(() => {
          this.show = true
        }, 500)
      }
    },
    onProgress(e) {
      if (e === 100) {
        this.progressValue = e
        setTimeout(() => {
          this.showProgress = false
        }, 500)
      } else {
        this.showProgress = true
        this.progressValue = e
      }
    },
  },
  mounted() {
    this.fillHeaders()
  },
}
</script>

<style>
.pdf-wrapper {
  background: #080;
  width: 73vw;
}
</style>
