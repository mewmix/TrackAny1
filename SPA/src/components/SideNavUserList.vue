<template>
  <div>
    <v-list class="pt-0" v-if="trackingData.length > 0">
      <SideNavUserListItem v-for="user in trackingData" :key="user.id" :user="user"></SideNavUserListItem>
    </v-list>
    <div v-else>
      <v-list class="pt-5 mb-10">
        <v-list-item>There is no tracking data for this given time period.</v-list-item>
      </v-list>
      <v-img id="glider" :src="require('@/assets/glider.svg')"></v-img>
    </div>
  </div>
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

<style scoped>
#glider {
  margin: 0 auto;
  width: 100px;
  animation: rotation 1.8s infinite linear;
}

@keyframes rotation {
    0% {
      transform: rotate(359deg);
    }
    100% {
      transform: rotate(0deg);
    }
}
</style>