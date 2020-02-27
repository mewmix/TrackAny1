<template>
  <nav v-if="isLoggedIn">
    <v-app-bar app clipped-left flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" large />
      <v-toolbar-title left class="text-uppercase">
        <span>
          <i>Track</i>
        </span>
        <span class="font-weight-light">
          <i>Any1</i>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon large>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="myProfile.picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{myProfile.fName}} {{myProfile.lName}}</v-list-item-title>
        <!-- <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>invert_colors</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

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
      drawer: false,
      items: [
        { title: "My Profile", icon: "mdi-account", route: "/myprofile" },
        { title: "My Tracking Devices", icon: "devices", route: "/mydevices" },
        { title: "Dashboard", icon: "dashboard", route: "/dashboard" },
        { title: "Map", icon: "place", route: "/basicmap" },
        {
          title: "Favorite Groups",
          icon: "mdi-account-group-outline",
          route: "/groupmap/1"
        }
      ],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ]
    };
  }
};
</script>