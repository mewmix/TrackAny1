<template>
  <div>
    <v-list-item v-if="$route.name === 'GroupMap'">
      <v-list-item-content>
        <router-link to="/groups/1">
          <v-list-item-title>San Diego Free Flight</v-list-item-title>
        </router-link>
        <v-list-item-subtitle>6 members</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="$route.name === 'FollowingMap'">
      <v-list-item-content>
        <v-list-item-title>My Favorite People</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-select
      :items="timeFilters"
      v-model="selected"
      label="Time Filter"
      solo
      item-text="name"
      item-value="val"
      return-object
    ></v-select>

    <v-row>
      <v-col cols="3.5" class="pr-0 py-0">
        <v-btn block tile @click="showAll">all</v-btn>
      </v-col>
      <v-col cols="3.5" class="px-0 py-0">
        <v-btn block tile @click="clearMap">clear</v-btn>
      </v-col>
      <v-col cols="5" class="px-0 py-0">
        <v-btn
          class="pl-0"
          block
          tile
          @click="reloadMapData"
          :disabled="reloadTimeout"
          :loading="reloadTimeout"
        >
          reload
          <template v-slot:loader>
            <span class="pr-4">{{countDown}}</span>
          </template>
        </v-btn>
      </v-col>
    </v-row>

    <SideNavUserList :trackingData="groupTrackingData"></SideNavUserList>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { EventBus } from "../main";
import SideNavUserList from "./SideNavUserList";
import { getGroupTrackingData } from "../api/TrackingData";

export default {
  name: "RightNav",
  components: {
    SideNavUserList
  },
  watch: {
    selected: function() {
      console.log(this.selected.val);
    }
  },
  computed: {
    ...mapGetters(['groupTrackingData'])
  },
  created() {
    this.getTrackingData(this.$route.params.id, 'all')

    EventBus.$on("addUserToMap", user => {
      this.usersOnMap.push(user.id);
    });
    EventBus.$on("removeUserFromMap", user => {
      this.usersOnMap = this.usersOnMap.filter(uid => uid !== user.id);
    });
  },
  methods: {
    getTrackingData(id, timeSpan) {
      this.$store.dispatch('fetchGroupTrackingData', [id, timeSpan]);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDown = 10;
        this.reloadTimeout = false;
      }
    },
    clearMap() {
      EventBus.$emit("clearMap");
      EventBus.$emit("deactivateUserListItems");
      // Need to clear the list of users on the map that resides in this component
      this.usersOnMap = [];
    },
    showAll() {
      // When we show all users we need to clear the map of all data so that we dont render duplicates.
      // We then need to iterate over groupTrackingData and populate the map
      // We then need to make all the userListItemsTiles active
      EventBus.$emit("clearMap");
      EventBus.$emit("showAll", this.groupTrackingData);
      EventBus.$emit("activateUserListItems");
      // Need to remove and add all user ids to the list of users on the map that is stored in this component
      this.usersOnMap = [];
      this.groupTrackingData.forEach(user => {
        this.usersOnMap.push(user.id);
      });
    },
    reloadMapData() {
      this.reloadTimeout = true;
      this.countDownTimer(); // Disable the reload btn for 10 sec
      console.log("Reload Map Data");
      //
      // Need to make a copy of all the people who are on the map
      // Need to clear all map layers except geolocation layer
      // Need to make a request for tracking data with the current selected timespan
      // Need to update groupTrackingData in this component
      //
    }
  },
  data: () => {
    return {
      usersOnMap: [], // This is to keep track of who is currentley on the map incase we hit reload or change the time filer
      countDown: 10,
      reloadTimeout: false,
      selected: { name: "1 Week", val: "1week" },
      timeFilters: [
        { name: "Most Recent", val: "mostrecent" },
        { name: "1 Hour", val: "1hr" },
        { name: "1 Day", val: "24hr" },
        { name: "2 Days", val: "48hr" },
        { name: "1 Week", val: "1week" },
        { name: "All Data", val: "all" }
      ],
      userItems: [{ title: "Show" }, { title: "Center" }, { title: "Profile" }],
    };
  }
};
</script>