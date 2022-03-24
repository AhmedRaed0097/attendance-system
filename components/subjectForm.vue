<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة المادة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">تعديل المادة</h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">حذف المادة</h2>
      </v-card-title>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.lecturer_name"
              :rules="nameRules"
              label="إسم اللمادة"
              required
              outlined
            ></v-text-field>
          </v-col>

            <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn width="140" height="45" class="font-weight-bold" v-if="methodType === 'add'" @click="addSubject">إضافة</v-btn>
              <v-btn v-else width="140" height="45" class="font-weight-bold" @click="editSubject">تعديل</v-btn>
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
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    form: {
      subject_name: '',
    },
    nameRules: [
      (v) => !!v || 'إسم الطالب مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    items: ['foo', 'bar', 'fizz', 'buzz'],
    values: ['foo', 'bar'],
    value: null,
  }),
   methods:{
    addSubject(){
          const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/addSubject', formData).then(() => {
          this.form = {
            lecturer_name: '',
            state: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    editLecturer(){
      //
    },
  }
}
</script>
