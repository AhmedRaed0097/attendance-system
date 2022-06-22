<template>
  <v-navigation-drawer
    absolute
    :right="true"
    v-model="show_drawer"
    class="!tw-rounded-md !tw-border-primary !tw-border-2 !tw-border-solid !tw-bg-admin-primary"
  >
    <v-sheet
      color="#fff"
      class="user-data !tw-rounded-md tw-py-4 !tw-bg-admin-primary-dark"
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
        <span> john@vuetifyjs.com </span>
      </div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <!-- =============================== import Data =================================== -->
      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('import')"
      >
        <!-- Table -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/import-data.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              إستيراد البيانات
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <transition name="slide">
          <ul
            v-show="open_import_data_options === true"
            class="versions-options"
          >
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in import_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>

      <!-- ================================ //import Data ================================== -->

      <!-- ================================ Majors ================================== -->

      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('major')"
      >
        <!-- Table -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/majors.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              التخصصات
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <transition name="slide">
          <ul v-show="open_majors_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in majors_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>

      <!-- ================================  //Majors ================================== -->

      <!-- ================================  //Students ================================== -->

      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('students')"
      >
        <!-- Students -->

        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/students.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              الطلاب
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <transition name="slide">
          <ul v-show="open_student_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in student_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>

      <!-- ============================== //Students ==================================== -->

      <!-- =============================== Lecturers =================================== -->
      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('lecturers')"
      >
        <!-- Lecturer -->

        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/lecturers.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              المحاضرين
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <transition name="slide">
          <ul v-show="open_lecturer_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in lecturer_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>

      <!-- =============================== //Lecturers =================================== -->

      <!-- =============================== Subjects =================================== -->
      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('subjects')"
      >
        <!-- Subject -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/subjects.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              المواد
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <transition name="slide">
          <ul v-show="open_subject_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in subject_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>
      <!-- ================================ //Subjects ================================== -->

      <!-- ================================ Periods ================================== -->

      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('periods')"
      >
        <!-- Subject -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/periods.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              الفترات
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <transition name="slide">
          <ul v-show="open_period_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in period_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>
      <!-- ================================== //Periods ================================ -->

      <!-- ================================ Lectures ================================== -->

      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('lectures')"
      >
        <!-- Subject -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/lectures.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              المحاضرات
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <transition name="slide">
          <ul v-show="open_lectures_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in lecture_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>
      <!-- ================================= //Lectures ================================ -->

      <!-- =============================== Tables =================================== -->
      <div
        class="nav-item-link"
        style="cursor: pointer"
        @click="openDropDown('tables')"
      >
        <!-- Table -->
        <v-list-item>
          <v-list-item-icon>
            <img
              width="28"
              src="../assets/images/admin/nav-icons/tables.svg"
              alt="icon"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="nav-item-title" active-class="active">
              الجداول
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <transition name="slide">
          <ul v-show="open_tables_options === true" class="versions-options">
            <li class="nav-item-link">
              <v-list-item
                v-for="[route, text] in table_links"
                :key="text"
                link
                :to="route"
              >
                <v-list-item-icon>
                  <img
                    width="25"
                    src="~/assets/images/admin/nav-icons/list-item.svg"
                    alt="list-item"
                    class="tw-rotate-90 tw-mr-8"
                  />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </li>
          </ul>
          <!-- aaa -->
        </transition>
      </div>

      <!-- ================================ //Tables ================================== -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show_drawer: null,
      open_student_options: false,
      open_lecturer_options: false,
      open_tables_options: false,
      open_import_data_options: false,
      open_majors_options: false,
      open_subject_options: false,
      open_period_options: false,
      open_lectures_options: false,
      student_links: [
        ['/admin/students/add-student', 'إضافة طالب'],
        ['/admin/students/edit-student', 'تعديل طالب'],
        ['/admin/students/delete-student', 'حذف طالب'],
      ],
      lecturer_links: [
        ['/admin/lecturers/add-lecturer', 'إضافة محاضر'],
        ['/admin/lecturers/edit-lecturer', 'تعديل محاضر'],
        ['/admin/lecturers/delete-lecturer', 'حذف محاضر'],
      ],
      subject_links: [
        ['/admin/subjects/add-subject', 'إضافة مادة'],
        ['/admin/subjects/edit-subject', 'تعديل مادة'],
        ['/admin/subjects/delete-subject', 'حذف مادة'],
      ],
      period_links: [
        ['/admin/periods/add-period', 'إضافة فترة'],
        ['/admin/periods/edit-period', 'تعديل فترة'],
        ['/admin/periods/delete-period', 'حذف فترة'],
      ],
      lecture_links: [
        ['/admin/lectures/add-lecture', 'إضافة محاضرة'],
        ['/admin/lectures/edit-lecture', 'تعديل محاضرة'],
        ['/admin/lectures/delete-lecture', 'حذف محاضرة'],
      ],
      table_links: [
        ['/admin/tables/add-table', 'إضافة جدول'],
        ['/admin/tables/edit-table', 'تعديل جدول'],
        ['/admin/tables/delete-table', 'حذف جدول'],
      ],
      majors_links: [
        ['/admin/majors/add-major', 'إضافة تخصص'],
        ['/admin/majors/edit-major', 'تعديل تخصص'],
        ['/admin/majors/delete-major', 'حذف تخصص'],
      ],
      import_links: [
        ['/admin/import-data/import-majors-data', 'بيانات التخصصات'],
        ['/admin/import-data/import-students-data', 'بيانات الطلاب'],
        ['/admin/import-data/import-lecturers-data', 'بيانات المحاضرين'],
        ['/admin/import-data/import-subjects-data', 'بيانات المواد'],
        ['/admin/import-data/import-periods-data', 'بيانات الفترات'],
      ],
    }
  },
  methods: {
    openDropDown(type) {
      if (type === 'students') {
        this.open_student_options = !this.open_student_options
        this.open_lecturer_options = false
        this.open_majors_options = false
        this.open_import_data_options = false
        this.open_subject_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'lecturers') {
        this.open_lecturer_options = !this.open_lecturer_options
        this.open_student_options = false
        this.open_majors_options = false
        this.open_import_data_options = false
        this.open_subject_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'subjects') {
        this.open_subject_options = !this.open_subject_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_import_data_options = false

        this.open_majors_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'periods') {
        this.open_period_options = !this.open_period_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_import_data_options = false

        this.open_majors_options = false
        this.open_subject_options = false
        this.open_lectures_options = false
      } else if (type === 'lectures') {
        this.open_lectures_options = !this.open_lectures_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_import_data_options = false

        this.open_majors_options = false
        this.open_subject_options = false
        this.open_period_options = false
      } else if (type === 'tables') {
        this.open_tables_options = !this.open_tables_options
        this.open_lectures_options = false
        this.open_student_options = false
        this.open_import_data_options = false

        this.open_majors_options = false
        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_period_options = false
      } else if (type === 'major') {
        this.open_majors_options = !this.open_majors_options
        this.open_tables_options = false
        this.open_lectures_options = false
        this.open_student_options = false
        this.open_import_data_options = false

        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_period_options = false
      } else if (type === 'import') {
        this.open_import_data_options = !this.open_import_data_options
        this.open_majors_options = false
        this.open_lectures_options = false
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_period_options = false
      }
    },
  },
  watch: {
    '$vuetify.breakpoint.name'(val) {
      if (val === 'lg' || val === 'xl') {
        this.drawer = true
      }
    },
    drawer(val) {
      this.show_drawer = val
      if (val === false) {
        this.$emit('drawerClosed')
      }
    },
  },
}
</script>
<style lang="scss">
.add-member-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-wrapper {
    height: 90vh;
    .v-card {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      box-shadow: none !important;
      margin: 0 auto;
      height: 100%;
      border: 1px solid #7c3e66;
      border-radius: 10px;
      @media (min-width: 750px) {
        margin-left: 9%;
      }
      @media (min-width: 750px) and (max-width: 1264px) {
        width: 80%;
      }
      @media (min-width: 1264px) {
        width: 65%;
      }
      @media (min-width: 1700px) {
        width: 72%;
      }
      @media (min-width: 2000px) {
        width: 77%;
      }
      h2 {
        font-size: 35px;
        margin-top: 62px;
        margin-bottom: 60px !important;
        @media (max-width: 1000px) {
          font-size: 25px;
        }
      }
      // .v-card__title {
      //   margin-bottom: 200px;
      // }
    }
  }
}
.add-btn-wrapper {
  margin-top: 50px;
}
.v-navigation-drawer {
  height: 100vh !important;
  border: 1px solid #dfdfdf;
  .user-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.nav-item-link {
  text-decoration: none;
  color: #000;
  .nav-item {
    .nav-item-title {
      font-size: 15px;
      text-align: right;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.87;
      letter-spacing: normal;
      color: #000;
    }
  }
}
.nav-item-title {
  text-decoration: none;
  font-weight: bold;
}

.unactive-burger-menu {
  position: absolute;
  right: 30px;
}
.active-nav {
  position: absolute;
  aside {
    padding-top: 50px !important;
  }
}
.active-burger-menu {
  position: absolute;

  right: 10px !important;
  top: -24px;
}
.active {
  background: rgb(18, 85, 185);
}
ul {
  padding: 0 !important;
  li .v-list-item {
    padding: 0;
  }
}
</style>
