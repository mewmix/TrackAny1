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

.leaflet-container a.leaflet-popup-close-button {
    padding: 2px 4px 0 0 !important;
    width: 30px !important;
    height: 30px !important;
    font: 30px/28px Tahoma, Verdana, sans-serif !important;
    color: #ff0000 !important;
    background: transparent;
}

::-webkit-scrollbar {
display: none;
}
</style>