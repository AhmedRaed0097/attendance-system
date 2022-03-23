<template>
  <div class="add-student-wrapper">
    <v-card>
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-student-title">
          إضافة طالب جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-student-title">
          تعديل طالب
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-student-title">
          حذف طالب
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.student_name"
              :rules="nameRules"
              label="إسم الطالب"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.master_table_id"
              :items="batchsList"
               item-text="title"
              item-value="id"
              outlined
              label="الدفعة"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.state"
              :items="items"
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
                @click="addStudent"
                >إضافة</v-btn
              >
              <v-btn
                v-else
                width="140"
                height="45"
                class="font-weight-bold"
                @click="editStudent"
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
    if (this.batchs.length === 0) {
      this.$store.dispatch('admin/getTables')
    }
        if (this.batchs.length > 0) {
          this.batchs.forEach((batch) => {
            this.batchsList.push({ ...batch })
          })
        }

  },
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    form: {
      student_name: '',
      master_table_id: '',
      state: '',
      email: '',
    },
    nameRules: [
      (v) => !!v || 'إسم الطالب مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    batchsList: [],
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
    addStudent() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/addStudent', formData).then(() => {
          this.form = {
            student_name: '',
            master_table_id: '',
            state: '',
            email: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    editStudent() {
      //
    },
  },
  computed: {
    batchs() {
      return this.$store.state.admin.tables
    },
  },
}
</script>

<style lang="scss">
.add-student-wrapper {
  height: 100%;
  display: flex;
  align-items: center;

  .v-card {
    height: 500px;
    width: 900px;
    padding: 10px 30px;
    .v-card__title .add-student-title {
      width: 100% !important;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
.add-btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
