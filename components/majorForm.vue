<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة نخصص جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل نخصص
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف نخصص
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.subject_id.toString().length > 0)
          "
        >
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.student_name"
              :rules="nameRules"
              label="إسم التخصص"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.student_name"
              :rules="nameRules"
              label="المستويات"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="lecturesList"
              :rules="requiredRules"
              item-text="lecture_title"
              outlined
              label="التخصص"
              return-object
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'add'"
                @click="addLecture"
                >إضافة</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'edit'"
                @click="updateLecture"
                >تعديل</v-btn
              >
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'delete'"
                @click="deleteLecture"
                >حذف</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    methodType: {
      type: String,
      default: () => 'add',
    },
  },
  created() {
    if (this.methodType === 'delete' || this.methodType === 'edit') {
      this.$store.dispatch('admin/getTables')
    }
  },
  watch: {
    form() {},
    'form.id'() {
      this.tablesList.filter((n) => {
        if (n.id === this.form.id) {
          this.table = n
        }
      })
    },
    table(val) {
      this.form = { ...val }
    },
  },
  data: () => ({
    valid: false,
    table: null,
    firstname: '',
    lastname: '',
    tableHtmlTitle: '',
    form: {
      major: '',
      levels: '',
    },
    nameRules: [
      (v) => !!v || 'اسم التخصص مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل اسم التخصص عن 5 احرف',
    ],
  }),
  methods: {
    addMajor() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.$store.dispatch('admin/addMajor', formData).then(() => {
          this.form = {
            major: '',
            levels: '',
          }
        })
      }
    },
    updateTable() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('level', this.form.level.value)

        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.$store.dispatch('admin/updateMajor', formData).then(() => {
          this.form = {
            major: '',
            levels: '',
          }
        })
      }
    },
    deleteTable() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/deleteMajor', this.form.id)
        this.form.id = ''
      }
    },
  },
  computed: {
    majorsList() {
      return this.$store.state.admin.majors
    },
  },
}
</script>
