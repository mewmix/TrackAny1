<template>
  <v-list-item two-line v-if="user.userTrackingData != null" v-bind:id="_uid" class="changeCursorOnHover">
    <v-list-item-avatar color="grey lighten-2" @click="changeUserStatus">
      <v-img src="../assets/blankProfile.png"></v-img>
      <!-- <span class="white--text headline">{{(user.fName).charAt(0)}}{{(user.lName).charAt(0)}}</span> -->
    </v-list-item-avatar>

    <v-list-item-content @click="changeUserStatus">
      <v-list-item-title>{{user.fName}} {{user.lName}}</v-list-item-title>
      <v-list-item-subtitle>Updated:</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon large>
        <v-icon color="grey">more_vert</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import moment from "moment";
export default {
  name: "SideNavUserListItem",
  props: {
    user: Object
  },
  data() {
    return {
      active: false,
      items: [
        { title: "Center Map" },
        { title: "Directions" },
        { title: "More Info" }
      ]
    };
  },
  methods: {
    changeUserStatus() {
      if (this.active === false) {
        this.$emit("addToMap", this.user);
        document.getElementById(this._uid).style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        this.active = !this.active;
      } else {
        this.$emit("removeFromMap", this.user);
        document.getElementById(this._uid).style.backgroundColor = "rgba(255, 255, 255, 0)";
        this.active = !this.active;
      }
    }
  },
  // computed: {
  //   timeAgo() {
  //     let lastPing = moment.unix(this.user.pings[0].unixTime);
  //     return lastPing.fromNow();
  //   }
  // }
};
</script>

<style scoped>
.changeCursorOnHover{
  cursor: pointer;
}
</style>