<template>
  <nav v-if="isLoggedIn && $route.name != 'Landing' && $route.name != 'Login'">
    <v-navigation-drawer v-if="$route.name === 'BasicMap'" v-model="rightDrawer" app right>
      <v-list>
        <v-list-item two-line v-for="item in rightSideNavItems" :key="item.name">
          <v-list-item-avatar>
            <img :src="item.pic" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{item.alt}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

      <v-btn v-if="$route.name === 'BasicMap'" dark icon class="mr-1">
        <v-icon large>layers</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'BasicMap'" dark icon class="mr-1">
        <v-icon large>gps_fixed</v-icon>
      </v-btn>

      <v-btn
        v-if="$route.name === 'BasicMap'"
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
      <v-list-item class="px-2">
        <v-list-item-avatar color="red">
          <v-img
            v-if="myProfile.picture !== '' && myProfile.picture !== null"
            :src="myProfile.picture"
          ></v-img>
          <span
            v-else
            class="white--text headline"
          >{{myProfile.fName.charAt(0)}}{{myProfile.lName.charAt(0)}}</span>
        </v-list-item-avatar>

        <v-list-item-title>{{myProfile.fName}} {{myProfile.lName}}</v-list-item-title>
        <!-- <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>invert_colors</v-icon>
        </v-btn>-->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in sideNavItems" :key="item.title" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="#212121" class="white--text" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: mapGetters(["isLoggedIn", "myProfile"]),
  methods: mapActions(["logout", "fetchMyProfile"]),
  created() {
    this.fetchMyProfile();
  },
  data: () => {
    return {
      leftDrawer: false,
      rightDrawer: false,
      sideNavItems: [
        { title: "My Profile", icon: "mdi-account", route: "/myprofile" },
        { title: "My Tracking Devices", icon: "devices", route: "/mydevices" },
        { title: "Dashboard", icon: "dashboard", route: "/dashboard" },
        { title: "Map", icon: "place", route: "/basicmap" }
        // {
        //   title: "Favorite Groups",
        //   icon: "mdi-account-group-outline",
        //   route: "/groupmap/1"
        // }
      ],
      appBarItems: [
        { title: "Click Me 1" },
        { title: "Click Me 2" },
        { title: "Click Me 3" },
        { title: "Sign Out" }
      ],
      rightSideNavItems: [
        {
          name: "John Doe",
          pic: "https://randomuser.me/api/portraits/men/80.jpg",
          alt: "162 ft AGL"
        },
        {
          name: "Billy The Kid",
          pic: "https://randomuser.me/api/portraits/men/81.jpg",
          alt: "0 ft AGL"
        },
        {
          name: "Buz Lightyear",
          pic: "https://randomuser.me/api/portraits/men/70.jpg",
          alt: "3000 ft AGL"
        },
        {
          name: "Connor Mcgregor",
          pic: "https://randomuser.me/api/portraits/men/71.jpg",
          alt: "-4 ft AGL"
        },
        {
          name: "Mike Tyson",
          pic: "https://randomuser.me/api/portraits/men/72.jpg",
          alt: "1463 ft AGL"
        },
        {
          name: "Joe Rogan",
          pic: "https://randomuser.me/api/portraits/men/73.jpg",
          alt: "0 ft AGL"
        }
      ]
    };
  }
};
</script>