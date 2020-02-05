<template>
  <div class="ui secondary pointing menu">
    
    <router-link to="/" class="active item">TrackAny1</router-link>

    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/myprofile" class="item">My Profile</router-link>
        <a class="item" @click="logout">Logout</a>
      </div>
      <router-link v-else to="/login" class="ui item">Login</router-link>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: mapGetters(["isLoggedIn"]),
  methods: mapActions(["login", "logout"])
};
</script>

<style scoped>
.horizontal {
  display: flex;
  flex-direction: row;
}
</style>