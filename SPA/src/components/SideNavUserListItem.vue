<template>
  <v-list-item two-line class="pr-2" @click="changeUserStatus" :input-value="active">
    <v-list-item-avatar color="#222222">
      <img v-if="user.picture !== null" :src="user.picture" />
      <span v-else class="white--text" style="font-family: Roboto Mono; font-size: 23px;">{{user.fName[0]}}{{user.lName[0]}}</span>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{user.fName}} {{user.lName}}</v-list-item-title>
      <v-list-item-subtitle>{{timeAgo}}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="ml-0">
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="grey lighten-1">more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeUserStatus" v-if="!active">
            <v-list-item-title>Show</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeUserStatus" v-else>
            <v-list-item-title>Hide</v-list-item-title>
          </v-list-item>
          <v-list-item @click="centerMap">
            <v-list-item-title>Center</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'MemberProfile', params: { id: this.user.id }}">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "SideNavUserListItem",
  props: {
    user: Object
  },
  data() {
    return {
      active: false,
      menuItems: [{ title: "Show" }, { title: "Center" }, { title: "Profile" }]
    };
  },
  created() {
    EventBus.$on("deactivateUserListItems", () => {
      // Set active to false if true
      if (this.active) {
        this.active = false;
      }
    });

    EventBus.$on("activateUserListItems", () => {
      // Set active to true if not already
      if (!this.active) {
        this.active = true;
      }
    });
  },
  computed: {
    timeAgo: function () {
      return moment.unix(this.user.userTrackingData[0].unixTime).fromNow();
    }
  },
  methods: {
    changeUserStatus() {
      if (!this.active) {
        EventBus.$emit("addUserToMap", this.user);
        this.active = !this.active;
      } else {
        EventBus.$emit("removeUserFromMap", this.user);
        this.active = !this.active;
      }
    },
    centerMap() {
      EventBus.$emit("centerMap", {
        lat: this.user.userTrackingData[0].lat,
        lng: this.user.userTrackingData[0].lng
      });
    }
  }
};
</script>