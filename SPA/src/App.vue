<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from './components/NavBar'

export default {
  name: "app",
  components: {
    NavBar
  },
  methods: mapActions(["autoLogin", "fetchMyProfile"]),
  created() {
    this.autoLogin();
    this.fetchMyProfile();
  }

};
</script>

<style>
.mySuperUniquePopup .leaflet-popup-tip-container {
    display: none !important;
}
</style>