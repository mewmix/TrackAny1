<template>
  <v-container>
    <h1>Dashboard</h1>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  methods: mapActions(["fetchMyProfile"]),
  created() {
    this.fetchMyProfile();
  }
};
</script>