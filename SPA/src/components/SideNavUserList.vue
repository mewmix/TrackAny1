<template>
  <v-list class="pt-0">
    <SideNavUserListItem v-for="user in trackingData" :key="user.id" :user="user"></SideNavUserListItem>
  </v-list>
</template>

<script>
import SideNavUserListItem from "./SideNavUserListItem";

export default {
  name: "SideNavUserList",
  components: {
    SideNavUserListItem
  },
  props: {
    trackingData: Array
  }
};
</script>