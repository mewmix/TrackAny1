<template>
  <v-list-item two-line class="pr-2" @click="changeUserStatus" :input-value="active" v-bind:class="{ leftBorderEmergency: emergency }">
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
    },
    emergency: function () {
      // Need to loop through the user tracking data for the given time period and return true or false if isEmergency is 1
      let emergency = false;

      for(let i = 0; i < this.user.userTrackingData.length; i++ ) {
        if (this.user.userTrackingData[i].isEmergency) {
          emergency = true;
        }
      }
      return emergency;
    }
  },
  methods: {
    changeUserStatus() {
      if (!this.active) {
        EventBus.$emit("addUserToMap", this.user); // Adds user to map
        EventBus.$emit("addToListOfUsersOnMap", this.user.id); // We have a list of user id's on the rightNav component that keep track of who is on the map for when it updates.
        this.active = !this.active;
      } else {
        EventBus.$emit("removeUserFromMap", this.user);
        EventBus.$emit("removeFromListOfUsersOnMap", this.user.id); // We have a list of user id's on the rightNav component that keep track of who is on the map for when it updates.
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

<style scoped>
.leftBorderEmergency {
  border-left: 3px solid #D32F2F;
}
</style>