<template>
  <nav v-if="isLoggedIn && $route.name != 'Landing' && $route.name != 'Login'">
    <v-navigation-drawer
      v-if="$route.name === 'GroupMap' || $route.name === 'FollowingMap'"
      v-model="rightDrawer"
      app
      right
    >
      <RightNav />
    </v-navigation-drawer>

    <v-app-bar clipped-left app flat>
      <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" large />
      <v-toolbar-title left class="text-uppercase">
        <span>
          <i>Track</i>
        </span>
        <span class="font-weight-light">
          <i>Any1</i>
        </span>
        <!-- {{$route.name}} -->
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="$route.name === 'MyProfile'" dark icon class="mr-1">
        <v-icon large>edit</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'MyProfile'" dark icon class="mr-1">
        <v-icon large>settings</v-icon>
      </v-btn>

      <v-btn
        v-if="$route.name === 'GroupMap' || $route.name === 'FollowingMap' "
        dark
        icon
        class="mr-1"
      >
        <v-icon large>layers</v-icon>
      </v-btn>

      <v-btn
        v-if="$route.name === 'GroupMap' || $route.name === 'FollowingMap'"
        dark
        icon
        class="mr-1"
        @click="triggerGPS"
      >
        <v-icon v-if="gpsLoading == false" large :color="color">gps_fixed</v-icon>
        <v-progress-circular v-if="gpsLoading == true" indeterminate color="primary"></v-progress-circular>
      </v-btn>

      <v-btn
        v-if="$route.name === 'GroupMap' || $route.name === 'FollowingMap'"
        dark
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon large>mdi-account-group-outline</v-icon>
      </v-btn>

      <!-- <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon large>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item) in appBarItems" :key="item.title">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
    </v-app-bar>

    <v-navigation-drawer v-model="leftDrawer" app clipped>
      <LeftNav />
    </v-navigation-drawer>
  </nav>
</template>

<script>
import RightNav from "./RightNav";
import LeftNav from "./LeftNav";
import { EventBus } from "../main";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    RightNav,
    LeftNav
  },
  computed: {
    ...mapGetters(["isLoggedIn", "myProfile"]),
    color() {
      let color = this.gps === false ? "white" : "blue";
      return color;
    }
  },
  methods: {
    ...mapActions(["logout", "fetchMyProfile"]),
    triggerGPS() {
      if (!this.gps) {
        // Set loader to true
        this.gpsLoading = true;
        // Get current location, then trigger the callback function to read the results
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.log("Geolocation is not supported on this device!");
          this.gpsLoading = true;
          return
        }
        // Set the GPS icon to true where it will be blue
        this.gps = true;
      } else {
        // Need to remove the blue cirecle from the map
        // Then set gps to false
        this.gps = false;
        EventBus.$emit('removeGeolocation');
      }
    },
    showPosition(position) {
      // This is called once we have the users current location. This is passed as a callback
      this.gpsLoading = false;
      let { latitude, longitude, accuracy } = position.coords;
      // Then pass the geolocation data to the map via EventBus
      EventBus.$emit('showGeolocation', latitude, longitude, accuracy)
    }
  },
  created() {
    this.fetchMyProfile();
  },
  data: () => {
    return {
      leftDrawer: false,
      rightDrawer: false,
      gps: false,
      gpsLoading: false
    };
  }
};
</script>