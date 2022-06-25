<template>
  <div
    class="nav-item-link"
    style="cursor: pointer"
    @click="$emit('expanded')"
  >
    <v-list-item>
      <v-list-item-icon>
        <slot name="icon" />
        
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="nav-item-title" active-class="active">
          {{ groupTitle }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <transition name="slide">
      <ul v-show="isExpanded === true" class="versions-options">
        <li class="nav-item-link">
          <v-list-item
            v-for="[route, text] in itemsList"
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
    </transition>
  </div>
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
    isExpanded:{
      type:Boolean,
      default:false
    }
  },
}
</script>

<style>
</style>