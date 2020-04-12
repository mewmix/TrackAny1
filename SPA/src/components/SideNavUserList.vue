<template>
  <v-list class="pt-0" v-if="trackingData.length > 0">
    <SideNavUserListItem v-for="user in trackingData" :key="user.id" :user="user"></SideNavUserListItem>
  </v-list>
  <v-list v-else class="pt-5">
    <v-list-item>There is no tracking data for this given time period.</v-list-item>
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