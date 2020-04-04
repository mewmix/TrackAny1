<template>
  <v-list-item two-line class="pr-2" @click="changeUserStatus" :input-value="active">
    <v-list-item-avatar>
      <img :src="user.pic" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{user.fName}} {{user.lName}}</v-list-item-title>
      <v-list-item-subtitle>{{user.alt}}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="ml-0">
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="grey lighten-1">more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeUserStatus">
            <v-list-item-title>Show</v-list-item-title>
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
  methods: {
    changeUserStatus() {
      if (this.active === false) {
        EventBus.$emit("addUserToMap", this.user);
        this.active = !this.active;
      } else {
        EventBus.$emit("removeUserFromMap", this.user);
        this.active = !this.active;
      }
    },
    centerMap() {
        EventBus.$emit("centerMap", {lat: this.user.userTrackingData[0].lat, lng: this.user.userTrackingData[0].lng})
    }
  }
};
</script>