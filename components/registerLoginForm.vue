<template>
  <v-container class="!tw-min-h-[85vh]">
    <v-card
      width="400"
      class="tw-mt-3 tw-pb-5 tw-border !tw-rounded-xl tw-border-slate-500"
    >
      <v-card-title class="tw-absolute-center !tw-pt-0">
        <h2 v-if="formType === 'login'" class="tw-text-2xl tw-font-lalezar">
          تسجيل الدخول
        </h2>
        <h2 v-else class="tw-text-2xl tw-font-lalezar">إنشاء حساب</h2>
      </v-card-title>
      <!-- <img
      width="100%"
      height="150"
        class="tw-mb-3"
        src="~/assets/images/auth/login-header-image.jpg"
        alt="login-header-image"
      /> -->
      <div class="form-header" />
      <v-form ref="form" v-model="valid" lazy-validation class="tw-px-2">
        <v-row>
          <v-col cols="12" class="!tw-p-0">
            <v-text-field
              v-model="form.email"
              color="#7C3E66"
              type="email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" class="!tw-p-0">
            <v-text-field
              v-model="form.password"
              color="#7C3E66"
              :rules="passwordRules"
              label="كلمة المرور"
              name="password"
              :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (hidePassword = !hidePassword)"
              :type="hidePassword ? 'password' : 'text'"
              validate-on-blur
            />
          </v-col>
          <v-col v-if="formType === 'register'" cols="12" class="!tw-p-0">
            <v-text-field
              v-model="form.password_confirmation"
              color="#7C3E66"
              :rules="confirmPasswordRules"
              :append-icon="
                hidePasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append="
                () => (hidePasswordConfirmation = !hidePasswordConfirmation)
              "
              :type="hidePasswordConfirmation ? 'password' : 'text'"
              label="تأكيد كلمة المرور"
              validate-on-blur
            />
          </v-col>

          <v-col v-if="formType !== 'login'" cols="12">
            <v-radio-group
              row
              v-model="form.user_type"
              class="!tw-justify-between"
              :rules="userTypeRules"
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
      },
      hidePassword: true,
      hidePasswordConfirmation: true,
      emailRules: [
        (v) => !!v || 'هذا الحقل مطلوب',
        (v) =>
          v.toString().length < 64 ||
          'يجب ان يكون طول البريد الإلكتروني على الأقل 64 حرف',
        (v) =>
          /^([a-zA-Z0-9\\+_\\-]+)(\.[a-zA-Z0-9\\+_\\-]+)*@([a-z0-9\\-]+\.)+[a-z]{2,6}$/.test(
            v
          ) || 'البريد الإلكتروني غير صحيح',
      ],
      passwordRules: [
        (v) => !!v || 'هذا الحقل مطلوب',
        (v) =>
          v.toString().length > 4 ||
          v.toString().length === 0 ||
          'يجب ان يكون طول كلمة المرور على الأقل 5 احرف',
        (v) =>
          v.toString().length < 32 ||
          v.toString().length === 0 ||
          'يجب ان يكون طول كلمة المرور على الأقل 32 حرف',
      ],
      confirmPasswordRules: [
        (v) => !!v || 'هذا الحقل مطلوب',
        (v) => v === this.form.password || 'كلمة المرور غير متطابقة',
      ],
      userTypeRules: [(v) => !!v || 'هذا الحقل مطلوب'],
    }
  },
  methods: {
    async userLogin() {
      const formData = {
        email: this.form.email,
        password: this.form.password,
      }
      await this.$store.dispatch('auth/login', formData)
    },
    async userRegister() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        await this.$store.dispatch('auth/register', formData).then(async () => {
          const formData = {
            email: this.form.email,
            password: this.form.password,
          }
          await this.$store.dispatch('auth/login', formData)
        })
      }
    },
    goTo(pageName) {
      this.$router.replace(`/auth/${pageName}`)
    },
  },
}
</script>

<style>
.form-header {
  height: 390px;
  padding: 20px;
  margin-bottom: 20px;
  background-image: url('~/assets/images/auth/login-header-image.jpg');
  background-position: center;
  background-size: cover;
}
</style>
