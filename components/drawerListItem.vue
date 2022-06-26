<template>
  <v-expansion-panel>
    <v-expansion-panel-header disable-icon-rotate>
      <div class="tw-flex tw-gap-4 tw-items-center">
        <slot name="icon" />
        <span>
          {{ groupTitle }}
        </span>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="!tw-grow">
      <ul class="versions-options">
        <li class="nav-item-link">
          <v-list-item
            v-for="[route, text] in itemsList"
            :key="text"
            link
            :to="route"
          >
            <v-list-item-icon class="!tw-flex-none">
              <img
                width="12"
                src="~/assets/images/admin/nav-icons/list-item.svg"
                alt="list-item"
                class="tw-mr-2"
              />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </li>
      </ul>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    groupTitle: {
      type: String,
      default: () => '',
    },
    itemsList: {
      type: Array,
      default: () => [],
    },
    // isExpanded: {
    //   type: Boolean,
    //   default: false,
    // },
  },
}
</script>

<style>
.v-expansion-panel {
  background-color: transparent !important;
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
