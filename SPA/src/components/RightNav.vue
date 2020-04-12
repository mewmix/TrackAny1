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

    <v-progress-linear v-if="loadingData" indeterminate color="yellow darken-2"></v-progress-linear>

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
      console.log(`A new timespan has been chosen: ${this.selected.val}`);
      // Call a vuex action with the timespan to grab tracking data. Vuex will change the groupTrackingData getter.
      // We have a watcher on groupTrackingData that will automagically update the userList and map.
      this.getTrackingData(this.$route.params.id, this.selected.val);
    },
    groupTrackingData: function() {
      console.log("New tracking data is available!");

      this.loadingData = false;

      EventBus.$emit("clearMap");

      // When we get new data. We need to try and add the users who were previously on the map. We have a list of ids for those who were on the map.
      // Loop through the list of ids and add those poeople to the map.
      // If the id is not available in the new tracking data, we need to remove it from the list of users on the map !!!
      // DONT FORGET TO REMOVE ANY USER IDS THAT DONT MATCH THE INCOMING DATA !!!

      // If groupTrackingData is null we need to remove all users from map

      if (this.usersOnMap.length !== 0 && this.groupTrackingData !== null) {
        // If there were previously people on the map, and we have new data
        // For each id loop through the trackingData. Find an object with ID that matches and add to map. If none match, remove id from list.
        let matches = [];
        let usersToAddToMap = [];

        this.usersOnMap.forEach(uid => {
          for (let i = 0; i < this.groupTrackingData.length; i++) {
            if (this.groupTrackingData[i].id === uid) {
              // console.log(`We have a match. User: ${uid}`);
              usersToAddToMap.push(this.groupTrackingData[i]);
              matches.push(uid);
              break;
            }
          }
        });
        // console.log(`Matches: ${matches}`);
        this.usersOnMap = matches;
        EventBus.$emit("showAll", usersToAddToMap);
      }
    }
  },
  computed: {
    ...mapGetters(["groupTrackingData"])
  },
  created() {
    this.getTrackingData(this.$route.params.id, "all");

    EventBus.$on("addToListOfUsersOnMap", id => {
      // When a userListItem is clicked, that users object is sent to the map to be displayed. But this component has no way of knowing who is on the map. So we use an event bus to pass user id's anytime a user is added or removed from the map
      this.usersOnMap.push(id);
    });
    EventBus.$on("removeFromListOfUsersOnMap", id => {
      // When a userListItem is clicked, that users object is sent to the map to be displayed. But this component has no way of knowing who is on the map. So we use an event bus to pass user id's anytime a user is added or removed from the map
      this.usersOnMap = this.usersOnMap.filter(uid => uid !== id);
    });
  },
  methods: {
    getTrackingData(id, timeSpan) {
      this.$store.dispatch("fetchGroupTrackingData", [id, timeSpan]);
      this.loadingData = true;
    },
    countDownTimer() {
      if (!this.reloadTimeout) this.reloadTimeout = true; // This will disable the reload button and display the loader

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
      console.log("Reload Map Data");
      this.countDownTimer(); // Disable the reload btn for 10 sec
      
      this.getTrackingData(this.$route.params.id, this.selected.val);
    }
  },
  data: () => {
    return {
      loadingData: true,
      usersOnMap: [], // This is to keep track of who is currentley on the map incase we hit reload or change the time filer
      countDown: 10,
      reloadTimeout: false,
      selected: { name: "All Data", val: "all" },
      timeFilters: [
        // { name: "Most Recent", val: "mostrecent" },
        { name: "1 Hour", val: "1hr" },
        { name: "1 Day", val: "24hr" },
        { name: "2 Days", val: "48hr" },
        { name: "1 Week", val: "1week" },
        { name: "All Data", val: "all" }
      ],
      userItems: [{ title: "Show" }, { title: "Center" }, { title: "Profile" }]
    };
  }
};
</script>