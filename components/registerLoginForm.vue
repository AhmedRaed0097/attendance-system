<template>
  <v-card width="600" height="550" class="tw-my-9">
    <v-card-title class="flex tw-justify-center">
      <h2 class="tw-text-2xl">تسجيل الدخول</h2>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="!tw-items-start !tw-pt-14">
        <v-row>
          <v-col cols="12">
            <v-text-field label="البريد الإلكتروني" outlined />
          </v-col>
          <v-col cols="6">
            <v-text-field label="كلمة المرور" outlined />
          </v-col>
          <v-col cols="6">
            <v-text-field label="تأكيد كلمة المرور" outlined />
          </v-col>

          <v-col cols="6" class="tw-mx-auto">
            <v-radio-group v-model="selectUserType">
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
              <v-btn outlined class="!tw-p-5"> دخول </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
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
    }
  },
}
</script>

<style></style>
