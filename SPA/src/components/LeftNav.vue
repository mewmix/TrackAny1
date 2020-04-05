<template>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LeftNav",
  computed: mapGetters(["isLoggedIn", "myProfile"]),
  methods: {
    ...mapActions(["logout", "fetchMyProfile"])
  },
  created() {
    this.fetchMyProfile();
  },
  data() {
    return {
      generalRoutes: [
        { title: "New Group", icon: "group_add", route: "/creategroup" },
        { title: "Explore", icon: "explore", route: "/explore" },
        { title: "My Tracking Log", icon: "near_me", route: "/membermap/14" },
        { title: "Favorite People", icon: "gps_fixed", route: "/followingmap" }
      ],
      personalRoutes: [
        { title: "Profile", icon: "mdi-account", route: "/members/14" },
        { title: "Tracking Devices", icon: "devices", route: "/mydevices" }
      ]
    };
  }
};
</script>