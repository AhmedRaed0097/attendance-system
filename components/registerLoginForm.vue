<template>
  <v-card width="600" height="580" class="tw-my-9">
    <v-card-title class="flex tw-justify-center">
      <h2 v-if="formType=== 'login'" class="tw-text-2xl">تسجيل الدخول</h2>
      <h2 v-else class="tw-text-2xl">إنشاء حساب</h2>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="!tw-items-start !tw-pt-14">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.email" label="البريد الإلكتروني" outlined />
          </v-col>
          <v-col :cols="formType === 'login' ? 12 : 6">
            <v-text-field v-model="form.password" label="كلمة المرور" outlined />
          </v-col>
          <v-col v-if="formType === 'register'" cols="6">
            <v-text-field v-model="form.password_confirmation" label="تأكيد كلمة المرور" outlined />
          </v-col>

          <v-col cols="6" class="tw-mx-auto">
            <v-radio-group v-model="form.user_type">
              <div clas="tw-flex tw-bg-red-500">
                <v-radio
                  v-for="(type,i) in userTypes"
                  :key="i"
                  :label="type.label"
                  :value="type.value"
                  color="#000"
                  class="tw-mb-0"
                ></v-radio>
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <div class="tw-flex tw-justify-center">
              <v-btn v-if="formType === 'login'"  @click="userLogin" outlined class="!tw-p-5"> دخول</v-btn>
              <v-btn v-else @click="userRegister" outlined class="!tw-p-5"> إنشاء</v-btn>
            </div>
            <div class="tw-flex tw-justify-center">
              <v-btn v-if="formType === 'login'" text @click="goTo('register')" class="!tw-p-5"> لا املك حساب ، إنشاء حساب جديد</v-btn>
              <v-btn v-else text @click="goTo('login')"  class="!tw-p-5"> لدي حساب ، تسجيل الدخول</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props:{
    formType: {
      type:String,
      default:'login'
    }
  },
  data() {
    return {
      userTypes: [
        {
          label: 'طالب',
          value: 'student',
        },
        {
          label: 'محاضر',
          value: 'lecture',
        },
      ],
      selectUserType: 'student',
      valid: true,
      form:{
        email:'',
        password:'',
        password_confirmation:'',
        user_type:''
      }
    }
  },
    methods: {
    async userLogin() {
      const formData = {
        email : this.form.email,
        password: this.form.password,
        user_type: this.form.user_type,
        device_name:'test'
      }
      try {
        let response = await this.$auth.loginWith('local', { data: formData })
        console.log('response ',response)
      } catch (err) {
        console.log('err ',err)
      }
    },
    userRegister(){
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key , this.form[key])
      }
      this.$store.dispatch('auth/register',formData)
    },
    goTo(pageName){
      this.$router.replace(`/auth/${pageName}`)

    }
  }
}
</script>

<style></style>
