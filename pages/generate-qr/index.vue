<template>
  <v-row class="generate-qr-wrapper">
    <v-col cols="12">
      <v-combobox
        v-model="lecture"
        :items="lecturerLectures"
        label="أختر المادة"
        outlined
        item-text="subject_name"
        item-value="lecture_id"
      >
      </v-combobox>
    </v-col>
    <v-col cols="12">
      <v-combobox
        v-model="week"
        :items="weeks"
        hide-selected
        label="إختر الإسبوع"
        outlined
        placeholder="إختر الأسبوع"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong
                >". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </v-col>
    <v-col cols="12">
      <center>
        <v-btn>Create QR Code</v-btn>
      </center>
    </v-col>
  </v-row>
</template>

<script>
export default {
  fetch() {
    this.$store.dispatch('lecturers/getAllLectures', 1)
  },
  data: () => ({
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lecture: '',
    week: null,
    search: null,
  }),

  computed: {
    lecturerLectures() {
      return this.$store.state.lecturers.all_lectures
    },
  },
  watch: {
    lecture(val) {
      if(val.last_week !== null){
        this.weeks = this.weeks.filter((v)=> v > val.last_week)

        // this.weeks.splice(0 ,val.last_week )
      }
    },
  },
}
</script>


<style>
.generate-qr-wrapper {
  padding: 20px;
  margin-top: 50%;
}
</style>