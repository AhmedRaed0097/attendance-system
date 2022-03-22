<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة محاضر جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل محاضر
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف محاضر
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col
            cols="12"
            :md="
              methodType !== 'add' && form.lecturer_name.length === 0 ? 12 : 6
            "
          >
            <v-autocomplete
              v-if="methodType !== 'add' && form.lecturer_name.length === 0"
              v-model="form"
              :items="lecturerList"
              :rules="requiredRules"
              item-text="lecturer_name"
              outlined
              label="اسم المحاضر"
              return-object
            ></v-autocomplete>
            <v-text-field
              v-else
              v-model="form.lecturer_name"
              :rules="nameRules"
              label="إسم "
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-if="
                methodType === 'add' ||
                (methodType !== 'add' && this.form.lecturer_name.length === 0)
              "
              v-model="form.state"
              :items="items"
              :rules="requiredRules"
              item-text="text"
              item-value="value"
              outlined
              label="الحالة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                height="45"
                class="font-weight-bold"
                v-if="methodType === 'add'"
                @click="addLecturer"
                >إضافة</v-btn
              >
              <v-btn
                v-else
                width="140"
                height="45"
                class="font-weight-bold"
                @click="updateLecturer"
                >تعديل</v-btn
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
  fetch() {
    if (this.methodType !== 'add') {
      this.$store.dispatch('admin/getLecturers')
    }
  },
  data: () => ({
    valid: false,
    firstname: '',
    lecturerList: [],
    lastname: '',
    form: {
      lecturer_name: '',
      state: '',
    },
    nameRules: [
      (v) => !!v || 'إسم المحاضر مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    requiredRules: [(v) => !!v || 'الحالة مطلوب'],
    email: '',
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    items: [
      {
        text: 'مفعل',
        value: 1,
      },
      {
        text: 'غير مفعل',
        value: 0,
      },
    ],
    values: ['foo', 'bar'],
    value: null,
  }),
  methods: {
    addLecturer() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/addLecturer', formData).then(() => {
          this.form = {
            lecturer_name: '',
            state: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateLecturer() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        for (const key in this.form) {
          filterdItem = this.lecturers.filter(
            (lecture) => lecture.id === this.form.id
          )
          formData.append(key, this.form[key])
        }
        if (filterdItem.length > 0) {
          for (const key in filterdItem) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.$store.dispatch('admin/updateLecturer', formData).then(() => {
            this.form = {
              lecturer_name: '',
              state: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
  },
  watch: {
    lecturers() {
      if (this.lecturers.length > 0) {
        this.lecturers.forEach((lecture) => {
          this.lecturerList.push({ ...lecture })
        })
      }
    },
  },
  computed: {
    lecturers() {
      return this.$store.state.admin.lecturers
    },
  },
}
</script>
