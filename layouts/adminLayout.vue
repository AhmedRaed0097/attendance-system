<template>
  <v-app class="adminLayout">
    <v-alert :value="showAlert" border="right"  :type="response.status_code === 200 ? 'success': 'warning'" transition="slide-y-transition">{{response.message}}</v-alert>
    <v-row>
      <v-col
        :cols="
          $vuetify.breakpoint.mdAndDown === true && drawer === true ? 12 : 2
        "
        :class="
          $vuetify.breakpoint.mdAndDown && drawer ? 'active-nav' : 'nav-col'
        "
      >
        <v-navigation-drawer :right="true" v-model="drawer">
          <v-sheet color="user-data grey lighten-4" class="pa-4">
            <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

            <div>john@vuetifyjs.com</div>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
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
                      v-for="[route, icon, text] in import_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    التخصصات
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <transition name="slide">
                <ul
                  v-show="open_majors_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in majors_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    الطلاب
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <transition name="slide">
                <ul
                  v-show="open_student_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in student_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    المحاضرين
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <transition name="slide">
                <ul
                  v-show="open_lecturer_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in lecturer_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    المواد
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <transition name="slide">
                <ul
                  v-show="open_subject_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in subject_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    الفترات
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <transition name="slide">
                <ul
                  v-show="open_period_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in period_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    المحاضرات
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <transition name="slide">
                <ul
                  v-show="open_lectures_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in lecture_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
                  <img src="../assets/images/icon.svg" alt="icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="nav-item-title"
                    active-class="active"
                  >
                    الجداول
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <transition name="slide">
                <ul
                  v-show="open_tables_options === true"
                  class="versions-options"
                >
                  <li class="nav-item-link">
                    <v-list-item
                      v-for="[route, icon, text] in table_links"
                      :key="text"
                      link
                      :to="route"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
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
      </v-col>
      <v-btn
        icon
        :class="
          $vuetify.breakpoint.mdAndDown && drawer
            ? 'active-burger-menu'
            : 'unactive-burger-menu'
        "
        class="mt-8"
        text
        @click="drawer = !drawer"
      >
        <img
          v-if="$vuetify.breakpoint.mdAndDown && drawer"
          width="30"
          height="30"
          src="../assets/images/admin/close.svg"
          alt="close"
        />
        <img
          v-if="$vuetify.breakpoint.mdAndDown && !drawer"
          width="30"
          height="30"
          src="../assets/images/admin/burger.svg"
          alt="burger"
        />
      </v-btn>
      <v-col cols="10">
        <v-main>
          <Nuxt />
        </v-main>
      </v-col>
    </v-row>
   
  </v-app>
</template>
<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    open_student_options: false,
    open_lecturer_options: false,
    open_tables_options: false,
    open_import_data_options: false,
    open_majors_options: false,
    open_subject_options: false,
    open_period_options: false,
    open_lectures_options: false,
    student_links: [
      ['/admin/students/add-student', 'mdi-inbox-arrow-down', 'إضافة طالب'],
      ['/admin/students/edit-student', 'mdi-inbox-arrow-down', 'تعديل طالب'],
      ['/admin/students/delete-student', 'mdi-inbox-arrow-down', 'حذف طالب'],
    ],
    lecturer_links: [
      ['/admin/lecturers/add-lecturer', 'mdi-inbox-arrow-down', 'إضافة محاضر'],
      ['/admin/lecturers/edit-lecturer', 'mdi-inbox-arrow-down', 'تعديل محاضر'],
      ['/admin/lecturers/delete-lecturer', 'mdi-inbox-arrow-down', 'حذف محاضر'],
    ],
    subject_links: [
      ['/admin/subjects/add-subject', 'mdi-inbox-arrow-down', 'إضافة مادة'],
      ['/admin/subjects/edit-subject', 'mdi-inbox-arrow-down', 'تعديل مادة'],
      ['/admin/subjects/delete-subject', 'mdi-inbox-arrow-down', 'حذف مادة'],
    ],
    period_links: [
      ['/admin/periods/add-period', 'mdi-inbox-arrow-down', 'إضافة فترة'],
      ['/admin/periods/edit-period', 'mdi-inbox-arrow-down', 'تعديل فترة'],
      ['/admin/periods/delete-period', 'mdi-inbox-arrow-down', 'حذف فترة'],
    ],
    lecture_links: [
      ['/admin/lectures/add-lecture', 'mdi-inbox-arrow-down', 'إضافة محاضرة'],
      ['/admin/lectures/edit-lecture', 'mdi-inbox-arrow-down', 'تعديل محاضرة'],
      ['/admin/lectures/delete-lecture', 'mdi-inbox-arrow-down', 'حذف محاضرة'],
    ],
    table_links: [
      ['/admin/tables/add-table', 'mdi-inbox-arrow-down', 'إضافة جدول'],
      ['/admin/tables/edit-table', 'mdi-inbox-arrow-down', 'تعديل جدول'],
      ['/admin/tables/delete-table', 'mdi-inbox-arrow-down', 'حذف جدول'],
    ],
    majors_links: [
      ['/admin/majors/add-major', 'mdi-inbox-arrow-down', 'إضافة تخصص'],
      ['/admin/majors/edit-major', 'mdi-inbox-arrow-down', 'تعديل تخصص'],
      ['/admin/majors/delete-major', 'mdi-inbox-arrow-down', 'حذف تخصص'],
    ],
    import_links: [
      [
        '/admin/import-data/import-majors-data',
        'mdi-inbox-arrow-down',
        'بيانات التخصصات',
      ],
      [
        '/admin/import-data/import-students-data',
        'mdi-inbox-arrow-down',
        'بيانات الطلاب',
      ],
      [
        '/admin/import-data/import-lecturers-data',
        'mdi-inbox-arrow-down',
        'بيانات المحاضرين',
      ],
      [
        '/admin/import-data/import-subjects-data',
        'mdi-inbox-arrow-down',
        'بيانات المواد',
      ],
      [
        '/admin/import-data/import-periods-data',
        'mdi-inbox-arrow-down',
        'بيانات الفترات',
      ],
    ],
  }),
  beforeCreate() {
    this.$vuetify.rtl = true
  },
  computed:{
    showAlert(){
      return this.$store.state.admin.show_alert
    },
    response(){
      return this.$store.state.admin.response
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
  },
}
</script>
<style lang="scss">
.add-member-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .add-student-wrapper .v-card {
    box-shadow: none !important;
  }
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
.v-form {
  width: 90%;
  margin: 0 auto;
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
  aside {
    padding-top: 50px !important;
  }
}
.active-burger-menu {
  position: absolute;

  right: 10px !important;
  top: -24px;
}
ul {
  li .v-list-item {
    padding: 0;
  }
}
</style>
