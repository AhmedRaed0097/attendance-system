<template>
  <div>
    <Loading v-if="loading" />

    <v-row v-else>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12">
        <div class="header">
          <h3 class="tw-text-3xl tw-mt-10 tw-mb-2 tw-text-center">
            جدول الحضور
          </h3>
        </div>
      </v-col>
      <v-col cols="12" class="!tw-px-6">
        <v-data-table
          :headers="headers"
          :items="attendanceData"
          item-key="id"
          :search="search"
          :custom-filter="filterLectures"
          class="elevation-1 tw-border-2 tw-border-primary !tw-rounded-lg"
          hide-default-footer
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              clearable
              label="بحث (اسم المادة)"
              class="mx-4"
            ></v-text-field>
            <!-- <v-select
              v-model="filterdState"
              :items="states"
              clearable
              validate-on-blur
              label="الحالة"
              outlined
              item-text="text"
              item-value="value"
            >
            </v-select> -->
          </template>
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> لاتوجد بيانات . </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:no-results>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <p class="tw-text-sm">
                    لاتوجد بيانات مطابقة لما تم البحث عنه"<strong>{{
                      search
                    }}</strong
                    >" .
                  </p>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:[`item.id`]="{ item }">
            <p>{{ item.id }}</p>
          </template>
          <template v-slot:[`item.subject_name`]="{ item }">
            <p>{{ item.subject_name }}</p>
          </template>
          <template v-slot:[`item.day`]="{ item }">
            <p class="mb-0">{{ item.day }}</p>
            <span>{{ item.from }} - {{ item.to }}</span>
          </template>
          <template v-slot:[`item.week_no`]="{ item }">
            {{ item.week_no }}
          </template>
          <template v-slot:[`item.state`]="{ item }">
            <v-chip
              v-if="item.state === true || item.state"
              small
              color="#dfdfdf"
              text-color="#22c55e"
            >
              حاضر
            </v-chip>
            <v-chip v-else small color="#dfdfdf" text-color="#ff5555">
              غائب
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lectures: [
        {
          id: '1',
          lecture_name: 'Security',
          from_to: '8 - 10',
        },
        {
          id: '2',
          lecture_name: 'OS',
          from_to: '10 - 12',
        },
        {
          id: '3',
          lecture_name: 'AI',
          from_to: '12 - 2',
        },
      ],
      headers: [
        { text: 'الرقم', align: 'center', value: 'id', sortable: true },
        {
          text: 'إسم المادة',
          align: 'center',
          value: 'subject_name',
          sortable: true,
        },

        { text: 'اليوم/الفترة', align: 'center', value: 'day', sortable: true },

        {
          text: 'رقم الأسبوع',
          align: 'center',
          value: 'week_no',
          sortable: true,
        },

        {
          text: 'الحالة',
          align: 'center',
          value: 'state',
          sortable: true,
        },
      ],
      search: '',
      filterdState: '',
      states: [
        { text: 'حاضر', value: '1' },
        { text: 'غائب', value: '0' },
      ],
    }
  },
  created() {
    this.$store.dispatch('students/getAttendanceTable', {
      student_id: 3,
    })
  },
  computed: {
    attendanceData() {
      return this.$store.state.students.attendance_table_data
    },
    loading() {
      return this.$store.state.students.loading
    },
  },
  methods: {
    filterLectures(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toUpperCase().indexOf(search.toUpperCase()) !== -1
      )
    },
  },
}
</script>

<style lang="scss">
.attendance-row-data {
  .col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.lecture-card {
  margin: 47px 20px;
  height: 80px;
  width: 90vw;
  display: flex;
  align-items: center;
  border-radius: 13px !important;
  padding: 5px;
  .row .col {
    text-align: center;
  }
}
</style>
