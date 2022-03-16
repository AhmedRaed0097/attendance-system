<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة جدول جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل جدول
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف جدول
        </h2>
      </v-card-title>
      <v-form v-model="valid">
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-text-field
              v-model="form.title"
              :rules="nameRules"
              label="عنوان الجدول"
              required
              outlined
            ></v-text-field>
          </v-col> -->
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.major"
              :items="majors"
              outlined
              label="التخصص"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.level"
              :items="levels"
              outlined
              label="المستوى"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.batch_type"
              :items="batch_types"
              outlined
              label="نوع القبول"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <p
              class="mt-4 pointer"
              v-if="form.title"
              v-html="this.tableHtmlTitle"
            ></p>
            <v-btn text class="mt-4" v-else @click="showTableTitle"
              >عرض عنوان الجدول</v-btn
            >
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
                @click="editLecturer"
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
  watch: {
    form() {},
  },
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    tableHtmlTitle: '',
    form: {
      title: '',
      level: '',
      major: '',
      batch_type: '',
    },
    majors: ['علوم الحاسوب', 'تقنية المعلومات'],
    batch_types: ['عام', 'موازي'],
    levels: [
      {
        text: 'الأول',
        value: 1,
      },
      {
        text: 'الثاني',
        value: 2,
      },
      {
        text: 'الثالث',
        value: 3,
      },
      {
        text: 'الرابع',
        value: 4,
      },
    ],
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
    items: ['foo', 'bar', 'fizz', 'buzz'],
    values: ['foo', 'bar'],
    value: null,
  }),
  methods: {
    addLecturer() {
      //
    },
    editLecturer() {
      //
    },
    showTableTitle() {
      if (this.form.major && this.form.level && this.form.batch_type) {
        this.form.title =
          ' جدول المحاضرات لتخصص' +
          ' ' +
          this.form.major +
          ' للمستوى الـ' +
          ' ' +
          this.form.level +
          ' ' +
          'نوع القبول ' +
          this.form.batch_type

        this.tableHtmlTitle = `<p>  جدول المحاضرات لتخصص <strong> ${this.form.major}</strong>  للمستوى الـ <strong> ${this.form.level}</strong>  نوع القبول <strong> ${this.form.batch_type}</strong> </p>`
      }
    },
  },
}
</script>
