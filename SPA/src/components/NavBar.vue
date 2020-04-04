<template>
  <nav v-if="isLoggedIn && $route.name != 'Landing' && $route.name != 'Login'">
    <v-navigation-drawer v-if="$route.name === 'GroupMap'" v-model="rightDrawer" app right>
      <v-list-item>
        <v-list-item-content>
          <router-link to="/groups/1">
            <v-list-item-title>San Diego Paragliding</v-list-item-title>
          </router-link>
          <v-list-item-subtitle>178 Members</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-select :items="timeFilters" label="Time Filter" solo></v-select>

      <v-row>
        <v-col cols="6" class="pr-0 py-0">
          <v-btn block tile>all</v-btn>
        </v-col>
        <v-col cols="6" class="pl-0 py-0">
          <v-btn block tile>clear</v-btn>
        </v-col>
      </v-row>

      <SideNavUserList :trackingData="rightSideNavItems"></SideNavUserList>

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

      <v-btn v-if="$route.name === 'GroupMap'" dark icon class="mr-1">
        <v-icon large>layers</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'GroupMap'" dark icon class="mr-1">
        <v-icon large>gps_fixed</v-icon>
      </v-btn>

      <v-btn v-if="$route.name === 'GroupMap'" dark icon @click.stop="rightDrawer = !rightDrawer">
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
      <v-list class="pt-0" dense>
        <v-list-group color="grey lighten-1">
          <template v-slot:activator>
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
          </template>
          <v-divider />

          <v-list-item
            v-for="item in personalRoutes"
            :key="item.title"
            link
            :to="item.route"
            class="white--text"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="red">arrow_back</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="red--text">Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider />

        <v-list dense>
          <v-list-item v-for="item in generalRoutes" :key="item.title" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item>
            <v-list-item-subtitle>Favorite Groups</v-list-item-subtitle>
          </v-list-item>

          <v-list-item two-line to="/groupmap/1">
            <!-- <v-list-item-avatar>
              <img src="https://www.sdhgpa.com/uploads/2/6/0/2/26023409/1526240.jpg?281" />
            </v-list-item-avatar>-->

            <v-list-item-content>
              <v-list-item-title>San Diego Free Flight</v-list-item-title>
              <v-list-item-subtitle>6 members</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import SideNavUserList from "./SideNavUserList";

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
      userItems: [{ title: "Show" }, { title: "Center" }, { title: "Profile" }],
      timeFilters: [
        "most recent",
        "1 hr",
        "24 hrs",
        "48 hrs",
        "1 week",
        "1 month",
        "all"
      ],
      generalRoutes: [
        { title: "New Group", icon: "group_add", route: "/creategroup" },
        { title: "Explore", icon: "explore", route: "/explore" },
        { title: "My Tracking Log", icon: "near_me", route: "/membermap/14" },
        { title: "Favorite People", icon: "gps_fixed", route: "/followingmap" }

        // {
        //   title: "Favorite Groups",
        //   icon: "mdi-account-group-outline",
        //   route: "/groupmap/1"
        // }
      ],
      rightSideNavItems: [
        {
          id: 1,
          fName: "John",
          lName: "Doe",
          pic: "https://randomuser.me/api/portraits/men/80.jpg",
          alt: "162 ft AGL",
          active: "active",
          userTrackingData: [
            {
              id: 14,
              unixTime: 1579644484,
              lat: "34.44680000",
              lng: "-119.68613000",
              alt: "-103.00",
              elevation: "194.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 15,
              unixTime: 1579643887,
              lat: "34.44680000",
              lng: "-119.68613000",
              alt: "-103.00",
              elevation: "194.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            }
          ]
        },
        {
          id: 2,
          fName: "Mad",
          lName: "Max",
          pic: "https://randomuser.me/api/portraits/men/71.jpg",
          alt: "-4 ft AGL",
          active: "27 min ago",
          userTrackingData: [
            {
              id: 91,
              unixTime: 1579654598,
              lat: "34.18571000",
              lng: "-116.21765000",
              alt: "758.00",
              elevation: "756.53",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 81,
              unixTime: 1579654306,
              lat: "34.18614000",
              lng: "-116.21741000",
              alt: "785.00",
              elevation: "780.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            }
          ]
        }
      ],
      personalRoutes: [
        { title: "Profile", icon: "mdi-account", route: "/members/14" },
        { title: "Tracking Devices", icon: "devices", route: "/mydevices" }
      ]
    };
  },
  components: {
    SideNavUserList
  }
};
</script>