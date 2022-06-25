<template>
  <div class="form-wrapper">
    <v-card :class="{ 'small-card': $vuetify.breakpoint.mdAndDown === true }">
      <v-card-title>
        <h2 v-if="methodType === 'add'" class="add-member-title">
          إضافة موظف جديد
        </h2>
        <h2 v-if="methodType === 'edit'" class="add-member-title">
          تعديل موظف
        </h2>
        <h2 v-if="methodType === 'delete'" class="add-member-title">
          حذف موظف
        </h2>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-row
          v-if="
            methodType === 'add' ||
            (methodType === 'edit' && form.name.length > 0)
          "
        >
         <v-col cols="12">
            <v-autocomplete
            v-if="form.id"
              v-model="form"
              :items="employeesList"
              :rules="requiredRules"
              item-text="name"
              outlined
              validate-on-blur
              label="اسم الموظف"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              label="إسم الموظف"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>
          <v-col cols="12" :md="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              required
              outlined
              validate-on-blur
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.role"
              :items="roles"
              :rules="requiredRules"
              item-text="text"
              item-value="value"
              outlined
              validate-on-blur
              label="الدور"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.state"
              :items="states"
              :rules="stateRules"
              item-text="text"
              item-value="value"
              outlined
              validate-on-blur
              label="الحالة"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-autocomplete
              v-model="form"
              :items="employeesList"
              :rules="requiredRules"
              item-text="name"
              outlined
              validate-on-blur
              label="اسم الموظف"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="add-btn-wrapper">
              <v-btn
                width="140"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'add'"
                @click="addEmployee"
                >إضافة</v-btn
              >
              <v-btn
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-primary"
                dark
                v-if="methodType === 'edit'"
                @click="updateEmployee"
                >تعديل</v-btn
              >
              <v-btn
                width="140"
                height="45"
                rounded
                class="!tw-py-6 !tw-bg-error"
                dark
                v-if="methodType === 'delete'"
                @click="deleteEmployee"
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
  fetch() {
    if (this.methodType !== 'add') {
      this.$store.dispatch('admin/getEmployees')
    }
  },
  data: () => ({
    valid: false,
    firstname: '',
    employeesList: [],
    lastname: '',
    form: {
      name: '',
      role: '',
      state: '',
      email: '',
    },
    nameRules: [
      (v) => !!v || 'إسم الموظف مطلوب',
      (v) => v.length > 5 || 'يجب ان لايقل الاسم عن 5 احرف',
    ],
    emailRules: [
      (v) => !!v || 'البريد الإلكتروني مطلوب',
      (v) => /.+@.+/.test(v) || 'البريد الإلكتروني غير صحيح',
    ],
    requiredRules: [(v) => !!v || 'هذا الحقل مطلوب'],
    stateRules: [(v) => v.toString().length > 0 || 'الحالة مطلوب'],
    states: [
      {
        text: 'مفعل',
        value: 1,
      },
      {
        text: 'غير مفعل',
        value: 0,
      },
    ],
    roles: [
      {
        text: 'موظف',
        value: 'admin',
      },
      {
        text: 'مدير',
        value: 'super_admin',
      },
    ],
    value: null,
  }),
  methods: {
    addEmployee() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        this.$store.dispatch('admin/addEmployee', formData).then(() => {
          this.form = {
            name: '',
            role: '',
            state: '',
            email: '',
          }
          this.$refs.form.resetValidation()
        })
      }
    },
    updateEmployee() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        let filterdItem = {}
        filterdItem = this.employees.filter(
          (employee) => employee.id === this.form.id
        )
        if (filterdItem.length > 0) {
          for (const key in filterdItem[0]) {
            if (filterdItem[key] !== this.form[key]) {
              formData.append(key, this.form[key])
            }
          }
          this.$store.dispatch('admin/updateEmployee', formData).then(() => {
            this.form = {
              name: '',
              role: '',
              state: '',
              email: '',
            }
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    deleteEmployee() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('admin/deleteEmployee', this.form.id).then(() => {
          if (this.response.status_code === 200) {
            this.form = {
              name: '',
              role: '',
              state: '',
              email: '',
            }
            this.$refs.form.resetValidation()
          }
        })
      }
    },
  },
  watch: {
    employees(val) {
      if (val.length > 0) {
        this.employeesList = []
        this.employees.forEach((employee) => {
          this.employeesList.push({ ...employee })
        })
      } else {
        this.employeesList = []
      }
    },
  },
  computed: {
    employees() {
      return this.$store.state.admin.employees
    },
    response() {
      return this.$store.state.admin.response
    },
  },
}
</script>

<style lang="scss">

</style>


