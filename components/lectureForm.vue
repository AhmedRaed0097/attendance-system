<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة محاضرة جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">تعديل محاضرة</h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">حذف محاضرة</h2>
      </v-card-title>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.lecturer_name"
              :rules="nameRules"
              label="إسم المحاضرة"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="value"
              :items="items"
              outlined
              label="الحالة"
            ></v-autocomplete>
          </v-col>
            <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn width="140" height="45" class="font-weight-bold" v-if="methodType === 'add'" @click="addLecturer">إضافة</v-btn>
              <v-btn v-else width="140" height="45" class="font-weight-bold" @click="editLecturer">تعديل</v-btn>
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
      lecturer_name: '',
      state: '',
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
    addLecturer(){
        //
    },
    editLecturer(){
      //
    },
  }
}
</script>
