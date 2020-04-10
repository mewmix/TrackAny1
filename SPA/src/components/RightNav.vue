<template>
  <div>
    <v-list-item v-if="$route.name === 'GroupMap'">
      <v-list-item-content>
        <router-link to="/groups/1">
          <v-list-item-title>San Diego Paragliding</v-list-item-title>
        </router-link>
        <v-list-item-subtitle>178 members</v-list-item-subtitle>
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
            <span>{{countDown}}</span>
          </template>
        </v-btn>
      </v-col>
    </v-row>

    <SideNavUserList :trackingData="groupTrackingData"></SideNavUserList>
  </div>
</template>


<script>
import { EventBus } from "../main";
import SideNavUserList from "./SideNavUserList";

export default {
  name: "RightNav",
  components: {
    SideNavUserList
  },
  methods: {
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
    },
    showAll() {
      // When we show all users we need to clear the map of all data so that we dont render duplicates.
      // We then need to iterate over groupTrackingData and populate the map
      // We then need to make all the userListItemsTiles active
      EventBus.$emit("clearMap");
      EventBus.$emit("showAll", this.groupTrackingData);
      EventBus.$emit("activateUserListItems");
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
      groupTrackingData: [
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
            },
            {
              id: 9,
              unixTime: 1579643515,
              lat: "34.44672000",
              lng: "-119.68616000",
              alt: "0.00",
              elevation: "194.71",
              velocity: "",
              heading: "",
              txtMsg:
                "Im OK! Hang Gld  http://share.findmespot.com/shared/faces/viewspots.jsp?glId=0uDYpNSftFoxXHSlTJVzo57ty2DBikQHb",
              isEmergency: ""
            },
            {
              id: 10,
              unixTime: 1579643288,
              lat: "34.44676000",
              lng: "-119.68613000",
              alt: "194.00",
              elevation: "194.66",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 11,
              unixTime: 1579642692,
              lat: "34.44197000",
              lng: "-119.68823000",
              alt: "482.00",
              elevation: "225.07",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 7,
              unixTime: 1579642101,
              lat: "34.46313000",
              lng: "-119.68727000",
              alt: "638.00",
              elevation: "426.00",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 8,
              unixTime: 1579641544,
              lat: "34.48149000",
              lng: "-119.68497000",
              alt: "920.00",
              elevation: "923.63",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 1,
              unixTime: 1579638561,
              lat: "34.44748000",
              lng: "-119.68768000",
              alt: "206.00",
              elevation: "213.72",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 2,
              unixTime: 1579637961,
              lat: "34.44684000",
              lng: "-119.68880000",
              alt: "0.00",
              elevation: "211.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 3,
              unixTime: 1579637371,
              lat: "34.45948000",
              lng: "-119.68800000",
              alt: "548.00",
              elevation: "344.00",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 4,
              unixTime: 1579636771,
              lat: "34.47197000",
              lng: "-119.67787000",
              alt: "0.00",
              elevation: "737.51",
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
              velocity: "48 km/h (30 mph)",
              heading: "North West",
              txtMsg: "Hey guys. I've landed out and need a retrieve. Bring cold beer!",
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
            },
            {
              id: 92,
              unixTime: 1579653998,
              lat: "34.18614000",
              lng: "-116.21748000",
              alt: "0.00",
              elevation: "777.19",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 82,
              unixTime: 1579653401,
              lat: "34.18668000",
              lng: "-116.21698000",
              alt: "-103.00",
              elevation: "812.27",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 70,
              unixTime: 1579653114,
              lat: "34.18672000",
              lng: "-116.21701000",
              alt: "-103.00",
              elevation: "813.10",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 83,
              unixTime: 1579652801,
              lat: "34.18668000",
              lng: "-116.21689000",
              alt: "0.00",
              elevation: "813.80",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 71,
              unixTime: 1579652523,
              lat: "34.18812000",
              lng: "-116.21777000",
              alt: "839.00",
              elevation: "845.78",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 72,
              unixTime: 1579652223,
              lat: "34.18812000",
              lng: "-116.21786000",
              alt: "0.00",
              elevation: "844.95",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 73,
              unixTime: 1579651923,
              lat: "34.18821000",
              lng: "-116.21786000",
              alt: "0.00",
              elevation: "846.51",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 59,
              unixTime: 1579651617,
              lat: "34.18898000",
              lng: "-116.21823000",
              alt: "845.00",
              elevation: "851.08",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 60,
              unixTime: 1579651325,
              lat: "34.18898000",
              lng: "-116.21828000",
              alt: "848.00",
              elevation: "850.08",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 61,
              unixTime: 1579651025,
              lat: "34.18898000",
              lng: "-116.21828000",
              alt: "0.00",
              elevation: "850.08",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 47,
              unixTime: 1579650729,
              lat: "34.18916000",
              lng: "-116.21849000",
              alt: "845.00",
              elevation: "850.71",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 48,
              unixTime: 1579650472,
              lat: "34.18924000",
              lng: "-116.21838000",
              alt: "851.00",
              elevation: "854.41",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 49,
              unixTime: 1579650126,
              lat: "34.18929000",
              lng: "-116.21841000",
              alt: "848.00",
              elevation: "855.12",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 50,
              unixTime: 1579649834,
              lat: "34.18897000",
              lng: "-116.21825000",
              alt: "-103.00",
              elevation: "850.55",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 51,
              unixTime: 1579649534,
              lat: "34.18897000",
              lng: "-116.21825000",
              alt: "0.00",
              elevation: "850.55",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 37,
              unixTime: 1579649238,
              lat: "34.18899000",
              lng: "-116.21823000",
              alt: "-103.00",
              elevation: "851.20",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 38,
              unixTime: 1579648938,
              lat: "34.18899000",
              lng: "-116.21823000",
              alt: "0.00",
              elevation: "851.20",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 39,
              unixTime: 1579648629,
              lat: "34.18774000",
              lng: "-116.21739000",
              alt: "839.00",
              elevation: "838.19",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 30,
              unixTime: 1579648347,
              lat: "34.18677000",
              lng: "-116.21677000",
              alt: "-103.00",
              elevation: "819.63",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 31,
              unixTime: 1579648047,
              lat: "34.18677000",
              lng: "-116.21763000",
              alt: "0.00",
              elevation: "792.93",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 32,
              unixTime: 1579647747,
              lat: "34.18686000",
              lng: "-116.21832000",
              alt: "0.00",
              elevation: "770.58",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 33,
              unixTime: 1579647456,
              lat: "34.18709000",
              lng: "-116.21960000",
              alt: "-103.00",
              elevation: "736.74",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 34,
              unixTime: 1579647156,
              lat: "34.18868000",
              lng: "-116.22132000",
              alt: "0.00",
              elevation: "731.92",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 26,
              unixTime: 1579646845,
              lat: "34.18502000",
              lng: "-116.21596000",
              alt: "743.00",
              elevation: "792.25",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            },
            {
              id: 27,
              unixTime: 1579646728,
              lat: "34.18486000",
              lng: "-116.21582000",
              alt: "782.00",
              elevation: "787.85",
              velocity: "",
              heading: "",
              txtMsg: "",
              isEmergency: ""
            }
          ]
        }
      ]
    };
  }
};
</script>