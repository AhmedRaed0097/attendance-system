<template>
  <div>
    <v-navigation-drawer
      app
      :right="true"
      v-model="show_drawer"
      class="
        !tw-z-20
        !tw-border-primary
        !tw-border-2
        !tw-border-solid
        !tw-bg-admin-primary
      "
    >
      <v-sheet
        color="#fff"
        class="user-data tw-py-4 !tw-bg-admin-primary-dark"
      >
        <v-avatar class="mb-4" color="#fff" size="64"></v-avatar>

        <div class="admin-info tw-flex">
          <img
            width="25"
            v-if="$auth.loggedIn"
            @click="$auth.logout()"
            class="back-icon tw-ml-6 tw-cursor-pointer"
            src="~/assets/images/auth/logout.svg"
            alt="logout"
          />
          <span class="tw-text-xl"> john@vuetifyjs.com </span>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- =============================== import Data =================================== -->

        <drawerListItem
          groupTitle="إستيراد البيانات"
          :itemsList="import_links"
          :isExpanded="open_import_data_options"
          @expanded="openDropDown('import')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/import-data.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ================================ //import Data ================================== -->

        <!-- ================================ Majors ================================== -->
        <drawerListItem
          groupTitle="التخصصات"
          :itemsList="major_links"
          :isExpanded="open_majors_options"
          @expanded="openDropDown('majors')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/majors.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>
        <!-- ================================  //Majors ================================== -->

        <!-- ================================  //Students ================================== -->
        <drawerListItem
          groupTitle="الطلاب"
          :itemsList="student_links"
          :isExpanded="open_students_options"
          @expanded="openDropDown('students')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/students.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ============================== //Students ==================================== -->

        <!-- =============================== Lecturers =================================== -->

        <drawerListItem
          groupTitle="المحاضرين"
          :itemsList="lecturer_links"
          :isExpanded="open_lecturers_options"
          @expanded="openDropDown('lecturers')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/lecturers.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- =============================== //Lecturers =================================== -->

        <!-- =============================== Subjects =================================== -->

        <drawerListItem
          groupTitle="المواد"
          :itemsList="subject_links"
          :isExpanded="open_subjects_options"
          @expanded="openDropDown('subjects')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/subjects.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ================================ //Subjects ================================== -->

        <!-- ================================ Periods ================================== -->
        <drawerListItem
          groupTitle="الفترات"
          :itemsList="period_links"
          :isExpanded="open_periods_options"
          @expanded="openDropDown('periods')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/periods.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ================================== //Periods ================================ -->

        <!-- ================================ Lectures ================================== -->

        <drawerListItem
          groupTitle="المحاضرات"
          :itemsList="lecture_links"
          :isExpanded="open_lectures_options"
          @expanded="openDropDown('lectures')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/lectures.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>
        <!-- ================================= //Lectures ================================ -->

        <!-- =============================== Tables =================================== -->
        <drawerListItem
          groupTitle="الجداول"
          :itemsList="table_links"
          :isExpanded="open_tables_options"
          @expanded="openDropDown('tables')"
        >
          <template #icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/tables.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ================================ //Tables ================================== -->

        <!-- =============================== employees =================================== -->
        <drawerListItem
        v-if="this.user.role === 'super_admin'"
          groupTitle="الموظفين"
          :itemsList="employee_links"
          :isExpanded="open_employees_options"
          @expanded="openDropDown('employees')"
        >
          <template #icon>
            <img
              width="30"
              src="../assets/images/admin/nav-icons/employees.svg"
              alt="icon"
            />
          </template>
        </drawerListItem>

        <!-- ================================ //employees ================================== -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#2a3588" height="70" app class="app-bar">
      <div>
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.mdAndDown"
          @click.stop="show_drawer = !show_drawer"
        >
          <img width="25" src="~/assets/images/admin/burger.svg" alt="burger" />
        </v-app-bar-nav-icon>

        <span class="!tw-text-base sm:!tw-text-xl tw-text-first">
          {{ app_bar_text }}
        </span>
      </div>
      <div class="tw-flex tw-gap-x-2.5 !tw-ml-[-10px]">
        <img
          width="25"
          v-if="$auth.loggedIn"
          @click="$auth.logout()"
          class="back-icon tw-mr-6 tw-cursor-pointer"
          src="../assets/images/auth/logout.svg"
          alt="logout"
        />
        <img
          width="25"
          v-if="$route.name !== 'admin'"
          @click="$router.back()"
          src="../assets/images/home/back-icon.svg"
          alt=""
        />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import drawerListItem from '@/components/drawerListItem.vue'
import drawerData from '~/mixins/drawerData'

export default {
  components: { drawerListItem },
  mixins: [drawerData],
}
</script>