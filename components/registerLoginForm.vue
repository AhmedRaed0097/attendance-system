<template>
  <v-container class="!tw-min-h-[85vh]">
    <v-card
      width="500"
      class="tw-mt-3 tw-pb-3 tw-border !tw-rounded-xl tw-border-slate-500"
    >
      <v-card-title class="tw-absolute-center !tw-pt-2">
        <h2 v-if="formType === 'login'" class="tw-text-2xl tw-font-lalezar">
          تسجيل الدخول
        </h2>
        <h2 v-else class="tw-text-2xl tw-font-lalezar">إنشاء حساب</h2>
      </v-card-title>
      <img
        class="tw-mb-3"
        src="~/assets/images/auth/login-header-image.jpg"
        alt="login-header-image"
      />
      <v-form ref="form" v-model="valid" lazy-validation class="tw-px-2">
          <v-row>
            <v-col cols="12" class="!tw-p-0">
              <v-text-field
                v-model="form.email"
                type="email"
                label="البريد الإلكتروني"
              />
            </v-col>
            <v-col cols="12" class="!tw-p-0">
              <v-text-field
                v-model="form.password"
                label="كلمة المرور"
                name="password"
                :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (hidePassword = !hidePassword)"
                :type="hidePassword ? 'password' : 'text'"
              />
            </v-col>
            <v-col v-if="formType === 'register'" cols="12" class="!tw-p-0">
              <v-text-field
                v-model="form.password_confirmation"
                 :append-icon="hidePasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (hidePasswordConfirmation = !hidePasswordConfirmation)"
                :type="hidePasswordConfirmation ? 'password' : 'text'"
                label="تأكيد كلمة المرور"
              />
            </v-col>

            <v-col cols="8" class="tw-mx-auto !tw-p-0">
              <v-radio-group
                row
                v-model="form.user_type"
                class="!tw-justify-evenly"
              >
                <v-radio
                  v-for="(type, i) in userTypes"
                  :key="i"
                  :label="type.label"
                  :value="type.value"
                  color="#000"
                  :class="{ 'tw-absolute tw-left-0': i === 1 }"
                  class="!tw-m-0"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="!tw-p-0">
              <div class="tw-flex tw-justify-center !tw-p-0">
                <v-btn
                  v-if="formType === 'login'"
                  width="90%"
                  color="#7C3E66"
                  dark
                  @click="userLogin"
                  class="!tw-p-6"
                >
                  دخول</v-btn
                >

                <v-btn
                v-else
                  width="90%"
                  color="#7C3E66"
                  dark
                  @click="userRegister"
                  class="!tw-p-6"
                >
                  إنشاء</v-btn
                >

              </div>
              <div class="tw-flex tw-justify-center">
                <v-btn
                  v-if="formType === 'login'"
                  text
                  @click="goTo('register')"
                  class="!tw-p-5"
                >
                  لا املك حساب ، إنشاء حساب جديد</v-btn
                >
                <v-btn v-else text @click="goTo('login')" class="!tw-p-5">
                  املك حساب ، تسجيل الدخول</v-btn
                >
              </div>
            </v-col>
          </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    formType: {
      type: String,
      default: 'login',
    },
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
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        user_type: '',
      },
      hidePassword: true,
      hidePasswordConfirmation: true,
    }
  },
  methods: {
    async userLogin() {
      const formData = {
        email: this.form.email,
        password: this.form.password,
        user_type: this.form.user_type,
        device_name: 'test',
      }
      try {
        let response = await this.$auth.loginWith('local', { data: formData })
        console.log('response ', response)
      } catch (err) {
        console.log('err ', err)
      }
    },
    userRegister() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      this.$store.dispatch('auth/register', formData)
    },
    goTo(pageName) {
      this.$router.replace(`/auth/${pageName}`)
    },
  },
}
</script>

<style></style>
