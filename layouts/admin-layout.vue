<template>
  <v-app class="admin-layout">
    <v-row>
        <v-col
          cols="2"
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
              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('students')"
              >
                <!-- Students -->

                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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
              <!-- ================================================================== -->
              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('lecturers')"
              >
                <!-- Lecturer -->

                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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
              <!-- ================================================================== -->
              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('subjects')"
              >
                <!-- Subject -->
                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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

              <!-- ================================================================== -->

              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('periods')"
              >
                <!-- Subject -->
                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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

              <!-- ================================================================== -->

              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('lectures')"
              >
                <!-- Subject -->
                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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

              <!-- ================================================================== -->
              <div
                class="nav-item-link"
                style="cursor: pointer"
                @click="openDropDown('tables')"
              >
                <!-- Subject -->
                <v-list-item>
                  <v-list-item-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <g id="promotion" transform="translate(-1.628 -1.628)">
                        <path
                          id="Path_12640"
                          class="cls-1"
                          data-name="Path 12640"
                          d="M12.316 2.25a2.6 2.6 0 0 0-3.377 0l-1.1.94a.868.868 0 0 1-.494.2L5.9 3.51A2.6 2.6 0 0 0 3.51 5.9l-.116 1.442a.868.868 0 0 1-.2.494l-.94 1.1a2.6 2.6 0 0 0 0 3.377l.94 1.1a.867.867 0 0 1 .2.494l.115 1.445A2.6 2.6 0 0 0 5.9 17.746l1.445.115a.869.869 0 0 1 .494.2l1.1.94a2.6 2.6 0 0 0 3.377 0l1.1-.94a.868.868 0 0 1 .494-.2l1.445-.115a2.6 2.6 0 0 0 2.388-2.388l.115-1.445a.868.868 0 0 1 .2-.494l.94-1.1a2.6 2.6 0 0 0 0-3.377l-.94-1.1a.869.869 0 0 1-.2-.494L17.746 5.9a2.6 2.6 0 0 0-2.388-2.39l-1.445-.115a.867.867 0 0 1-.494-.2z"
                        />
                        <circle
                          id="Ellipse_3"
                          fill="#fff"
                          data-name="Ellipse 3"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(6.289 6.289)"
                        />
                        <circle
                          id="Ellipse_4"
                          fill="#fff"
                          data-name="Ellipse 4"
                          class="cls-2 cls-1"
                          cx="1.302"
                          cy="1.302"
                          r="1.302"
                          transform="translate(12.363 12.363)"
                        />
                        <path
                          id="Path_12641"
                          fill="#fff"
                          data-name="Path 12641"
                          d="M14.874 7.2a.868.868 0 0 1 .111 1.222L9.2 15.365a.868.868 0 0 1-1.333-1.111l5.785-6.942a.868.868 0 0 1 1.222-.112z"
                          transform="translate(-.799 -.711)"
                          class="cls-2"
                        />
                      </g>
                    </svg>
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

              <!-- ================================================================== -->
            </v-list>
          </v-navigation-drawer>
        </v-col>
      <v-btn
      icon
       :class="
            $vuetify.breakpoint.mdAndDown && drawer ? 'active-burger-menu' : 'unactive-burger-menu'
          "
      class="mt-8" text @click="drawer = !drawer">
        <img
        v-if="drawer"

              width="30"
          height="30"
          src="../assets/images/admin/close.svg"
          alt="close"
        />
        <img
        v-else

          width="30"
          height="30"
          src="../assets/images/admin/burger.svg"
          alt="burger"
        />
      </v-btn>
      <v-col cols=" 10">
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
  }),
  beforeCreate() {
    this.$vuetify.rtl = true
  },
  methods: {
    openDropDown(type) {
      if (type === 'students') {
        this.open_student_options = !this.open_student_options
        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'lecturers') {
        this.open_lecturer_options = !this.open_lecturer_options
        this.open_student_options = false
        this.open_subject_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'subjects') {
        this.open_subject_options = !this.open_subject_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_period_options = false
        this.open_lectures_options = false
      } else if (type === 'periods') {
        this.open_period_options = !this.open_period_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_lectures_options = false
      } else if (type === 'lectures') {
        this.open_lectures_options = !this.open_lectures_options
        this.open_student_options = false
        this.open_lecturer_options = false
        this.open_subject_options = false
        this.open_period_options = false
      } else if (type === 'tables') {
        this.open_tables_options = !this.open_tables_options
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

.nav-item-link {
  text-decoration: none;
  color: #000;
  .nav-item {
    .nav-item-title {
      font-size: 15px;
      text-align: right;
      font-family: 'AJannatLT';
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
</style>
