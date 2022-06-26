<template>
  <v-container
    class="
      !tw-min-h-[100vh] !tw-flex
      tw-flex-col
      !tw-justify-center !tw-items-center
    "
  >
    <Alert
      :alert-visible="showAlert"
      :alert-data="alertData"
      @closeModal="isAlertClosed"
    />
    <v-card
      width="400"
      class="
        tw-relative tw-mt-3 tw-mx-auto tw-pb-5 tw-border
        !tw-rounded-xl
        tw-border-slate-500
      "
    >
      <h2
        v-if="!showResetPassword"
        class="!tw-text-3xl tw-font-lalezar tw-text-center"
      >
        تسجيل الدخول
      </h2>
      <h2 v-else class="!tw-text-3xl tw-font-lalezar tw-text-center">
        تعيين كلمة المرور
      </h2>
      <!-- <v-card-title
        class="!tw-absolute tw-w-full !tw-pt-1 tw-flex tw-justify-center"
      >
        <h2 v-if="formType === 'login'" class="!tw-text-3xl tw-font-lalezar">
          تسجيل الدخول
        </h2>
        <h2 v-else class="!tw-text-3xl tw-font-lalezar">إنشاء حساب</h2>
      </v-card-title> -->
      <div class="form-header" />
      <v-form ref="form" v-model="valid" lazy-validation class="tw-px-4">
        <v-row>
          <v-col cols="12">
            <p class="tw-text-center">تسجيل الدخول كـ :</p>
            <!-- <div class="tw-flex tw-justify-between">

              <v-btn dark class="!tw-rounded !tw-bg-blue-400 tw-w-36">
طالب
              </v-btn>
              <v-btn dark class="!tw-rounded !tw-bg-blue-400 tw-w-36">
                محاضر
              </v-btn>
            </div> -->
            <div class="gender">
              <v-btn-toggle
                v-model="user_type"
                :rules="userTypeRules"
                mandatory
              >
                <v-btn value="student"> طالب </v-btn>
                <v-btn value="lecturer"> محاضر </v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
          <v-col cols="12" class="!tw-p-0 tw-mb-2">
            <v-text-field
              v-model="form.email"
              type="email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" class="!tw-p-0 tw-mb-4">
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              label="كلمة المرور"
              name="password"
              @keydown.enter="userLogin"
              :type="hidePassword ? 'password' : 'text'"
              validate-on-blur
            >
              <template v-slot:append>
                <img
                  width="25"
                  @click="hidePassword = !hidePassword"
                  v-if="hidePassword"
                  class="tw-cursor-pointer"
                  src="~/assets/images/auth/visible-eye.svg"
                  alt="visible-eye"
                />
                <img
                  width="25"
                  @click="hidePassword = !hidePassword"
                  v-else
                  class="tw-cursor-pointer"
                  src="~/assets/images/auth/invisible-eye.svg"
                  alt="invisible-eye"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col
            v-if="formType === 'register' || showResetPassword"
            cols="12"
            class="!tw-p-0 tw-mb-4"
          >
            <v-text-field
              v-model="form.password_confirmation"
              :rules="confirmPasswordRules"
              :type="hidePasswordConfirmation ? 'password' : 'text'"
              label="تأكيد كلمة المرور"
              validate-on-blur
            >
              <template v-slot:append>
                <img
                  width="25"
                  @click="hidePasswordConfirmation = !hidePasswordConfirmation"
                  v-if="hidePasswordConfirmation"
                  class=""
                  src="~/assets/images/auth/visible-eye.svg"
                  alt="visible-eye"
                />
                <img
                  width="25"
                  @click="hidePasswordConfirmation = !hidePasswordConfirmation"
                  v-else
                  class=""
                  src="~/assets/images/auth/invisible-eye.svg"
                  alt="invisible-eye"
                />
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" class="!tw-p-0">
            <div class="tw-flex tw-justify-center !tw-p-0">
              <v-btn
                v-if="formType === 'login'"
                :loading="loading"
                width="90%"
                dark
                @click="showResetPassword ? resetPassword() : userLogin()"
                class="!tw-p-6 !tw-bg-primary"
                :class="{'tw-mb-3':showResetPassword}"
              >
                <span v-if="showResetPassword"> إعادة تعيين كلمو المرور </span>
                <span v-else> دخول </span>
              </v-btn>

              <v-btn
                v-else
                :loading="loading"
                width="90%"
                dark
                @click="userRegister"
                class="!tw-p-6 !tw-bg-primary"
              >
                إنشاء</v-btn
              >
            </div>
            <div class="tw-flex tw-justify-center">
              <!-- <v-btn
                v-if="formType === 'login'"
                text
                @click="goTo('register')"
                class="!tw-p-5"
              >
                لا املك حساب ، إنشاء حساب جديد</v-btn
              > -->
              <v-btn
                v-if="!showResetPassword"
                text
                @click="showResetPassword = true"
                class="!tw-p-5 tw-my-2"
              >
                تسجيل الدخول للمرة الأولى</v-btn
              >
              <v-btn
                v-else
                text
                @click="showResetPassword = false"
                class="!tw-p-5"
              >
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
      loading: false,
      showResetPassword: false,
      alertData: {},
      showAlert: false,
      valid: true,
      user_type: '',
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
      if (this.$refs.form.validate()) {
        const formData = {
          email: this.form.email,
          password: this.form.password,
          user_type: this.form.email.includes('@admin')
            ? 'admin'
            : this.user_type,
        }
        this.loading = true
        await this.$store
          .dispatch(`login`, formData)
          .then((response) => {
            this.setAlertData(response)
            // const isAuthenticated = this.$auth.user ? true : false
            // if (isAuthenticated) {
            //   if (this.$auth.user.user_type === 'admin') {
            //     this.$router.push('/admin')
            //   } else {
            //     this.$router.push('/')
            //   }
            // } else {
            //   this.$router.push('/auth/login')
            // }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              const response = {
                message:
                  'المستخدم غير موجود ، الرجاء التأكد من البريد الإلتكروني او كلمة المرور.',
                status_code: 401,
              }
              this.setAlertData(response)
            } else {
              this.setAlertData(error.response.data)
            }
          })
        this.loading = false
      }
    },
    async resetPassword() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('email', this.form.email)
        formData.append('password', this.form.password)
        formData.append(
          'password_confirmation',
          this.form.password_confirmation
        )
        formData.append(
          'user_type',
          this.form.email.includes('@admin') ? 'admin' : this.user_type
        )
        formData.append('device_name', 'test')
        this.loading = true
        await this.$store
          .dispatch('setPassword', formData)
          .then((response) => {
            this.setAlertData(response)
            this.showResetPassword = false
          })
          .catch((error) => {
            this.setAlertData(error.response.data)
          })
        this.loading = false
      }
    },
    setAlertData(data) {
      this.alertData = data
      this.showAlert = true
    },
    isAlertClosed(payload) {
      if (payload.value) {
        this.showAlert = false
      }
    },
    async userRegister() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        for (const key in this.form) {
          formData.append(key, this.form[key])
        }
        await this.$store.dispatch('register', formData).then(async () => {
          const formData = {
            email: this.form.email,
            password: this.form.password,
          }
          await this.$store.dispatch('login', formData)
        })
      }
    },
    goTo(pageName) {
      this.$router.replace(`/auth/${pageName}`)
    },
  },
}
</script>

<style lang="scss">
</style>
