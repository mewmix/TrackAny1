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

      <GeolocationBtn
        class="mr-1"
        v-if="$route.name === 'GroupMap' || $route.name === 'FollowingMap'"
      ></GeolocationBtn>

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
import GeolocationBtn from "./GeolocationBtn";
import { EventBus } from "../main";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    RightNav,
    LeftNav,
    GeolocationBtn
  },
  computed: {
    ...mapGetters(["isLoggedIn", "myProfile"])
  },
  methods: {
    ...mapActions(["logout", "fetchMyProfile"])
  },
  created() {
    this.fetchMyProfile();
  },
  data: () => {
    return {
      leftDrawer: false,
      rightDrawer: false
    };
  }
};
</script>