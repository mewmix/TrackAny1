<template>
  <v-navigation-drawer
    id="sideNav"
    v-model="drawer"
    absolute
    right
    touchless
    hide-overlay
    width="350"
  >
    <template v-slot:prepend>
      <v-list-item two-line id="navHeaderList">
        <v-list-item-action id="navHeader">
          <v-btn :to="{ name: 'GroupPage', params: { groupID: group.id }}" icon x-large>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{group.groupName}}</v-list-item-title>
          <v-list-item-subtitle>{{group.region}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn text color="error" @click="closeNavbar">Close</v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <TimeFilter @changeTimeFilter="changeTime" />

    <v-divider></v-divider>

    <SideNavUserList @addToMap="addUserToMap" @removeFromMap="removeUserFromMap" :trackingData="trackingData" />

    <v-divider></v-divider>

  </v-navigation-drawer>
</template>

<script>
import SideNavUserList from "./SideNavUserList";
import TimeFilter from "./TimeFilter";

export default {
  name: "MapSideNav",
  components: {
    SideNavUserList,
    TimeFilter
  },
  props: {
    group: Object,
    trackingData: Array,
    drawer: Boolean
  },
  methods: {
    addUserToMap(user) {
      this.$emit("addToMap", user);
    },
    removeUserFromMap(user){
      this.$emit("removeFromMap", user);
    },
    closeNavbar() {
      this.$emit("closeNav");
    },
    changeTime(val) {
      this.$emit("changeTimeFilter", val)
    }
  }
};
</script>

<style scoped>
#sideNav {
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.85);
}

#navHeader {
  margin-right: 10px;
}

#navHeaderList {
  padding-left: 10px;
  padding-right: 5px;
}
</style>